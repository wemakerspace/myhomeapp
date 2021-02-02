const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'http://ayilink2019.eicp.vip/',
	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		config.header.token = vm.$store.state.token;
		return config;
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if (res.status) {
			return res;
		} else {
			console.log(res)
			if (res.code == 11008) {
				uni.reLaunch({
					url: '/pages/login/login.vue'
				})
			}
			return res;
		}
	}
}

export default {
	install
}
