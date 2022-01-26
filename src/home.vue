<template>

  <el-container class="frame" style="height:100%">
<!-- {{this.userData.nickname}} -->
    <!-- 黑色 -->
        <!-- #545c64 -->
        <!-- 软蓝 -->
        <!-- #87dea1 -->

     <el-aside :width="isCollapse?'80px':'200px'">
    <el-menu 
    style="top:0;position:fixed;height:100%"
    :collapse-transition="false"
    :collapse="isCollapse"
    :unique-opened="true"
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="gray"
      text-color="#fff"
      active-text-color="orange">

      <el-menu-item-group style="margin-left:10px;height:70px;color:white;display:flex">
        <div v-if="isCollapse===false" style="font-size:20px;margin-top:22px;"><b>嗨皮涛管理系统</b></div>
      </el-menu-item-group>

      <el-menu-item style="width:100%;color:white;" size="20" class="el-icon-s-home" index="1" @click="$route.path !== '/index' && $router.push({path:'/index'})">
      <template slot="title">
        <span>  首页展示</span>
      </template>
      </el-menu-item>

      <el-submenu index="5" @click="$route.path !== '/auditManage' && $router.push({path:'/auditManage'})">
        <template slot="title">
          <i style="color:white;" class="el-icon-remove-outline"></i>
          <span>审核管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item class="el-icon-zoom-in" index="5-1" @click="$route.path !== '/audit' && $router.push({path:'/audit'})">   商品审核</el-menu-item>
          <el-menu-item class="el-icon-zoom-out" index="5-2" @click="$route.path !== '/auditStore' && $router.push({path:'/auditStore'})">   店铺审核</el-menu-item>
                     <el-menu-item class="el-icon-remove-outline" index="5-3" @click="$route.path !== '/slideManage' && $router.push({path:'/slideManage'})">   轮播审核</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

       <el-submenu index="2" @click="$route.path !== '/shoppingcity' && $router.push({path:'/shoppingcity'})">
        <template slot="title">
          <i style="color:white;" class="el-icon-s-promotion"></i>
          <span>商城管理</span>
        </template>
        
        <el-menu-item-group>
          <el-menu-item class="el-icon-menu" index="2-2" @click="$route.path !== '/classifyManage' && $router.push({path:'/classifyManage'})">    分类管理</el-menu-item>
          <el-menu-item class="el-icon-date" index="2-3" @click="$route.path !== '/orderManage' && $router.push({path:'/orderManage'})">   订单管理</el-menu-item>
           <el-menu-item class="el-icon-s-custom" index="2-4" @click="$route.path !== '/clientManage' && $router.push({path:'/clientManage'})">   客户管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i style="color:white;" class="el-icon-s-shop"></i>
          <span>店家管理</span>
        </template>

          <el-menu-item-group>
            <el-submenu  index="3-1">
                <template slot="title">
                  <i style="color:white;" class="el-icon-s-data"></i>
                  <span>店铺管理</span>
                </template>
                    <el-menu-item-group>
                         <el-menu-item class="el-icon-s-goods" index="3-1-1" @click="$route.path !== '/goodsManage' && $router.push({path:'/goodsManage'})">  商品管理</el-menu-item>
                         <el-menu-item class="el-icon-chat-line-round" index="3-1-2" @click="$route.path !== '/chatInterface' && $router.push({path:'/chatInterface'})">  客户聊天</el-menu-item>
                         <el-menu-item class="el-icon-document" index="3-1-3" @click="$route.path !== '/storeOrder' && $router.push({path:'/storeOrder'})">   店铺订单</el-menu-item>
                         <el-menu-item class="el-icon-collection" index="3-1-4" @click="$route.path !== '/message' && $router.push({path:'/message'})">  店铺信息</el-menu-item>
                         <el-menu-item class="el-icon-picture" index="3-1-5" @click="$route.path !== '/carouselApply' && $router.push({path:'/carouselApply'})">  轮播申请</el-menu-item>
                    </el-menu-item-group>
            </el-submenu>

          <el-menu-item class="el-icon-s-claim" index="3-2" @click="$route.path !== '/personalMsg' && $router.push({path:'/personalMsg'})">   个人信息</el-menu-item>
          </el-menu-item-group>
      </el-submenu>



      <el-submenu index="4">
        <template slot="title">
          <i style="color:white;" class="el-icon-s-data"></i>
          <span>数据分析</span>
        </template>
        <el-menu-item-group>
          <el-menu-item class="el-icon-picture-outline-round" index="4-1" @click="$route.path !== '/sector' && $router.push({path:'/sector'})">   扇形图</el-menu-item>          
          <el-menu-item class="el-icon-upload" index="4-2" @click="$route.path !== '/columnar' && $router.push({path:'/columnar'})">   柱状图</el-menu-item>
          <el-menu-item class="el-icon-s-order" index="4-3" @click="$route.path !== '/line' && $router.push({path:'/line'})">  折线图</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
   </el-aside>
 

<!-- style="height:100px;width:100px" -->
     <el-container>
        <el-header style="top:0;position:fixed;width:100%;z-index:10">
          <el-menu :default-active="activeIndex"  mode="horizontal" @select="handleSelect">
              <el-menu-item @click="isCollapseMethod" index="1">
                <i style="" class="el-icon-s-fold"></i>
              </el-menu-item>

              <el-menu-item style="margin-top:0px" index="2">
                <img style="margin-top:-5px;height:35px;width:35px" src="./assets/head.gif" alt="">
                <b>{{this.userData.nickname}}</b>
              </el-menu-item>

              <el-menu-item index="3" @click="$router.push({path:'/login'})">
                <img style="margin-top:-0px;color:gray;height:20px;width:20px" src="./assets/exit.png" alt="退出">
                <b>退出</b>
              </el-menu-item>
          </el-menu>
          <div class="line"></div>
        </el-header>


      <el-main style="margin-left:0">
        <router-view></router-view>
      </el-main>
      <el-footer></el-footer>
     </el-container>

  </el-container>
  
</template>

<script>
export default {
data(){
  return{
    a:true,
      drawer: false,

    isCollapse: false,
      userData:{},
     activeIndex: '',
        activeIndex2: '1',
    editableTabsValue: '2',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2
      }
 },
 mounted(){
    this.getToken()
 },
 methods:{
   isCollapseMethod(){
     this.isCollapse = !this.isCollapse
   },
    changeState(){
      this.drawer = !this.drawer
    },
    transHandleClose(done) {
        done();
    },
    getToken(){
        this.userData = JSON.parse(sessionStorage.getItem('token'))
        // alert(this.userData)
    },
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
         handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      }
 }
}
</script>

<style lang="less" scpoed>
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
.el-menu{
  // background-image: url("./assets/333.jpg")
}
</style>