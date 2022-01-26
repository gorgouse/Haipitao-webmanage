<template>
  <div>
    <div>
      <div style="margin-top:30px;font-size:20px;color:gray;margin-left:-900px;">入驻联系人信息</div>
     <div style="margin-top:50px;margin-left:20%;width:40%">
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="联系人姓名" 
            :rules="[{ required: true, message: '联系人姓名不能为空', trigger: 'blur'}]">
              <el-input v-model="form.shopManager"></el-input>
            </el-form-item>

            <el-form-item label="联系人手机"
            :rules="[{ required: true, message: '联系人手机不能为空', trigger: ['blur', 'change']}]">
               <el-input v-model="form.phone"></el-input>
            </el-form-item>

            <el-form-item label="电子邮箱"
            :rules="[{ required: true, message: '联系人电子邮箱不能为空', trigger: ['blur', 'change']}]">
                <el-input v-model="form.email"></el-input>
            </el-form-item>  

      </el-form>
     </div>
     <div>
       <div style="margin-top:40px;">
         <el-button type="info" @click="$router.push({path:'/store-register'})">上一步</el-button>
         <el-button type="primary" @click="submit">下一步，完善店铺信息</el-button>
       </div>
     </div>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      form:{
        shopManager:'',
        phone:'',
        email:'',
      }
    }
  },
  mounted(){
    this.sendParent()
  },
  methods:{ 
    sendParent(){
      this.$emit('show',2)
    },
    getStoreDataToParent(){
      this.$emit('getStoreData',this.form)
    },
    submit(){
      if(this.form.shopManager != '' && this.form.phone !== '' && this.form.email != ''){
          this.getStoreDataToParent()
          const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
          this.$router.push({path:'/storemsg'})
        }, 2000);
      }
      else{
            this.$message({
            message: '请填写完整的信息',
            type: 'warning'
        });
      }
    }
  }
}
</script>

<style>

</style>