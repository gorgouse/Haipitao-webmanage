import req from '../fetch/index.js'

const config = {
  //订单查询
  orderselect: {
    url: '/shoppingCity/selectOrder',
    method: 'get'
  },
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
