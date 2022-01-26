import req from '../fetch/index.js'

const config = {
  sortSelect: {
    url: '/shoppingCity/allClassify',
    method: 'get'
  },
  addClassify: {
    url: '/shoppingCity/addClassify',
    method: 'get'
  },
  updateClassify: {
    url: '/shoppingCity/updateClassify',
    method: 'get'
  },
  deleteClassify: {
    url: '/shoppingCity/deleteClassify',
    method: 'get'
  },

}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
