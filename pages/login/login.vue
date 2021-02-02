<template>
	<view class="main-container">
		<u-toast ref="uToast" />
		<view class="login-box">
			<view class="logo-box">
				<text>MyHome</text>
				<text class="subTitle">最具极客范的开源智能家居系统</text>
			</view>
			<view class="login-info-box">
				<u-field v-model="loginObj.phone" label="手机号" placeholder="请填写手机号" maxlength="11" @blur="phoneInputBlur">
					<u-icon slot="icon" name="phone"></u-icon>
				</u-field>
				<u-field v-model="loginObj.password" label="密码" placeholder="请填写密码" type="password">
					<u-icon slot="icon" name="lock"></u-icon>
				</u-field>
				<view class="login-button-box">
					<u-button type="success" class="btn" @click="doLogin" :disabled="loginObj.phone.length !=11||loginObj.password.length<6||loginObj.password.length>11">登录</u-button>
				</view>
				<view class="regist-box">
					<text>忘记密码?</text>
					<text @click="gotoRegist">立即注册</text>
				</view>
			</view>

			<view class="another-login-box">
				<view class="weixin-login-box" @click="gotoWeixinLogin">
					<image src="../../static/login/weixin.png" mode="aspectFill" style="height: 80rpx;width: 80rpx;"></image>
					<text style="color: #C8C9CC;">微信登录</text>
				</view>
			</view>
		</view>

		<company-info></company-info>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	import CompanyInfo from '../../components/CompanyInfo.vue'
	export default {
		components: {
			CompanyInfo
		},
		data() {
			return {
				loginObj: {
					phone: '',
					password: ''
				}
			}
		},
		methods: {
			...mapMutations(['saveLoginData', 'saveUserInfo', 'saveSelectedFamily', 'saveSelectedFloorId', 'setIsHolder']),
			phoneInputBlur() {
				if (!this.$u.test.mobile(this.loginObj.phone)) {
					this.$refs.uToast.show({
						title: '手机号格式错误',
						type: 'error',
						duration: 1500
					})
				}
			},
			/**
			 * 登录
			 */
			doLogin() {
				if (this.$u.test.mobile(this.loginObj.phone) && this.$u.trim(this.loginObj.password) != '') {
					this.$u.api.loginByPhonePasswordApi(this.loginObj).then(res => {
						if (res.status) {
							this.saveLoginData(res.data)
							this.$u.api.getUserInfoApi().then(res2 => {
								if (res2.status) {
									this.saveUserInfo(res2.data.user)
									this.saveSelectedFamily(res2.data.family)
									this.saveSelectedFloorId(res2.data.selectedFloorId)
									this.setIsHolder(res2.data.isHolder)
									//
									uni.reLaunch({
										url: '../index/index'
									})
								}
							})
						} else {
							this.$refs.uToast.show({
								title: res.message,
								type: 'error',
								duration: 1500
							})
						}

					})
				} else {
					this.$refs.uToast.show({
						title: '请正确填写信息',
						type: 'error',
						duration: 1500
					})
				}
			},
			/**
			 * 显示注册页面
			 */
			gotoRegist() {
				uni.navigateTo({
					url: '../regist/regist'
				})
			},
			/**
			 * 微信登录
			 */
			gotoWeixinLogin() {
				this.$refs.uToast.show({
					title: '微信登录暂未开放',
					type: 'warning'
				})
			}
		}
	}
</script>

<style lang="scss">
	.login-box {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 650rpx;
		background-color: #FFFFFF;
		padding: 40rpx;
		border-radius: 30rpx;


		.logo-box {
			padding: 30rpx;
			display: flex;
			justify-content: center;
			height: 230rpx;
			align-items: center;
			flex-direction: column;

			text {
				font-weight: bold;
				font-size: 85rpx;
				color: #303133;
			}

			.subTitle {
				font-size: 25rpx;
				margin-top: 20rpx;
				color: #C8C9CC;
			}
		}

		.login-info-box {
			margin-top: 50px;

			.login-button-box {
				margin-top: 30px;
				display: flex;
				justify-content: center;

				.btn {
					width: 600rpx;
				}
			}

			.regist-box {
				display: flex;
				justify-content: space-between;
				margin-top: 20rpx;
				font-size: 25rpx;
				color: #C8C9CC;
			}
		}

		.another-login-box {
			margin-top: 60px;
			padding: 20rpx;
			display: flex;
			justify-content: center;

			.weixin-login-box {
				display: flex;
				flex-direction: column;
				align-items: center;

				text {
					margin-top: 10rpx;
					font-size: 20rpx;
					color: #303030;

				}
			}

		}

	}
</style>
