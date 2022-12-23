<script>
	export default {
		onLaunch: function(e) {
			let query = e.query
			console.log(query)
			console.log('App Launch')
			if(query && query.invi){
				uni.setStorageSync('user_invite', query.invi.toString());
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	
	/deep/ .uni-navbar__header {
		height: 88rpx !important;
	}
	
	/deep/ .uni-navbar__placeholder{
		height: 88rpx !important;
	}
	
	/deep/ .uni-ellipsis-1{
		overflow: initial !important;
	}
	
	/deep/ .uni-nav-bar-text{
		font-weight: bold;
		font-size: 36rpx !important;
	}
	
	@import '@/uni_modules/uni-scss/index.scss';

	@font-face {
		font-family: Inter-Bold;
		src: url(static/Inter/Inter-Bold-4.otf)
	}
	
	@font-face {
		font-family: Inter-Medium;
		src: url(static/Inter/Inter-Medium-8.otf)
	}
	
	@font-face {
		font-family: Inter-Regular;
		src: url(static/Inter/Inter-Regular-9.otf)
	}
	
	@font-face {
		font-family: Inter-SemiBold;
		src: url(static/Inter/Inter-SemiBold-10.otf)
	}
</style>
