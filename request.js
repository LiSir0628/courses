import md5 from "./md5.js";

// let baseURL = 'https://api.domefish.com/api/'
// let baseURL = 'https://fish.mini.zhishukongjian.com/api'
// let baseURL = 'https://course.mini.zhishukongjian.com/api/'
let baseURL = 'https://api.amoycourse.com/api/'

function myRequest(options){
	let arr = [];
	let sign = "";
	let obj = {};
	let timestamp = ((new Date().getTime())/1000).toFixed(0)
	
	for(let i in options.data){
		arr.push(i)
		if(options.data[i]){
			if(typeof options.data[i] == 'object' && Array.isArray(options.data[i]) && options.data[i].length <= 0){
				//不添加
			} else if(typeof options.data[i] == 'object' && !Array.isArray(options.data[i]) && Object.keys(options.data[i]).length <= 0) {
				//不添加
			} else {
				obj[i] = options.data[i]
			}
		}
	}
	arr.sort((s1,s2)=>{
	    for(let i=0;i<s1.length&&i<s2.length;i++){
	        if(s1[i]===s2[i]) {
	            if(i+1==s1.length||i+1==s2.length)
	            {
	                return s1.length - s2.length
	            }
	        }
	        else if(s1[i]<s2[i]) return -1
	        else if(s1[i]>s2[i]) return 1
	    }
	})
	for(let i in arr){
		if(options.data[arr[i]]){
			sign = sign + arr[i] + options.data[arr[i]]
		}
	}
	sign = sign + 'timestamp' + timestamp + 'ab*#789';
	sign = md5.hex_md5(sign).toUpperCase();
	// console.log(timestamp)
	// console.log(sign)
	let headers={}
	var Token = uni.getStorageSync('token') ? uni.getStorageSync('token') : "" ;
	headers['sign'] = sign;
	headers['timestamp'] = timestamp;
	headers['platform'] = 3;
	headers['version'] = 1.01;
	headers['brand'] = '';
	headers['model'] = '';
	headers['did'] = '';
	headers['lang'] = uni.getStorageSync('languageIso') || 'en';
	headers['token'] = Token;
	// headers["Content-Type"] = 'application/x-www-form-urlencoded';
	// #ifdef MP-WEIXIN
	headers["Isminiapp"] = "TRUE";
	// #endif
	return new Promise((res,rej)=>{
		uni.request({
			url: options.url.indexOf("http") == -1 ? baseURL + options.url : options.url,
			//url:baseURL + options.url,
			method:options.method || 'GET',
			data: obj,
			//data:options.data,
			header:headers,
			success(data) {
				// console.log(data)
				if(data.data.code==200){
					res(data)
				} else if(data.data.code==401){
					//需要权限验证, token未传或错误
					uni.setStorageSync('token', "");
					uni.setStorageSync('coursesUserList', "");
					
					uni.redirectTo({url:'/pages/register/login'});
					return false;
				} else if(data.data.code==404){
					//请求的内容为空
					res(data)
				} else{
					//其他状态
					res(data)
				}
			},
			fail(err) {
				//console.log(err);
				rej(err)
			}
		})
	})
	
}
export default myRequest;