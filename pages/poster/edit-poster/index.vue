<template>
	<view>
		<appHeader option ="back" :title = "pageInfo.name"></appHeader>
		
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
			<create-poster-modal :currentEditType="currentEditType"></create-poster-modal>
		</uniPopup>
		<!-- drawer -->
		<uni-drawer ref="add-content-drawer" mode="left">
			<add-content-drawer></add-content-drawer>
		</uni-drawer>
		<uni-drawer ref="edit-content-drawer" mode="right">
			<edit-content-drawer></edit-content-drawer>
		</uni-drawer>
		<uni-drawer ref="bg-set-drawer" mode="left">
			<background-set-drawer></background-set-drawer>
		</uni-drawer>
		<!-- <t-color-picker ref="colorPicker" :color="color" @confirm="confirm"></t-color-picker> -->
	</view>
</template>

<script>
	import {mapState, mapActions } from 'vuex'
	import broadcast from '@/common/mixins/broadcast.js'
	import wxAsync from '@/common/mixins/wxAsync.js'
	import modal from '@/common/mixins/modal.js'
	import drawer from '@/common/mixins/drawer.js'
	import colorPicker from '@/common/mixins/color-picker.js'
	import drag from './children/drag.vue'
	import operationSettingModal from './children/operation-setting-modal.vue'
	import createPosterModal from './children/create-poster-modal.vue'
	import addContentDrawer from './children/add-content-drawer.vue'
	import editContentDrawer from './children/edit-content-drawer.vue'
	import backgroundSetDrawer from './children/background-set-drawer.vue'
	import tColorPicker from '@/components/t-color-picker/t-color-picker.vue'
	
	export default {
		// props:['pageInfo'],
		mixins:[broadcast,wxAsync,modal,drawer,colorPicker],
		data() {
			return {
				testUrl:'',
				currentEditType:'',
				color: {r: 255,g: 0,b: 0,a: 0.6}
			}
		},
		computed:{
			...mapState(['pageInfo'])
		},
		onLoad(option) {
			// console.log(option)
			const {id,type} = option
			this.getPageInfo(id)
			this.currentEditType = type
		},
		mounted(){
			// console.log('mounted ...')
			
		},
		methods: {
			...mapActions(['updateContent','getPageInfo']),
			async operation(){
				this.modal('ps-setting-modal','open')
				
				
			},
			confirm(e) {
				console.log('颜色选择器返回值：'+ e.hex)
				this.modifyCurrentItem('color',e.hex)
			},
			// test
			// async operation2(){
				
			// 	try{
			// 		let { width,height } = await this.getClientRect('#image-box')
			// 		this.updateContent({key:'width',value:width})
			// 		this.updateContent({key:'height',value:height})
			// 		this.$refs.poster.createPoster((res)=>{
			// 			console.log(res.tempFilePath)
			// 			this.testUrl = res.tempFilePath
						
			// 		})
			// 	}catch(e){console.log('create poster ...',e)}
			// }
		},
		components:{
			drag,
			operationSettingModal,
			createPosterModal,
			addContentDrawer,
			editContentDrawer,
			backgroundSetDrawer,
			tColorPicker
		}
	}
</script>

<style>
	
</style>
