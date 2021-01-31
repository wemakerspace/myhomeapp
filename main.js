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

import store from './store/index.js'

const app = new Vue({
	...App,
	store
})

import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

app.$mount()
