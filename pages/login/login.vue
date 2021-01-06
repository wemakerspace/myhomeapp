<template>
	<view class="main-container">
		<view class="login-box">
			<view class="logo-box">
				<image src="../../static/logo.png" mode="aspectFill" style="width: 200rpx;height: 200rpx;"></image>
			</view>
			<view class="login-info-box">
				<u-field v-model="mobile" label="手机号" placeholder="请填写手机号">
					<u-icon slot="icon" name="phone"></u-icon>
				</u-field>
				<u-field v-model="password" label="密码" placeholder="请填写密码" type="password">
					<u-icon slot="icon" name="lock"></u-icon>
				</u-field>
				<view class="login-button-box">
					<u-button type="success" class="btn" @click="doLogin">登录</u-button>
				</view>
			</view>

			<view class="another-login-box">
				<view class="weixin-login-box">
					<image src="../../static/login/weixin.png" mode="aspectFill" style="height: 80rpx;width: 80rpx;"></image>
					<text>微信登录</text>
				</view>
			</view>
		</view>

		<company-info></company-info>
	</view>
</template>

<script>
	import CompanyInfo from '../../components/CompanyInfo.vue'
	export default {
		components: {
			CompanyInfo
		},
		data() {
			return {
				mobile: '',
				password: ''
			}
		},
		methods: {
			/**
			 * 登录
			 */
			doLogin() {
				uni.reLaunch({
					url: '../index/index'
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
		}

		.login-info-box {
			margin-top: 60px;

			.login-button-box {
				margin-top: 30px;
				display: flex;
				justify-content: center;

				.btn {
					width: 600rpx;
				}
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
