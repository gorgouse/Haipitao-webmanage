<template>
  <div>
      <div>
        
        <div style="margin-top:50px;margin-left:15%;width:70%;">
            嗨皮涛秉承“客户为先，诚信至上”的宗旨、 “让生活变得简单，快乐！”为我们的最终目标，为广大用户提供最优质的商品及服务。 嗨皮涛开放平台欢迎国际国内知名品牌、拥有特色货品及垂直电商入驻。
        </div>

        <div>
            <div>一、商家入驻流程：</div>
            <div>
                <!-- <div style="display:flex">
                    <div>准备材料</div>
                    <div class="el-icon-arrow-right"></div>
                     <div>提交入驻</div>
                      <div>入驻审核</div>
                       <div>上线经营</div>
                </div> -->
            </div>
        </div>

          <div style="margin-top:200px;">
        <div style="margin-left:-240px;"> <el-checkbox v-model="value1">我已准备好公司营业执照、法人等相关信息及资质电子图片</el-checkbox></div>
         <div> <el-checkbox style="margin-left:-212px;" v-model="value2">我已准备好经营品牌授权、行业及产品资质信息及资质电子图片</el-checkbox></div>
          <div> <el-checkbox v-model="value3">我已准备实名认证通过的嗨皮钱包/正在提交实名认证《注册嗨皮涛企业钱包及提交实名操作说明》</el-checkbox></div>
      </div>
      <div style="margin-top:20px;">
         <el-button type="info" @click="$router.push({path:'/login'})">返回重选</el-button>
         <el-button type="primary" @click="submintMethod">开始提交</el-button>
      </div>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
          value1:false,
          value2:false,
          value3:false,
        }
    },
    mounted(){
      this.sendParent()
    },
    methods:{
        sendParent(){
           this.$emit('show',1)
        },
        submintMethod(){
          if(this.value1 !== false && this.value2 !== false && this.value3 !== false)
          {
          const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
          this.$router.push({path:'/mainbodymsg'})
        }, 2000);
          }
          else{
            this.$message({
            message: '请勾选完整的信息',
            type: 'warning'
        });
          }
        }
    }
}
</script>

<style>

</style>