<template>
	<view>
		<view class="modal picture-library-popup">
			<view class="library-title">
				<text class="title">图片库</text>
				<text class="iconfont icon-close" @click="close('Popup','picture-library-popup','close')"></text>
			</view>
			<view class="library-box">
				<scroll-view style="height: 950rpx;" scroll-y="true">
					<view class="item active" scroll-y="true" >
						<image src="../../../static/image/4.png" mode=""></image>
					</view>
					<view class="item">
						<image src="../../../static/image/2.png" mode=""></image>
					</view>
					<view class="item">
						<image src="../../../static/image/3.png" mode=""></image>
					</view>
					<view class="item">
						<image src="../../../static/image/1.png" mode=""></image>
					</view>
					<view class="item">
						<image src="../../../static/image/1.png" mode=""></image>
					</view>
					<view class="item">
						<image src="../../../static/image/1.png" mode=""></image>
					</view>
				</scroll-view>
			</view>
			<view class="library-btn">
				<button type="default" class="upload">上传图片</button>
				<button type="default" class="_ok">确认</button>
				<!-- <button type="default" class="cancel">取消</button> -->
			</view>
		</view>
	</view>
</template>

<script>
	import broadcast from '../../../common/mixins/broadcast.js'
	export default {
		mixins:[broadcast],
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	.picture-library-popup{
		.library-title{
			display: flex;
			justify-content: space-between;
			padding: 0 15rpx ;
			height: 80rpx;
			background: #1274e7;
			line-height: 80rpx;
			color: #fff;
			
		}
		.library-box{
			padding: 10rpx;
			.item{
				float: left;
				width: 47%;
				height: 400rpx;
				border: solid 2px rgba(0,0,0,.05);
				padding: 40rpx 0;
				background: #fff;
				margin:10rpx 5rpx;
				
				image{
					width: 100%;
					height: 100%;
				}
			}
			.active{
				border: solid 2px #1274e7;
			}
		}
		
		
		.library-btn{
			padding: 10rpx 20rpx;
			margin-top: 30rpx;
			// #ifdef MP-WEIXIN
			margin-top: 15rpx;
			// #endif
			button{
				width: 180rpx;
				height: 80rpx;
				line-height: 80rpx;
				display: inline-block;
				color: #fff;
				border: none;
				outline: none;
				font-size: 32rpx;
			}
			.upload{
				width: 200rpx;
				background: #00c853;
				
			}
			._ok,.cancel{
				float: right;
			}
			._ok{
				background: #1274e7;
			}
			.cancel{
				background: #e1e1e1;
				margin-right:15rpx;
			}
			
		}
	}
</style>
