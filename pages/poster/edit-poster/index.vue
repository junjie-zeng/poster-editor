<template>
	<view>
		<appHeader option ="back" title = "海报海报"></appHeader>
		
		<view class="ps-opertion-btn">
			<!-- @click="modal('ps-setting-modal','open')" @click="addContent" -->
			<view class="setting" @click="operation" >
				<view class=""></view>
				+
			</view>
		</view>
		
		<!-- drag -->
		<drag></drag>
		
		
		<!-- test -->
	<!-- 	<view class="" style="margin-top: 50px;">
			<poster ref = "poster" :pageInfo = "pageInfo" ></poster>
			<image :src="testUrl" mode=""></image>
		</view> -->
		
		
		<!-- tset -->
		<!-- uniPopup -->
		<uniPopup ref = "ps-setting-modal">
			<operation-setting-modal></operation-setting-modal>
		</uniPopup>
		<uniPopup ref = "ps-create-poster-modal">
			<create-poster-modal></create-poster-modal>
		</uniPopup>
		<!-- drawer -->
		<uni-drawer ref="add-content-drawer" mode="left">
			<add-content-drawer></add-content-drawer>
		</uni-drawer>
		<uni-drawer ref="edit-content-drawer" mode="right">
			<edit-content-drawer></edit-content-drawer>
		</uni-drawer>
		
	</view>
</template>

<script>
	import {mapState, mapActions } from 'vuex'
	import broadcast from '@/common/mixins/broadcast.js'
	import wxAsync from '@/common/mixins/wxAsync.js'
	import modal from '@/common/mixins/modal.js'
	import drawer from '@/common/mixins/drawer.js'
	import drag from './children/drag.vue'
	import operationSettingModal from './children/operation-setting-modal.vue'
	import createPosterModal from './children/create-poster-modal.vue'
	import addContentDrawer from './children/add-content-drawer.vue'
	import editContentDrawer from './children/edit-content-drawer.vue'
	export default {
		// props:['pageInfo'],
		mixins:[broadcast,wxAsync,modal,drawer],
		data() {
			return {
				testUrl:''
			}
		},
		computed:{
			...mapState(['pageInfo'])
		},
		onLoad(option) {
			// console.log(option)
			this.getPageInfo(option.id)
		},
		mounted(){
			console.log('mounted ...')
			
		},
		methods: {
			...mapActions(['updateContent','getPageInfo']),
			async operation(){
				this.modal('ps-setting-modal','open')
				
				
			},
			async operation2(){
				
				try{
					let { width,height } = await this.getClientRect('#image-box')
					this.updateContent({key:'width',value:width})
					this.updateContent({key:'height',value:height})
					this.$refs.poster.createPoster((res)=>{
						console.log(res.tempFilePath)
						this.testUrl = res.tempFilePath
						
					})
				}catch(e){console.log('create poster ...',e)}
			}
		},
		components:{
			drag,
			operationSettingModal,
			createPosterModal,
			addContentDrawer,
			editContentDrawer
		}
	}
</script>

<style>
	
</style>
