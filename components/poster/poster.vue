<template>
	<!-- hideCanvas -->
	<view class="hideCanvas">
		<canvas  canvas-id="poster" :style="{ width: (poster.width || 1) + 'px', height: (poster.height || 1) + 'px' }"></canvas>			  
	</view>
</template>

<script>
	export default {
		props:['pageInfo'],
		data() {
			return {
				poster:{},
				canvasId:'poster'
			};
		},
		methods:{
			createPoster(callback){
				// 页面信息
				const {detail,content:contents} = this.pageInfo
				// 背景图片宽高
				const {width,height}  = this.pageInfo.detail//await this.getClientRect('#bgImage')
				// 海报
				let context = uni.createCanvasContext(this.canvasId)
				// 设置canvas的宽和高
				this.$set(this.poster,'width',width)
				this.$set(this.poster,'height',height)
				// 绘制背景
				context.drawImage(detail.backgroundImage, 0, 0, width, height)
				
				contents.forEach((item)=>{
					const {detail:d} = item
					switch(item.type){
						case 'text':
							context.setFillStyle(d.color)
							context.setFontSize(d.fontSize)
							// 默认加上20不然高度不对
							context.fillText(d.content,d.x,d.y + 20)
							break
							
						case 'img':
							let x = d.x, // x轴
								y = d.y, // y轴
								r = d.borderRadius/2, // 10 圆角大小
								w = d.width / 2, // 宽
								h = d.height / 2 // 高
							// 先保存状态 已便于画完圆再用
							context.save()
							 //开始绘制
							context.beginPath()
							// 先画个圆
							// x:图片坐标+图片宽度/2/2 ,
							// y坐标:图片坐标+图片高度/2/2
							// 半径：图片高度/2/2 
							// ----------------
							// context.arc(d.x+d.width/2/2,  d.y+d.height/2/2, d.height/2/2, 0, Math.PI * 2);
							// context.setFillStyle('red')
							// // 保证图片无bug填充
							// context.fill()
							// // 画了圆 再剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
							// context.clip()
							// ----------------
							context.setFillStyle('transparent')
							// 左上角
							context.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
							// border-top
							context.moveTo(x + r, y)
							context.lineTo(x + w - r, y)
							context.lineTo(x + w, y + r)
							// 右上角
							context.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
							 
							// border-right
							context.lineTo(x + w, y + h - r)
							context.lineTo(x + w - r, y + h)
							// 右下角
							context.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
							 
							// border-bottom
							context.lineTo(x + r, y + h)
							context.lineTo(x, y + h - r)
							// 左下角
							context.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
							 
							// border-left
							context.lineTo(x, y + r)
							context.lineTo(x + r, y)
							
							context.fill()
							context.closePath()
							// 剪切
							context.clip()
											 
							context.drawImage(d.url,d.x,d.y,d.width / 2,d.height / 2)
							// 恢复之前保存的绘图上下文
							context.restore() 
							break
						default:
							break
					}
				})
				
				context.draw()
				
				setTimeout(()=>{
					uni.canvasToTempFilePath({
						canvasId:'poster', //this.canvasId,
						success(res) {
							callback && callback(res)
						},
						fail(err) {
							console.log(err)
						}
					},this)
					
				},500)
				// context.draw(false,wx.canvasToTempFilePath({
				// 	  canvasId: 'poster',
				// 	  success: function (res) {
				// 		callback && callback(res)
				// 	  },
				// 	  fail: function (err) {
				// 		console.log(err);
				// 	  }
				// }this))
				
				
			},
			
		}
	}
</script>

<style>
	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}
</style>
