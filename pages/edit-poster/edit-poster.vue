<template>
	<view>
		<view class="ps-header">
			<view class="header-left">
				<view class="iconfont icon-arrow-left"></view>
			</view>
			<view class="header-center">
				编辑海报
			</view>
		</view>
		<view class="ps-opertion-btn">
			<view class="setting"  @click="modal('ps-setting-modal','open')">
				<view class=""></view>
				+
			</view>
		</view>
		<view class="drag-poster">
			<view class="poster">
				<image id = "bgImage" src="@/static/image/2.png"  mode="widthFix"></image>
				<!-- <image id = "bgImage" src="@/static/image/6.png" mode="widthFix"></image> -->
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
		<!-- uniPopup -->
		<uniPopup ref = "ps-setting-modal">
			<view class="ps-setting-box ">
				<view class="setting-left">
					<view class="left-item">
						<view class="yuan">
							<text class="iconfont icon-left-element"></text>
						</view>
						<text class="desc">更换背景</text>
					</view>
					<view class="left-item">
						<view class="yuan">
							<text class="iconfont icon-add"></text>
						</view>
						<text class="desc">添加</text>
					</view>
					<view class="left-item">
						<view class="yuan">
							<text class="iconfont icon-Daytimemode"></text>
						</view>
						<text class="desc">添加</text>
					</view>
					<view class="left-item">
						<view class="yuan delbg" @click="modal('ps-setting-modal','close')">
							<text class="iconfont icon-close "></text>
						</view>
					</view>
				</view>
				<view class="setting-right">
					<view class="right-item">
						<view class="yuan" @click="modal('ps-create-poster-modal','open')">
							<text class="iconfont icon-vip"></text>
						</view>
						<text class="desc">生成海报</text>
					</view>
				</view>
			</view>
		</uniPopup>
		<uniPopup ref = "ps-create-poster-modal">
			<view class="ps-create-poster">
				<view class="ps-create-box">
					<view class="poster-heder">
						<text class="iconfont icon-close" @click="modal('ps-create-poster-modal','close')"></text>
					</view>
					<view class="poster-body">
						<image src="../../static/image/1.png" mode="widthFix"></image>
					</view>
					<view class="poster-footer">
						<view class="ps-col-50">
							<view class="ps-btn ps-btn-lg ps-btn-blue">保存本地</view>
						</view>
						<view class="ps-col-50">
							<view class="ps-btn ps-btn-lg ps-btn-blue-line"  @click="modal('ps-create-poster-modal','close')">取消</view>
						</view>
					</view>
				</view>
			</view>
		</uniPopup>
	</view>
</template>

<script>
	import broadcast from '@/common/mixins/broadcast.js'
	import wxAsync from '@/common/mixins/wxAsync.js'
	import modal from '@/common/mixins/modal.js'
	import {mapState, mapActions } from 'vuex'
	export default {
		// props:['pageInfo'],
		mixins:[broadcast,wxAsync,modal],
		data() {
			return {
				
			}
		},
		computed:{
			...mapState(['pageInfo'])
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

<style>

</style>
