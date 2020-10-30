<template>
	<view>
		<view class="modal picture-library-popup">
			<view class="library-title">
				<text class="title">图片库</text>
				<text class="iconfont icon-close" @click="close('Popup','picture-library-popup','close')"></text>
			</view>
			<view class="library-box">
				<scroll-view style="height: 950rpx;" scroll-y="true">
					<!-- active -->
					<view class="item " v-for="(item,index) in images" :class="[(item == currentImageUrl ? 'active':'')]"  @click="selectImage(item)" :key = "index">
						<image :src="item" mode=""></image>
					</view>
					
				</scroll-view>
			</view>
			<view class="library-btn">
				<button type="default" class="upload">上传图片</button>
				<button type="default" class="_ok" @click="ok">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
	import broadcast from '../../../common/mixins/broadcast.js'
	import { mapState,mapActions } from 'vuex'
	export default {
		mixins:[broadcast],
		data() {
			return {
				images:[
					'../../../static/image/1.png',
					'../../../static/image/2.png',
					'../../../static/image/3.png',
					'../../../static/image/4.png',
					'../../../static/image/5.png',
					'../../../static/image/6.png',
				],
				currentImageUrl:''
			}
		},
		computed:{
			...mapState(['pageInfo','editIndex'])
		},
		mounted() {
			this.currentImageUrl =	this.pageInfo.content[this.editIndex] &&  this.pageInfo.content[this.editIndex].detail.url
			console.log(this.currentImageUrl)
		},
		methods: {
			...mapActions(['updateAttrValue']),
			ok(){
				if(!this.currentImageUrl){
					uni.showToast({
						title:'请选择图片',
						duration:1000
					})
				}
				this.updateAttrValue({key:'url',value:this.currentImageUrl})
				this.close('Popup','picture-library-popup','close')
			},
			selectImage(url){
				console.log(url)
				this.currentImageUrl = url
			},
		
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
