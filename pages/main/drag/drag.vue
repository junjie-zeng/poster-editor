<template>
	<view class="drag-poster">
		<view class="poster">
			<image id = "bgImage" :src="pageInfo.detail.backgroundImage"  mode="widthFix"></image>
			<!-- <image id = "bgImage" src="../../../static/image/6.png" mode="widthFix"></image> -->
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
					@click="editEle(index)" 
					@change="updateRect($event,index,'change ...')"
				
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
	</view>
</template>

<script>
	import broadcast from '../../../common/mixins/broadcast.js'
	import wxAsync from '../../../common/mixins/wxAsync.js'
	import { mapActions } from 'vuex'
	export default {
		props:['pageInfo'],
		mixins:[broadcast,wxAsync],
		data() {
			return {
				
			}
		},
		mounted(){
			this.getClientRect('#bgImage').then((res)=>{
				console.log(res)
			})
			
		},
		methods: {
			...mapActions(['changeCoordinate','setEditIndex']),
			editEle(index){
				this.setEditIndex(index)
				this.open('Drawer','edit-content-panel','open')
				
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
			}
		}
	}
</script>

<style lang="less">
	.drag-poster {
		position: relative;
		min-height: 200rpx;
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
	}
</style>
