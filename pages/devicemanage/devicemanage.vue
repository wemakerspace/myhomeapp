<template>
	<view class="main-container">
		<normal-header pageName="设备管理"></normal-header>
		<view class="add-device-body">
			<view class="header-box">
				<view class="">
					<text>选择房间后操作</text>
				</view>
				<view class="action-box">
					<view class="">
						<u-icon name="plus" @click="addMaskShow=true" size="40" color="#c8c9cc"></u-icon>
					</view>
				</view>
			</view>
			<view class="item-box-wrapper">
				<!-- 无数据提示 -->
				<u-empty src="../../static/device-64.png" text="无设备"></u-empty>
			</view>
		</view>
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

			};
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
			padding-top: 40rpx;
			padding-bottom: 40rpx;
		}
	}
</style>
