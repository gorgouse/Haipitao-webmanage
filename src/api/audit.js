import req from '../fetch/index.js'

const config = {
  auditInfoList: {
    url: '/audit/goods',
    method: 'get'
  },
  auditGoodsUpdate: {
    url: '/audit/auditGoodsUpdate',
    method: 'get'
  },
  auditStoreRegister:{
    url: '/audit/storeRegister',
    method: 'get'
  },
  selectAuditStoreRegister:{
    url: '/audit/selectAuditStoreRegister',
    method: 'get'
  },

  storeAuditPass:{
    url: '/audit/storeAuditPass',
    method: 'get'
  },
  storeAuditNotPass:{
    url: '/audit/storeAuditNotPass',
    method: 'get'
  },

  auditSlideSelect:{
    url: '/audit/auditSlideSelect',
    method: 'get'
  },
  addSlide:{
    url: '/audit/addSlide',
    method: 'get'
  },
  auditSlideDelete:{
    url: '/audit/auditSlideDelete',
    method: 'get'
  },
  
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
