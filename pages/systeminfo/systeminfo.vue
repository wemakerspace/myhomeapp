<template>
	<view class="main-container">
		<view class="header-box-wrapper">
			<view class="header-box">
				<u-image width="250rpx" height="250rpx" :src="logoUrl"></u-image>
				<text>v1.0.0</text>
			</view>
		</view>
		<u-cell-group>
			<u-cell-item icon="question-circle" title="版本信息" @click="gotoVersionInfo"></u-cell-item>
			<u-cell-item icon="order" title="用户协议" @click="gotoUserProtocol"></u-cell-item>
		</u-cell-group>
		<!-- 版权信息 -->
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
				logoUrl: '../../static/logo.png'

			}
		},
		methods: {
			gotoVersionInfo() {
				uni.navigateTo({
					url: '../systeminfo/versioninfo'
				})
			},
			gotoUserProtocol() {
				uni.navigateTo({
					url: '../systeminfo/userprotocol'
				})
			}
		}
	}
</script>

<style lang="scss">
	.header-box-wrapper {
		height: 300px;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;

		.header-box {
			display: flex;
			flex-direction: column;
			align-items: center;

			text {
				margin-top: 30rpx;
			}
		}
	}

	.company-info-box {
		position: fixed;
		width: 100%;
		bottom: 20px;
		display: flex;
		justify-content: center;
		font: 20rpx;
		color: #C8C9CC;
	}
</style>
