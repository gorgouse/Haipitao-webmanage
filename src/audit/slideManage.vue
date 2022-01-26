<template>
  <div>
    <div>
      <div>
            <div style="margin-top:30px;">
    <el-table @selection-change="handleSelectionChange" :data="slideAuditData" border style="width: 89%">
    <!-- <el-table-column width="133" v-for="(item,index) in tableData" :key="index" :prop="item.prop" :label="item.label"></el-table-column> -->
    
    <el-table-column label="商品编号" width="80">
      <template slot-scope="scope">
          <div>{{scope.row.goodsId}}</div>
      </template>
    </el-table-column>   
<!-- scope.row.slideImg -->
    <el-table-column label="申请轮播图片" width="110">
      <template slot-scope="scope">
         <el-avatar shape="square" :size="60" :src="scope.row.slideImg"></el-avatar>
      </template>
    </el-table-column>       

    <el-table-column label="商品名称" width="100">
      <template slot-scope="scope">
          <div>{{scope.row.goodsName}}</div>
      </template>
    </el-table-column>   

    <el-table-column label="店铺名称" width="185">
      <template slot-scope="scope">
          <div>{{scope.row.storeName}}</div>
      </template>
    </el-table-column>   

    <el-table-column label="营业执照类型" width="280">
      <template slot-scope="scope">
          <div>{{scope.row.licenseType}}</div>
      </template>
    </el-table-column>   

    <el-table-column label="营业执照地址" width="180">
      <template slot-scope="scope">
          <div>{{scope.row.licenseAddress}}</div>
      </template>
    </el-table-column>                   

    <el-table-column
      label="操作"
      width="280" fixed="right">
      <template slot-scope="scope" style="display:flex">
          <el-button icon="el-icon-check" class="" type="primary" size="mini" @click="pass(scope.row)">审核通过</el-button>
          <el-button icon="el-icon-close" class="deny" size="mini" @click="deny(scope.row)">否决通过</el-button>
      </template>
    </el-table-column>
  </el-table> 
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import req from '@/api/audit.js'
import reqq from '@/api/store.js'
export default {
  data(){
    return{
      tableData: [
         {label:'商品编号',prop:'goodsId'},
         {label:'商品名称',prop:'goodsName'},
        //  {label:'申请轮播图片',prop:'slideImg'},
         {label:'店铺名称',prop:'storeName'},
         {label:'营业执照类型',prop:'licenseType'},
        //  {label:'营业执照账号',prop:'licenseAcct'},
         {label:'营业执照地址',prop:'licenseAddress'},
         ],
      slideAuditData:[],
    }
  },
  mounted(){
    this.auditSlideSelectMethod()
  },
  methods:{
    pass(item){
      // alert(JSON.stringify(item.slideImg))
      // alert(JSON.stringify(item.goodsId))
      req('addSlide',{goodsId:item.goodsId,carousel:item.slideImg}).then(data=>{
        if(data.code == 0){
          reqq('updateGoodsSlide',{goodsId:item.goodsId,slideState:'3'}).then(data=>{
              req('auditSlideDelete',{goodsId:item.goodsId}).then(data=>{
                if(data.code === 0){
                const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                loading.close();
                this.$message({
                message: '已通过审核',
                type: 'success'
                });
                this.auditSlideSelectMethod()
                }, 2000);    
              }       

             })
 
          })
        
        }
      })
    },
    deny(item){
          reqq('updateGoodsSlide',{goodsId:item.goodsId,slideState:'1'}).then(data=>{
              req('auditSlideDelete',{goodsId:item.goodsId}).then(data=>{
                if(data.code === 0){
                const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                loading.close();
                this.$message({
                message: '已否决审核',
                type: 'success'
                });
                this.auditSlideSelectMethod()
                }, 2000);    
              }       

             })
 
          })      
    },
    handleSelectionChange(val){},
    auditSlideSelectMethod(){
      req('auditSlideSelect',{}).then(data=>{
        this.slideAuditData = data.data
        // alert(JSON.stringify(this.slideAuditData))
      })
    }
  }
}
</script>

<style lang="scss" scpoed>
.pass{
  background: rgb(5, 233, 119);
  color: white;
}
.deny{
  background: rgba(255, 51, 0, 0.829);
  color: white;
}
</style>