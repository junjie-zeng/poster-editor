



import EV from '@/static/lib/js/ev.js'
export default {
	data() {
		return {
			
		}
	},
	onLoad(options) {
		
	},
	methods: {
		// eg:
		// this.open('Drawer','add-content-panel','open')
		// this.close('Popup','page-popup','close')
		
		close(target,key,status){
			EV.$emit(target,{key,status})
		},
		open(target,key,status){
			EV.$emit(target,{key,status})
		},
	},

	

}
