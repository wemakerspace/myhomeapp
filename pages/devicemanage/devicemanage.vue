<template>
	<view class="main-container">
		<normal-header pageName="设备管理"></normal-header>
		<view class="add-device-body">
			<view class="header-box">
				<view class="">
					<text>选择房间后操作</text>
				</view>
				<view class="action-box">
					<view class="" style="display: flex;align-items: center;margin-right: 30rpx;">
						<text style="font-size: 22rpx;margin-right: 10rpx;">{{selectedRoom.label?selectedRoom.label:'选择房间'}}</text>
						<u-icon name="arrow-down-fill" @click="roomSelectShow=true" size="30"></u-icon>
					</view>
					<view class="">
						<u-icon name="plus" @click="showAddMask" size="40" :color="selectedRoom.label?'#303030':'#c8c9cc'"></u-icon>
					</view>
				</view>
			</view>
			<view class="item-box-wrapper">
				<!-- 无数据提示 -->
				<u-empty src="../../static/device-64.png" text="无设备" v-show="deviceList.length==0" style="margin-top: 40rpx;"></u-empty>

				<view class="item-box" v-for="device in deviceList" :key="device.id">
					<image src="../../static/device/lamp-active.png" mode="aspectFill" style="width: 100rpx;height: 100rpx;"></image>
					<view class="">
						<view class="">

						</view>
						<view class="">

						</view>
					</view>
				</view>
			</view>
		</view>
		<u-mask :show="addMaskShow">
			<view class="add-box">
				<view style="padding: 20rpx;display: flex;justify-content: flex-end;">
					<u-icon name="close" @click="addMaskShow=false"></u-icon>
				</view>
				<u-field v-model="wifiParam.ssid" label="wifi名" placeholder="例如: 大熊家"></u-field>
				<u-field v-model="wifiParam.password" label="wifi密码" placeholder="例如: 123456"></u-field>
				<view style="padding-top: 40rpx;padding-bottom: 40rpx;">
					<!-- 新增用户时先搜索然后再添加-->
					<u-button type="success" @click="doAddDevice">设备配网</u-button>
				</view>
			</view>
		</u-mask>
		<u-select v-model="roomSelectShow" mode="single-column" :list="roomList" value-name="id" label-name="name" @confirm="selectConfirm"></u-select>
	</view>
</template>

<script>
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
				wifiParam: {}

			}
		},
		computed: {
			...mapState(['selectedFamily'])
		},
		onShow() {
			this.loadRoomList()
			this.getWifiInfo()
		},
		methods: {
			getWifiInfo() {
				uni.getNetworkType({
					success: function(res) {
						console.log(res.networkType);
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
						this.deviceList = res.data
					}
				})
			},
			doAddDevice() {
				let DatagramPacket = plus.android.importClass('java.net.DatagramPacket');
				let DatagramSocket = plus.android.importClass('java.net.DatagramSocket');
				let InetAddress = plus.android.importClass('java.net.InetAddress');
				let JString = plus.android.importClass('java.lang.String');
				if (DatagramSocket == undefined) {
					return;
				}
				let socket = new DatagramSocket(10000);
				// 设置接收超时时长  
				socket.setSoTimeout(6000);

				// 创建广播地址  
				let broadcastAddress = InetAddress.getByName('255.255.255.255');

				// 发送广播数据  
				let sendData = '';
				let sendPacket = new DatagramPacket(sendData, sendData.length, broadcastAddress, 1000);
				socket.send(sendPacket);
				// 接收数据  
				var isReceive = true;
				while (isReceive) {
					try {
						// 设置接收缓存，需要用0填充，否则为 null 无法接收。   
						var buffer = new Array(1024).fill(0);
						var packet = new DatagramPacket(buffer, buffer.length);

						socket.receive(packet);

						var data = new JString(packet.getData()).trim();
						if (data.length == 0) {
							// 接收超时，结束接收  
							isReceive = false;
						} else {
							console.log('===========收到数据============', data);
						}
					} catch (ex) {
						isReceive = false;
					}
				}
			},
			showAddMask() {
				if (Object.keys(this.selectedRoom).length != 0) {
					this.addMaskShow = true
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
