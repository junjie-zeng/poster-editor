<template>
	<view class="poster">
		<view class="banan">
			<swiper class="swiper" >
				<swiper-item>
					<view class="swiper-item ">
						<image src="../../../static/image/4.png" mode="widthFix"></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item ">
						<image src="../../../static/image/2.png" mode="widthFix"></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item ">
						<image src="../../../static/image/3.png" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="content">
			<view class="template">
				<view class="template-title">
					<text>最新模板</text>
					<text class="many">更多<text class="iconfont icon-arrow-right"></text></text>
				</view>
				<view class="template-list">
					<view class="item" @click="makePoster">
						<view class="img">
							<image src="../../../static/image/1.png" mode=""></image>
						</view>
						<text>中秋浓情节日宣传</text>
					</view>
					<view class="item">
						<view class="img">
							<image src="../../../static/image/2.png" mode=""></image>
						</view>
						<text>春季企业招聘</text>
					</view>
					<view class="item">
						<view class="img">
							<image src="../../../static/image/3.png" mode=""></image>
						</view>
						<text>企业招聘人才</text>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/*
		文本设置
			1. 颜色，大小，间距，行距，字体，样式
			
		图片设置
			1. 图片库（选择图片，上传图片）
			
		图标设置
			1. 图标库（选择图标），图标颜色，图标大小
			
		列表设置
			1. 颜色，大小，间距，行距，字体，样式， 图标库（选择图标），图标颜色，图标大小
			2. 列表行数
			3. 列表编辑
	
	*/

	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {
			makePoster(){
				console.log('come on...')
				uni.navigateTo({
					url:'/pages/main/make-poster/make-poster'
				})
			}
		}
	}
</script>

<style lang="less">
	.poster{
		.banan{
			.swiper{
				height: 350rpx;
				.swiper-item{
					height: 100%;
					image{
						width: 100%;
					}
				}
				.swiper-item:nth-child(1){
					background: #007AFF;
				}
				.swiper-item:nth-child(2){
					background: #ff5500;
				}
				.swiper-item:nth-child(3){
					background: #ffaa00;
				}
			}
		}
		
		.content{
			width: 100%;
			display: flex;
			padding: 20rpx 10rpx;
			box-sizing: border-box;
			background: #f8f8f8;
			.template{
				display: flex;
				flex-direction: column;
				width: 100%;
				.template-title{
					display: flex;
					justify-content: space-between;
					color: #434343;
					font-size: 36rpx;
					padding: 10rpx;
					.many{
						color: #afafaf;
						font-size: 32rpx;
					}
				}
				
				.template-list{
					display: flex;
					width: 100%;
					flex-wrap: wrap;
					justify-content: space-between;
					.item{
						display: flex;
						flex-direction: column;
						margin-top: 20rpx;
						width: 33.3%;
						// flex: 30%;
						// margin-right: 5rpx;
						.img{
							height: 350rpx;
							padding: 10rpx;
							background: #fff;
							image{
								width: 100%;
								height: 100%;
							}
						}
						
						
						text{
							margin-top: 5rpx;
							color: #afafaf;
							font-size: 28rpx;
							text-align: center;
						}
					}
					.item:nth-child(3n){
						margin-right: 0;
					}
					
				}
			}
		}
	}
</style>
