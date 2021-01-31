<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		onLaunch: function() {
			//获取手机基本信息，用作页面数据计算
			this.setSystemInfo(uni.getSystemInfoSync())
			//锁定屏幕不旋转
			plus.screen.lockOrientation('portrait-primary')
			//1. 将本地存储信息同步到vuex
			this.initData()

			console.log('1====> App Launch,check update')
			//应用启动时，判断是否登录，未登录的话就显示登录页面
			if (!this.login) {
				uni.reLaunch({
					url: 'pages/login/login'
				})
			} else {
				this.goEasy.connect({
					onSuccess: function() { //连接成功
						console.log("GoEasy connect successfully.") //连接成功
					},
					onFailed: function(error) { //连接失败
						console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
					},
					onProgress: function(attempts) { //连接或自动重连中
						console.log("GoEasy is connecting", attempts);
					}
				})
			}
			// uni.openBluetoothAdapter({
			// 	success() {
			// 		console.log('1.开启蓝牙适配器成功')
			// 		uni.startBeaconDiscovery({
			// 			ignoreBluetoothAvailable: true,
			// 			success(be) {
			// 				console.log('2.开启beancon发现', be)
			// 				uni.onBeaconUpdate(function(rr) {
			// 					console.log('3---', rr.beacons[0])

			// 				})
			// 			}
			// 		})
			// 	}
			// })

		},
		onShow: function() {
			//上报APP在线
			this.$u.api.userAppOnlineApi({
				familyId: this.selectedFamily.id,
				userId: this.userInfo.id,
				status: true
			}).then(res => {
				if (res.status) {
					console.log('用户在线上报成功')
				}
			})
			//开启websocket监听楼层房间变化

			console.log('2=====>App Show')
			//打开websocket连接
			// this.initWebSocket()


		},
		onHide: function() {
			//上报APP离线
			this.$u.api.userAppOnlineApi({
				familyId: this.selectedFamily.id,
				userId: this.userInfo.id,
				status: false
			}).then(res => {
				if (res.status) {
					console.log('用户离线上报成功')
				}
			})
			console.log('3=====>App Hide')
			//关闭websocket连接
			console.log('影藏', this.goEasy)
			// this.goEasy.disconnect({
			// 	onSuccess: function() {
			// 		console.log("GoEasy disconnect successfully.")
			// 	},
			// 	onFailed: function(error) {
			// 		console.log("Failed to disconnect GoEasy, code:" + error.code + ",error:" + error.content);
			// 	}
			// })
		},
		methods: {
			...mapMutations(['initData', 'setSystemInfo'])
		},
		computed: {
			...mapState(['login', 'selectedFamily', 'token', 'userInfo'])
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";

	page {
		height: 100%;
		background-color: $u-bg-color;
	}

	.main-container {
		height: 100%;
	}
</style>
