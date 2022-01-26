<template>
 <div>
      <a-layout id="components-layout-demo-side" style=";min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo" style="display:flex">
        <img style="margin-left:10px;height:28px;width:28px" src="./assets/logo.png">
        <h3 style="color:white;margin-left:8px;margin-top:2px;">HaiPiManage</h3>
      </div>
      <a-menu :theme="theme" :default-selected-keys="['1']" mode="inline">
          <!-- 1 -->
        <a-menu-item key="1" @click="$route.path !== '/index' && $router.push({path:'/index'})">
          <a-icon type="aliwangwang" />
          <span>首页展示</span>
        </a-menu-item>

          <a-menu-item key="111" @click="$route.path !== '/parent' && $router.push({path:'/parent'})">
          <a-icon type="aliwangwang" />
          <span>父組件</span>
          </a-menu-item>

            <a-menu-item key="1111" @click="$route.path !== '/child' && $router.push({path:'/child'})">
          <a-icon type="aliwangwang" />
          <span>子組件</span>
        </a-menu-item>

          <!-- 2 -->
        <a-sub-menu key="sub5" v-show="userData.role === '1' || userData.role === '2'">
          <span slot="title"><a-icon type="desktop" /><span>审核管理</span></span>
          <a-menu-item key="20" @click="$route.path !== '/audit' && $router.push({path:'/audit'})">
            <a-icon type="zoom-in" />
            <span>商品审核</span>
          </a-menu-item>
          <a-menu-item key="21" @click="$route.path !== '/auditStore' && $router.push({path:'/auditStore'})">
              <a-icon type="zoom-out" />
            <span>店铺审核</span>
          </a-menu-item>
          <a-menu-item key="22" @click="$route.path !== '/slideManage' && $router.push({path:'/slideManage'})">
              <a-icon type="zoom-out" />
            <span>轮播审核</span>
          </a-menu-item>
        </a-sub-menu>

          <!-- 3 -->
        <a-sub-menu key="sub1" v-show="userData.role === '1'">
          <span slot="title" @click="$route.path !== '/user-manage' && $router.push({path:'/user-manage'})"><a-icon type="user" /><span>用户管理</span></span>
          <a-menu-item key="3" @click="$route.path !== '/admin' && $router.push({path:'/admin'})">
            <a-icon type="user-add" />
            <span>人员管理</span>
          </a-menu-item>
          <a-menu-item key="4" @click="$route.path !== '/shopManager' && $router.push({path:'/shopManager'})">
              <a-icon type="user-delete" />
            <span>店家管理</span>
          </a-menu-item>
          <a-menu-item key="5" @click="$route.path !== '/client' && $router.push({path:'/client'})">
              <a-icon type="usergroup-add" />
            <span>客户管理</span>
          </a-menu-item>
        </a-sub-menu>
            <!-- 4 -->
        <a-sub-menu key="sub2" v-show="userData.role === '1' || userData.role === '2'">
          <span slot="title" @click="$route.path !== '/shoppingcity' && $router.push({path:'/shoppingcity'})"><a-icon type="trademark" /><span>商城管理</span></span>
          
          <a-menu-item key="6" @click="$route.path !== '/classifyManage' && $router.push({path:'/classifyManage'})">
            <a-icon type="drag" />
            <span>分类管理</span>
          </a-menu-item>
          
          <a-menu-item key="8" @click="$route.path !== '/orderManage' && $router.push({path:'/orderManage'})">
              <a-icon type="snippets" />
            <span>订单管理</span>
          </a-menu-item>
        </a-sub-menu>
            <!-- 5 -->
        <a-sub-menu key="sub3">
          <span slot="title"><a-icon type="shop" /><span>店铺管理</span></span>
          <a-menu-item key="9" @click="$route.path !== '/goodsManage' && $router.push({path:'/goodsManage'})">
              <a-icon type="shopping" />
            <span>商品管理</span>
          </a-menu-item>
          <a-menu-item key="10" @click="$route.path !== '/storeOrder' && $router.push({path:'/storeOrder'})">
              <a-icon type="schedule" />
            <span>店铺订单</span>
          </a-menu-item>
          <a-menu-item key="11" @click="$route.path !== '/message' && $router.push({path:'/message'})">
              <a-icon type="shop" />
            <span>店铺信息</span>
          </a-menu-item>          
          <a-menu-item key="13" @click="$route.path !== '/carouselApply' && $router.push({path:'/carouselApply'})">
              <a-icon type="picture" />
            <span>轮播申请</span>
          </a-menu-item>   
        </a-sub-menu>
            <!-- 6 -->
        <a-menu-item key="12" @click="$route.path !== '/chatInterface' && $router.push({path:'/chatInterface'})">
          <a-icon type="message" />
          <span>客户聊天</span>
        </a-menu-item>     
            <!-- 7      -->

        <a-menu-item key="14" @click="$route.path !== '/personalMsg' && $router.push({path:'/personalMsg'})" >
          <a-icon type="idcard" />
          <span>个人信息</span>
        </a-menu-item>         

        <a-sub-menu key="sub4" v-show="userData.role === '1' || userData.role === '2'">
          <span slot="title"><a-icon type="area-chart" /><span>数据分析</span></span>
          <a-menu-item key="15"  @click="$route.path !== '/sector' && $router.push({path:'/sector'})">
              <a-icon type="pie-chart" />
            <span>扇形数据</span>
          </a-menu-item>
          <a-menu-item key="16" @click="$route.path !== '/columnar' && $router.push({path:'/columnar'})">
              <a-icon type="bar-chart" />
            <span>柱状数据</span>
          </a-menu-item>
          <a-menu-item key="17" @click="$route.path !== '/line' && $router.push({path:'/line'})">
              <a-icon type="line-chart" />
            <span>折线数据</span>
          </a-menu-item>          
        </a-sub-menu>                   
      </a-menu>
    </a-layout-sider>
    <!-- 菜单头 -->
    <a-layout>
      <a-layout-header style="display:flex;background: #fff; padding: 0" >
        <div>
            <a-switch style="margin-top:-15px;margin-left:20px;" default-checked checked-children="dark" un-checked-children="light" @change="changeTheme"/><br /><br />
        </div>
        <div style="margin-left:20px;">

            <a-menu v-model="current" mode="horizontal">
                <a-menu-item key="mail"> <a-icon type="robot" />主题应用 </a-menu-item>
                <!-- <a-menu-item key="app" disabled> <a-icon type="appstore" />Navigation - Other </a-menu-item> -->
                    <a-sub-menu>
                        <span slot="title" class="submenu-title-wrapper"><a-icon type="setting" />导航设置</span>
                            <a-menu-item-group title="相对设置">
                                <a-menu-item key="setting:1">标签设置</a-menu-item>
                                <a-menu-item key="setting:2">动态设置</a-menu-item>
                            </a-menu-item-group>
                            <a-menu-item-group title="定向设置">
                                <a-menu-item key="setting:3">专项设置</a-menu-item>
                                <a-menu-item key="setting:4">其他设置</a-menu-item>
                            </a-menu-item-group>
                    </a-sub-menu>
                <a-menu-item key="alipay">
                    <span><a href="http://47.107.123.144" target="_blank" rel="noopener noreferrer"><a-icon type="home" />跳转至应用链接</a></span>
                </a-menu-item>
        <a-menu-item >
            <a-icon type="android" theme="twoTone" two-tone-color="#52c41a"/>
          <a-icon style="margin-left:20px" type="apple" />
          <a-icon style="margin-left:20px" type="ie" />
          <a-icon style="margin-left:20px" type="github" />
          <a-icon style="margin-left:20px" type="wechat" />
        </a-menu-item>

                <a-menu-item>
                    <div style="margin-left:0px;margin-top:0px;">
                        <img style="margin-top:0px;height:35px;width:35px" src="./assets/head.gif" alt="">
                        <b>{{this.userData.nickname}}</b>
                    </div>
                </a-menu-item>
                <a-menu-item @click="$router.push({path:'/login'})">
                    <div style="margin-left:0px;margin-top:0px;">
                    <img style="margin-top:0px;color:gray;height:20px;width:20px" src="./assets/exit.png">
                    <b>退出</b>
                    </div>
                </a-menu-item>
            </a-menu>
            
        </div>
      </a-layout-header>

      <a-layout-content style="margin: 0 16px">
        <!-- <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
          <a-icon style="margin-left:0px;font-szie:25px;" type="android" theme="twoTone" two-tone-color="#52c41a"/>
          <a-icon style="margin-left:20px" type="apple" />
          <a-icon style="margin-left:20px" type="ie" />
          <a-icon style="margin-left:20px" type="github" />
          <a-icon style="margin-left:20px" type="wechat" />
        </a-breadcrumb> -->
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
<!-- 
    <a-icon type="smile" theme="twoTone" />
    <a-icon type="heart" theme="twoTone" two-tone-color="#eb2f96" />
    <a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" /> -->

          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        HaiPiTao Design ©2018 Created by HAI PI
      </a-layout-footer>
    </a-layout>
  </a-layout>

 </div>
</template>
<script>
export default {
  data() {
    return {
      userData:{}, 
      current: ['mail'],
      collapsed: false,
      theme:'dark',
    };
  },
  mounted(){
    this.getToken()      
  },
  methods:{
    getToken(){
        this.userData = JSON.parse(sessionStorage.getItem('token'))
        // alert(this.userData.role)
    }, 
    changeTheme(checked) {
      this.theme = checked ? 'dark' : 'light';
    },
  }
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 15px;
}

</style>
