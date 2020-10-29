





export default {
	methods:{
		// 获取元素宽高等属性
		getClientRect(el){
			return new Promise((resolve)=>{
				uni.createSelectorQuery().selectAll(el).boundingClientRect(function (rect) {
				    // console.log(rect)
				    resolve(rect[0])
				}).exec() 
			})
		}
	}
}