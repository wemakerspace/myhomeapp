import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		familyId: '',
		isHolder: false

	},
	mutations: {
		/**
		 * 将本地存储的数据同步到state中
		 * @param {Object} state
		 */
		initData(state) {
			state.isHolder = uni.getStorageSync('isHolder')

		},
		/**
		 * 设置家庭ID
		 * @param {Object} state
		 * @param {Object} fId
		 */
		setFamilyId(state, fId) {
			state.familyId = fId
		},
		/**
		 * 设置是否是户主
		 * @param {Object} state
		 * @param {Object} flag
		 */
		setIsHolder(state, flag) {
			state.isHolder = flag
			uni.setStorageSync('isHolder', flag)
		}

	}
})

export default store
