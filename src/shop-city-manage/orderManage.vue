<template>
  <div class="frame">
      <div>
          <div>
              <el-table
    border=""
    :data="getOrderList"
    style="margin-left:50px;width: 66%">
    <el-table-column v-for="(item,index) in tableData" :key="index" :label="item.label" :prop="item.prop" width="120"></el-table-column>
    <el-table-column label="操作" fixed="right" width="120">
      <template slot-scope="scope">
        <el-button  @click="handleEdit(scope.$index, scope.row)" type="primary" size="mini">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
          </div>

          <div>
            <el-dialog title="订单详情" :visible.sync="dialogVisible">
              <div style="font-size:18px">
                  <div style="margin-left:-8px">订单编号:{{this.detail.id}}</div>
                  <div style="margin-left:-130px">姓名:{{this.detail.nickname}}</div>
                  <div style="margin-left:-150px">手机号码:{{this.detail.phone}}</div>
                  <div style="margin-left:-195px">订单总数:{{this.detail.allCount}}</div>
                  <div style="margin-left:-170px">订单总价:{{this.detail.totalPrice}}</div>
                  <div style="margin-left:-40px">创建时间:{{this.detail.createTime}}</div>
              </div>
                   
            </el-dialog>
          </div>
          
      </div>
  </div>
</template>

<script>
import req from '@/api/order.js'
export default {
    data(){
        return{
            getOrderList:[],
            tableData: 
            [
              {label:'订单编号',prop:'id'},
              {label:'姓名',prop:'nickname'},
              {label:'手机号码',prop:'phone'},
              {label:'订单总数',prop:'allCount'},
              {label:'订单总价',prop:'totalPrice'},
              {label:'创建时间',prop:'createTime'},
            ],
            dialogVisible :false,
            detail:{},
        }
    },
    mounted(){
        this.getOrderListMethod()
    },
    methods:{
        getOrderListMethod(){
            req('orderselect',{}).then(data=>{
                this.getOrderList = data.data
                // alert(JSON.stringify(this.getOrderList))
            })
        },
         handleEdit(index, row) {
        console.log(index, row);
        this.detail = row
        this.dialogVisible = true
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
}
</script>

<style lang="scss" scpoed>

</style>