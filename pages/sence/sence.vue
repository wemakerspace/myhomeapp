<template>
	<view class="main-container">
		<normal-header pageName="场景"></normal-header>
		<view class="rooms-body">
			<view class="">

			</view>
		</view>
		<view class="can-not-use-box">
			<view class="header-box">
				<text>场景属于高级功能,暂时不能使用</text>
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

			}
		}
	}
</script>

<style lang="scss">
	.can-not-use-box {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 700rpx;
		text-align: center;
	}
</style>
