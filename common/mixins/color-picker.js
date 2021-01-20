


import EV from '@/common/tools/ev.js'
export default {
	data(){
		return {
			
		}
	},
	mounted() {
		EV.$on('colorPicker',({e,type})=>{
			this.showColorPicker(e,type)
		})
	},
	methods:{
		showColorPicker(e,type){
			this.$refs[e] && this.$refs[e][type]()
		},
		$showColorPicker(e,type){
			console.log("$showColorPicker ...")
			EV.$emit('colorPicker',{e,type})
		},
	},
	destroyed() {
		// EV.$off('colorPicker')
		// console.log("destroyed ...")
	},
}