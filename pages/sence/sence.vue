<template>
	<view class="main-container">
		<normal-header pageName="场景"></normal-header>
		<view class="rooms-body">
			<view class="">

			</view>
		</view>
		<view class="can-not-use-box">
			<view class="header-box">
				<text>场景功能正在开发中</text>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import NormalHeader from '../../components/NormalHeader.vue'
	export default {
		components: {
			NormalHeader
		},
		computed: {
			...mapState(['systemInfo'])
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

		.header-box {
			font-size: 40rpx;
			font-weight: bold;
			color: #C8C9CC;
		}
	}
</style>
