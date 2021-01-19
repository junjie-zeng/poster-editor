


export const blobToBase64 = (files,callback)=>{
	var reader = new FileReader();
	reader.readAsDataURL(files);
	reader.onload = ()=>{
		let url = reader.result
		// console.log(url); //获取到base64格式图片
		callback && callback(url)
	};
}