import req from '../fetch/index.js'

const config = {
selectClient: {
    url: '/shoppingCity/selectClient',
    method: 'get'
  },

}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
