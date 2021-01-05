
const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'http://gameapp.5gzvip.idcfengye.com',
		// baseUrl: 'http://127.0.0.1:9111',
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
