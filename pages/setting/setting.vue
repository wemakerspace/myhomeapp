<template>
	<view class="main-container">
		<normal-header pageName="更多设置"></normal-header>
		<!-- 体 -->
		<u-cell-group>
			<u-cell-item icon="server-man" title="帮助与反馈"></u-cell-item>
			<!-- 有新版本时提示升级 -->
			<u-cell-item icon="info-circle-fill" title="应用信息" @click="gotoSystemInfo"></u-cell-item>
		</u-cell-group>
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

			}
		},
		methods: {
			/**
			 * 跳转系统信息页
			 */
			gotoSystemInfo() {
				uni.navigateTo({
					url: '../systeminfo/systeminfo'
				})
			},
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

	}
</style>
