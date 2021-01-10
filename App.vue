<script>
	export default {
		onLaunch: function() {
			console.log('1====> App Launch,check update')
			//应用启动时，判断是否登录，未登录的话就显示登录页面
			let loginStatus = false
			if (!loginStatus) {
				uni.reLaunch({
					url: 'pages/login/login'
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
			console.log('2=====>App Show')

		},
		onHide: function() {
			console.log('3=====>App Hide')
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";

	page {
		height: 100%;
	}

	.main-container {
		height: 100%;
		background-color: $u-bg-color;
	}
</style>
