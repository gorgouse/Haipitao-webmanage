import req from '../fetch/index.js'

const config = {
    storeMessageSelect: {
    url: '/storeManage/storeMessageSelect',
    method: 'get'
  },
  updateStore: {
    url: '/storeManage/updateStore',
    method: 'get'
  },
  slideApply: {
    url: '/storeManage/slideApply',
    method: 'get'
  },
  updateGoodsSlide: {
    url: '/storeManage/updateGoodsSlide',
    method: 'get'
  },
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
