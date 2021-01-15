<template>
	<view>
		<appHeader option ="back" title = "更多海报"></appHeader>
		<view class="ps-more-poster-box">
			<view class="ps-more-th">
				<view class="search">
					<input class="search-input" type="text" v-model="searchName" placeholder="请输入关键词"/>
					<view class="iconfont icon-sousuo"></view>
				</view>
				<view class="tab">
					<view  v-for="(item,index) in tabs" :key = "index" :class="['tab-item',(currentIndex == index ?'active':'')]" @click="handleSwitchTab(index,item)">
						<text>{{item}}</text>
						<text></text>
					</view>
				</view>
			</view>
			<view class="ps-more-td">
				<view class="ps-more-list">
					<view class="ps-list-item" v-for="(item,index) in fliterList" @click="gotoEdit(item.id)">
						<view class="ps-cover">
							<image :src="item.url" mode=""></image>
							<view class="poster-tips">
								<text class="iconfont icon-lunkuohua2_rilifuben"></text>
								<text>使用</text>
							</view>
						</view>
						<text class="item-desc">{{item.name}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState,mapActions} from 'vuex'
	export default {
		data() {
			return {
				tabs:['全部海报','系统海报','我的海报'],
				currentIndex:0,
				currentType:'all',
				searchName:''
			}
		},
		computed:{
			...mapState(['pageList']),
			fliterList(){
				if(this.searchName){
					if(this.currentType == 'all'){
						return this.pageList.filter(item=>item.name.indexOf(this.searchName)>-1)
					}else{
						let list = this.pageList.filter(item=>item.type == this.currentType)
						let sameTypeList = list.filter(item=>item.name.indexOf(this.searchName)>-1)
						return sameTypeList
					}
				}
				
				if(this.currentType == 'all'){
					return this.pageList
				}else{
					return this.pageList.filter(item=>item.type == this.currentType)
				}
				
			}
		},
		methods: {
			handleSwitchTab(index,item){
				let currentType = item == '系统海报' ? 'system':item == '我的海报' ? 'my':'all'
				this.currentType = currentType
				this.currentIndex = index
				console.log(this.currentType)
				
			},
			gotoEdit(id){
				uni.navigateTo({
					url:`/pages/poster/edit-poster/index?id=${id}`
				})
			}
		}
	}
</script>

<style>

</style>
