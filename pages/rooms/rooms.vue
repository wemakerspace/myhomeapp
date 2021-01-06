<template>
	<view class="main-container">
		<common-header :floorArray="floorList" :roomArray="roomList" @floorSelect="floorSelect" @roomSelect="roomSelect"></common-header>
		<view class="main-box">
			<view class="device-line">
				<view class="device-card" v-for="device in deviceList" :key="device.id">
					<view class="collect-box">
						<u-icon :name="device.favorite?'star-fill':'star'" size="40" :color="device.favorite?'#F29100':'#c8c9cc'" @click="device.favorite= (!device.favorite)"></u-icon>
					</view>
					<view class="icon-name-box">
						<u-image width="100rpx" height="100rpx" :src="device.open?'../../static/device/'+device.iconActivePath:'../../static/device/'+device.iconPath"></u-image>
						<text>{{device.name}}</text>
						<text class="openText" v-if="device.type==1">{{device.open?'打开':'关闭'}}</text>
						<text class="openText" v-if="device.type==2">{{rateDevice.rate}}%</text>
					</view>
					<!-- 开关型设备 -->
					<view class="action-box" v-if="device.type==1">
						<u-switch v-model="device.open" active-color="#42B983" size="50" :loading="false"></u-switch>
					</view>
					<!-- 比例型设备 -->
					<view class="action-rate-box" v-if="device.type==2">
						<u-slider v-model="rateDevice.rate" step="10" height="50" activeColor="#42B983" block-width="55"></u-slider>
					</view>
				</view>
				<view class="no-device-wrapper" v-if="deviceList.length==0">
					<u-empty src="../../static/device-64.png" text="无设备">
						<u-button type="success" slot="bottom" style="margin-top: 50rpx;" @click="gotoDeviceManage">添加设备</u-button>
					</u-empty>
				</view>


				<!-- <view class="device-card">
					<view class="collect-box">
						<u-icon :name="rateDevice.favorite?'star-fill':'star'" size="40" :color="rateDevice.favorite?'#F29100':'#c8c9cc'"
						 @click="rateDevice.favorite= (!rateDevice.favorite)"></u-icon>
					</view>
					<view class="icon-name-box">
						<u-image width="100rpx" height="100rpx" :src="rateDevice.rate>0?rateDevice.iconActivePath:rateDevice.iconPath"></u-image>
						<text>{{rateDevice.name}}</text>
						<text class="openText">{{rateDevice.rate}}%</text>
					</view>
					<view class="action-box" v-if="false">
						<u-slider v-model="rateDevice.rate"></u-slider>
					</view>
					<view class="action-rate-box">
						<u-slider v-model="rateDevice.rate" step="10" height="50" activeColor="#42B983" block-width="55"></u-slider>
					</view>
				</view> -->

			</view>
		</view>
	</view>
</template>

<script>
	import CommonHeader from "../../components/CommonHeader.vue"
	export default {
		components: {
			CommonHeader
		},
		data() {
			return {
				//楼层集合
				floorList: [],
				//房间集合
				roomList: [],
				//设备集合
				deviceList: [],
				//开关型设置
				singleDevice: {
					id: '112233',
					name: '顶部吊灯',
					favorite: true,
					open: true,
					iconPath: '../../static/device/lamp.png',
					iconActivePath: '../../static/device/lamp-active.png'
				},
				//比例型设置
				rateDevice: {
					id: '112233',
					name: '百叶窗',
					favorite: true,
					open: true,
					rate: 50,
					iconPath: '../../static/device/window.png',
					iconActivePath: '../../static/device/window-active.png'
				}

			}
		},
		onShow() {
			this.loadFloorList()
		},
		methods: {
			/**
			 * 加载所有楼层信息
			 */
			loadFloorList() {
				this.$u.api.floorListApi().then(res => {
					if (res.status) {
						this.floorList = res.data
					}
				})
			},
			loadRoomListByFloorId(fId) {
				this.$u.api.roomListByFloorIdApi({
					floorId: fId
				}).then(res => {
					if (res.status) {
						this.roomList = res.data
					}
				})
			},
			loadDeviceByRoomSelectd(roomId) {
				this.$u.api.deviceListByRoomIdApi({
					roomId: roomId,
					favorite: false
				}).then(res => {
					if (res.status) {
						this.deviceList = res.data
					}

				})
			},
			/**
			 * 组件中楼层选择,选择后查询所有房间
			 * @param {Object} e 楼层ID
			 */
			floorSelect(e) {
				this.loadRoomListByFloorId(e)
			},
			/**
			 * 房间选择
			 * @param {Object} e 房间ID
			 */
			roomSelect(e) {
				this.loadDeviceByRoomSelectd(e)
			},
			gotoDeviceManage() {
				uni.navigateTo({
					url: '../devicemanage/devicemanage'
				})
			}

		}
	}
</script>

<style lang="scss">
	.main-box {
		// margin-top: 40rpx;

	}

	.device-line {
		display: flex;
		justify-content: space-between;
		margin-left: 20rpx;
		margin-right: 20rpx;
		flex-wrap: wrap;

		.no-device-wrapper {
			display: flex;
			justify-content: center;
			width: 100%;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.device-card {
			width: 340rpx;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			padding: 20rpx;
			margin-top: 30rpx;

			.collect-box {}

			.icon-name-box {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 20rpx;

				text {
					margin-top: 20rpx;
					font-size: 25rpx;
					font-weight: bold;
				}

				.openText {
					font-size: 24rpx;
					color: #C8C9CC;
				}
			}

			.action-box {
				display: flex;
				justify-content: center;
				margin-top: 30rpx;
				padding: 20rpx;
			}

			.action-rate-box {
				margin-top: 30rpx;
				padding: 20rpx;
			}
		}
	}
</style>
