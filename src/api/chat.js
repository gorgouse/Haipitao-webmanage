import req from '../fetch/index.js'

const config = {
  userChatList: {
    url: '/chat/userChatList',
    method: 'get'
  },
  addChat: {
    url: '/chat/addChat',
    method: 'get'
  },
  selectChatRecord: {
    url: '/chat/selectChatRecord',
    method: 'get'
  },
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
