import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      redirect:'/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/login.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import(/* webpackChunkName: "goodsdetail" */ '@/chat.vue')
    },
    {
      path: '/store-register',
      name: 'store-register',
      component: () => import(/* webpackChunkName: "login" */ '@/store-register/store-register.vue'),
      redirect:'/preparation',
      children:[
        {
          path: '/preparation',
          name: 'preparation',
          component: () => import(/* webpackChunkName: "login" */ '@/store-register/preparation.vue')
        },
        {
          path: '/mainbodymsg',
          name: 'mainbodymsg',
          component: () => import(/* webpackChunkName: "login" */ '@/store-register/mainbodymsg.vue')
        },
        {
          path: '/storemsg',
          name: 'storemsg',
          component: () => import(/* webpackChunkName: "login" */ '@/store-register/storemsg.vue')
        },
        {
          path: '/storegivename',
          name: 'storegivename',
          component: () => import(/* webpackChunkName: "login" */ '@/store-register/storegivename.vue')
        },
        {
          path: '/submitaudit',
          name: 'submitaudit',
          component: () => import(/* webpackChunkName: "login" */ '@/store-register/submitaudit.vue')
        },
      ]
    },
    // 内容
    {
      path: '/antdv-Index',
      redirect:'/index',
      component: () => import(/* webpackChunkName: "frame" */ '@/antdv-Index.vue'),
      children:[
        {
          path: '/parent',
          name: 'parent',
          component: () => import(/* webpackChunkName: "goodsdetail" */ '@/parent.vue')
        },
        {
          path: '/child',
          name: 'child',
          component: () => import(/* webpackChunkName: "goodsdetail" */ '@/child.vue')
        },
        {
          path: '/index',
          name: 'index',
          component: () => import(/* webpackChunkName: "home" */ '@/index.vue')
        },
        {
          path: '/auditManage',
          name: 'auditManage',
          component: () => import(/* webpackChunkName: "home" */ '@/audit/auditManage.vue'),
          redirect:'/audit',
          children:[
            {
              path: '/audit',
              name: 'audit',
              component: () => import(/* webpackChunkName: "home" */ '@/audit/audit.vue')
            },
            {
              path: '/auditStore',
              name: 'auditStore',
              component: () => import(/* webpackChunkName: "home" */ '@/audit/auditStore.vue')
            },
            {
              path: '/slideManage',
              name: 'slideManage',
              component: () => import(/* webpackChunkName: "goodsdetail" */ '@/audit/slideManage.vue')
            },
          ]
        },
        {
          path: '/user-manage',
          name: 'user-manage',
          component: () => import(/* webpackChunkName: "goodsdetail" */ '@/user-manage/user-manage.vue'),
          redirect:'/admin',
          children:[
            {
              path: '/admin',
              name: 'admin',
              component: () => import(/* webpackChunkName: "goodsdetail" */ '@/user-manage/admin.vue')
            },
            {
              path: '/shopManager',
              name: 'shopManager',
              component: () => import(/* webpackChunkName: "goodsdetail" */ '@/user-manage/shopManager.vue')
            },
            {
              path: '/client',
              name: 'client',
              component: () => import(/* webpackChunkName: "goodsdetail" */ '@/user-manage/client.vue')
            },
          ]
        },
        {
          path: '/shoppingcity',
          name: 'shoppingcity',
          component: () => import(/* webpackChunkName: "home" */ '@/shop-city-manage/shoppingcity.vue'),
          redirect:'/classifyManage',
          children:[
            {
              path: '/classifyManage',
              name: 'classifyManage',
              component: () => import(/* webpackChunkName: "goodsdetail" */ '@/shop-city-manage/classifyManage.vue')
            },
            {
              path: '/orderManage',
              name: 'orderManage',
              component: () => import(/* webpackChunkName: "goodsdetail" */ '@/shop-city-manage/orderManage.vue')
            },
          ]
        },
        {
          path: '/storeManage',
          name: 'storeManage',
          redirect:'/goodsManage',
          component: () => import(/* webpackChunkName: "goodsdetail" */ '@/store-manage/storeManage.vue'),
          children:[
            {
              path: '/goodsManage',
              name: 'goodsManage',
              component: () => import(/* webpackChunkName: "goodsdetail" */ '@/store-manage/goodsManage.vue')
            },
            {
              path: '/storeOrder',
              name: 'storeOrder',
              component: () => import(/* webpackChunkName: "goodsdetail" */ '@/store-manage/storeOrder.vue')
            },
            {
              path: '/message',
              name: 'message',
              component: () => import(/* webpackChunkName: "goodsdetail" */ '@/store-manage/message.vue')
            },
            {
              path: '/carouselApply',
              name: 'carouselApply',
              component: () => import(/* webpackChunkName: "goodsdetail" */ '@/store-manage/carouselApply.vue')
            },
            {
              path: '/personalMsg',
              name: 'personalMsg',
              component: () => import(/* webpackChunkName: "goodsdetail" */ '@/store-manage/personalMsg.vue')
            },
            {
              path: '/chatInterface',
              name: 'chatInterface',
              component: () => import(/* webpackChunkName: "goodsdetail" */ '@/store-manage/chatInterface.vue')
            },
          ]
        },
        {
          path: '/data-analyse',
          name: 'data-analyse',
          redirect:'/sector',
          component: () => import(/* webpackChunkName: "goodsdetail" */ '@/data-analyse/data-analyse.vue'),
          children:[
                {
                  path: '/sector',
                  name: 'chart',
                  component: () => import(/* webpackChunkName: "goodsdetail" */ '@/data-analyse/sector.vue')
                },
                {
                  path: '/columnar',
                  name: 'columnar',
                  component: () => import(/* webpackChunkName: "goodsdetail" */ '@/data-analyse/columnar.vue')
                },
                {
                  path: '/line',
                  name: 'line',
                  component: () => import(/* webpackChunkName: "goodsdetail" */ '@/data-analyse/line.vue')
                },                                                
              ]
            },        
      ]
    },
  ]
})
// const originalPush = Router.prototype.push
// Router.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }
