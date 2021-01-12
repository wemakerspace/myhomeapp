/** 
 * 存储用户token信息，暂时时效不限，后端时效暂时未处理
 * @param {Object} token
 */
export function saveToken(token) {
	uni.setStorageSync('utoken', token);
}
/**
 * 获取用户token
 */
export function getToken() {
	return uni.getStorageSync('utoken');
}

/**
 * 清空信息，用于退出
 */
export function clear() {
	uni.clearStorageSync()
}
