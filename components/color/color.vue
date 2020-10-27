<template>
	<view class="color-set">
		<view class="color" v-for="(c,i) in colors" :key = "i" :style="{background:c}" @click="setColor(c)"></view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				colors:['#FFFFFF','#000000','#ff0000','#ffaa00','#ffff00','#00ff00','#00ff7f','#00aaff','#5555ff']
			}
		},
		methods:{
			setColor(c){
				this.$emit('setColor',c)
			}
		}
	}
</script>

<style lang="less">
	.color-set{
		display: flex;
		align-items: center;
		&>.color{
			width: 35rpx;
			height: 35rpx;
			margin-right: 5rpx;
		}
	}
</style>
