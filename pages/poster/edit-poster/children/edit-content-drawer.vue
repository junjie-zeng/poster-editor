<template>
	<view class="ps-edit-content-box">
		<view class="content-th">
			<view class="th-title">编辑元素</view>
			<view class="iconfont icon-close" @click="$drawer('add-content-drawer','close')"></view>
		</view>
		<view class="content-td">
			<view v-if = "currentItem && currentItem.type =='text'">
				<view class="ps-edit-item">
					<view class="top">
						颜色
					</view>
					<view class="bottom">
						<view class="colors">
							<view class="color-item" :style="{'background':c}" v-for="(c,index) in colorList" :key = "index" @click="modifyCurrentItem('color',c)" ></view>
						</view>
					</view>
				</view>
				<view class="ps-edit-item">
					<view class="top">
						文字
					</view>
					<view class="bottom">
						 <input :value="currentItem.detail.content" @input="onKeyInput($event,'content')" confirm-type="search" placeholder="请输入文本/文本不能为空" />
					</view>
				</view>
				<view class="ps-edit-item">
					<view class="top">
						大小
					</view>
					<view class="bottom">
						  <slider :value="currentItem.detail.fontSize" min="12" max="88" @change="sliderChange($event,'fontSize')" show-value step="5" />
					</view>
				</view>
				<view class="ps-edit-item">
					<view class="top">
						字体
					</view>
					<view class="bottom">
						<view class="set-font-weight">
							<picker @change="bindFontWeight" :value="font.fontWeightIndex" :range="font.fontWeightArray">
								<view class="uni-input">{{font.fontWeightArray[font.fontWeightIndex]}}</view>
							</picker>
						</view>
						
					</view>
				</view>
			</view>
			
			<view v-if = "currentItem && currentItem.type =='img'">
				<view class="ps-edit-item">
					<view class="top">
						背景颜色
					</view>
					<view class="bottom">
						<view class="colors">
							<view v-for="(c,index) in colorList" :key = "index" @click="modifyCurrentItem('bgColor',c)" class="color-item" :style="{'background':c}"></view>
						</view>
					</view>
				</view>
				<view class="ps-edit-item">
					<view class="top">
						圆角
					</view>
					<view class="bottom">
						  <slider :value="currentItem.detail.borderRadius" min="0" max="50" @change="sliderChange($event,'borderRadius')" show-value step="5" />
					</view>
				</view>
				<view class="ps-edit-item">
					<view class="top">
						图片
					</view>
					<view class="bottom">
						<view class="set-image">
							<image :src="currentItem.detail.url" mode="widthFix"></image>
							<view class="set-image-btn">
								<view class="iconfont icon-shangchuantupian" @click="chooseImage"></view>
								<view class="iconfont icon-close" @click="modifyCurrentItem('url','')"></view>
							</view>
						</view>
					</view>
				</view>
				
			</view>
			
		</view>
	</view>
</template>

<script>
	import broadcast from '@/common/mixins/broadcast.js'
	import wxAsync from '@/common/mixins/wxAsync.js'
	import drawer from '@/common/mixins/drawer.js'
	import { mapState, mapActions } from 'vuex'
	import { blobToBase64 } from '@/common/tools/index.js'
	export default {
		mixins:[broadcast,wxAsync,drawer],
		data() {
			return {
				font:{
					fontWeightIndex:0,
					fontWeightArray:['宋体','新宋体','微软雅黑','楷体','黑体','隶书','Arial','Verdana','Times New Roman','Lucida Sans Unicode','MS Serif','Comic Sans MS'],
				},
				currentItem:null,
				colorList:['#000000','#ffffff','#ff1d20','#ffaa00','#ffff00','#55ff00','#0565ff','#55ffff','#8800ff'],
			
			}
		},
		computed:{
			...mapState(['editIndex','pageInfo'])
		},
		mounted() {
			this._initCurrentItem()
		},
		methods: {
			...mapActions(['updateContentDetail']),
			bindFontWeight(e){
				  this.font.fontWeightIndex = e.target.value
				  let fontFamily = this.font.fontWeightArray[this.font.fontWeightIndex]
				  this.updateContentDetail({key:'fontFamily',value:fontFamily})
			},
			modifyCurrentItem(key,value){
				this.updateContentDetail({key,value})
			},
			sliderChange(e,key){
				const {value} = e.detail
				this.updateContentDetail({key,value})
			},
			onKeyInput(e,key){
				 const {value} = e.detail
				 this.updateContentDetail({key,value})
			},
			chooseImage(){
				uni.chooseImage({
					count:1,
					sizeType: ['original', 'compressed'], 
					sourceType: ['album'], //从相册选择
					success: (res)=> {
						blobToBase64(res.tempFiles[0],(url)=>{
							this.currentItem.detail.url = url
							this.updateContentDetail({key:'url',value:url})
						})
					}
				})
			},
			_initCurrentItem(){
				// init now
				this.currentItem = this.pageInfo.content[this.editIndex]
				console.log(this.currentItem)
				const { type } = this.currentItem
				// init fontFamily
				if(type == 'text'){
					const { fontFamily } = this.currentItem.detail
					this.font.fontWeightIndex = this.font.fontWeightArray.findIndex((item,index)=>item == fontFamily)
				}else if(type == 'img'){ // init image
					const { url } = this.currentItem.detail
				}
			}
		},
		
	}
</script>

<style>
</style>
