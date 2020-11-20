


import EV from '@/common/tools/ev.js'
export default {
	data(){
		return {
			
		}
	},
	mounted() {
		EV.$on('popup',({e,type})=>{
			this.modal(e,type)
		})
	},
	methods:{
		modal(e,type){
			this.$refs[e] && this.$refs[e][type]()
		},
		$modal(e,type){
			console.log("$modal ...")
			EV.$emit('popup',{e,type})
		},
	},
	destroyed() {
		// EV.$off('popup')
		// console.log("destroyed ...")
	},
}