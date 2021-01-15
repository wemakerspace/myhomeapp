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
let confirmJoinUrl = '/family/confirmJoin'
let checkIsHolerUrl = '/family/checkIsHoler'

//用户相关
let searchUserByPhoneUrl = '/user/searchUserByPhone'
let loginByPhonePasswordUrl = '/user/loginByPhonePassword'

//消息相关
let sendFamilyAddUserUrl = '/message/sendFamilyAddUser'
let getAllMessageUrl = '/message/getAllMessage'
let readMessageUrl = '/message/readMessage'


const install = (Vue, vm) => {

	let floorAddOrUpdateApi = (params = {}) => vm.$u.post(floorAddOrUpdateUrl, params)
	let floorListApi = (params = {}) => vm.$u.get(floorListUrl, params)

	let roomAddOrUpdateApi = (params = {}) => vm.$u.post(roomAddOrUpdateUrl, params)
	let roomListByFloorIdApi = (params = {}) => vm.$u.get(roomListByFloorIdUrl, params)

	let deviceListByRoomIdApi = (params = {}) => vm.$u.get(deviceListByRoomIdUrl, params)

	let familyAddOrUpdateApi = (params = {}) => vm.$u.post(familyAddOrUpdateUrl, params)
	let familyListApi = (params = {}) => vm.$u.get(familyListUrl, params)
	let confirmJoinApi = (params = {}) => vm.$u.get(confirmJoinUrl, params)
	let checkIsHolerApi = (params = {}) => vm.$u.get(checkIsHolerUrl, params)

	let searchUserByPhoneApi = (params = {}) => vm.$u.get(searchUserByPhoneUrl, params)
	let loginByPhonePasswordApi = (params = {}) => vm.$u.post(loginByPhonePasswordUrl, params)

	let sendFamilyAddUserApi = (params = {}) => vm.$u.post(sendFamilyAddUserUrl, params)
	let getAllMessageApi = (params = {}) => vm.$u.get(getAllMessageUrl, params)
	let readMessageApi = (params = {}) => vm.$u.get(readMessageUrl, params)



	vm.$u.api = {
		floorAddOrUpdateApi,
		floorListApi,
		roomAddOrUpdateApi,
		roomListByFloorIdApi,
		deviceListByRoomIdApi,
		familyAddOrUpdateApi,
		familyListApi,
		confirmJoinApi,
		checkIsHolerApi,
		searchUserByPhoneApi,
		loginByPhonePasswordApi,
		sendFamilyAddUserApi,
		getAllMessageApi,
		readMessageApi
	}
}

export default {
	install
}
