<template>
	<view class="make-poster">
		<view class="poster">
			<image id = "bgImage" :src="pageInfo.detail.backgroundImage"  mode="widthFix"></image>
			<!-- <image id = "bgImage" src="../../../static/image/6.png" mode="widthFix"></image> -->
		</view>
		<!-- <view class="add-poster" @click="addPoster">
			+
		</view> -->
		<view class="add-content" @click="showDrawer('showLeft')">
			+
		</view>
		<view class="ok" @click="openPopup">
			完成
		</view>
		<view class="drag">
			<movable-area>

				<!-- <movable-view class="target" direction="all">
					<view class="text" @click="showDrawer('showRight')">
						Nike
					</view>
				</movable-view>

				<movable-view class="target " direction="all">
					<view class="img" style="width:100rpx;height:100rpx;" @click="showDrawer('showRight')">
						<image src="../../../static/image/nike.jpg"></image>
					</view>
				</movable-view> -->
				
				<movable-view
					class="target" 
					direction="all" 
					v-for="(item,index) in pageInfo.content"
					:key = "index"
					:x="item.detail.x" 
					:y="item.detail.y" 
					@click="showDrawer('showRight')" 
					@change="updateRect($event,item)">
					<!-- text -->
					<view class="text" 
							v-if="item.type == 'text'"
							:style="{fontSize:item.detail.fontSize+'px',color:item.detail.color}">
						{{item.detail.content}}
					</view>
					<!-- image -->
					<view class="img" v-if="item.type == 'img'"
					:style = "{width:item.detail.width+'rpx',
					height:item.detail.height + 'rpx',
					borderRadius:item.detail.borderRadius+ '%',
					overflow: 'hidden'}">
						<image v-if="item.type == 'img'" :src="item.detail.url" ></image>
					</view>
				</movable-view>

			</movable-area>
		</view>
		<view class="drawer">
			<!-- <uni-section title="左侧滑出" type="line"></uni-section> -->
			<view class="example-body">
				<uni-drawer ref="showLeft" mode="left" @change="change($event,'showLeft')">
					<view class="content">
						<view class="th">
							<text>添加元素</text>
							<view class="close"  @click="closeDrawer('showLeft')">
								<text class="iconfont icon-close"></text>
							</view>
						</view>
						<view class="td">
							<view class="item" @click="addContent('text')">
								<text class="icon iconfont icon-confirm"></text>
								<text class="text">文字</text>
							</view>
							<view class="item" @click="addContent('img')">
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
				</uni-drawer>
			</view>
			<!-- <uni-section title="右侧滑出" type="line"></uni-section> -->
			<view class="example-body">
				<uni-drawer ref="showRight" :mask-click="false" mode="right" @change="change($event,'showRight')">
					<view class="content">
						<view class="th">
							<text>文本设置</text>
							<view class="close" @click="closeDrawer('showRight')">
								<text class="iconfont icon-close"></text>
							</view>
						</view>
						<view class="td setting">
							<view class="row">
								<view class="tip">颜色</view>
								<view class="opertion ">
									<view class="color-set">
										<view class="color" style="background: #FFFFFF;"></view>
										<view class="color" style="background: #000000;"></view>
										<view class="color" style="background: #ff0000;"></view>
										<view class="color" style="background: #ffaa00;"></view>
										<view class="color" style="background: #ffff00;"></view>
										<view class="color" style="background: #00ff00;"></view>
										<view class="color" style="background: #00ff7f;"></view>
										<view class="color" style="background: #00aaff;"></view>
										<view class="color" style="background: #5555ff;"></view>
									</view>
								</view> 
							</view>
							<view class="row">
								<view class="tip">大小</view>
								<view class="opertion">
									<view class="slider">
										<slider value="10" block-color = "#444546" activeColor="#444546" block-size="18" show-value min="22" max="60" step="1" />
										<text>px</text>								
									</view>
								</view> 
							</view>
							<view class="row">
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
							</view>
							<view class="row">
								<view class="tip">字体</view>
								<view class="opertion">
									<view class="picker">
										<picker @change="bindPickerChange" :value="index" :range="array">
											<view class="uni-input">{{array[index]}}</view>
										</picker>
									</view>
								</view>
							</view>
							<view class="row">
								<view class="tip">样式</view>
								<view class="opertion">
									<view class="sidebar">
										<view class="active">加粗</view>
										<view class="">斜体</view>
										<view class="">居中</view>
										<!-- <view class="">阴影</view> -->
									</view>
								</view>
							</view>
							<view class="row">
								<view class="tip">文本</view>
								<view class="opertion">
									<view class="textarea">
										<textarea  placeholder="请输入文本"/>
									</view>
								</view>
							</view>
							<view class="row">
								<view class="btn-wrap">
									<view class="btn-ok">确认</view>
									<view class="btn-cancel">取消</view>
								</view>
							</view>
						</view>
					</view>
				</uni-drawer>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="popup-wrap">
				<view class="show-poster">
					
				</view>
				<view class="save-poster">
					<view class="save-tips">
						长按图片保存到本地
					</view>
					<view class="save-btn">
						<!-- #ifdef MP-WEIXIN -->
						<button type="default">保存到本地</button>
						<!-- #endif -->
						<button type="default" @click="closePopup">取消</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- <uni-popup ref="popup" type="center">
			<view class="picture-library">
				<view class="pic-libary-title">
					图片库
				</view>
				<view class="pic-libary-list">
					<scroll-view scroll-y="true">
						<view class="image-item">
							<image src="../../../static/image/5.jpg" mode=""></image>
						</view>
						<view class="image-item">
							<image src="../../../static/image/5.jpg" mode=""></image>
						</view>
						<view class="image-item">
							<image src="../../../static/image/5.jpg" mode=""></image>
						</view>
					</scroll-view>
				</view>
			</view>
		</uni-popup> -->
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import pageInfo from '@/static/lib/js/data.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		data() {
			return {
				// showRight: false,
				// showLeft: false,
				pageInfo:pageInfo,
				poster:{},
				array: ['中国', '美国', '巴西', '日本'],
				index:0
			}
		},
		created() {
			// console.log(this.pageInfo)
			this.updatePageInfo()
		},
		mounted() {
			
		},
		methods: {
			openPopup(){
				this.$refs.popup.open()
			},
			closePopup(){
				this.$refs.popup.close()
			},
			confirm() {},
			// 打开窗口
			showDrawer(e) {
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close()
			},
			// 抽屉状态发生变化触发
			change(e, type) {
				console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				this[type] = e
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			// 获取元素宽高等属性
			getClientRect(el){
				return new Promise((resolve)=>{
					uni.createSelectorQuery().selectAll(el).boundingClientRect(function (rect) {
					    // console.log(rect)
					    resolve(rect[0])
					}).exec() 
				})
			},
			updatePageInfo(){
				this.pageInfo.content.forEach((item)=>{
					item.detail.x = item.detail.cx
					item.detail.y = item.detail.cy
					return item
				})
				
				
			
				console.log('updatePageInfo...')
				
			},
			async addContent(type){
				const {content} = this.pageInfo
				let len = content.length
				let x,y;
				const {width:bgW,height:bgH}  = await this.getClientRect('#bgImage')
				
				switch(type){
					case 'text':
						x = bgW/2-50,
						y = bgH/2-5;
							
						content.splice(len,1,{
							id:Date.now(),
							type:'text',
							detail:{x:x,y:y,cx:x,cy:y,fontSize:16,content:'这里是默认文字',color:'black'}
						})
						break
					case 'img':
						x = bgW/2-25,
						y = bgH/2-25;
							
						content.splice(len,1,{
							id:Date.now(),
							type:'img',
							detail:{x:x,y:y,cx:x,cy:y,width:100,height:100,url:'../../../static/image/nike.jpg',borderRadius:50}
						})
						break
					default:
						break
					
				}
				
				console.log(this.pageInfo)
				
				// 添加图片前更新一下PageInfo
				this.updatePageInfo()
				this.closeDrawer('showLeft')
			},
			updateRect(ev,item){
				 const {x,y} = ev.detail
				 // console.log({
				 // 	x:x,
				 // 	y:y
				 // })
				 // console.log(ev)
				 console.log('updateRect ...')
				 item.detail.cx = x
				 item.detail.cy = y
				 
				 // console.log({
					// type:item.type,
					// x:item.detail.cx,
					// y:item.detail.cy
				 // })
					
				
				
			}
		},
		onNavigationBarButtonTap(e) {
			if (this.showLeft) {
				this.$refs.showLeft.close()
			} else {
				this.$refs.showLeft.open()
			}
		},
		// app端拦截返回事件 ，仅app端生效
		// onBackPress() {
		// 	if (this.showRight || this.showLeft) {
		// 		this.$refs.showLeft.close()
		// 		this.$refs.showRight.close()
		// 		return true
		// 	}
		// },
		components: {
			uniDrawer,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		}
	}
</script>

<style lang="less">
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	.make-poster {
		position: relative;
		// border: solid 1px #55aaff;
		min-height: 200rpx;
		
		// .picture-library{
		// 	position: fixed;
		// 	bottom: 10px;
		// 	left: 10px;
		// 	top: 55px;
		// 	right: 10px;
		// 	background: #fff;
		// 	display: flex;
		// 	flex-direction: column;
		// 	.pic-libary-title{
		// 		height: 100rpx;
		// 		background: #222324;
		// 		color: #fff;
		// 		line-height: 100rpx;
		// 		padding-left: 20rpx;
		// 	}
			
		// 	.pic-libary-list{
		// 		flex: 1;
			
		// 		scroll-view{
		// 			padding: 10rpx;
		// 			width: 100%;
		// 				text-align: center;
		// 			.image-item{
		// 				display: inline;
		// 				border: solid 1px red;
		// 				width: 48%;
		// 				float: left;
		// 				// margin: 5rpx;
		// 				&>image{
		// 					width: 100%;
		// 				}
		// 			}
		// 		}
				
		// 	}
			
		// }
		.popup-wrap{
			position: fixed;
			bottom: 10px;
			left: 10px;
			top: 55px;
			right: 10px;
			background: #fff;
			display: flex;
			flex-direction: column;
			.show-poster{
				flex: 1;
				background: pink;
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

		.poster {
			&>image {
				vertical-align: bottom;
				width: 100%;
			}
		}

		.drag {
			movable-area {
				height: 100%;
				width: 100%;
				position: absolute;
				top: 0;
				bottom: 0;

				movable-view {
					position: absolute;
					// border: solid 1px red;
					height: auto;
					width: auto;
				}

				.text {
					height: auto;
					width: auto;
				}

				.img {
					// border: solid 1px red;
					// width: 100rpx;
					// height: 100rpx;
				}

				.img>image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.add-poster {
			position: fixed;
			left: 50%;
			top: 40%;
			transform: translate(-50%, -50%);
			height: 200rpx;
			width: 200rpx;
			background: pink;
			text-align: center;
			line-height: 200rpx;
			font-size: 60rpx;
			color: #C0C0C0;
		}
		
		.ok{
			position: fixed;
			bottom: 60rpx;
			right: 5%;
			width: 100rpx;
			height: 50rpx;
			background: #007AFF;
			border-radius: 10rpx;
			text-align: center;
			line-height: 50rpx;
			font-size: 22rpx;
			color: #fff;
		}


		.drawer {
			
			.content{
				background: #333435;
				height: 100%;
				color: #aaabac;
				display: flex;
				flex-direction: column;
				align-items: center;
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
							.color-set{
								display: flex;
								align-items: center;
								&>.color{
									width: 35rpx;
									height: 35rpx;
									margin-right: 5rpx;
								}
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
									height: 80rpx;
									background: #444546;
									padding: 10rpx;
									
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
		}


		.add-content {
			position: fixed;
			bottom: 60rpx;
			left: 5%;
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			background: #007AFF;
			text-align: center;
			line-height: 88rpx;
			font-size: 88rpx;
			color: #FFFFFF;
		}

		.hide-canvas {
			position: fixed;
			top: -99999upx;
			left: -99999upx;
			z-index: -99999;
		}



	}
</style>
