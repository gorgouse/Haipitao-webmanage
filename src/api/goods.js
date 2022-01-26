import req from '../fetch/index.js'

const config = {
    goodsManageSelect: {
    url: '/storeManage/goodsManageSelect',
    method: 'get'
  },
  addGoods: {
    url: '/storeManage/addGoods',
    method: 'get'
  },
  updateGoods: {
    url: '/storeManage/updateGoods',
    method: 'get'
  },
  deleteGoods: {
    url: '/storeManage/deleteGoods',
    method: 'get'
  },
  getFirstClassify: {
    url: '/storeManage/getFirstClassify',
    method: 'get'
  },
  getSecondClassify: {
    url: '/storeManage/getSecondClassify',
    method: 'get'
  },
  addType: {
    url: '/storeManage/addType',
    method: 'get'
  },
  addProp: {
    url: '/storeManage/addProp',
    method: 'get'
  },
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
