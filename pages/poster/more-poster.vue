<template>
	<view>
		<view class="ps-header">
			<view class="header-left">
				<view class="iconfont icon-arrow-left"></view>
			</view>
			<view class="header-center">
				更多海报
			</view>
		</view>
		<view class="ps-more-poster-box">
			<view class="ps-more-th">
				<view class="search">
					<input class="search-input" type="text" value="" placeholder="请输入关键词"/>
					<view class="iconfont icon-service"></view>
				</view>
				<view class="tab">
					<view class="tab-item active">
						<text>全部海报</text>
						<text></text>
					</view>
					<view class="tab-item">
						<text>系统海报</text>
						<text></text>
					</view>
					<view class="tab-item">
						<text>我的海报</text>
						<text></text>
					</view>
				</view>
			</view>
			<view class="ps-more-td">
				<view class="ps-more-list">
					<view class="ps-list-item">
						<view class="ps-cover">
							<image src="../../static/image/1.jpg" mode=""></image>
							<view class="poster-tips">
								<text class="iconfont icon-all"></text>
								<text>使用</text>
							</view>
						</view>
						<text class="item-desc">喜马拉雅</text>
					</view>
					<view class="ps-list-item">
						<view class="ps-cover">
							<image src="../../static/image/4.jpg" mode=""></image>
							<view class="poster-tips">
								<text class="iconfont icon-all"></text>
								<text>使用</text>
							</view>
						</view>
						<text class="item-desc">喜马拉雅</text>
					</view>
					
					<view class="ps-list-item">
						<view class="ps-cover">
							<image src="../../static/image/3.jpg" mode=""></image>
							<view class="poster-tips">
								<text class="iconfont icon-all"></text>
								<text>使用</text>
							</view>
						</view>
						<text class="item-desc">喜马拉雅</text>
					</view>
					
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
