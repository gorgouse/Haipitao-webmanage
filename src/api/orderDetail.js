import req from '../fetch/index.js'

const config = {
  selectMainOrderOfStore: {
    url: '/storeManage/selectMainOrderOfStore',
    method: 'get'
  },
    storeOrderDetail: {
    url: '/storeManage/storeOrderDetail',
    method: 'get'
  },
  updateOrderState: {
    url: '/order/updateOrderState',
    method: 'get'
  },
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
