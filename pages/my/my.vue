<template>
	<view class="main-container">
		<!-- 头部信息框 -->
		<view class="header-box">
			<view class="header-info-box">
				<view class="mail-box">
					<u-icon name="email-fill" size="40" @click="gotoMessage"></u-icon>
				</view>
				<view class="slogan-box">
					<text>大熊智能家居</text>
				</view>
				<view class="setting-box">
					<u-icon name="setting-fill" size="40" @click="showSettingPage"></u-icon>
				</view>
			</view>
			<view class="avatar-box-wrapper">
				<view class="avatar-box" @click="gotoInfoPage">
					<u-avatar :src="userInfo.avatar"></u-avatar>
					<text>{{userInfo.name}}</text>
					<u-tag text="户主" type="info" size="mini" v-if="isHolder" />
				</view>
			</view>
		</view>
		<!-- 体 -->
		<u-cell-group>
			<u-cell-item title="家庭管理" @click="gotoFamilyManage">
				<u-icon name="../../static/icons/familly.png" slot="icon" size="34" style="margin-right: 10rpx;"></u-icon>
			</u-cell-item>
			<u-cell-item title="楼层管理" @click="gotoFloorManage" v-show="isHolder">
				<u-icon name="../../static/icons/floor.png" slot="icon" size="34" style="margin-right: 10rpx;"></u-icon>
			</u-cell-item>
			<u-cell-item title="房间管理" @click="gotoRoomManage" v-show="isHolder">
				<u-icon name="../../static/icons/rooms.png" slot="icon" size="34" style="margin-right: 10rpx;"></u-icon>
			</u-cell-item>
			<u-cell-item title="设备管理" @click="gotoDeviceManage" v-show="isHolder">
				<u-icon name="../../static/icons/device.png" slot="icon" size="34" style="margin-right: 10rpx;"></u-icon>
			</u-cell-item>
			<u-cell-item title="辅助设备" @click="gotoAssistentDevice">
				<u-icon name="../../static/icons/assistent.png" slot="icon" size="34" style="margin-right: 10rpx;"></u-icon>
			</u-cell-item>
		</u-cell-group>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {}
		},
		computed: {
			...mapState(['isHolder', 'userInfo'])
		},
		methods: {
			gotoFloorManage() {
				uni.navigateTo({
					url: '../floormanage/floormanage'
				})
			},
			gotoMessage() {
				uni.navigateTo({
					url: '../messagemanage/messagemanage'
				})
			},
			/**
			 * 显示房间管理页面
			 */
			gotoRoomManage() {
				uni.navigateTo({
					url: '../roommanage/roommanage'
				})
			},
			gotoFamilyManage() {
				uni.navigateTo({
					url: '../familymanage/familymanage'
				})
			},
			/**
			 * 显示设备管理页面
			 */
			gotoDeviceManage() {
				uni.navigateTo({
					url: '../devicemanage/devicemanage'
				})
			},
			/**
			 * 显示辅助设备管理
			 */
			gotoAssistentDevice() {
				uni.navigateTo({
					url: '../assistentdevice/assistentdevice'
				})
			},

			/**
			 * 显示设置页
			 */
			showSettingPage() {
				uni.navigateTo({
					url: '../setting/setting'
				})
			},
			gotoInfoPage() {
				uni.navigateTo({
					url: '../myinfo/myinfo'
				})
			}
		}
	}
</script>

<style lang="scss">
	.header-box {
		background-color: #FFFFFF;
		padding-top: 35px;
		padding-bottom: 20px;
		padding-left: 30rpx;
		padding-right: 30rpx;
		align-items: center;

		.header-info-box {
			display: flex;
			justify-content: space-between;

			.mail-box {
				display: flex;
				align-items: center;
			}

			.slogan-box {
				display: flex;
				align-items: center;
				font-size: 35rpx;
				font-weight: bold;
				color: #303030;
			}

			.setting-box {
				display: flex;
				align-items: center;
			}
		}

		.avatar-box-wrapper {
			display: flex;
			justify-content: center;
			margin-top: 20px;

			.avatar-box {
				display: flex;
				flex-direction: column;
				align-items: center;

				text {
					margin-top: 20rpx;
					font-size: 30rpx;
					margin-bottom: 10rpx;
				}
			}
		}
	}
</style>
