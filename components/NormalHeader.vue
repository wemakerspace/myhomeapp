<template>
	<view class="normal-header-box">
		<view class="left-box">

		</view>
		<view class="center-box">
			<text>{{pageName}}</text>
		</view>
		<view class="right-box">

		</view>
	</view>
</template>

<script>
	export default {
		props: {
			pageName: {
				type: String,
				require: true
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss">
	.normal-header-box {
		background-color: #FFFFFF;
		padding-top: 35px;
		padding-bottom: 30rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		display: flex;
		justify-content: space-between;


		.center-box {
			display: flex;
			align-items: center;
			font-size: 35rpx;
			font-weight: bold;
			color: #303030;
		}



	}
</style>
