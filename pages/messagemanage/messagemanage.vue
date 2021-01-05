<template>
	<view class="main-container">
		<normal-header pageName="消息"></normal-header>
		<view class="message-item" @click="gotoMessageDetail(1)">
			申请加入
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

			}
		},
		methods: {
			gotoMessageDetail(messageId) {
				console.log(messageId)
				uni.navigateTo({
					url: './messagedetail'
				})

			}
		}
	}
</script>

<style lang="scss">
	.message-item {
		margin-top: 30rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		background-color: #FFFFFF;
		height: 180rpx;
	}
</style>
