import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import uView from "uview-ui"
Vue.use(uView)

import GoEasy from 'goeasy'
Vue.prototype.goEasy = GoEasy.getInstance({
	host: 'hangzhou.goeasy.io',
	appkey: "BS-0caadcc4d28449dfba6e5d50cc6e1ef8"
})

App.mpType = 'app'

//引入vuex
import store from './store/index.js'

const app = new Vue({
	...App,
	//挂载
	store
})

// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from '@/common/http.interceptor.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)
// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

app.$mount()
