import req from '../fetch/index.js'

const config = {
    selectAdmin: {
    url: '/admin/selectAdmin',
    method: 'get'
  },
  selectStoreManage: {
    url: '/admin/selectStoreManage',
    method: 'get'
  },
  addAdmin: {
    url: '/admin/addAdmin',
    method: 'get'
  },
  updateAdmin: {
    url: '/admin/updateAdmin',
    method: 'get'
  },
  deleteAdmin: {
    url: '/admin/deleteAdmin',
    method: 'get'
  },
  countNumber: {
    url: '/admin/number',
    method: 'get'
  },

}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
