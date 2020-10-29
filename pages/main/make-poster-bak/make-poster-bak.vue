<template>
	<view class="make-poster">
		<view class="poster">
			<image id = "bgImage" :src="pageInfo.detail.backgroundImage"  mode="widthFix"></image>
			<!-- <image id = "bgImage" src="../../../static/image/6.png" mode="widthFix"></image> -->
		</view>
		<view class="page-set" @click="setting" >
			<view class=""></view>
			+
		</view>
		<view class="ok" @click="openPopup('picture-library-popup')">
			完成
		</view>
		
		<view class="drag">
			<movable-area>
				<movable-view
					class="target" 
					direction="all" 
					animation= "false"
					v-for="(item,index) in pageInfo.content"
					:key = "index"
					:x="item.detail.x" 
					:y="item.detail.y" 
					@click="editContent(item)" 
					@change="updateRect($event,item,'change ...')"
				
					>
				<!-- 	 -->
					<!-- text -->
					<view class="text" 
							v-if="item.type == 'text'"
							:style="{fontSize:item.detail.fontSize+'px',
									color:item.detail.color,
									fontFamily:item.detail.fontFamily}">
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
							<text>{{editorItem && editorItem.type == 'text' ? '文本':'图片'}}设置</text>
							<!-- <view class="close" @click="closeDrawer('showRight')">
								<text class="iconfont icon-close"></text>
							</view> -->
						</view>
						<view class="td setting" v-if = "editorItem && editorItem.type == 'img'">
							<view class="row">
								<view class="img-box">
									<image src="../../../static/image/nike.jpg" mode="widthFix"></image>
									<view class="editor" @click="openPopup('picture-library-popup')">
										<text class="iconfont icon-editor"></text>
									</view>
								</view>
							</view>
							<view class="row">
								<view class="tip">圆角</view>
								<view class="opertion">
									<view class="slider">
										<slider value="10" block-color = "#444546" activeColor="#444546" block-size="18" show-value min="22" max="60" step="1" @change = "setSlider"/>
										<text>px</text>								
									</view>
								</view> 
							</view>
							<view class="row">
								<view class="btn-wrap">
									<view class="btn-ok" @click="closeDrawer('showRight')">确认</view>
									<!-- <view class="btn-cancel">取消</view> -->
								</view>
							</view>
						</view>
						<view class="td setting" v-if = "editorItem && editorItem.type == 'text'">
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
										<slider :value="editorItem.detail.fontSize" block-color = "#444546" activeColor="#444546" block-size="18" show-value min="12" max="60" step="1" @change = "setSlider"/>
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
											<view class="uni-input">{{editorItem ? editorItem.detail.fontFamily : fontFamily[fontFamilyIndex]}}</view>
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
										<textarea  v-model="editorItem.detail.content"  placeholder="请输入文本"/>
									</view>
								</view>
							</view>
							<view class="row">
								<view class="btn-wrap">
									<view class="btn-ok" @click="closeDrawer('showRight')">确认</view>
									<!-- <view class="btn-cancel">取消</view> -->
								</view>
							</view>
						</view>
					</view>
				</uni-drawer>
			</view>
		</view>
		<uni-popup ref="create-img-popup" type="center">
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
						<button type="default" @click="closePopup('create-img-popup')">取消</button>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="page-popup" type="center">
			<view class="page-popup">
				<view class="item">
					<view class="iconfont set icon-shezhi"></view>
					<text>全局设置</text>
				</view>
				<view class="item set">
					<view class="iconfont set icon-left-element" @click="addEle"></view>
					<text>增加元素</text>
				</view>
				<view class="item ">
					<view class="iconfont icon-close " @click="closePopup('page-popup')"></view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="picture-library-popup">
			<view class="modal picture-library-popup">
				<view class="library-title">
					<text class="title">图片库</text>
					<text class="iconfont icon-close"></text>
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
					<button type="default" class="cancel">取消</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import pageInfo from '@/static/lib/js/data.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import color from '@/components/color/color.vue'
	export default {
		data() {
			return {
				pageInfo:pageInfo,
				poster:{},
				fontFamily: ['微软雅黑', '宋体', '楷体', '黑体', '隶书', 'Verdana'],
				fontFamilyIndex:0,
				editorItem:null,
			}
		},
		created() {
			// console.log(this.pageInfo)
			// this.updatePageInfo()
		},
		methods: {
			openPopup(e){
				this.$refs[e].open()
			},
			closePopup(e){
				this.$refs[e].close()
			},
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
			setting(){
				this.openPopup('page-popup')
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
			// updatePageInfo(){
			// 	this.pageInfo.content.forEach((item)=>{
			// 		item.detail.x = item.detail.cx
			// 		item.detail.y = item.detail.cy
			// 		return item
			// 	})
			// 	console.log('updatePageInfo...')
			// },
			addEle(){
				this.showDrawer('showLeft')
				this.closePopup('page-popup')
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
				// this.updatePageInfo()
				this.closeDrawer('showLeft')
			},
			updateRect(ev,item,type){
				const {x,y,source} = ev.detail
				if(source && source == 'touch'){
					item.detail.x = x
					item.detail.y = y
					
					console.log({
						x:x,
						y:y,
						source:source
					})
				}
				 
			
			},
			editContent(item){
				this.editorItem = item
				this.showDrawer('showRight')
			},
			setColor(c){
				console.log(c)
				this.editorItem.detail.color = c
			},
			setSlider(ev){
				if(this.editorItem && this.editorItem.type == 'text'){
					const {value:num} = ev.detail
					this.editorItem.detail.fontSize = num
					
				}
			},
			bindPickerChange: function(e) {
				if(this.editorItem && this.editorItem.type == 'text'){
					const {value} = e.target
					this.fontFamilyIndex = value
					this.editorItem.detail.fontFamily = this.fontFamily[value]
				}
				
			},
		},
		components: {
			uniDrawer,
			uniPopup,
			color,
		}
	}
</script>

<style lang="less">
	*{
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	body,page{
		background: #494a4b;
	}
	.make-poster {
		position: relative;
		// border: solid 1px #55aaff;
		min-height: 200rpx;
		
		.modal{
			position: fixed;
			top: 55px;
			left: 10px;
			right: 10px;
			bottom: 10px;
			background: #fff;
			// #ifdef MP-WEIXIN
			top: 10px;
			// #endif
		}
		
		
		.picture-library-popup{
			.library-title{
				display: flex;
				justify-content: space-between;
				padding: 0 15rpx ;
				height: 80rpx;
				background: #222324;
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
		
		.page-set{
			position: fixed;
			bottom: 60rpx;
			left: 5%;
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			background: #ffffff;
			text-align: center;
			line-height: 88rpx;
			font-size: 66rpx;
			color: #5e5e5e;
			&>view:nth-child(1){
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
				width: 80rpx;
				height: 80rpx;
				border: solid 6rpx black;
				border-top-color: #e40f2c;
				border-right-color:#fad461 ;
				border-bottom-color: #2cbded;
				border-left-color: #2cbded;
				border-radius: 50%;
			}
		}
		
		.ok{
			position: fixed;
			bottom: 70rpx;
			right: 5%;
			width: 120rpx;
			height: 60rpx;
			background: #2cbded;
			border-radius: 10rpx;
			text-align: center;
			line-height: 60rpx;
			font-size: 26rpx;
			color: #fff;
		}
		
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
