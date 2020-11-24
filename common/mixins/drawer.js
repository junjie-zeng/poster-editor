


import EV from '@/common/tools/ev.js'
export default {
	data(){
		return {
			
		}
	},
	mounted() {
		EV.$on('drawer',({e,type})=>{
			this.drawer(e,type)
		})
	},
	methods:{
		drawer(e,type){
			this.$refs[e] && this.$refs[e][type]()
		},
		$drawer(e,type){
			console.log("$drawer ...")
			EV.$emit('drawer',{e,type})
		},
	},
	destroyed() {
		// EV.$off('drawer')
		// console.log("destroyed ...")
	},
}