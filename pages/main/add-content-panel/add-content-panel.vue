<template>
	<view class="add-content-panel">
		<view class="th">
			<text>添加元素</text>
			<view class="close"  @click="closeDrawer('showLeft')">
				<text class="iconfont icon-close"></text>
			</view>
		</view>
		<view class="td">
			<view class="item" @click="addEle('text')">
				<text class="icon iconfont icon-confirm"></text>
				<text class="text">文字</text>
			</view>
			<view class="item" @click="addEle('img')">
				<text class="icon iconfont icon-coupons"></text>
				<text class="text">图片</text>
			</view>
			<view class="item">
				<text class="icon iconfont icon-atm"></text>
				<text class="text">图标</text>
			</view>
			<view class="item">
				<text class="icon iconfont icon-ascending"></text>
				<text class="text">段落</text>
			</view>
			<view class="item ">
				<text class="icon iconfont icon-pin"></text>
				<text class="text">列表</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import broadcast from '../../../common/mixins/broadcast.js'
	import wxAsync from '../../../common/mixins/wxAsync.js'
	import { mapActions } from 'vuex'
	export default {
		props:['pageInfo'],
		mixins:[broadcast,wxAsync],
		data() {
			return {
				
			}
		},
		methods: {
			...mapActions(['addContent']),
			closeDrawer(){
				this.close('Drawer','add-content-panel','close')
			},
			async addEle(type){
				const {content} = this.pageInfo
				let len = content.length
				let x,y,c;
				const {width:bgW,height:bgH}  = await this.getClientRect('#bgImage')
				
				switch(type){
					case 'text':
						x = bgW/2-50,
						y = bgH/2-5;
							
						c = {
							id:Date.now(),
							type:'text',
							detail:{x:x,y:y,cx:x,cy:y,fontSize:16,content:'这里是默认文字',color:'black'}
						}
						break
					case 'img':
						x = bgW/2-25,
						y = bgH/2-25;
						c = {
							id:Date.now(),
							type:'img',
							detail:{x:x,y:y,cx:x,cy:y,width:100,height:100,url:'../../../static/image/nike.jpg',borderRadius:50}
						}
						break
					default:
						break
					
				}
				
				
				this.addContent(c)
				this.close('Drawer','add-content-panel','close')
			}
		}
	}
</script>

<style lang="less">
	.add-content-panel{
		background: #333435;
		height: 100%;
		color: #aaabac;
		display: flex;
		flex-direction: column;
		align-items: center;
		// #ifdef H5
		padding-top: 88rpx;
		// #endif
		.th{
			height: 80rpx;
			width: 100%;
			background: #1274e7;
			color: #fff;
			font-size: 26rpx;
			text-align: center;
			line-height: 80rpx;
			.close{
				display: inline-block;
				float: right;
				margin-right: 20rpx;
				font-size: 32rpx;
			}
		}
		.td{
			padding: 10rpx 10rpx;
			display: flex;
			flex-wrap: wrap;
			// justify-content: space-between;
			// align-content: space-between;
			// width: 100%;
			.item{
				flex: 40%;
				height: 100px;
				text-align: center;
				margin: 10rpx;
				display: flex;
				flex-direction: column;
				margin-bottom: 10rpx;
				background: #444546;
				font-size: 28rpx;
				.icon{
					flex: 2;
					display: flex;
					align-items: flex-end;
					justify-content: center;
					font-size: 88rpx;
				}
				.text{
					flex: 1;
					display: flex;
					align-items: flex-start;
					justify-content: center;
				}
			}
			
			
		}
	}
</style>
