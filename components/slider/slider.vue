<template>
	<view class="slider">
		<slider value="10" 
			block-color = "#444546" 
			activeColor="#444546" 
			block-size="18" 
			show-value 
			min="22" 
			max="60" 
			step="1" 
			@change="setSlider"/>
		<text>px</text>								
	</view>
</template>

<script>
	export default {
		props:['type'],
		data() {
			return {
				
			}
		},
		methods: {
			setSlider(ev){
				const {value} = ev.detail
				const type = this.type
				this.$emit('setSlider',{type,value})
			}
		}
	}
</script>

<style lang="less">
	.slider{
		position: relative;
		width: 100%;
		uni-slider,slider{
			// width: 100%;
			margin: 0 10rpx;
			padding-right: 40rpx;
		}
		
		&>text{
			position: absolute;
			top: 0;
			right: 2px;
		}
	}
</style>
