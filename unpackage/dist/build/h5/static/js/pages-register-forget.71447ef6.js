(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-register-forget"],{2023:function(t,e,i){var a=i("8343");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("cb85963c",a,!0,{sourceMap:!1,shadowMode:!1})},"249c":function(t,e,i){"use strict";i("c975"),i("ac1f"),i("466d"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{account:"",code:"",password:"",is_default:!1,time:59,setTime:null,timeTitle:"Access",isSumbit:!0,isAndroid:"",isIOS:""}},mounted:function(){clearInterval(this.setTime);var t=navigator.userAgent;this.isAndroid=t.indexOf("Android")>-1||t.indexOf("Linux")>-1,this.isIOS=!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)},methods:{back:function(){window.history.go(-1)},slip:function(){this.isAndroid&&uni.pageScrollTo({scrollTop:1e3,duration:100}),this.isIOS},getCode:function(){var t=this;this.account?this.isSumbit&&(this.isSumbit=!1,uni.showLoading({title:"loading...",mask:!0}),this.$myRequest({method:"POST",url:"emailcode",data:{email:this.account}}).then((function(e){200==e.data.code?t.openTimer():(t.isSumbit=!0,uni.showModal({title:"Tip",content:e.data.msg,confirmText:"confirm",showCancel:!1})),uni.hideLoading()})).catch((function(e){t.isSumbit=!0,uni.hideLoading(),uni.showModal({title:"Tip",content:"Network error, please try again later",confirmText:"confirm",showCancel:!1})}))):uni.showModal({title:"Tip",content:"Please enter your email",confirmText:"confirm",showCancel:!1})},openTimer:function(){var t=this;59==this.time&&(this.timeTitle="60s"),this.setTime=setInterval((function(){t.time>=0?(t.timeTitle=t.time+"s",t.time=t.time-1,t.isSumbit=!1):(t.timeTitle="Access",t.time=59,t.isSumbit=!0,clearInterval(t.setTime))}),1e3)},register:function(){uni.navigateTo({url:"/pages/register/register"})},login:function(){uni.navigateTo({url:"/pages/register/login"})},sumbit:function(){var t=this;this.account?this.password?this.is_default?(uni.showLoading({title:"loading...",mask:!0}),this.$myRequest({method:"POST",url:"forgot",data:{email:this.account,password:this.password,code:this.code}}).then((function(e){uni.hideLoading(),200==e.data.code?(console.log(e.data.data),uni.setStorageSync("token",e.data.data.token),t.getUserList()):uni.showModal({title:"Tip",content:e.data.msg,confirmText:"confirm",showCancel:!1})})).catch((function(t){uni.hideLoading(),uni.showModal({title:"Tip",content:"Network error, please try again later",confirmText:"confirm",showCancel:!1})}))):uni.showModal({title:"Tip",content:"Please agree to the Privacy Policy and User Manual",confirmText:"confirm",showCancel:!1}):uni.showModal({title:"Tip",content:"Please enter new password",confirmText:"confirm",showCancel:!1}):uni.showModal({title:"Tip",content:"Please enter your email",confirmText:"confirm",showCancel:!1})},getUserList:function(){uni.showLoading({title:"loading...",mask:!0}),this.$myRequest({method:"GET",url:"user",data:{}}).then((function(t){uni.hideLoading(),200==t.data.code?(t.data.data.avatar&&-1==t.data.data.avatar.indexOf("?")?t.data.data.avatar=t.data.data.avatar+"?timestamp="+Math.random():t.data.data.avatar&&-1!=t.data.data.avatar.indexOf("?")&&(t.data.data.avatar=t.data.data.avatar+"&timestamp="+Math.random()),console.log(t.data.data),uni.setStorageSync("coursesUserList",t.data.data),uni.navigateTo({url:"/pages/index/index"})):uni.showModal({title:"Tip",content:t.data.msg,confirmText:"confirm",showCancel:!1})})).catch((function(t){uni.hideLoading(),uni.showModal({title:"Tip",content:"Network error, please try again later",confirmText:"confirm",showCancel:!1})}))},onUnload:function(){clearInterval(this.setTime)},onBeforeUnload:function(){clearInterval(this.setTime)},switchChange:function(){this.is_default=!this.is_default,console.log(this.is_default)}}};e.default=a},"24b4":function(t,e,i){"use strict";i.r(e);var a=i("249c"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},"3b7d":function(t,e,i){"use strict";var a=i("2023"),n=i.n(a);n.a},"5bfe":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var a={uniNavBar:i("7e0e").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"container"},[i("uni-nav-bar",{attrs:{fixed:!0,"left-icon":"back","background-color":"#ffffff",color:"#000000",title:""},on:{clickLeft:function(e){arguments[0]=e=t.$handleEvent(e),t.back.apply(void 0,arguments)}}}),i("v-uni-view",{staticClass:"title"},[t._v("Create a"),i("br"),t._v("new password")]),i("v-uni-view",{staticClass:"input-modualr"},[i("v-uni-view",{staticClass:"input-title"},[t._v("Email")]),i("v-uni-input",{staticClass:"input-text",attrs:{"placeholder-class":"placeholder-class",placeholder:"Enter your email"},model:{value:t.account,callback:function(e){t.account=e},expression:"account"}})],1),i("v-uni-view",{staticClass:"input-modualr"},[i("v-uni-view",{staticClass:"input-title"},[t._v("New Password")]),i("v-uni-input",{staticClass:"input-text",attrs:{"placeholder-class":"placeholder-class",placeholder:"Enter new password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),i("v-uni-view",{staticClass:"input-modualr"},[i("v-uni-view",{staticClass:"input-title"},[t._v("Validation Code")]),i("v-uni-view",{staticClass:"code-modular"},[i("v-uni-input",{staticClass:"input-code",attrs:{"placeholder-class":"placeholder-class",placeholder:"Enter Validation Code"},on:{focus:function(e){arguments[0]=e=t.$handleEvent(e),t.slip.apply(void 0,arguments)}},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}}),i("v-uni-view",{staticClass:"code-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getCode.apply(void 0,arguments)}}},[t._v(t._s(t.timeTitle))])],1)],1),i("v-uni-view",{staticClass:"btn-modular",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.sumbit.apply(void 0,arguments)}}},[t._v("Set a new password")]),i("v-uni-view",{staticClass:"forget-modualr"},[i("v-uni-view",{staticClass:"forget",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.register.apply(void 0,arguments)}}},[t._v("register")]),i("v-uni-view",{staticClass:"log",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.login.apply(void 0,arguments)}}},[t._v("Log in")])],1),i("v-uni-view",{staticClass:"read-nav"},[i("v-uni-checkbox",{attrs:{checked:t.is_default,color:"#ffffff"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.switchChange.apply(void 0,arguments)}}}),i("v-uni-view",{staticClass:"read-text"},[t._v("Agree to Privacy Policy and User Manual")])],1)],1)},o=[]},"668e":function(t,e,i){"use strict";i.r(e);var a=i("5bfe"),n=i("24b4");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("3b7d");var s,c=i("f0c5"),r=Object(c["a"])(n["default"],a["b"],a["c"],!1,null,"b3dcbe14",null,!1,a["a"],s);e["default"]=r.exports},8343:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".container[data-v-b3dcbe14]{padding-bottom:%?40?%}[data-v-b3dcbe14] .uni-navbar--border{border-bottom-color:#fff}.title[data-v-b3dcbe14]{font-size:%?64?%;line-height:%?80?%;font-family:Inter-Bold;font-weight:700;color:#212644;padding:0 %?48?% 0}.input-modualr[data-v-b3dcbe14]{padding:0 %?40?% 0 %?48?%;margin-top:%?36?%}.input-title[data-v-b3dcbe14]{font-size:%?32?%;font-family:Inter-Medium;font-weight:500;color:#222}.input-text[data-v-b3dcbe14]{width:%?660?%;height:%?96?%;background:#eaeaea;border-radius:%?20?%;padding:0 %?30?%;box-sizing:border-box;margin-top:%?24?%;font-size:%?32?%;font-family:Inter-Regular;font-weight:400}.code-modular[data-v-b3dcbe14]{margin-top:%?24?%}.input-code[data-v-b3dcbe14]{width:%?393?%;height:%?96?%;background:#eaeaea;border-radius:%?20?%;padding:0 %?26?% 0 %?30?%;box-sizing:border-box;font-size:%?32?%;font-family:Inter-Regular;font-weight:400}.placeholder-class[data-v-b3dcbe14]{font-size:%?32?%;font-family:Inter-Regular;font-weight:400;color:#999}.code-modular[data-v-b3dcbe14]{display:flex;align-items:center;justify-content:space-between}.code-btn[data-v-b3dcbe14]{width:%?247?%;height:%?96?%;line-height:%?96?%;text-align:center;background:#e84678;border-radius:%?20?%;font-size:%?32?%;font-family:Inter-SemiBold;font-weight:400;color:#fff}.btn-modular[data-v-b3dcbe14]{width:%?660?%;height:%?96?%;background:#e84678;border-radius:%?20?%;display:flex;align-items:center;text-align:center;justify-content:center;font-size:%?32?%;font-family:Inter-SemiBold;font-weight:400;color:#fff;margin:%?70?% auto 0}.forget-modualr[data-v-b3dcbe14]{display:flex;justify-content:space-between;margin-top:%?28?%;padding:0 %?58?%}.forget[data-v-b3dcbe14]{font-size:%?30?%;font-family:Inter-SemiBold;font-weight:400;color:#222}.log[data-v-b3dcbe14]{font-size:%?30?%;font-family:Inter-SemiBold;font-weight:400;color:#e84678}.read-nav[data-v-b3dcbe14]{\n\t/* position: absolute;\n\tleft: 0;\n\tright: 0; */margin:%?80?% auto 0;bottom:%?54?%;display:flex;align-items:center;justify-content:center}.read-text[data-v-b3dcbe14]{font-size:%?28?%;font-family:Inter-Medium;font-weight:500;color:#212644;text-align:center}\n\n/* /deep/ .uni-checkbox-wrapper{\n\twidth: 32rpx;\n\theight: 32rpx;\n} */[data-v-b3dcbe14] .uni-checkbox-input{width:%?32?%;height:%?32?%;opacity:1;border:%?2?% solid #999;border-radius:50%;margin-top:%?-4?%}[data-v-b3dcbe14] .uni-checkbox-input-checked{background:#e84678}[data-v-b3dcbe14] .uni-checkbox-input.uni-checkbox-input-checked:before{font-size:%?24?%!important}",""]),t.exports=e}}]);