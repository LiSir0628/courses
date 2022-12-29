<template>
	<view class="container">
		<view class="nav-top">
			<uni-nav-bar fixed left-icon="back" @clickLeft="back" background-color="#ffffff" color="#000000" title="Subordinate Sales">
			</uni-nav-bar>
			<view class="info-item">
				<picker @change="bindPickerChange($event,timeLists)" :value="index" :range="timeLists" :range-key="'name'">
					<view class="uni-input">{{timeLists[index].name}}</view>
				</picker>
			</view>
		</view>
		<view class="top">
			<view class="search-modular">
				<image class="search-logo" src="../../static/images//icon01.png" @click="getList"></image>
				<input class="search-input" v-model="keyword" placeholder="User name search"
					@confirm="getList" />
			</view>
		</view>
		<view class="content" v-if="isShow">
		<!-- <view class="content"> -->
			<view v-if="spLists.length > 0">
				<view class="lists" v-for="item in spLists">
					<image class="photo" v-if="item.avatar" :src="item.avatar"></image>
					<image class="photo" v-else src="../../static/images/default.png"></image>
					<view class="lists-content">
						<view class="lists-msg">
							<view class="lists-name">{{item.nickname}}</view>
							<view class="lists-id">Invitation Code: {{item.invitation_code}}</view>
						</view>
						<view class="lists-des">
							<view class="lists-earn" v-if="item.gmv">Total sales $<text class="access">{{item.gmv}}</text></view>
							<view class="lists-earn" v-else>Total sales $<text class="access">0.00</text></view>
							<view class="lists-time">Newcomers:{{item.number}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="no-lists" v-else>
				<image class="no-lists-logo" src="../../static/images/icon07.png"></image>
				<view class="no-lists-text">No data available</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				spLists: [],
				// spLists: [{
				// 	gmv: 600,
				// 	number: 10,
				// 	invitation_code: "100",
				// 	nickname: "Miachel",
				// 	avatar: "../../static/images/photo.png",
				// }],
				
				keyword: "", //搜索值
				times: "", //时间范围值
				isRequest: true,
				current_page: 1,
				page: 1,
				limit: 20,
				total_limit: 0,
				total_page: 0,
				
				timeLists: [{
					id: 0,
					name: "All",
				},{
					id: 1,
					name: "Week",
				},{
					id: 2,
					name: "Month",
				},{
					id: 3,
					name: "Season",
				},{
					id: 4,
					name: "Year",
				}],
				index: 0, //对象索引
				pickerData:'' //选中对象data
			}
		},
		created() {
			this.getHttpLists("one")
		},
		onReachBottom() {
			//上拉加载，请求记得限制。
			if (this.isRequest) {
				if (this.page < this.total_page) {
					//console.log("选品页触底了,加载一下")
					this.page = this.page + 1
					this.getHttpLists()
				} else {
					console.log("页码已达到最大，无法再次请求")
				}
				this.$forceUpdate()
			} else {
				//console.log("正在请求，无法再次请求")
			}
		},
		methods: {
			back() {
				window.history.go(-1)
			},
			
			// picker修改事件
			bindPickerChange(e,storage) {
				if(e.target.value == this.index) return
				this.index = e.target.value
				this.pickerData = storage[this.index]	// 这里就是选中的对象
				//时间范围 = 索引值
				this.times = this.index
				this.getList()
			},
			
			getList() {
				// 搜索
				this.spLists = []
				this.current_page = 1
				this.page = 1
				this.total_limit = 0
				this.total_page = 0
				this.getHttpLists("one")
			},
			
			getHttpLists(type) {
				this.isRequest = false
				uni.showLoading({
					title: "loading...",
					mask: true
				});
				this.$myRequest({
					method: 'GET',
					url: 'user/staff',
					data: {
						username: this.keyword,
						times: this.times,
						page: this.page,
						limit: this.limit
					}
				})
				.then(res => {
					this.isShow = true
					this.isRequest = true
					uni.hideLoading();
					if (res.data.code == 200) {
						this.current_page = this.page
						
						if (type == "one") {
							this.spLists = res.data.data.lists
							this.total_limit = res.data.data.total_limit
							this.total_page = Math.ceil(this.total_limit / this.limit)
						} else {
							this.spLists = this.spLists.concat(res.data.data.lists)
						}
						
						this.$forceUpdate()
					} else {
						uni.showModal({
							title: "Tip",
							content: res.data.msg,
							confirmText: "confirm",
							showCancel: false,
						})
					}
				})
				.catch(err => {
					this.isShow = true
					this.isRequest = true
					uni.hideLoading();
					uni.showModal({
						title: "Tip",
						content: "Network error, please try again later",
						confirmText: "confirm",
						showCancel: false,
					})
				})
			},
		}
	}
</script>

<style scoped>
	.container {
		
	}
	
	.nav-top{
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
	}
	
	.info-item{
		font-size: 28rpx;
		font-family: Inter-Regular;
		font-weight: 400;
		
		position: absolute;
		right: 30rpx;
		top: 0;
		bottom: 0;
		vertical-align: middle;
		display: flex;
		align-items: center;
		z-index: 1000;
	}
	
	/deep/ .uni-navbar--border {
		border-bottom-color: white;
	}
	
	/* 搜索框 */
	.top{
		width: 690rpx;
		position: fixed;
		top: 90rpx;
		left: 0;
		right: 0;
		margin: 0 auto;
		z-index: 100;
		background: #ffffff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}
	.search-modular {
		margin: 20rpx auto 10rpx;
		position: relative;
	}
	
	.search-logo {
		width: 32rpx;
		height: 32rpx;
		position: absolute;
		left: 30rpx;
		top: 0;
		bottom: 0;
		margin: auto;
		vertical-align: middle;
	}
	
	.search-input {
		width: 690rpx;
		height: 88rpx;
		box-sizing: border-box;
		background: #F5F5F5;
		border-radius: 60rpx;
		padding: 0 80rpx;
	
		font-size: 28rpx;
		font-family: Inter-Regular;
		font-weight: 400;
		/* color: #999999; */
	}
	
	/deep/ ::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	
	.content{
		/* padding: 24rpx 0; */
		padding-top: 210rpx;
	}
	
	.lists{
		display: flex;
		align-items: center;
		padding: 30rpx;
		border-bottom: 2rpx solid #E6E6E6;
	}
	
	.photo{
		width: 104rpx;
		height: 104rpx;
		border-radius: 50%;
	}
	
	.lists-content{
		width: 554rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-left: 30rpx;
		/* align-items: center; */
	}
	
	.lists-msg{
		width: 554rpx;
	}
	
	.lists-name{
		width: 554rpx;
		word-wrap: break-word;
		font-size: 34rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #222222;
		
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	
	.lists-id{
		font-size: 26rpx;
		line-height: 34rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #999999;
		margin-top: 4rpx;
	}
	
	.lists-des{
		width: 554rpx;
		margin-top: 8rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		/* text-align: right; */
	}
	
	.lists-time{
		font-size: 24rpx;
		line-height: 28rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #999999;
		margin-top: 2rpx;
	}
	
	.lists-earn{
		font-size: 32rpx;
		line-height: 36rpx;
		font-family: Inter-Bold;
		font-weight: bold;
		color: #E84678;
		margin-top: 2rpx;
	}
	
	.access{
		font-size: 30rpx;
	}
	
	/* 没数据 */
	.no-lists{
		padding: 148rpx 0;
		text-align: center;
	}
	
	.no-lists-logo{
		width: 128rpx;
		height: 108rpx;
		display: flex;
		margin: 0 auto;
	}
	
	.no-lists-text{
		font-size: 28rpx;
		font-family: Inter-Medium;
		font-weight: 500;
		color: #222222;
		margin-top: 20rpx;
	}
</style>
