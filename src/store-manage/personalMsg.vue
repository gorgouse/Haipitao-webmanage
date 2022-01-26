<template>
  <div>
    <!-- style="display:flex" -->
      <div style="display:flex">
          <div class="card1">
  <el-row>
  <el-col :span="8" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
    <el-card style="height:100%;width:400px">
      <img :src="personData.img" class="image">
      <div >
        <span>{{personData.shopManageName}}</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button">个人信息</el-button>
        </div>
      </div>
    </el-card>
  </el-col>

</el-row>
          </div>

          <div class="card2">
            <el-card class="box-card">
                <div class="msg" style="margin-top:110px;">
                    <div>昵称: {{personData.shopManageName}}</div>
                    <div>账号：{{personData.acct}}</div>
                    <div>手机号码: {{personData.phone}}</div>
                    <div>邮箱: {{personData.email}}</div>
                    <div>身份证：{{personData.idCard}}</div>
                    <div><el-button style="margin-top:10px;" @click="msgVisble = true" type="warning">修改信息</el-button></div>
                </div>
            </el-card>
        </div>

                <el-dialog :visible.sync="msgVisble" title="修改信息" width="40%">
            <el-form :model="form" style="width:70%;margin-left:10%;" label-width="100px">
                <el-form-item label="账号">
                  <el-input v-model="form.acct"></el-input>
                </el-form-item>
                
                <el-form-item label="名称">
                  <el-input v-model="form.nickname"></el-input>
                </el-form-item>

                <el-form-item label="密码">
                  <el-input v-model="form.password"></el-input>
                </el-form-item>

                <el-form-item label="手机号">
                  <el-input v-model="form.phone"></el-input>
                </el-form-item>

                <el-form-item label="邮箱">
                  <el-input v-model="form.email"></el-input>
                </el-form-item>

                <el-form-item label="图片">
                  <el-input v-model="form.img"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="success" @click="update">修改</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>


      </div>
  </div>
</template>

<script>
import req from '@/api/person.js'
export default {
  data(){
    return{
      form:{
        acct:'',
        nickname:'',
        password:'',
        phone:'',
        email:'',
        img:'',
      },
      msgVisble:false,
      personData:{},
      currentDate: new Date(),
      userData:{},
    }
  },
  mounted(){
    this.getToken()
    this.personMessageSelectMethod()
  },
  methods:{
    getToken(){
        this.userData = JSON.parse(sessionStorage.getItem('token'))
        // alert(JSON.stringify(this.userData.role))
    },     
    personMessageSelectMethod(){
      // alert(this.userData.role)
      req('personalSelect',{shopManageId:this.userData.id,role:this.userData.role}).then(data=>{
        this.personData = data.data
        // alert(JSON.stringify(this.personData))
      })
    },
    update(){
      req('updatePersonal',{
        shopManageId:this.userData.id,
        acct:this.acct,
        nickname:this.form.nickname,
        password:this.form.password,
        phone:this.form.phone,
        email:this.form.email,
        role:JSON.stringify(this.userData.role)
        // img:this.form.img
        }).then(data=>{
            this.loading = true
            if(data.code == 0){
                const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                loading.close();
                this.$message({
                message: '修改个人成功',
                type: 'success'
                });
                this.msgVisble = false
                this.personMessageSelectMethod()
                }, 2000);    
                }        
      })
  },
  }
}
</script>

<style lang="scss" scoped>
.msg{
  font-size: 18px;
  color: gray;
}

 .time {
    font-size: 13px;
    color: #999;
  }
  

  .image {
    width: 100%;
    display: block;
  }


// 
.card2{
  margin-left: 40px;
  // height: 500px;
}
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    height: 462px;
    width: 780px;
  }
</style>