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

/**
 * 保存选择的家庭信息
 * @param {Object} family
 */
export function saveSelectFamily(family) {
	uni.setStorageSync('family', family)
}
/**
 * 获取已经选择的家庭信息
 */
export function getSelectFamily() {
	return uni.getStorageSync('family');
}
