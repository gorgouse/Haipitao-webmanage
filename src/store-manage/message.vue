<template>
  <div>
        <div v-show="this.userData.role == 1 ||this.userData.role ==2">
      <el-form>
        <el-form-item>
          <el-input placeholder="查询搜索的店家用户编号" v-model="inputId" style="width:200px"></el-input>
          <el-button type="primary" @click="activeMethod">确定</el-button>
        </el-form-item>
      </el-form>
    </div>    
    <!-- style="display:flex" -->
      <div style="display:flex">
          <div class="card1">
  <el-row>
  <el-col  :span="8" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
    <el-card v-if="storeData != null" style="height:100%;width:400px">
      <img :src="storeData.storeImg" class="image">
      <div >
        <span>{{storeData.storeName}}</span>
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <!-- <el-button type="text" class="button">操作按钮</el-button> -->
        </div>
      </div>
    </el-card>
  </el-col>

</el-row>

          </div>

        <div class="card2" v-if="storeData != null">
            <el-card class="box-card">
                <div class="msg" style="margin-top:110px;">
                    <div>店铺名称: {{storeData.storeName}}</div>
                    <div>注册人昵称：{{storeData.shopName}}</div>
                    <div>营业执照类型: {{storeData.licenseType}}</div>
                    <div>营业执照账号: {{storeData.licenseAcct}}</div>
                    <div>营业执照地址：{{storeData.licenseAddress}}</div>
                    <div>创办时间:{{storeData.createTime}}</div>
                    <div><el-button style="margin-top:10px;" type="warning" @click="msgVisble = true">修改信息</el-button></div>
                </div>
            </el-card>
        </div>

        <el-dialog :visible.sync="msgVisble" title="修改信息" width="40%">
            <el-form :model="form" style="width:70%;margin-left:10%;" label-width="100px">
                
                <el-form-item label="店铺名称">
                  <el-input v-model="form.storeName"></el-input>
                </el-form-item>

                <el-form-item label="营业执照地址">
                  <el-input v-model="form.licenseAddress"></el-input>
                </el-form-item>

                <el-form-item label="营业执照账号">
                  <el-input v-model="form.licenseAcct"></el-input>
                </el-form-item>

                <el-form-item label="营业执照类型">
                  <el-input v-model="form.licenseType"></el-input>
                </el-form-item>

                <el-form-item label="图片">
                  <el-input v-model="form.storeImg"></el-input>
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
import req from '@/api/store.js'
export default {
  data(){
    return{
      param:'',
      inputId:'',      
      msgVisble:false,
      form:{
        storeName:'',
        licenseAddress:'',
        licenseAcct:'',
        licenseType:'',
        storeImg:'',
      },
      storeData:{},
      currentDate: new Date(),
      userData:{}, 
    }
  },
  mounted(){
    this.storeMessageSelectMethod()
    this.getToken()    
  },
  methods:{
    activeMethod(){
      this.param = this.inputId
      this.storeMessageSelectMethod()
    },    
    getToken(){
        this.userData = JSON.parse(sessionStorage.getItem('token'))
        this.param = this.userData.id
        // alert(this.param)
    },     
    storeMessageSelectMethod(){
      this.getToken()  
      req('storeMessageSelect',{shopManageId:this.param}).then(data=>{
        this.storeData = data.data
        // alert(JSON.stringify(this.storeData))
      })
    },
 update(){
      req('updateStore',{
        id:'1',
        storeName:this.form.storeName,
        licenseAddress:this.form.licenseAddress,
        licenseAcct:this.form.licenseAcct,
        licenseType:this.form.licenseType,
        storeImg:this.form.storeImg
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
                message: '修改店铺成功',
                type: 'success'
                });
                this.msgVisble = false
                this.storeMessageSelectMethod()
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
    height: 440px;
    width: 780px;
  }
</style>