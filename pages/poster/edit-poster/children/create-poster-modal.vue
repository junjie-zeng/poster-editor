<template>
	<view class="ps-create-poster">
		<view class="ps-create-box">
			<view class="poster-heder">
				<text class="iconfont icon-close" @click="$modal('ps-create-poster-modal','close')"></text>
			</view>
			<view class="poster-body" v-if="posterUrl">
				<image :src="posterUrl" mode="widthFix"></image>
			</view>
			<view class="poster-info">
				<view class="title">提示：长按保存图片</view>
				<view class="pi-name">
					 <input v-model="posterName" type="text"placeholder="请输入海报名称" />
				</view>
			</view>
			<view class="poster-footer">
				<view class="ps-col-50">
					<view class="ps-btn ps-btn-lg ps-btn-blue" @click="saveLocal">保存本地</view>
				</view>
				<view class="ps-col-50">
					<view class="ps-btn ps-btn-lg ps-btn-blue-line"  @click="$modal('ps-create-poster-modal','close')">取消</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import broadcast from '@/common/mixins/broadcast.js'
	import wxAsync from '@/common/mixins/wxAsync.js'
	import modal from '@/common/mixins/modal.js'
	import {mapState, mapActions } from 'vuex'
	export default {
		mixins:[broadcast,wxAsync,modal],
		props:{
			currentEditType:{
				default:'new',
				type:String
			}
		},
		data(){
			return{
				posterName:''
			}
		},
		mounted() {
			this.posterName = this.pageInfo.name
		},
		computed:{
			...mapState(['posterUrl','pageInfo'])
		},
		methods: {
			
			saveLocal(){
				// console.log(this.currentEditType)
				let localPageList = localStorage.getItem('localPageList')
				let pageInfo = JSON.parse(JSON.stringify(this.pageInfo))
				let list = []
				
				if(!this.posterName){
					uni.showToast({
					    title: '海报名称不能为空',
					    icon: 'none'
					});
					return
				}
				
				if(localPageList){
					list = JSON.parse(localPageList)
					// 5
					if(list.length > 5){
						uni.showToast({
						    title: '本地最多保存2张海报',
						    icon: 'none'
						});
						return
					}
					
				}else{
					list = []
				}
				
				if(this.currentEditType == 'new'){ // new
					pageInfo.id = Date.now()
					pageInfo.type = 'my'
					
				}else{ // edit
					list.forEach((item,index)=>{
						let id = item.id
						if(id == pageInfo.id){
							pageInfo.id = item.id
							pageInfo.type = item.type
							list.splice(index,1) //del
						}
					})
				}
				pageInfo.url = this.posterUrl
				pageInfo.name = this.posterName
				list.push(pageInfo)
				console.log(pageInfo)
				try{
					localStorage.setItem('localPageList',JSON.stringify(list))
					uni.showToast({
						title: '保存成功',
						icon:'success',
						success() {
							console.log('success')
							uni.switchTab({
								url:'/pages/index/works/works'
							})
						}
					});
				}catch(e){
					uni.showToast({
						title: '保存失败，内容超出',
						icon:'none',
					});
				}
				
				// this.$modal('ps-create-poster-modal','close')
				
				
			}
		},
		
	}
</script>

<style>
</style>
