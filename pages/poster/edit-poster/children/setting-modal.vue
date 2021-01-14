<template>
	<view class="ps-setting-box ">
		<view class="setting-left">
			<view class="left-item">
				<view class="yuan" @click="handleUpdateBg">
					<text class="iconfont icon-left-element"></text>
				</view>
				<text class="desc">更换背景</text>
			</view>
			<view class="left-item">
				<view class="yuan" @click="handleClearBg">
					<text class="iconfont icon-add"></text>
				</view>
				<text class="desc">清除背景</text>
			</view>
			<view class="left-item">
				<view class="yuan" @click="open">
					<text class="iconfont icon-Daytimemode"></text>
				</view>
				<text class="desc">添加元素</text>
			</view>
			<view class="left-item">
				<view class="yuan delbg" @click="$modal('ps-setting-modal','close')">
					<text class="iconfont icon-close "></text>
				</view>
			</view>
		</view>
		<view class="setting-right">
			<view class="right-item">
				<view class="yuan" @click="createPoster">
					<text class="iconfont icon-vip"></text>
				</view>
				<text class="desc" >生成海报</text>
			</view>
		</view>
		<poster ref = "poster" :pageInfo = "pageInfo" ></poster>
	</view>
</template>

<script>
	import broadcast from '@/common/mixins/broadcast.js'
	import wxAsync from '@/common/mixins/wxAsync.js'
	import modal from '@/common/mixins/modal.js'
	import drawer from '@/common/mixins/drawer.js'
	import poster from '@/components/poster/poster.vue'
	import {mapState, mapActions } from 'vuex'
	export default {
		mixins:[broadcast,wxAsync,modal,drawer],
		computed:{
			...mapState(['pageInfo'])
		},
		methods: {
			...mapActions(['updateContent','setPosterUrl']),
			open(){
				this.$drawer('add-content-drawer','open')
				this._closeSettingModal()
			},
			handleUpdateBg(){
				uni.chooseImage({
					count:1,
					sizeType: ['original', 'compressed'], 
					sourceType: ['album'], //从相册选择
					success: (res)=> {
						let url = res.tempFilePaths[0]
						this.updateContent({key:'backgroundImage',value:url})
					}
				})
				this._closeSettingModal()
			},
			handleClearBg(){
				this.updateContent({key:'backgroundImage',value:''})
				this._closeSettingModal()
				
			},
			async createPoster(){
				// console.log(this.$refs.poster)
				uni.showLoading({
				    title: '正在生成'
				});
				try{
					let { width,height } = await this.getClientRect('#image-box')
					this.updateContent({key:'width',value:width})
					this.updateContent({key:'height',value:height})
					this.$refs.poster.createPoster((res)=>{
						uni.hideLoading();
						console.log(res)
						this.setPosterUrl(res.tempFilePath)
						this._closeSettingModal()
						this.$modal('ps-create-poster-modal','open')
					})
				}catch(e){console.log('create poster ...',e)}
				
				
			},
			_closeSettingModal(){
				this.$modal('ps-setting-modal','close')
			}
		},
		
	}
</script>

<style>
</style>
