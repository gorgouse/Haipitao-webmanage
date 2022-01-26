import req from '../fetch/index.js'

const config = {
    personalSelect: {
    url: '/storeManage/personalSelect',
    method: 'get'
  },
  updatePersonal: {
    url: '/storeManage/updatePersonal',
    method: 'get'
  },
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
