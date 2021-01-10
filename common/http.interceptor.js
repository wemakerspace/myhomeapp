
const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'http://ayilink2019.eicp.vip/',
		// baseUrl: 'http://192.168.31.33:8111',
	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		const token = '';
		config.header.token = token;
		return config;
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if (res.status) {
			return res;
		} else {
			return res;
		}
	}
}

export default {
	install
}
