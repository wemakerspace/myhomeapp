<template>
	<view class="main-container">
		<normal-header pageName="辅助设备"></normal-header>
		<!-- 体 -->
		<u-cell-group>
			<u-cell-item title="手环管理" @click="gotoWatchManage">
				<u-icon name="../../static/icons/smartwatch.png" slot="icon" size="34" style="margin-right: 10rpx;"></u-icon>
			</u-cell-item>

			<u-cell-item title="信标管理" @click="gotoBeaconManage" v-if="isHolder">
				<u-icon name="../../static/icons/beacon.png" slot="icon" size="34" style="margin-right: 10rpx;"></u-icon>
			</u-cell-item>
		</u-cell-group>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import NormalHeader from '../../components/NormalHeader.vue'
	export default {
		components: {
			NormalHeader
		},
		data() {
			return {

			}
		},
		computed: {
			...mapState(['isHolder'])
		},
		methods: {
			gotoWatchManage() {
				uni.navigateTo({
					url: './watchmanage/watchmanage'
				})
			},
			gotoBeaconManage() {
				uni.navigateTo({
					url: './beaconmanage/beaconmanage'
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
