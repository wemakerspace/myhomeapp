import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		familyId: ''

	},
	mutations: {
		/**
		 * 设置家庭ID
		 * @param {Object} state
		 * @param {Object} fId
		 */
		setFamilyId(state, fId) {
			state.familyId = fId
		}

	}
})

export default store
