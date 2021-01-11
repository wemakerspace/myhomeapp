<template>
	<view class="main-container">
		<normal-header pageName="家庭管理"></normal-header>
		<view class="add-body">
			<view class="header-box">
				<view class="">
					<text>新增家庭或者添加成员</text>
				</view>
				<view class="action-box">
					<view style="display: flex;align-items: center;margin-right: 30rpx;">
						<u-icon name="../../static/addfamily-64.png" @click="addUserMaskShow=true" size="40" color="#303030"></u-icon>
					</view>
					<view class="">
						<u-icon name="plus" @click="addMaskShow=true" size="40" color="#303030"></u-icon>
					</view>
				</view>
			</view>
			<view class="item-box-wrapper">
				<!-- 无数据提示 -->
				<view class="family-cad-item" v-for="(family,index) in familyList" :key="index">
					<view class="card-header-box">
						<view>
							<text style="font-size: 30rpx;">{{family.name}}</text>
						</view>
						<view>
							<text style="font-size: 20rpx;">{{family.floorCount}}个房间 | {{family.roomCount}}个房间 | {{family.deviceCount}}个设备</text>
						</view>
					</view>
					<view class="icon-box">
						<view class="icon-wrapper" :style="{'background-color':selectedIndex==index?'#18b566':'#c8c9cc'}" @click="cardSelected(index)">
							<u-icon name="checkmark" size="30" color="#ffffff"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 添加用户mask -->
		<u-mask :show="addUserMaskShow">
			<view class="add-box">
				<view style="padding: 20rpx;display: flex;justify-content: flex-end;">
					<u-icon name="close" @click="closeAddUserMarsk"></u-icon>
				</view>
				<u-field v-model="userPhone" label="手机号" placeholder="例如: 13000000000"></u-field>
				<view style="padding-top: 40rpx;padding-bottom: 40rpx;">
					<u-button type="success" @click="doAddUser" v-if="userExist && userPhone!=''">添加用户</u-button>
					<u-button @click="doSearchUser" v-else :disabled="userPhone==''">搜索用户</u-button>
				</view>
			</view>
		</u-mask>
		<!-- 添加楼层mask -->
		<u-mask :show="addMaskShow">
			<view class="add-box">
				<view style="padding: 20rpx;display: flex;justify-content: flex-end;">
					<u-icon name="close" @click="closeMarsk"></u-icon>
				</view>
				<u-field v-model="familyName" label="家庭名" placeholder="例如: 大熊家"></u-field>
				<view style="padding-top: 40rpx;padding-bottom: 40rpx;">
					<u-button type="success" @click="saveData">保存</u-button>
				</view>
			</view>
		</u-mask>
		<!-- 修改楼层mask -->
		<u-mask :show="modifyMaskShow">
			<view class="add-box">
				<view style="padding: 20rpx;display: flex;justify-content: flex-end;">
					<u-icon name="close" @click="modifyMaskShow=false"></u-icon>
				</view>
				<u-field v-model="modifyData.name" label="楼层名" placeholder="例如: 一楼"></u-field>
				<view style="padding-top: 40rpx;padding-bottom: 40rpx;">
					<u-button type="success">保存</u-button>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import NormalHeader from '../../components/NormalHeader.vue'
	export default {
		components: {
			NormalHeader
		},
		data() {
			return {
				familyList: [],
				selectedIndex: 0,
				addMaskShow: false,
				modifyMaskShow: false,
				addUserMaskShow: false,
				familyName: '',
				modifyData: {},
				userPhone: '',
				userExist: false

			}
		},
		onShow() {
			this.loadFamilyList()
		},
		watch: {
			userPhone(nv, ov) {
				if (this.$u.test.mobile(nv)) {
					console.log('------')
				}
			}
		},
		methods: {
			/**
			 * 加载家庭信息
			 */
			loadFamilyList() {
				this.$u.api.familyListApi().then(res => {
					if (res.status) {
						this.familyList = res.data
					}
				})
			},
			cardSelected(index) {
				this.selectedIndex = index

			},
			closeMarsk() {
				this.familyName = ''
				this.addMaskShow = false
			},
			closeAddUserMarsk() {
				this.userPhone = ''
				this.addUserMaskShow = false
			},
			saveData() {
				this.$u.api.familyAddOrUpdateApi({
					name: this.familyName
				}).then(res => {
					if (res.status) {
						this.loadFamilyList()
						this.familyName = ''
						this.addMaskShow = false
					}
				})

			},
			/**
			 * 搜索用户，搜索到以后才能添加，否则提示用户不能添加
			 */
			doSearchUser() {
				//参数校验
				if (this.userPhone != '') {
					this.$u.api.searchUserByPhoneApi({
						phone: this.userPhone
					}).then(res => {
						console.log(res)
						if (res.status) {
							this.userExist = res.data
						}

					})
				}
			},
			/**
			 * 向用户发送添加请求
			 */
			doAddUser() {}

		}
	}
</script>

<style lang="scss">
	.add-body {
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
			padding-top: 40rpx;
			padding-bottom: 40rpx;

			.family-cad-item {
				display: flex;
				align-items: center;
				padding: 20rpx;
				margin: 20rpx;
				border: dashed 1rpx #C8C9CC;
				border-radius: 20rpx;

				.card-header-box {
					width: 80%;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
				}

				.icon-box {
					width: 20%;
					display: flex;
					justify-content: flex-end;

					.icon-wrapper {
						width: 40rpx;
						height: 40rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 50%;
					}
				}
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
