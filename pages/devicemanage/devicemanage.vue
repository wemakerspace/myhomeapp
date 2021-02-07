<template>
	<view class="main-container">
		<u-toast ref="uToast" />
		<normal-header pageName="设备管理"></normal-header>
		<view class="add-device-body">
			<view class="header-box">
				<view class="">
					<text>选择房间后操作</text>
				</view>
				<view class="action-box">
					<view class="" style="display: flex;align-items: center;margin-right: 30rpx;" @click="roomSelectShow=true">
						<text style="font-size: 22rpx;margin-right: 10rpx;">{{selectedRoom.label?selectedRoom.label:'选择房间'}}</text>
						<u-icon name="arrow-down-fill" size="30"></u-icon>
					</view>
					<view class="">
						<u-icon name="plus" @click="showAddMask" size="40" :color="selectedRoom.label?'#303030':'#c8c9cc'"></u-icon>
					</view>
				</view>
			</view>
			<view class="item-box-wrapper">
				<!-- 无数据提示 -->
				<u-empty src="../../static/device-64.png" text="无设备" v-show="deviceList.length==0"></u-empty>

				<!-- <view class="item-box" v-for="device in deviceList" :key="device.id">
					<image src="../../static/device/lamp-active.png" mode="aspectFill" style="width: 100rpx;height: 100rpx;"></image>
					<view class="">
						<view class="">

						</view>
						<view class="">

						</view>
					</view>
				</view> -->
			</view>
		</view>
		<u-mask :show="addMaskShow">
			<view class="add-box">
				<view style="padding: 20rpx;display: flex;justify-content: flex-end;">
					<u-icon name="close" @click="addMaskShow=false"></u-icon>
				</view>
				<u-field v-model="deviceId" label="设备ID" placeholder="请填写设备ID">
					<u-icon slot="right" name="scan" color="#c8c9cc" size="40" @click="openScan"></u-icon>
				</u-field>
				<u-field v-model="smartConfigParams.ssid" label="wifi名" placeholder="例如: 大熊家" :disabled="true"></u-field>
				<u-field v-model="smartConfigParams.bssid" label="bssid" placeholder="bssid" :disabled="true"></u-field>
				<u-field v-model="smartConfigParams.password" label="wifi密码" placeholder="例如: 123456"></u-field>
				<view style="padding-top: 40rpx;padding-bottom: 40rpx;">
					<!-- 新增用户时先搜索然后再添加-->
					<u-button type="success" @click="doAddDevice" :disabled="deviceId==''||smartConfigParams.password==''">立即添加</u-button>
				</view>
			</view>
		</u-mask>
		<u-select v-model="roomSelectShow" mode="single-column" :list="roomList" value-name="id" label-name="name" @confirm="selectConfirm"></u-select>
	</view>
</template>

<script>
	const hkSC = uni.requireNativePlugin('HKing-SmartConfig');
	import {
		mapState
	} from 'vuex'
	import NormalHeader from '../../components/NormalHeader.vue'
	export default {
		components: {
			NormalHeader
		},
		data() {
			return {
				roomList: [],
				selectedRoom: {},
				roomSelectShow: false,
				deviceList: [],
				addMaskShow: false,
				smartConfigParams: {},
				deviceId: ''

			}
		},
		computed: {
			...mapState(['selectedFamily'])
		},
		onShow() {
			this.loadRoomList()
		},
		methods: {
			openScan() {
				uni.scanCode({
					onlyFromCamera: true,
					success: (res) => {
						if (res.scanType != 'QR_CODE') {
							this.$refs.uToast.show({
								title: '请扫描正确的二维码',
								type: 'error'
							})
						} else {
							try {
								console.log(res)
								let obj = JSON.parse(res.result)
								this.deviceId = obj.deviceId
							} catch (ex) {
								this.$refs.uToast.show({
									title: '请扫描正确的二维码',
									type: 'error'
								})
							}

						}
					}
				})
			},
			loadRoomList() {
				this.$u.api.listAllByFamilyIdApi({
					familyId: this.selectedFamily.id
				}).then(res => {
					if (res.status) {
						this.roomList = res.data
					}
				})

			},
			selectConfirm(e) {
				this.selectedRoom = e[0]
				if (e[0].value) {
					this.loadDeviceByRoomId(e[0].value)
				}
			},
			loadDeviceByRoomId(roomId) {
				this.$u.api.deviceListByRoomIdApi({
					familyId: this.selectedFamily.id,
					roomId: roomId
				}).then(res => {
					if (res.status) {
						console.log(res.data)
						this.deviceList = res.data
					}
				})
			},
			doAddDevice() {
				if (this.deviceId != '' && this.smartConfigParams.ssid != '' && this.smartConfigParams.bssid != '' && this.smartConfigParams
					.password != '') {
					this.smartConfigParams.deviceId = this.deviceId
					uni.showLoading({
						title: '配网中请稍后..'
					})
					hkSC.startSmaerConfig(this.smartConfigParams.ssid, this.smartConfigParams.password, result => {
						//请求添加
						this.$u.api.addDeviceApi({
							id: this.smartConfigParams.deviceId,
							roomId: this.selectedRoom.value,
							familyId: this.selectedFamily.id
						}).then(res => {
							if (res.status) {
								//设备添加成功
								this.smartConfigParams.deviceId = ''
								this.deviceId = ''
								uni.hideLoading()
								this.$refs.uToast.show({
									title: '设备添加成功',
									type: 'success'
								})
							}
						})
					})
				}

			},
			showAddMask() {
				if (Object.keys(this.selectedRoom).length != 0) {
					//判断是否使用WiFi
					uni.getNetworkType({
						success: (res) => {
							if (res.networkType !== 'wifi') {
								this.$refs.uToast.show({
									title: '请链接WiFi后重试',
									type: 'error'
								})
							} else {
								//获取ssid和蓝牙等需要定位
								hkSC.getWifiSsid(result => {
									this.smartConfigParams.ssid = result.apSsid
								})
								hkSC.getWifiBssid(result => {
									this.smartConfigParams.bssid = result.apBssid
								})
								this.addMaskShow = true
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.add-device-body {
		background-color: #FFFFFF;
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 30rpx;

		.header-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-top: 20rpx;
			padding-left: 20rpx;
			padding-right: 20rpx;

			.action-box {
				display: flex;
				align-items: center;
			}
		}

		.item-box-wrapper {
			padding-bottom: 40rpx;

			.item-box {
				border: dashed 1rpx #C8C9CC;
				margin-top: 20rpx;
				margin: 20rpx;
				border-radius: 20rpx;
			}
		}
	}

	.add-box {
		background-color: #FFFFFF;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 500rpx;
		padding: 20rpx;
	}
</style>
