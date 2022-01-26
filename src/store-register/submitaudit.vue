<template>
  <div>
      <div style="margin-top:80px;margin-left:250px;width:1000px;"><el-alert
      :closable="false"
      center
    title="已成功提交您的申请!"
    type="success"
    description="等待审批成功即可通过店铺上线，结果将以手机短信的方式提示您"
    show-icon>
  </el-alert></div>
  <div>
    <el-button type="success" @click="$router.push({path:'/login'})">确认</el-button>
  </div>
  </div>
</template>

<script>
export default {
  data(){
    return{}
  },
  mounted(){
    this.senParent()
  },
  methods:{
     senParent(){
            this.$emit('show',5)
        },
  }
}
</script>

<style>

</style>