<template>
	<view class="main-container">
		<normal-header pageName="个人信息"></normal-header>
		<u-cell-group>
			<u-cell-item icon="account-fill" title="头像" @click="openSelectImg">
				<image :src="userInfo.avatar" mode="aspectFill" style="width: 80rpx;height: 80rpx;"></image>
			</u-cell-item>
			<u-cell-item icon="integral-fill" title="昵称" :value="userInfo.name" @click="doModifyMaskShow"></u-cell-item>
		</u-cell-group>
		<!-- 修改mask -->
		<u-mask :show="modifyMaskShow">
			<view class="add-box">
				<view style="padding: 20rpx;display: flex;justify-content: flex-end;">
					<u-icon name="close" @click="modifyMaskShow=false"></u-icon>
				</view>
				<u-field v-model="uname" label="昵称" placeholder="例如: 大熊"></u-field>
				<view style="padding-top: 40rpx;padding-bottom: 40rpx;">
					<u-button type="success" @click="updateData" :disabled="uname==''">保存</u-button>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import NormalHeader from '../../components/NormalHeader.vue'
	export default {
		components: {
			NormalHeader
		},
		data() {
			return {
				modifyMaskShow: false,
				uname: ''
			}
		},
		computed: {
			...mapState(['userInfo', 'token'])
		},
		methods: {
			...mapMutations(['saveUserInfo']),
			doModifyMaskShow() {
				this.uname = this.userInfo.name
				this.modifyMaskShow = true
			},
			updateData() {
				if (this.uname != this.userInfo.name) {
					this.$u.api.updateUserInfoApi({
						name: this.uname
					}).then(res => {
						if (res.status) {
							let middleObj = this.userInfo
							console.log('====-============>', middleObj)
							middleObj.name = this.uname
							this.saveUserInfo(middleObj)
							this.modifyMaskShow = false
							this.uname = ''
						}
					})

				} else {
					this.modifyMaskShow = false
					this.uname = ''
				}


			},
			openSelectImg() {
				var that = this
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: function(chooseImageRes) {
						const tempFilePaths = chooseImageRes.tempFilePaths
						uni.uploadFile({
							url: 'https://www.example.com/upload',
							header: {
								token: that.token
							},
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
							}
						})
					}
				})
			}
		},

	}
</script>

<style lang="scss">
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
