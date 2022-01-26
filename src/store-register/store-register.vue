<template>
  <div>
      <div>
        <!-- <div>嗨皮涛</div> -->
        <div style="margin-left:-40px;font-size:30px;color:gray">商家入驻</div>
      </div>
      <div style="height:20px"></div>
      <div style="margint-top:20px;width:70%;margin-left:15%;">
        
        <el-steps :active="active" style="color:gray" finish-status="success">
  <el-step title="资料准备"></el-step>
  <el-step title="主体信息"></el-step>
  <el-step title="店铺信息"></el-step>
  <el-step title="提交审核"></el-step>
  <el-step title="等待店铺上线"></el-step>
</el-steps>
<!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
      </div>

      <div>
        <router-view @show="transfer" @getStoreData="storeData" @getStoreInfoMethod="getStoreInfo"></router-view>
      </div>
      
      
  </div>
</template>

<script>
import axios from 'axios'
import req from '@/api/audit.js'
export default {
    data(){
        return{
          active: 1,
          shoper:{},
          storeInfo:{},
        }
    },
    mounted(){},
    methods:{
      transfer(data){
        this.active = data
      },
      storeData(data){
        this.shoper = data
        // alert(this.shoper.img)
      },
      getStoreInfo(data){
        this.storeInfo = data
        // 店铺头像
        let form = new FormData()
        form.append('imageFile', this.storeInfo.storeImg) 
        axios({
          method: 'post',
          url: 'http://localhost:9999/upload/image',
          // url: 'http://47.107.123.144/upload/image',
          data: form,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }).then(data => {
            // alert(JSON.stringify(data.data.data.imagePath))
            this.storeInfo.storeImg = data.data.data.imagePath
        req('auditStoreRegister',{
          shopManager:this.shoper.shopManager,
          phone:this.shoper.phone,
          email:this.shoper.email,
          img:'http://item-1301846529.cos.ap-guangzhou.myqcloud.com/20210505023225563686.png',

          licenseType:this.storeInfo.licenseType,
          licenseAcct:this.storeInfo.licenseAccount,
          licenseAddress:this.storeInfo.licenseAddress,
          bornDate:this.storeInfo.bornDate,
          storeName:this.storeInfo.storeName,
          storeImg:this.storeInfo.storeImg,
          username:this.storeInfo.acct,
          password:this.storeInfo.password,
        }).then(data=>{
          if(data.code === 0){
          const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
           this.$router.push({path:'/submitaudit'})
        }, 2000);
         
          }
        })
                    
        }).catch(() => {
        }) 
        // 店长头像
        // let shopForm = new FormData()
        // shopForm.append('imageFile', this.shoper.img) 
        // axios({
        //   method: 'post',
        //   url: 'http://localhost:9999/upload/image',
        //   data: shopForm,
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   },
        // }).then(data => {
        //     // alert(JSON.stringify(data.data.data.imagePath))
        //     this.shoper.img = data.data.data.imagePath

        // }).catch(() => {
        // })                     

  

      },
    }

}
</script>

<style lang="scss" scoped>
.a{
    justify-content: space-between;
}
</style>