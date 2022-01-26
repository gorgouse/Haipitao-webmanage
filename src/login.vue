<template>
  <div class="login">

  <!-- <img src="22" onerror="windows.location.href='/url'" alt=""> -->

    <!-- <img src="22" onerror="alert('haha you are attacked!')" alt=""> -->
    <!-- <script>window.location.href="www.baidu.com"</script> -->
<!-- <img src="22" onerror="<script>window.location.href='www.baidu.com'</script>"> -->

    <input type="text" v-model="text">
    <button @click="addSubmit">评论</button>
    <ul>
      <li v-for="(item,index) in msgList" :key="index">
        <span v-html="item"></span>
      </li>
    </ul>



      <div>
          <div class="loginForm">
            <el-form :model="formData" style="">

                <el-form-item>
                  <div style="font-size:20px;color:gray;margin-top:20px"><b>嗨皮涛管理系统</b></div>
                </el-form-item>

                <el-form-item>
                    <el-input style="font-size:15px;width:350px;" prefix-icon="el-icon-user-solid" v-model="formData.username"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-input style="font-size:15px;width:350px;"  prefix-icon="el-icon-lock" type="password" v-model="formData.password"></el-input>
                </el-form-item>
            </el-form>
            <el-button style="width:350px" type="primary" @click="loginMethod">登录</el-button>
            <div @click="$router.push({path:'/store-register'})" style="margin-top:10px;margin-left:280px;font-size:13px;color:gray"> <el-link type="danger"><b>店铺注册</b></el-link></div>
          </div>
      </div>

      <!-- {{this.formData}} -->
  </div>
</template>

<script>
import req from '@/api/login.js'
// 函数调用
export default {
  data(){
    
      return{
        text:"",
        msgList:[],
         formData: {
          username: '',
          password: '',
        },
        userData:{},
      }
  },
   mounted(){
          },
    methods:{
      addSubmit(){
        let arr = [];
        arr = sessionStorage.getItem("item");
        arr = JSON.parse(arr);
        !arr && (arr = []);
        arr.push(this.text);
        this.msgList = arr;
        this.text = '';
        sessionStorage.setItem("item",JSON.stringify(arr))
      },

      loginMethod(){
        req('login',{username:this.formData.username,password:this.formData.password}).then(data=>{
          if(data.code == 0){
            this.userData = data.data
            // alert(JSON.stringify(this.userData))
            sessionStorage.setItem('token',JSON.stringify(this.userData))
            this.$router.push({path:'/antdv-Index'})
          }
          else{
            alert(data.data)
          }
        })
      }
    }
}
</script>

<style lang="scss" scoped>
.loginForm{
  margin-top: 130px;
  border-radius: 8px;
  margin-left: 35%;
  height: 300px;
    // background-image: url("./assets/333.jpg");
  // background: white;
  width: 400px;
}

.login{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-size: 100% 100%;
  // background-image: url("./assets/333.jpg");


  // background-image: url("./assets/login-background.jpg");
}


</style>


