// floor相关
let floorAddOrUpdateUrl = '/floor/addOrUpdate'
let floorListUrl = '/floor/list'
//room相关
let roomAddOrUpdateUrl = '/room/addOrUpdate'
let roomListByFloorIdUrl = '/room/listByFloorId'
//device相关
let deviceListByRoomIdUrl = '/device/listByRoomId'

//家庭相关
let familyAddOrUpdateUrl = '/family/addOrUpdate'
let familyListUrl = '/family/familyList'

//用户相关
let searchUserByPhoneUrl = '/user/searchUserByPhone'


const install = (Vue, vm) => {

	let floorAddOrUpdateApi = (params = {}) => vm.$u.post(floorAddOrUpdateUrl, params)
	let floorListApi = (params = {}) => vm.$u.get(floorListUrl, params)

	let roomAddOrUpdateApi = (params = {}) => vm.$u.post(roomAddOrUpdateUrl, params)
	let roomListByFloorIdApi = (params = {}) => vm.$u.get(roomListByFloorIdUrl, params)

	let deviceListByRoomIdApi = (params = {}) => vm.$u.get(deviceListByRoomIdUrl, params)

	let familyAddOrUpdateApi = (params = {}) => vm.$u.post(familyAddOrUpdateUrl, params)
	let familyListApi = (params = {}) => vm.$u.get(familyListUrl, params)

	let searchUserByPhoneApi = (params = {}) => vm.$u.get(searchUserByPhoneUrl, params)



	vm.$u.api = {
		floorAddOrUpdateApi,
		floorListApi,
		roomAddOrUpdateApi,
		roomListByFloorIdApi,
		deviceListByRoomIdApi,
		familyAddOrUpdateApi,
		familyListApi,
		searchUserByPhoneApi
	}
}

export default {
	install
}
