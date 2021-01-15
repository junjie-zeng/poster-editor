<template>
	<view>
		<appHeader option ="personal" title = "宣传海报"></appHeader>
		<view class="ps-body">
			<view class="ps-inner-box ps-bg-linear">
				<view class="ps-full-box">
					<swiper class="swiper" >
						<swiper-item>
							<image src="../../../static/image/1.png" ></image>
						</swiper-item>
						<swiper-item>
							<image src="../../../static/image/2.png" ></image>
						</swiper-item>
						<swiper-item>
							<image src="../../../static/image/3.png" ></image>
						</swiper-item>
					</swiper>
				</view>
				<view class="ps-full-box">
					<view class="ps-scroll">
						<view class="scroll-left">
							<swiper class="swiper" vertical autoplay  interval="1500" circular style="height: 90rpx;" >
								<swiper-item>
									<view class="scroll-left-item">
										<view class="zfx"></view>
										<view class="tip">青藏高原</view>
									</view>
								</swiper-item>
								<swiper-item>
									<view class="scroll-left-item">
										<view class="zfx"></view>
										<view class="tip">adfasd</view>
									</view>
								</swiper-item>
							</swiper>
						</view>
						              
						<view class="scroll-right">
							<navigator url="/pages/poster/more-poster/index">
								<view class="many">更多</view>
								<view class="iconfont icon-arrow-right"></view>
							</navigator>
						</view>
						
					</view>
				</view>
			</view>
			<view class="ps-inner-box ps-bg-light-06 pd-25">
				<view class="ps-box-white">
					<view class="ps-full-box">
						<view class="ps-tb">
							<view class="ps-th">
								<text class="title">海报推荐</text>
								<!-- <view class="iconfont icon-arrow-right"></view> -->
							</view>
							<view class="ps-td">
								<view class="poster-recommend">
									<view class="poster-item" v-for="(item,index) in pageList" :key = "item.id">
										<navigator :url="'/pages/poster/edit-poster/index?id='+item.id">
											<view class="ps-cover">
												<image :src="item.url" ></image>
												<view class="poster-tips">
													<text class="iconfont icon-all"></text>
													<text>使用</text>
												</view>
											</view>
											<view class="des">{{item.name}}</view>
										</navigator>
										
									</view>
								</view>
							</view>
						</view>
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
				
			}
		},
		computed:{
			...mapState(['pageList'])
		},
		mounted() {
			console.log(this.pageList)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
