<template>
	<view class="header-box">
		<view class="header-wrapper">
			<view class="search-box">
				<u-icon name="search"></u-icon>
			</view>
			<view class="slogan-box">
				<text>大熊智能家居</text>
			</view>
			<view class="select-box">
				<text style="font-size: 20rpx;margin-right: 10rpx;">{{selectedFloor.label?selectedFloor.label:'请选择楼层'}}</text>
				<u-icon name="arrow-down-fill" size="30" color="#c8c9cc" @click="selectFloorShow=true"></u-icon>
				<u-select v-model="selectFloorShow" :list="floorArray" value-name="id" label-name="name" @confirm="selectConfirm"></u-select>
			</view>
		</view>
		<view class="list-wrapper">
			<!-- 房间选择标签 -->
			<u-tabs ref="tabs" :list="realRoomArray" active-color="#303030" inactive-color="#c8c9cc" font-size="30" :current="roomIndex"
			 bar-width="60" :show-bar="false" @change="roomChange"></u-tabs>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			floorArray: {
				type: Array,
				require: true
			},
			roomArray: {
				type: Array,
				require: true
			}
		},
		watch: {
			/**
			 * 监视变化
			 * @param {Object} newValue
			 * @param {Object} oldValue
			 */
			roomArray(newValue, oldValue) {
				this.realRoomArray = newValue
				if (this.realRoomArray.length != 0) {
					this.$emit('roomSelect', this.realRoomArray[0].id)
				}

			}
		},
		data() {
			return {
				realRoomArray: [],
				selectedFloor: {},
				selectFloorShow: false,
				roomIndex: 0
			}
		},
		methods: {
			/** 房间选择确认
			 * @param {Object} e 数组，被选择的.value label
			 */
			selectConfirm(e) {
				this.selectedFloor = e[0]
				this.$emit('floorSelect', e[0].value)
			},
			roomChange(e) {
				this.roomIndex = e
				this.$emit('roomSelect', this.realRoomArray[e].id)
			}
		}
	}
</script>

<style lang="scss">
	.header-box {
		padding-top: 35px;
		background-color: #FFFFFF;

		.header-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 30rpx;
			padding-right: 30rpx;

			.search-box {
				display: flex;
				align-items: center;
				width: 20%;
			}


			.slogan-box {
				display: flex;
				justify-content: center;
				font-size: 35rpx;
				font-weight: bold;
				color: #303030;
				width: 60%;
			}

			.select-box {
				display: flex;
				align-items: center;
				width: 20%;
				justify-content: flex-end;
			}
		}

		.list-wrapper {
			margin-top: 20rpx;

			.icon-list-wrapper {
				margin-top: 10rpx;
			}
		}

	}
</style>
