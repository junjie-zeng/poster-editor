import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import "static/css/iconfont.css"
import "static/css/index.less"
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"

Vue.config.productionTip = false
Vue.prototype.$store = store
App.mpType = 'app'
Vue.component('uniPopup',uniPopup)
Vue.component('uniDrawer',uniDrawer)


const app = new Vue({
    ...App
})
app.$mount()


/*
	目的
		1. 体验跨平台兼容性
		2. 巩固vuex
		3. canvas画图
		4. 复用组件
		5. 抽取公共逻辑
		6. ...123
*/