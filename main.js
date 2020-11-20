import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import "static/css/iconfont.css"
import "static/css/index.less"
import uniPopup from '@/components/uni-popup/uni-popup.vue'


Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
Vue.component('uniPopup',uniPopup)


const app = new Vue({
    ...App
})
app.$mount()


/*
	目的
		1. 体验跨平台兼容性
		2. 巩固vuex
*/