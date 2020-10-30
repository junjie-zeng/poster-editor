<template>
	<view class = "poster-box">
		<!-- drag -->
		<drag :pageInfo = "pageInfo"></drag>
		<!-- opertion -->
		<view v-if="isShow">
			<view class="page-setting" @click="setting" >
				<view class=""></view>
				+
			</view>
			<view class="page-complete" @click="createPoster" >
				完成
			</view>
		</view>
		<!-- uni-drawer -->
		<uni-drawer ref="add-content-panel" mode="left">
			<addContentPanel :pageInfo = "pageInfo"></addContentPanel>
		</uni-drawer>
		<uni-drawer ref="edit-content-panel" mode="right">
			<editContentPanel ></editContentPanel>
		</uni-drawer>
		<!-- page setting -->
		<uni-popup ref="page-popup" type="center" @change = "getPagePopupStatus">
			<page-popup></page-popup>
		</uni-popup>
		<!-- picture-library -->
		<uni-popup ref="picture-library-popup" type="center">
			<picture-librar-popup></picture-librar-popup>
		</uni-popup>
		<!-- poster -->
		<uni-popup ref="create-poster-popup" type="center">
			<create-poster-popup :pageInfo = "pageInfo"></create-poster-popup>
		</uni-popup>
		<!-- poster -->
		<poster ref = "poster" :pageInfo = "pageInfo" ></poster>
	</view>
</template>

<script>
	import drag from '../drag/drag.vue'
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import pagePopup from '../page-popup/page-popup.vue'
	import addContentPanel from '../add-content-panel/add-content-panel.vue'
	import editContentPanel from '../edit-content-panel/edit-content-panel.vue'
	import pictureLibrarPopup from '../picture-library-popup/picture-library-popup.vue'
	import createPosterPopup from '../create-poster-popup/create-poster-popup.vue'
	import poster from '../../../components/poster/poster.vue'
	import EV from '../../../static/lib/js/ev.js'
	import { mapState,mapActions } from 'vuex'
	export default { 
		data() {
			return {
				isShow:true
			}
		},
		computed:{
			...mapState(['pageInfo']),
		},
		mounted(){
			
			// Popup
			EV.$on('Popup',(res)=>{
				const {key,status} = res
				this.$refs[key][status]()
			})
			// Drawer
			EV.$on('Drawer',(res)=>{
				const {key,status} = res
				this.$refs[key][status]()
			})
			
			
		},
		methods: {
			...mapActions(['setPosterUrl']),
			// open
			open(e){
				this.$refs[e].open()
			},
			// close
			close(e){
				this.$refs[e].close()
			},
			// 获取页面设置的状态
			getPagePopupStatus(e){
				const {show} = e
				this.isShow = !show
			},
			// setting
			setting(){
				this.open('page-popup')
				
			},
			// 创建海报
			createPoster(){
				// console.log(this.$refs.poster)
				// this.open('create-poster-popup')
				this.$refs.poster.createPoster((res)=>{
					console.log(res)
					this.setPosterUrl(res.tempFilePath)
					this.open('create-poster-popup')
				})
				
				
			}
		},
		beforeDestroy(){
			EV.$off('Popup')
			EV.$off('Drawer')
		},
		components:{
			drag,
			uniPopup,
			uniDrawer,
			pagePopup,
			addContentPanel,
			editContentPanel,
			pictureLibrarPopup,
			createPosterPopup,
			poster
		}
	}
</script>

<style lang="less">
	body,page{
		background: #494a4b;
	}
	.poster-box{
		.page-setting{
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
		
		.page-complete{
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
	}
</style>
