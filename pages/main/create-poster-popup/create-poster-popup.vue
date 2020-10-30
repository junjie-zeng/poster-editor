<template>
	<view class="create-poster-popup">
		<view class="show-poster">
			<image :src="posterUrl" ></image>
		</view>
		<view class="save-poster">
			<view class="save-tips">
				长按图片保存到本地
			</view>
			<view class="save-btn">
				<!-- #ifdef MP-WEIXIN -->
				<button type="default">保存到本地</button>
				<!-- #endif -->
				<button type="default" @click="cancel">取消</button>
			</view>
		</view>
	</view>
</template>

<script>
	import broadcast from '../../../common/mixins/broadcast.js'
	import { mapState } from 'vuex'
	export default {
		props:['pageInfo'],
		mixins:[broadcast],
		data() {
			return {
				
			}
		},
		computed:{
			...mapState(['posterUrl'])
		},
		methods: {
			cancel(){
				this.close('Popup','create-poster-popup','close')
			}
		}
	}
</script>

<style lang="less">
	.create-poster-popup{
		position: fixed;
		bottom: 10px;
		left: 10px;
		top: 55px;
		right: 10px;
		background: #fff;
		display: flex;
		flex-direction: column;
		// #ifdef MP-WEIXIN
		top:10px;
		// #endif
		.show-poster{
			flex: 1;
			background: #494a4b;
			image{
				width: 100%;
			}
		}
		
		.save-poster{
			padding: 10rpx 20rpx;
			height: 300rpx;
			text-align: center;
			
			.save-tips{
				font-size: 32rpx;
				color: #aaa1a1;
			}
			.save-btn{
				&>button{
					margin-top:20rpx;
					outline: none;
					color: #fff;
					font-size: 32rpx;
				}
				button:nth-child(1){
					background: #007aff;
				}
				button:nth-child(2){
					border: solid 1px #007aff;
					color: #007aff;
				}
			}
			
		}
		
		// #ifdef H5
			.save-poster{
				height: 170rpx;
			}
		// #endif
	}
	
	// #ifdef MP-WEIXIN
	.popup-wrap{
		top: 10px;
	}
	// #endif
</style>
