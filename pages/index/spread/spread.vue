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
							<view class="zfx"></view>
							<view class="tip">青藏高原</view>
						</view>
						<navigator url="/pages/poster/more-poster/index">
							<view class="iconfont icon-arrow-right"></view>
						</navigator>
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
									<view class="poster-item">
										<navigator url="/pages/poster/edit-poster/index">
											<view class="ps-cover">
												<image src="../../../static/image/1.jpg" ></image>
												<view class="poster-tips">
													<text class="iconfont icon-all"></text>
													<text>使用</text>
												</view>
											</view>
											<view class="des">青藏高原</view>
										</navigator>
										
									</view>
									<view class="poster-item">
										<view class="ps-cover">
											<image src="../../../static/image/4.jpg" ></image>
											<view class="poster-tips">
												<text class="iconfont icon-all"></text>
												<text>使用</text>
											</view>
										</view>
										<view class="des">四川盆地</view>
									</view>
									<view class="poster-item">
										<view class="ps-cover">
											<image src="../../../static/image/3.jpg" ></image>
											<view class="poster-tips">
												<text class="iconfont icon-all"></text>
												<text>使用</text>
											</view>
										</view>
										<view class="des">刚果高原</view>
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
