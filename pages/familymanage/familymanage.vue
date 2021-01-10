<template>
	<view class="main-container">
		<normal-header pageName="家庭管理"></normal-header>
		<view class="add-body">
			<view class="header-box">
				<view class="">
					<text>选择房间后操作</text>
				</view>
				<view class="action-box">
					<view class="">
						<u-icon name="plus" @click="addMaskShow=true" size="40" color="#303030"></u-icon>
					</view>
				</view>
			</view>
			<view class="item-box-wrapper">
				<!-- 无数据提示 -->
				<view class="family-cad-item" v-for="(family,index) in familyArray" :key="index">
					<view class="card-header-box">
						<view>
							<text style="font-size: 30rpx;">{{family.name}}</text>
						</view>
						<view>
							<text style="font-size: 20rpx;">{{family.rooms}}个房间 | {{family.device}}个设备</text>
						</view>
					</view>
					<view class="icon-box">
						<view class="icon-wrapper" :style="{'background-color':selectedIndex==index?'#18b566':'#c8c9cc'}" @click="cardSelected(index)">
							<u-icon name="checkmark" size="30" color="#ffffff"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 添加楼层mask -->
		<u-mask :show="addMaskShow">
			<view class="add-box">
				<view style="padding: 20rpx;display: flex;justify-content: flex-end;">
					<u-icon name="close" @click="closeMarsk"></u-icon>
				</view>
				<u-field v-model="familyName" label="家庭名" placeholder="例如: 大熊家"></u-field>
				<view style="padding-top: 40rpx;padding-bottom: 40rpx;">
					<u-button type="success" @click="saveData">保存</u-button>
				</view>
			</view>
		</u-mask>
		<!-- 修改楼层mask -->
		<u-mask :show="modifyMaskShow">
			<view class="add-box">
				<view style="padding: 20rpx;display: flex;justify-content: flex-end;">
					<u-icon name="close" @click="modifyMaskShow=false"></u-icon>
				</view>
				<u-field v-model="modifyData.name" label="楼层名" placeholder="例如: 一楼"></u-field>
				<view style="padding-top: 40rpx;padding-bottom: 40rpx;">
					<u-button type="success">保存</u-button>
				</view>
			</view>
		</u-mask>
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
				familyArray: [{
						name: '大熊家',
						rooms: 10,
						device: 20
					},
					{
						name: '熊二嘉',
						rooms: 10,
						device: 20
					}
				],
				selectedIndex: 0,
				addMaskShow: false,
				modifyMaskShow: false,
				familyName: '',
				modifyData: {}

			}
		},
		methods: {
			cardSelected(index) {
				this.selectedIndex = index

			},
			closeMarsk() {

			},
			saveData() {
				this.$u.api.familyAddOrUpdateApi({
					name: this.familyName
				}).then(res => {
					if (res.status) {
						console.log('新增成功')
					}
				})

			}

		}
	}
</script>

<style lang="scss">
	.add-body {
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

			.family-cad-item {
				display: flex;
				align-items: center;
				padding: 20rpx;
				margin: 20rpx;
				border: dashed 1rpx #C8C9CC;
				border-radius: 20rpx;

				.card-header-box {
					width: 80%;
					display: flex;
					flex-direction: column;
					align-items: flex-start;
				}

				.icon-box {
					width: 20%;
					display: flex;
					justify-content: flex-end;

					.icon-wrapper {
						width: 40rpx;
						height: 40rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 50%;
					}
				}
			}

		}
	}

	.add-box {
		background-color: #FFFFFF;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 500rpx;
		padding: 20rpx;
	}
</style>
