<template>
	<view class="ps-create-poster">
		<view class="ps-create-box">
			<view class="poster-heder">
				<text class="iconfont icon-close" @click="$modal('ps-create-poster-modal','close')"></text>
			</view>
			<view class="poster-body">
				<image :src="posterUrl" mode="widthFix"></image>
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
		computed:{
			...mapState(['posterUrl'])
		},
		methods: {
			
			saveLocal(){
				this.$modal('ps-create-poster-modal','close')
			}
		},
		
	}
</script>

<style>
</style>
