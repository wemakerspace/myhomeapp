<template>
	<view class="main-container">
		<normal-header pageName="消息"></normal-header>
		<view class="message-item">
			123

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
	.message-item {
		margin-top: 30rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		background-color: #FFFFFF;
	}
</style>
