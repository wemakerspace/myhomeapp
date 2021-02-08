<template>
	<view class="main-container">
		<view class="header-box" :style="{'padding-top':  750 * systemInfo.statusBarHeight / 375 + 'rpx'}">
			<view class="version-des-box">
				<text>版本功能更新内容</text>
			</view>
			<view class="version-item-box">
				<u-parse :html="content"></u-parse>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				content:'<section class="_135editor"data-role="list"><ol class="list-paddingleft-2"style="list-style-type: decimal;"><li><p>用户注册登录</p></li><li><p>家庭增加与修改</p></li><li><p>楼层增加与修改</p></li><li><p>房间增加与修改</p></li><li><p>个人信息修改</p></li><li><p>设备smartconfig配网与新增</p></li><li><p>APP更新功能</p></li><li><p>UI基本修改</p></li></ol></section>'

			}
		},
		computed: {
			...mapState(['systemInfo'])
		}
	}
</script>

<style lang="scss">
	.header-box {
		padding-right: 30rpx;
		padding-left: 30rpx;

		.version-des-box {
			font-size: 30rpx;
			color: #000000;
			font-weight: bold;
		}

		.version-item-box {
			margin-top: 30rpx;
		}
	}
</style>
