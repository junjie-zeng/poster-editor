<template>
	<view class="drag-poster">
		<view id = "image-box" class="poster" :style="{
				width:pageInfo.detail.width == 'auto'? 'auto' : pageInfo.detail.width + 'px',
				height:pageInfo.detail.height == 'auto' ? 'auto' : pageInfo.detail.height + 'px',
				backgroundColor:pageInfo.detail.background}">
			<!-- <image  src="@/static/image/2.png"  mode="widthFix"></image> -->
			<image   :src="pageInfo.detail.backgroundImage"  mode="widthFix"></image>
			<!-- <image  src="@/static/image/6.png" mode="widthFix"></image> -->
		</view>
		<view class="drag">
			<movable-area @click="currentIndex=-1">
				<movable-view
					:class="['target',(currentIndex == index?'sl':'')]"
					direction="all" 
					animation= "false"
					scale= "true"
					v-for="(item,index) in pageInfo.content"
					:key = "index"
					:x="item.detail.x" 
					:y="item.detail.y" 
					@click.stop="currentIndex = index"
					@change.stop = "updateRect($event,index,'change ...')"
					@scale.stop = "updateScale($event,index,'scale ...')"
					>
					<!-- 	 -->
					<!-- text -->
					<view class="text" 
						:contenteditable="isContenteditable"
							v-if="item.type == 'text'"
							:style="{fontSize:item.detail.fontSize+'px',
									color:item.detail.color,
									fontFamily:item.detail.fontFamily}">
						{{item.detail.content}}
					</view>
					<!-- image -->
					<!-- backgroundImage:'url('+item.detail.url+')' -->
					<view class="img" v-if="item.type == 'img'"
					:style = "{width:item.detail.width +'rpx',
					height:item.detail.height + 'rpx',
					borderRadius:item.detail.borderRadius + '%',
					overflow: 'hidden',
					backgroundColor:item.detail.bgColor,
					}">
						<image  :src="item.detail.url" :name = "item.detail.url" ></image>
						<!-- <image  src="@/static/image/nike.jpg" ></image> -->
						
					</view>
					<!-- operator -->
					<view v-if="currentIndex == index">
						<!-- edit -->
						<view class="operator-item edit-ele" @click.stop = "editItem(index)" >
							<view class=" iconfont icon-bianji"></view>
						</view>
						<!-- del -->
						<view class="operator-item del-ele" @click.stop="del(index)">
							<view class=" iconfont icon-shanchu"></view>
						</view>
						<!-- copy -->
						<view class="operator-item copy-ele" @click.stop="copy(index)">
							<view class=" iconfont icon-fuzhi-"></view>
						</view>
					</view>
				</movable-view>
			</movable-area>
		</view>
	</view>
</template>

<script>
	import broadcast from '@/common/mixins/broadcast.js'
	import wxAsync from '@/common/mixins/wxAsync.js'
	import modal from '@/common/mixins/modal.js'
	import drawer from '@/common/mixins/drawer.js'
	import {mapState, mapActions } from 'vuex'
	export default {
		// props:['pageInfo'],
		mixins:[broadcast,wxAsync,modal,drawer],
		data() {
			return {
				fontWeightIndex:0,
				fontWeightArray:[1,2,3],
				touchStartTime:0,
				isContenteditable:false,
				currentIndex:-1
			}
		},
		computed:{
			...mapState(['pageInfo'])
		},
		mounted(){
			// console.log(this.pageInfo)
			
		},
		methods: {
			...mapActions(['changeCoordinate','setEditIndex','delContent','copyContent','scaleElement']),
			editItem(index){
				// if (this.touchStartTime == 0) {
				// 	this.touchStartTime = new Date().getTime()
				// } else {
				// 	if (new Date().getTime() - this.touchStartTime <= 300) {
						// start ...
						this.setEditIndex(index)
						this.$drawer('edit-content-drawer','open')
						// end ...
				// 	}
				// 	this.touchStartTime = 0
				// }
				this.currentIndex = index
				
			},
			updateRect(ev,index,type){
				const {x,y,source} = ev.detail
				if(source && source == 'touch'){
					console.log({
						x:x,
						y:y,
						source:source
					})
					this.changeCoordinate({index,x,y})
				}
				this.currentIndex = index
			},
			updateScale(e){
				const  {x,y, scale} = e.detail
				console.log(e)
				// this.scaleElement()
			},
			del(index){
				this.delContent(index)
			},
			copy(index){
				this.copyContent(index)
			}
		}
	}
</script>

<style>
</style>
