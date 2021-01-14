<template>
	<view class="drag-poster">
		<view id = "image-box" class="poster" :style="{minWidth:pageInfo.detail.width,minHeight:pageInfo.detail.height,backgroundColor:pageInfo.detail.background}">
			<!-- <image  src="@/static/image/2.png"  mode="widthFix"></image> -->
			<image   :src="pageInfo.detail.backgroundImage"  mode="widthFix"></image>
			<!-- <image  src="@/static/image/6.png" mode="widthFix"></image> -->
		</view>
		<view class="drag">
			<movable-area>
				<movable-view
					class="target" 
					direction="all" 
					animation= "false"
					scale= "true"
					v-for="(item,index) in pageInfo.content"
					:key = "index"
					:x="item.detail.x" 
					:y="item.detail.y" 
					@click = "editItem(index)" 
					@change = "updateRect($event,index,'change ...')"
					@scale = "updateScale"
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
					<!-- backgroundImage:'url('+item.detail.url+')' -->
					<view class="img" v-if="item.type == 'img'"
					:style = "{width:item.detail.width +'rpx',
					height:item.detail.height + 'rpx',
					borderRadius:item.detail.borderRadius + '%',
					overflow: 'hidden',
					backgroundColor:item.detail.bgColor,
					}">
						<image  :src="item.detail.url" ></image>
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
				fontWeightArray:[1,2,3]
			}
		},
		computed:{
			...mapState(['pageInfo'])
		},
		mounted(){
			
			
		},
		methods: {
			...mapActions(['changeCoordinate','setEditIndex']),
			editItem(index){
				this.setEditIndex(index)
				this.$drawer('edit-content-drawer','open')
				
				
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
			},
			updateScale(e){
				const  {x,y, scale} = e.detail
				console.log(e)
				
			}
		}
	}
</script>

<style>
</style>
