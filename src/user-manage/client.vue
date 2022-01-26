<template>
  <div>
      <div>
          <div>
              <el-table
              border=""
    :data="clientList"
    style="margin-left:50px;width: 66%">
    <!-- <el-table-column v-for="(item,index) in tableData" :key="index" :label="item.label" :prop="item.prop" width="120"></el-table-column> -->

    <el-table-column label="用户编号" width="190">
      <template slot-scope="scope">
       <div>{{scope.row.id}}</div>
      </template>
    </el-table-column>

        <el-table-column label="客户头像" width="120">
      <template slot-scope="scope">
        <el-avatar :size="50" :src="scope.row.img"></el-avatar>
       <!-- <div>{{scope.row.img}}</div> -->
      </template>
    </el-table-column>

    <el-table-column label="姓名" width="120">
      <template slot-scope="scope">
       <div>{{scope.row.nickname}}</div>
      </template>
    </el-table-column>

    <el-table-column label="账号" width="120">
      <template slot-scope="scope">
       <div>{{scope.row.username}}</div>
      </template>
    </el-table-column>    

    <el-table-column label="性别" width="120">
      <template slot-scope="scope">
       <div>{{scope.row.sex}}</div>
      </template>
    </el-table-column>

    <el-table-column label="手机号码" width="120">
      <template slot-scope="scope">
       <div>{{scope.row.phone}}</div>
      </template>
    </el-table-column>

    <el-table-column label="注册时间" width="120">
      <template slot-scope="scope">
       <div>{{scope.row.createTime}}</div>
      </template>
    </el-table-column>      

    <el-table-column fixed="right" label="操作" width="120">
      <template slot-scope="scope">
        <el-button type="primary" @click="handleEdit(scope.$index, scope.row)" size="mini">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
          </div>

        <div>
             <div>
            <el-dialog title="客户详情" :visible.sync="dialogVisible">
              <div style="font-size:18px">
                  <div style="margin-left:0px">用户编号:{{this.detail.id}}</div>
                  <div style="margin-left:-0px">账号:{{this.detail.username}}</div>
                  <div style="margin-left:0px">姓名:{{this.detail.nickname}}</div>
                  <div style="margin-left:0px">手机号码:{{this.detail.phone}}</div>
                  <div style="margin-left:0px">性别:{{this.detail.sex}}</div>
                  <div style="margin-left:0px">创建时间:{{this.detail.createTime}}</div>
              </div>
                   
            </el-dialog>
          </div>
        </div>

      </div>
  </div>
</template>

<script>
import req from '@/api/client.js'
export default {
    data(){
        return{
            clientList:[],
            tableData:[
                {label:'用户编号',prop:'id'},
                {label:'账号',prop:'username'},
                {label:'姓名',prop:'nickname'},
                {label:'手机号码',prop:'phone'},
                {label:'性别',prop:'sex'},
                {label:'注册时间',prop:'createTime'},
            ],
            dialogVisible :false,
            detail:{},
        }
    },
    mounted(){
        this.getClientListMethod()
    },
    methods:{
        getClientListMethod(){
            req('selectClient',{}).then(data=>{
                this.clientList = data.data
                // alert(JSON.stringify(this.clientList))
            })
        },
        handleEdit(index, row) {
        console.log(index, row);
        this.detail = row
        this.dialogVisible = true
      },
    }
}
</script>

<style>

</style>