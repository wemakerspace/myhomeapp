<template>
	<view class="main-container">
		<common-header :floorArray="floorList" :roomArray="roomList" @floorSelect="floorSelect" @roomSelect="roomSelect"></common-header>
		<view class="main-box">
			<view class="device-line">
				<view class="device-card">
					<view class="collect-box">
						<u-icon :name="singleDevice.favorite?'star-fill':'star'" size="40" :color="singleDevice.favorite?'#F29100':'#c8c9cc'"
						 @click="singleDevice.favorite= (!singleDevice.favorite)"></u-icon>
					</view>
					<view class="icon-name-box">
						<u-image width="100rpx" height="100rpx" :src="singleDevice.open?singleDevice.iconActivePath:singleDevice.iconPath"></u-image>
						<text>{{singleDevice.name}}</text>
						<text class="openText">{{singleDevice.open?'打开':'关闭'}}</text>
					</view>
					<view class="action-box">
						<u-switch v-model="singleDevice.open" active-color="#42B983" size="50" :loading="false"></u-switch>
					</view>
				</view>

				<view class="device-card">
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
				</view>

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
				floorList: [],
				roomList: [],
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
				},
				deviceList: [{
					id: '112233',
					name: '顶部吊灯',
					favorite: true,
					status: true
				}]
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
				console.warn('房间ID', e)

			}

		}
	}
</script>

<style lang="scss">
	.main-box {
		margin-top: 40rpx;

	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		height: 100%;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 100%;
		height: 1000rpx;
		line-height: 100%;
		text-align: center;
		font-size: 36rpx;
	}

	.device-line {
		display: flex;
		justify-content: space-between;
		margin-left: 20rpx;
		margin-right: 20rpx;

		.device-card {
			width: 340rpx;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			padding: 20rpx;

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
