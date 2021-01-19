<template>
	<view class="header-box">
		<view class="header-wrapper">
			<view class="search-box">
				<u-icon name="search"></u-icon>
			</view>
			<view class="slogan-box">
				<text>MyHome</text>
			</view>
			<view class="select-box">
				<text style="font-size: 20rpx;margin-right: 10rpx;">{{selectedFloor.label?selectedFloor.label:'选择楼层'}}</text>
				<u-icon name="arrow-down-fill" size="30" color="#c8c9cc" @click="selectFloorSelectShow"></u-icon>
				<u-select v-model="selectFloorShow" :list="floorArray" value-name="id" label-name="name" @confirm="selectConfirm"
				 :default-value="[selectedFloorIndex]"></u-select>
			</view>
		</view>
		<view class="list-wrapper">
			<!-- 房间选择标签 -->
			<u-tabs ref="tabs" :list="realRoomArray" active-color="#303030" inactive-color="#c8c9cc" font-size="30" :current="selectedRoomIndex"
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
			},
			selectedFloorId: {
				type: String,
				require: true
			},
			selectedRoomId: {
				type: String,
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
				if (newValue.length != 0) {
					this.realRoomArray = newValue
					if (this.realRoomArray.length != 0) {
						this.$emit('roomSelect', this.realRoomArray[0].id)
					}
				}
			},
			/**
			 * 监听路程数据
			 * @param {Object} nv
			 * @param {Object} ov
			 */
			floorArray(nv, ov) {
				if (nv.length != 0) {
					for (var i = 0; i < nv.length; i++) {
						if (nv[i].id == this.selectedFloorId) {
							this.selectedFloorIndex = i
						}
					}
					let firstObj = nv[this.selectedFloorIndex]
					this.$emit('floorSelect', firstObj.id)
					this.selectedFloor.label = firstObj.name

				}
			},
			/**
			 * 监听楼层改变
			 */
			selectedFloorId(nv, ov) {
				if (nv && nv != '') {
					for (var i = 0; i < this.floorArray.length; i++) {
						if (this.floorArray[i].id == nv) {
							this.selectedFloorIndex = i
						}
					}
					let firstObj = this.floorArray[this.selectedFloorIndex]
					this.$emit('floorSelect', firstObj.id)
					this.selectedFloor.label = firstObj.name
				}
			},
			selectedRoomId(nv, ov) {
				if (nv && nv != '') {
					for (var i = 0; i < this.realRoomArray.length; i++) {
						if (this.realRoomArray[i].id == nv) {
							this.selectedRoomIndex = i
						}
					}
					this.$emit('roomSelect', nv)
				}
			}
		},
		data() {
			return {
				realRoomArray: [],
				selectedFloor: {},
				selectFloorShow: false,
				selectedRoomIndex: 0,
				selectedFloorIndex: 0
			}
		},
		methods: {
			/** 楼层选择确认
			 * @param {Object} e 数组，被选择的.value label
			 */
			selectConfirm(e) {
				this.selectedFloor = e[0]
				for (var i = 0; i < this.floorArray.length; i++) {
					if (this.floorArray[i].id == e[0].value) {
						this.selectedFloorIndex = i
					}
				}
				this.$emit('floorSelect', e[0].value)
			},
			/**
			 * 房间选择确认
			 * @param {Object} e
			 */
			roomChange(e) {
				this.selectedRoomIndex = e
				this.$emit('roomSelect', this.realRoomArray[e].id)
			},
			selectFloorSelectShow() {
				this.selectFloorShow = true && this.floorArray.length != 0

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
