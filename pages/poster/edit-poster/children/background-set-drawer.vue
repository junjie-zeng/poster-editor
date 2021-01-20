<template>
	<view class="bg-set-box">
		<view class="content-th">
			<view class="th-title">背景设置</view>
			<view class="iconfont icon-close" @click="$drawer('bg-set-drawer','close')"></view>
		</view>
		<view class="content-td" v-if="pageInfo">
			<view class="ps-edit-item">
				<view class="top">
					背景颜色
				</view>
				<view class="bottom">
					<view class="colors">
						<view class="color-item" :style="{
							'background':(`rgba(${color.rgba.r},${color.rgba.g},${color.rgba.b},${color.rgba.a})`)
							}" @click="openColorPicker"></view>
					</view>
				</view>
			</view>
			<view class="ps-edit-item">
				<view class="top">
					背景图片
				</view>
				<view class="bottom">
					<view class="set-image">
						<image v-if="pageInfo.detail.backgroundImage" :src="pageInfo.detail.backgroundImage" mode="widthFix"></image>
						<view v-else class="not-img iconfont icon-tupian"></view>
						<view class="set-image-btn">
							<view class="iconfont icon-shangchuantupian" @click="handleUpdateBgColor"></view>
							<view class="iconfont icon-close" @click="handleClearBgColor"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<t-color-picker ref="bgColorPicker" :color="color.rgba" @confirm="confirmColor"></t-color-picker>
	</view>
</template>

<script>
	import broadcast from '@/common/mixins/broadcast.js'
	import wxAsync from '@/common/mixins/wxAsync.js'
	import drawer from '@/common/mixins/drawer.js'
	import colorPicker from '@/common/mixins/color-picker.js'
	import { mapState, mapActions } from 'vuex'
	import tColorPicker from '@/components/t-color-picker/t-color-picker.vue'
	import { blobToBase64,getRgbaColor,splitRgbaColor } from '@/common/tools/index.js'
	export default {
		mixins:[broadcast,wxAsync,drawer,colorPicker],
		data() {
			return {
				color:{
					rgba:{r: 48,g: 8,b: 8,a: 0.6},
					key:''
				}
			}
		},
		computed:{
			...mapState(['pageInfo'])
		},
		mounted() {
			console.log("mounted ..")
			this._initBgColor()
		},
		methods: {
			...mapActions(['updateContent']),
			openColorPicker() {
				// 打开颜色选择器
				this.$showColorPicker('bgColorPicker','open')
			},
			confirmColor(e) {
				let rgbaColor = getRgbaColor(e.rgba)
				this.color.rgba = e.rgba
				this.updateContent({key:'background',value:rgbaColor})
			},
			handleUpdateBgColor(){
				uni.chooseImage({
					count:1,
					sizeType: ['original', 'compressed'], 
					sourceType: ['album'], //从相册选择
					success: (res)=> {
						blobToBase64(res.tempFiles[0],(url)=>{
							this.updateContent({key:'backgroundImage',value:url})
							this.updateContent({key:'width',value:'auto'})
							this.updateContent({key:'height',value:'auto'})
						})
					}
				})
			},
			handleClearBgColor(){
				this.updateContent({key:'backgroundImage',value:''})
			},
			_initBgColor(){
				const { detail } = this.pageInfo
				this.color.rgba = splitRgbaColor(detail.background)
			}
		},
		components:{
			tColorPicker
		}
	}
</script>

<style>
</style>
