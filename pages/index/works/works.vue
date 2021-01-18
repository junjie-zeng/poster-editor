<template>
	<view class="works">
		<appHeader option ="personal" title = "我的作品"></appHeader>
		<view class="ps-works-box" >
			<view class="not-works" v-if="!pageList.length">
				<view class="title">暂无作品，去 
					<navigator class="zhizuo" url="/pages/index/spread/spread" open-type="switchTab">
						制作
					</navigator>
				</view>
				<view class="iconfont icon-empty"></view>
			</view>
			<view class="ps-works-list" v-else>
				<view class="ps-w-list-item" v-for="(item, index) in pageList" :key="index">
					<view class="w-list-item-left">
						<view class="item-left-img">
							<image :src="item.url" ></image>
						</view>
						<view class="item-left-text">{{item.name}}</view>
					</view>
					<view class="w-list-item-right">
						<picker @change="operationChange($event,item.id)" :range="op.opArray" >
							<view class="iconfont icon-dian"></view>
						</picker>
						
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState,mapActions } from 'vuex'
	export default {
		data() {
			return {
				pageList:[],
				op:{
					opIndex:0,
					opArray:['编辑','删除'],
				}
			}
		},
		onShow() {
			// console.log('show ...')
			this.initLocalPageList() 
		},
		methods: {
			operationChange(e,id){
				const { value } = e.detail
				// edit
				if(value === 0){
					uni.navigateTo({
						url:`/pages/poster/edit-poster/index?id=${id}&type=edit`
					})
				}else if(value === 1){ // del
					// console.log("del")
					this.pageList.forEach((item,index)=>{
						if(item.id == id){
							this.pageList.splice(index,1)
						}
					})
					localStorage.setItem('localPageList',JSON.stringify(this.pageList))
				}
				
			},
			initLocalPageList(){
				let localPageList = localStorage.getItem('localPageList')
				if(localPageList){
					this.pageList = JSON.parse(localPageList)
				}
			}
		}
	}
</script>

<style>

</style>
