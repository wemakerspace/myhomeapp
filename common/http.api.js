// floor相关
let floorAddOrUpdateUrl = '/floor/addOrUpdate';
let floorListUrl = '/floor/list';
//room相关
let roomAddOrUpdateUrl = '/room/addOrUpdate';
let roomListByFloorIdUrl = '/room/listByFloorId';




const install = (Vue, vm) => {

	let floorAddOrUpdateApi = (params = {}) => vm.$u.post(floorAddOrUpdateUrl, params);
	let floorListApi = (params = {}) => vm.$u.get(floorListUrl, params);

	let roomAddOrUpdateApi = (params = {}) => vm.$u.post(roomAddOrUpdateUrl, params);
	let roomListByFloorIdApi = (params = {}) => vm.$u.get(roomListByFloorIdUrl, params);


	vm.$u.api = {
		floorAddOrUpdateApi,
		floorListApi,
		roomAddOrUpdateApi,
		roomListByFloorIdApi

	};
}

export default {
	install
}
