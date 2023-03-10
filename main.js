
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

import utils from './common/util.js'
Vue.prototype.$utils = utils;
import myRequest from '@/request.js'
Vue.prototype.$myRequest = myRequest

// 复制
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

import {
	_get,
	_post,
	_put,
	_delete
} from './common/http.js'
Vue.prototype.$_get = _get;
Vue.prototype.$_post = _post;
Vue.prototype.$_put = _put;
Vue.prototype.$_delete = _delete;

import {
	toast,
	handleTree,
	transformTime
} from './common/api.js'
Vue.prototype.$toast = toast;
Vue.prototype.$handleTree = handleTree;
Vue.prototype.$transformTime = transformTime;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif