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

      <div>
          <div>
              <el-table border="" :data="mainOrderlist" style="margin-left:50px;width: 78%">
                  <el-table-column type="selection" width="55"></el-table-column>
                  
                  <el-table-column width="110" label="订单状态">
                      <template slot-scope="scope">
                          <el-tag effect="dark" size="mini" :type="scope.row.state === '待发货'? 'danger':scope.row.state === '完成发货'? 'primary':'success'" @click="detail(scope.row.state)">{{scope.row.state}}</el-tag>
                      </template>
                  </el-table-column>                  
                  
                  <el-table-column width="100" v-for="(item,index) in tableData" :key="index" :label="item.label" :prop="item.prop"></el-table-column>

                  <el-table-column fixed="right" width="160">
                      <template slot-scope="scope" style="display:flex">
                          <el-button size="mini" type="primary" @click="detail(scope.row)">详情</el-button>
                          <el-button v-show="scope.row.state === '待发货'" size="mini" type="success" @click="setout(scope.row)" >发货</el-button>
                      </template>
                  </el-table-column>
              </el-table>
          </div>
          <div>
              <el-dialog :visible.sync="visble">
                <el-card shadow="always" class="box-card">
                <div slot="header" class="clearfix">
                <span>{{mainOrderId}}订单详情</span>
                </div>
                <div v-for="(item,index) in detailData" :key="index" class="text item">
                    <div style="color:gray">
                      <div>子订单号：{{item.id}}</div>
                      <div>商品编号：{{item.goodsId}}</div>
                      <div>商品名称：{{item.goodsName}}</div>
                      <div>商品描述：{{item.goodsDesc}}</div>
                      <div>数量：{{item.goodsCount}}</div>
                      <div>单价：{{item.goodsPrice}}</div>
                      <div>创建时间：{{item.createTime}}</div>                        
                    </div>
                </div>
                </el-card>
              </el-dialog>
          </div>
      </div>
  </div>
</template>

<script>
import req from '@/api/orderDetail.js'
export default {
  data(){
    return{
      param:'',
      inputId:'',
      userData:{},       
      mainOrderId:'',
      loading: true,
      visble:false,
      detailData:[],
      mainOrderlist:[],
      orderDetailList:[],
      tableData:[
        {label:'订单主编号',prop:'id'},
        {label:'客户编号',prop:'userId'},
        {label:'客户昵称',prop:'clientName'},
        {label:'总价',prop:'totalPrice'},
        {label:'总数量',prop:'allCount'},
        // {label:'状态',prop:'state'},
        {label:'手机号',prop:'phone'},
        {label:'地址',prop:'address'},
        {label:'创建时间',prop:'createTime'},

      ]
    }
  },
  mounted(){
    this.selectMainOrderOfStoreMethod()
    this.getToken()  
  },
  methods:{
    activeMethod(){
      this.param = this.inputId
      this.selectMainOrderOfStoreMethod()
    },    
    getToken(){
        this.userData = JSON.parse(sessionStorage.getItem('token'))
        this.param = this.userData.id        
        // alert(this.userData.role)
    },    
    setout(item){
      // alert(JSON.stringify(item))
      if(item.state == '待发货'){
        req('updateOrderState',{id:item.id,state:'3'}).then(data=>{
              const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                loading.close();
                this.$message({
                message: '发货成功',
                type: 'success'
                });
                this.selectMainOrderOfStoreMethod()
                }, 2000);                
          })

      }
      else{
        this.$message({
          message: '只能选择待发货状态',
          type: 'warning'
        });        
      }
    },
    selectMainOrderOfStoreMethod(){
      this.getToken() 
      req('selectMainOrderOfStore',{shopManageId:this.param}).then(data=>{
        this.mainOrderlist = data.data
        // alert(JSON.stringify(this.mainOrderlist))
      })
    },
    detail(item){
      // alert(JSON.stringify(item.id))
      this.mainOrderId = item.id
      req('storeOrderDetail',{orderId:item.id,shopManageId:this.param}).then(data=>{
      this.detailData = data.data
      console.log(JSON.stringify(this.detailData))
      })
      this.visble = true

    }
  }
}
</script>

<style>
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 95%;
  }
</style>