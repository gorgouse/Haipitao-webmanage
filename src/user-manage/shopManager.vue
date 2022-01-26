<template>
  <div>
    <div>
                    <el-table
              border=""
    :data="shopManageList"
    style="margin-left:50px;width: 95%">
    <el-table-column type="selection"></el-table-column>
    <!-- <el-table-column v-for="(item,index) in tableData" :key="index" :label="item.label" :prop="item.prop" width="120"></el-table-column> -->
    
    <el-table-column label="用户编号" width="180">
      <template slot-scope="scope" style="display:flex">
          <div>{{scope.row.id}}</div>
      </template>
    </el-table-column>  

    <el-table-column label="头像" width="150">
      <template slot-scope="scope" style="display:flex">
        <el-avatar :size="50" :src="scope.row.img"></el-avatar>
      </template>      
    </el-table-column>  

        <el-table-column label="姓名" width="120">
      <template slot-scope="scope" style="display:flex">
          <div>{{scope.row.shopManagerName}}</div>
      </template>          
    </el-table-column>  
    
    <el-table-column label="账号" width="130">
      <template slot-scope="scope" style="display:flex">
          <div>{{scope.row.username}}</div>
      </template>    
    </el-table-column>  
    
    <el-table-column label="手机号码" width="120">
      <template slot-scope="scope" style="display:flex">
          <div>{{scope.row.phone}}</div>
      </template>
    </el-table-column>  
    
        <el-table-column label="权限" width="80">
      <template slot-scope="scope" style="display:flex">
          <div>{{scope.row.role}}</div>
      </template>   
    </el-table-column>  
    
         <el-table-column label="创建时间" width="140">
      <template slot-scope="scope" style="display:flex">
          <div>{{scope.row.createTime}}</div>
      </template>                  
    </el-table-column>

    <el-table-column fixed="right" label="操作" width="280">
      <template slot-scope="scope" style="display:flex">
        <el-button icon="el-icon-check" type="primary" size="mini" @click="addVisble = true">新增</el-button>
        <el-button icon="el-icon-minus" type="warning" size="mini" @click="updateAdmin(scope.row)">修改</el-button>
        <el-button icon="el-icon-close" type="danger" size="mini" @click="deleteAdmin(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

     <el-dialog :visible.sync="addVisble">
      <el-card class="box-card">
        <el-form :model="form" label-width="100">

          <el-form-item label="姓名">
              <el-input style="width:200px" v-model="form.adminName"></el-input>
          </el-form-item>

          <el-form-item label="账号">
              <el-input style="width:200px"  v-model="form.username"></el-input>
          </el-form-item>   

          <el-form-item label="密码">
              <el-input style="width:200px" type="password" v-model="form.password"></el-input>
          </el-form-item>

          <el-form-item label="身份证">
              <el-input style="width:200px" v-model="form.idcard"></el-input>
          </el-form-item>    

          <el-form-item label="电话">
              <el-input style="width:200px" v-model="form.phone"></el-input>
          </el-form-item>   

          <el-form-item label="邮箱">
              <el-input style="width:200px" v-model="form.email"></el-input>
          </el-form-item>          

          <el-form-item>
            <el-button type="primary" style="width:280px" @click="addAdminMethod">新增</el-button>
          </el-form-item>                                        

        </el-form>
      </el-card>
    </el-dialog>

  <el-dialog :visible.sync="updateVisble">
      <el-card class="box-card">
        <el-form :model="form" label-width="100">

          <el-form-item label="姓名">
              <el-input style="width:200px" v-model="form.adminName"></el-input>
          </el-form-item>

          <el-form-item label="账号">
              <el-input style="width:200px"  v-model="form.username"></el-input>
          </el-form-item>   

          <el-form-item label="密码">
              <el-input style="width:200px" type="password" v-model="form.password"></el-input>
          </el-form-item>

          <el-form-item label="身份证">
              <el-input style="width:200px" v-model="form.idcard"></el-input>
          </el-form-item>    

          <el-form-item label="电话">
              <el-input style="width:200px" v-model="form.phone"></el-input>
          </el-form-item>   

          <el-form-item label="邮箱">
              <el-input style="width:200px" v-model="form.email"></el-input>
          </el-form-item>          

          <el-form-item>
            <el-button type="primary" style="width:280px" @click="updateAdminMethod">修改</el-button>
          </el-form-item>                                        

        </el-form>
      </el-card>
    </el-dialog>   
  
    </div>
  </div>
</template>

<script>
import req from '@/api/admin.js'
export default {
  data() {
    return{
     form:{
        id:'',
        username:'',
        password:'',
        adminName:'',
        idcard:'',
        phone:'',
        img:'',
        email:'',
      },
      addVisble:false,
      updateVisble:false,      
      shopManageList:[],
      tableData:[
        {label:'用户编号',prop:'id'},
        {label:'账号',prop:'username'},
        {label:'姓名',prop:'shopManagerName'},
        {label:'手机号码',prop:'phone'},
        {label:'头像',prop:'img'},
        {label:'权限',prop:'role'},       
        // {label:'性别',prop:'sex'},
        {label:'创建时间',prop:'createTime'},
            ],      
    }
  },
  mounted(){
    this.selectStoreManageMethod()
  },
  methods:{
    addAdminMethod(){
        this.form.role = '3'
        this.form.img = 'http://item-1301846529.cos.ap-guangzhou.myqcloud.com/20210505023225563686.png'
      req('addAdmin',{...this.form}).then(data=>{
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
                message: '新增成功',
                type: 'success'
                });
                this.selectStoreManageMethod()
                this.addVisble = false
                this.form = {}
                }, 1000);             
        }
        else{
                this.$message({
                message: data.msg,
                type: 'warning'
                });          
        }
      })
    },
    updateAdmin(row){
      this.form.id = row.id
      this.updateVisble = true
    },
    updateAdminMethod(row){
      // alert(JSON.stringify(row.id))
     req('updateAdmin',{...this.form}).then(data=>{
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
                message: '修改成功',
                type: 'success'
                });
                this.selectStoreManageMethod()
                this.updateVisble = false
                this.form = {}
                }, 1000);             
        }
        else{
                this.$message({
                message: data.msg,
                type: 'warning'
                });          
        }
      })      
    },
    deleteAdmin(row){
      // alert(JSON.stringify(row))
      req('deleteAdmin',{adminId:row.id}).then(data=>{
             const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                loading.close();
                this.$message({
                message: '删除成功',
                type: 'success'
                });
                this.selectStoreManageMethod()
                }, 1000);           
      })
    },    
    updateShopManage(row){
      alert(JSON.stringify(row))
    },
    deleteShopManage(row){
      alert(JSON.stringify(row))
    },
    selectStoreManageMethod(){
      req('selectStoreManage',{}).then(data=>{
        this.shopManageList = data.data

        // alert(JSON.stringify(this.shopManageList))
      })
    }
  }
};
</script>
