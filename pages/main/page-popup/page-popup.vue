<template>
	<view class="page-popup">
		<view class="item">
			<view class="iconfont set icon-shezhi"></view>
			<text>全局设置</text>
		</view>
		<view class="item set">
			<view class="iconfont set icon-left-element" @click="add"></view>
			<text>增加元素</text>
		</view>
		<view class="item ">
			<view class="iconfont icon-close " @click="close('Popup','page-popup','close')"></view>
		</view>
	</view>
</template>

<script>
	import broadcast from '@/common/mixins/broadcast.js'
	export default {
		mixins:[broadcast],
		data() {
			return {
				
			}
		},
		mounted(){
			
		},
		methods: {
			add(){
				this.open('Drawer','add-content-panel','open')
				this.close('Popup','page-popup','close')
			}
		}
	}
</script>

<style lang="less">
	.page-popup{
		position: fixed;
		
		left: 30rpx;
		bottom: 100rpx;
		display: flex;
		flex-direction: column;
		
		.item{
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 150rpx;
			height: 180rpx;
			color: #fff;
			font-size: 26rpx;
			text-align: center;
			&>text{
				margin-top: 15rpx;
			}
			&>.set{
				border-radius: 50%;
				width: 100rpx;
				height: 100rpx;
				background: #d7d94a;
				line-height: 105rpx;
				font-size: 50rpx;
			}
			&>.icon-close{
				font-size: 66rpx;
				margin-top: 60rpx;
			}
			
		}
		
	}
</style>
