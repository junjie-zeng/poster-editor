<template>
	<view class="ps-setting-box ">
		<view class="setting-left">
			<view class="left-item">
				<view class="yuan" @click="backgroundSetting">
					<text class="iconfont icon-background"></text>
				</view>
				<text class="desc">背景设置</text>
			</view>
			<view class="left-item">
				<view class="yuan" @click="open">
					<text class="iconfont icon-3jichuyuansu"></text>
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
				<view class="yuan" @click="handleCreatePoster">
					<text class="iconfont icon-ok"></text>
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
	import { blobToBase64 } from '@/common/tools/index.js'
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
			backgroundSetting(){
				this.$drawer('bg-set-drawer','open')
				this._closeSettingModal()
			},
			async handleCreatePoster(){
				// console.log(this.$refs.poster)
				uni.showLoading({
				    title: '正在生成'
				});
				try{
					let { width,height } = await this.getClientRect('#image-box')
					console.log(width,height)
					this.updateContent({key:'width',value:width})
					this.updateContent({key:'height',value:height})
					
					this.$refs.poster.createPoster(this.pageInfo,(res)=>{
						uni.hideLoading();
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
