<template>
	<view class="ps-add-content-box">
		<view class="content-th">
			<view class="th-title">添加元素</view>
			<view class="iconfont icon-close" @click="$drawer('add-content-drawer','close')"></view>
		</view>
		<view class="content-td">
			<view class="td-item" @click="add('text')">
				<view class="iconfont icon-Daytimemode"></view>
				<view class="text">
					文字
				</view>
			</view>
			<view class="td-item" @click="add('img')">
				<view class="iconfont icon-add"></view>
				<view class="text">
					图片
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import broadcast from '@/common/mixins/broadcast.js'
	import wxAsync from '@/common/mixins/wxAsync.js'
	import drawer from '@/common/mixins/drawer.js'
	import {mapState, mapActions } from 'vuex'
	export default {
		mixins:[broadcast,wxAsync,drawer],
		methods: {
			...mapActions(['addContent']),
			add(type){
				let content = null
				switch(type){
					case 'text':
						content = {
							id:0,
							type:'text',
							detail:{x:0,y:0,fontSize:20,content:'Nike',color:'black',fontFamily:'微软雅黑'}
						}
					break
					case 'img':
						content = {
							id:2,
							type:'img',
							detail:{x:0,y:0,width:100,height:100,url:'../../../static/image/nike.jpg',borderRadius:10,bgColor:'pink'},
							// borderRadius最大值50
						}
					break
				}
				this.addContent(content)
				this.$drawer('add-content-drawer','close')
			}
		},
		
	}
</script>

<style>
</style>
