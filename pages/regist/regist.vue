<template>
	<view class="main-container">
		<u-toast ref="uToast" />
		<normal-header pageName="注册"></normal-header>

		<view class="body-box">
			<u-field v-model="registObj.phone" label="手机号" placeholder="请填写手机号"></u-field>
			<u-field v-model="registObj.password" label="密码" placeholder="请填写6-11位密码" :password="true"></u-field>
			<u-field v-model="rePassword" label="重复密码" placeholder="请重复填写密码" :password="true"></u-field>
			<view style="margin-top: 30rpx;margin-bottom: 80rpx;">
				<u-button type="success" :disabled="rePassword==''||rePassword.length<6||rePassword.length>11 || rePassword!=registObj.password||registObj.phone.length!=11"
				 @click="doRegist">提交</u-button>
			</view>
		</view>
		<company-info></company-info>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	import NormalHeader from '../../components/NormalHeader.vue'
	import CompanyInfo from '../../components/CompanyInfo.vue'
	export default {
		components: {
			NormalHeader,
			CompanyInfo
		},
		data() {
			return {
				registObj: {},
				rePassword: ''

			}
		},
		methods: {
			...mapMutations(['saveLoginData', 'saveUserInfo']),
			doRegist() {
				if (this.$u.test.mobile(this.registObj.phone)) {
					this.$u.api.registByPhonePasswordApi(this.registObj).then(res => {
						if (res.status) {
							this.saveLoginData(res.data)
							this.$u.api.getUserInfoApi().then(res2 => {
								if (res2.status) {
									this.saveUserInfo(res2.data.user)
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
						title: '手机号格式错误',
						type: 'error',
						duration: 1500
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.body-box {
		background-color: #FFFFFF;
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 30rpx;
		padding: 20rpx;
		border-radius: 20rpx;
	}
</style>
