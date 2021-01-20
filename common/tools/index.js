


export const blobToBase64 = (files,callback)=>{
	var reader = new FileReader();
	reader.readAsDataURL(files);
	reader.onload = ()=>{
		let url = reader.result
		// console.log(url); //获取到base64格式图片
		callback && callback(url)
	};
}


export const getRgbaColor = ({r,g,b,a})=>{
	return `rgba(${r},${g},${b},${a})`
}

export const splitRgbaColor = (color)=>{
	let rgbaAttr = color.match(/[\d.]+/g);
	if (rgbaAttr.length >= 3) {
		var r, g, b, a;
		r = rgbaAttr[0]
		g = rgbaAttr[1]
		b = rgbaAttr[2]
		a = rgbaAttr[3] || 1
		return {r,g,b,a}
	}
}