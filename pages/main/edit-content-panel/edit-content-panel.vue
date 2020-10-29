<template>
	<view class="edit-content-panel">
		<view class="th">
			<text>设置</text>
			<!-- <view class="close" @click="closeDrawer('showRight')">
				<text class="iconfont icon-close"></text>
			</view> -->
		</view>
		<view class="td setting" v-if = "pageInfo.content[editIndex].type == 'img'">
			<view class="row">
				<view class="img-box">
					<image :src="pageInfo.content[editIndex].detail.url" mode="widthFix"></image>
					<view class="editor" @click="openPictureLibrary">
						<text class="iconfont icon-editor"></text>
					</view>
				</view>
			</view>
			<view class="row">
				<view class="tip">圆角</view>
				<view class="opertion">
					<view class="slider">
						<slider :value="pageInfo.content[editIndex].detail.borderRadius" block-color = "#444546" activeColor="#444546" block-size="18" show-value min="0" max="50" step="1" @change = "setSlider"/>
						<text>px</text>								
					</view>
				</view> 
			</view>
			<view class="row">
				<view class="btn-wrap">
					<view class="btn-ok" @click="ok">确认</view>
					<!-- <view class="btn-cancel">取消</view> -->
				</view>
			</view>
		</view>
		<view class="td setting" v-if = "pageInfo.content[editIndex].type == 'text'">
			<view class="row">
				<view class="tip">颜色</view>
				<view class="opertion ">
					<color @setColor = "setColor"></color>
				</view> 
			</view>
			<view class="row">
				<view class="tip">大小</view>
				<view class="opertion">
					<view class="slider">
						<slider :value = "pageInfo.content[editIndex].detail.fontSize" block-color = "#444546" activeColor="#444546" block-size="18" show-value min="12" max="60" step="1" @change = "setSlider"/>
						<text>px</text>								
					</view>
				</view> 
			</view>
		<!-- 	<view class="row">
				<view class="tip">间距</view>
				<view class="opertion">
					<view class="slider">
						<slider value="10" block-color = "#444546" activeColor="#444546" block-size="18" show-value min="22" max="60" step="1" />
						<text>px</text>								
					</view>
				</view> 
			</view>
			<view class="row">
				<view class="tip">行距</view>
				<view class="opertion">
					<view class="slider">
						<slider value="10" block-color = "#444546" activeColor="#444546" block-size="18" show-value min="22" max="60" step="1" />
						<text>px</text>								
					</view>
				</view> 
			</view> -->
			<view class="row">
				<view class="tip">字体</view>
				<view class="opertion">
					<view class="picker">
						<picker @change="bindPickerChange" :value="fontFamilyIndex" :range="fontFamily">
							<view class="uni-input">{{pageInfo.content[editIndex].detail.fontFamily ? pageInfo.content[editIndex].detail.fontFamily : fontFamily[fontFamilyIndex]}}</view>
						</picker>
					</view>
				</view>
			</view>
		<!-- 	<view class="row">
				<view class="tip">样式</view>
				<view class="opertion">
					<view class="sidebar">
						<view class="active">加粗</view>
						<view class="">斜体</view>
						<view class="">居中</view>
					</view>
				</view>
			</view> -->
			<view class="row">
				<view class="tip">文本</view>
				<view class="opertion">
					<view class="textarea">
						<textarea v-model="pageInfo.content[editIndex].detail.content"   placeholder="请输入文本"/>
					</view>
				</view>
			</view>
			<view class="row">
				<view class="btn-wrap">
					<view class="btn-ok" @click="ok">确认</view>
					<!-- <view class="btn-cancel">取消</view> -->
				</view>
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
				fontFamily: ['微软雅黑', '宋体', '楷体', '黑体', '隶书', 'Verdana'],
				fontFamilyIndex:0,
			}
		},
		computed:{
			...mapState(['pageInfo','editIndex'])
		},
		updated(){
			// console.log(this.pageInfo)
		},
		methods: {
			...mapActions(['updateAttrValue']),
			ok(){
				this.close('Drawer','edit-content-panel','close')
			},
			openPictureLibrary(){
				this.open('Popup','picture-library-popup','open')
			},
			setColor(c){
				console.log(c)
				this.updateAttrValue({key:'color',value:c})
			},
			setSlider(ev){
				const {value} = ev.detail
				this.updateAttrValue({key:'fontSize',value})	
			},
			bindPickerChange: function(e) {
				const {value} = e.target
				this.fontFamilyIndex = value
				this.updateAttrValue({key:'fontFamily',value:this.fontFamily[value]})
			},
		}
	}
</script>

<style lang="less">
	.edit-content-panel{
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
		
		.setting{
			
			.row{
				display: flex;
				min-height: 90rpx;
				line-height: 90rpx;
				font-size: 28rpx;
				width: 100%;
				.tip{
					width: 35px;
				}
				.opertion{
					flex: 1;
					padding-left: 10rpx;
					display: flex;
					align-items: center;
					.slider{
						position: relative;
						width: 100%;
						uni-slider,slider{
							// width: 100%;
							margin: 0 10rpx;
							padding-right: 40rpx;
						}
						
						&>text{
							position: absolute;
							top: 0;
							right: 2px;
						}
					}
					.picker{
						width: 100%;
						height: 65rpx;
						line-height: 65rpx;
						text-align: center;
						background: #292929;
						border-radius: 3px;
						
					}
					
					
					.sidebar{
						display: flex;
						width: 100%;
						height: 65rpx;
						line-height: 65rpx;
						border-radius: 3px;
						overflow: hidden;
						&>view{
							flex: 1;
							text-align: center;
							background: #555657;
						}
						&>view:nth-child(2){
							border-left: solid 1px #454545;
							border-right: solid 1px #454545;
						}
						&>.active{
							background: #1274e7;
							color: #fff;
						}
					}
					
					.textarea{
						width: 100%;
						overflow: hidden;
						border-radius: 3px;
						margin-top: 10rpx;
						&>textarea{
							width: 100%;
							height: 200rpx;
							background: #444546;
							padding: 10rpx;
							
						}
					}
						
					
					
				}
				
				.img-box{
					position: relative;
					width: 210px;
					image{
						width: 100%;
					}
					&>view{
						position: absolute;
						border-radius: 5px;
						top: 10px;
						right: 10px;
						width: 80rpx;
						height: 60rpx;
						background: #00c853;
						color: #fff;
						text-align: center;
						line-height: 60rpx;
						.iconfont {
							font-size: 50rpx;
						}
					}
				}
				
				.btn-wrap{
					display: flex;
					width: 100%;
					align-items: center;
					margin-top: 20rpx;
					&>view{
						flex: 1;
						height: 65rpx;
						line-height: 65rpx;
						text-align: center;
						color: #fff;
						border-radius: 5rpx;
						
					}
					.btn-ok{
						background: #00c853;
						margin-right: 5rpx;
					}
					.btn-cancel{
						background: #555657;
						margin-left: 5rpx;
					}
				}
				
			}
		}
	}
</style>
