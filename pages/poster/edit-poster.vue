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
			
			<!-- @click="modal('ps-setting-modal','open')" -->
			<view class="setting"  @click="addContent">
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
						<view class="yuan" @click="addContent">
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
		<uni-drawer ref="add-content-drawer" mode="left">
			<view class="ps-add-content-box">
				<view class="content-th">
					<view class="th-title">添加元素</view>
					<view class="iconfont icon-close" @click="drawer('add-content-drawer','close')"></view>
				</view>
				<view class="content-td">
					<view class="td-item">
						<view class="iconfont icon-Daytimemode"></view>
						<view class="text">
							文字
						</view>
					</view>
					<view class="td-item">
						<view class="iconfont icon-add"></view>
						<view class="text">
							图片
						</view>
					</view>
				</view>
			</view>
		</uni-drawer>
		<uni-drawer ref="edit-content-drawer" mode="right">
			<view class="ps-edit-content-box">
				<view class="content-th">
					<view class="th-title">编辑元素</view>
					<view class="iconfont icon-close" @click="drawer('add-content-drawer','close')"></view>
				</view>
				<view class="content-td">
					<view class="ps-edit-item">
						<view class="top">
							颜色
						</view>
						<view class="bottom">
							<view class="colors">
								<view class="color-item" style="background: #ff1d20;"></view>
								<view class="color-item" style="background: #ffaa00;"></view>
								<view class="color-item" style="background: #ffff00;"></view>
								<view class="color-item" style="background: #55ff00;"></view>
								<view class="color-item" style="background: #0565ff;"></view>
								<view class="color-item" style="background: #55ffff;"></view>
								<view class="color-item" style="background: #8800ff;"></view>
							</view>
						</view>
					</view>
					<view class="ps-edit-item">
						<view class="top">
							大小
						</view>
						<view class="bottom">
							  <slider value="60" show-value step="5" />
						</view>
					</view>
					<view class="ps-edit-item">
						<view class="top">
							字体
						</view>
						<view class="bottom">
							<view class="set-font-weight">
								<picker @change="bindFontWeight" :value="fontWeightIndex" :range="fontWeightArray">
									<view class="uni-input">{{fontWeightArray[fontWeightIndex]}}</view>
								</picker>
							</view>
							
						</view>
					</view>
					<view class="ps-edit-item">
						<view class="top">
							图片
						</view>
						<view class="bottom">
							<view class="set-image">
								<image src="@/static/image/1.jpg" mode="widthFix"></image>
								<view class="set-image-btn">
									<view class="iconfont icon-listing-content"></view>
									<view class="iconfont icon-close"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</uni-drawer>
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
			this.getClientRect('#bgImage').then((res)=>{
				console.log(res)
			})
			
		},
		methods: {
			...mapActions(['changeCoordinate','setEditIndex']),
			editEle(index){
				this.setEditIndex(index)
				this.drawer('edit-content-drawer','open')
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
			addContent(){
				this.drawer('add-content-drawer','open')
				this.modal('ps-setting-modal','close')
			},
			bindFontWeight(e){
				  this.fontWeightIndex = e.target.value
			}
		}
	}
</script>

<style>
	
</style>
