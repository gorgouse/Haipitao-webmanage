<template>
  <div style="all">
    <!-- <div class="header">嗨皮,愿遇见最美好的你！</div> -->
    <div v-if="userData.role === '1' || userData.role === '2'" style="display:flex;margin-top: -10px;">
      <el-card class="card0">
         <div>
           <div style="font-size:28px"><b>{{numberData.pageViewNumber}}</b></div>
           <div><span class="el-icon-info"></span><b>访问总数</b></div>
         
         </div>
      </el-card>
      <el-card class="card1">
        <div style="font-size:28px"><b>{{numberData.clientNumber}}</b></div>
        <div><span class="el-icon-user"></span><b>客户数量</b></div>
      </el-card>
      <el-card class="card2">
        <div style="font-size:28px"><b>{{numberData.orderNumber}}</b></div>
        <div><span class="el-icon-document"></span><b>下单数量</b></div>
      </el-card>
    </div>
 <div style="display:flex">
    <el-card class="card3">
      <img style="margin-left:-40px;margin-top:-90px" src="./assets/bgg4.png">
    </el-card>

    <el-card class="card4">
      <img style="margin-top:-90px;margin-left:-40px;" src="./assets/bgg6.png">
    </el-card>
</div>

   <div>
     <!-- <img src="./assets/bgg4.png"> -->
     <!-- <img src="./assets/bgg6.png"> -->
   </div>
      <div>
      </div>
  </div>
</template>

<script>
  import req from '@/api/admin.js'
export default {
  data(){
    return{
      userData:{},
      currentDate: new Date(),
      numberData:[],
    }
  },
  created(){
    this.userDataMethod()
  },
  mounted(){
    this.numberDataMethod()
  },
  methods:{
    userDataMethod(){
      this.userData = JSON.parse(sessionStorage.getItem('token'))
      // alert(JSON.stringify(this.userData))
    },    
    numberDataMethod(){
      req('countNumber',{}).then(data=>{
        this.numberData = data.data
        // alert(JSON.stringify(this.numberData))
      })
    }
  }
}
</script>

<style lang="scss" scpoed>
.card0{
  height: 100px;
  width: 320px;
  background: linear-gradient(to right,#67C23A,  );
  // background: rgba(141, 255, 47, 0.925);
  color: white;
}
.card1{
  margin-left: 30px;
  background: linear-gradient(to right,#F56C6C,orangered,);
  color: white;
  width: 320px;  
}
.card2{
  margin-left: 30px;  
  width: 320px;  
  background:linear-gradient(to right,rgba(12, 152, 233, 0.637),#409EFF,rgba(0, 119, 255, 0.932));  
  color: white;
}
.card3{
  margin-top: 20px;
  height: 350px;
  width: 500px;
}
.card4{
  margin-top: 20px;
  height: 350px;  
  margin-left: 50px;
}
.header{
  color: rgb(25, 226, 149);
  font-size: 30px;
}
.all{
  // margin-top: -50px;
  // background-image: url("./assets/444.jpg")
}
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }


  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>