<template>
  <div>
    <div>
    <el-table
    border=""
    :data="adminList"
    style="margin-left:50px;width: 95%">
    <el-table-column type="selection"></el-table-column>
    <!-- <el-table-column v-for="(item,index) in tableData" :key="index" :label="item.label" :prop="item.prop" width="120"></el-table-column> -->
    
    <el-table-column label="用户编号" width="180">
      <template slot-scope="scope">
        {{scope.row.id}}
      </template>
    </el-table-column>    

    <el-table-column label="权限" width="100">
      <template slot-scope="scope">
        <el-tag size="small" effect="dark" :type="scope.row.role === '超级管理员'? 'danger':'primary'">
          <b>{{scope.row.role}}</b>
        </el-tag>
        <!-- {{scope.row.role}} -->
      </template>
    </el-table-column>        

    <el-table-column label="姓名" width="80">
      <template slot-scope="scope">
        {{scope.row.nickname}}
      </template>
    </el-table-column>         

    <el-table-column label="头像" width="90">
      <template slot-scope="scope">
        <el-avatar :size="55" :src="scope.row.img"></el-avatar>
      </template>
    </el-table-column>      
    
    
     
    <el-table-column label="账号" width="100">
      <template slot-scope="scope">
        {{scope.row.username}}
      </template>
    </el-table-column>  

    <el-table-column label="手机号码" width="100">
      <template slot-scope="scope">
        {{scope.row.phone}}
      </template>
    </el-table-column>  

    <el-table-column label="创建时间" width="100">
      <template slot-scope="scope">
        {{scope.row.createTime}}
      </template>
    </el-table-column>                 

    <el-table-column fixed="right" label="操作" width="350">
      <template slot-scope="scope" style="display:flex">
        <el-button class="add" icon="el-icon-check" @click="addVisble = true"  size="mini">新增</el-button>
        <el-button class="update" icon="el-icon-minus"  size="mini" @click="updateAdmin(scope.row)">修改</el-button>
        <el-button class="delete" icon="el-icon-close"  size="mini" @click="deleteAdmin(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  
    </div>

    <el-dialog :visible.sync="addVisble">
      <el-card class="box-card">
        <el-form :model="form" label-width="100">

        <el-form-item label="权限">
      <el-select v-model="form.role" placeholder="请选择权限">
        <el-option label="超级管理员" value="1"></el-option>
        <el-option label="管理员" value="2"></el-option>
      </el-select>
    </el-form-item>            

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
        role:'',
      },
      addVisble:false,
      updateVisble:false,
      adminList:[],
      tableData:[
        {label:'用户编号',prop:'id'},
        {label:'账号',prop:'username'},
        {label:'姓名',prop:'nickname'},
        {label:'手机号码',prop:'phone'},
        {label:'头像',prop:'img'},
        {label:'权限',prop:'role'},       
        // {label:'性别',prop:'sex'},
        {label:'创建时间',prop:'createTime'},
            ],      
    }
  },
  mounted(){
    this.selectAdminMethod()
  },
  methods:{
    addAdminMethod(){
      if(this.form.role === '1'){
        this.form.img = 'http://item-1301846529.cos.ap-guangzhou.myqcloud.com/20210505124751155391.png'
      }
      else{
        this.form.img = 'http://item-1301846529.cos.ap-guangzhou.myqcloud.com/20210505124732828534.png'
      }
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
                this.selectAdminMethod()
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
                this.selectAdminMethod()
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
                this.selectAdminMethod()
                }, 1000);           
      })
    },
    selectAdminMethod(){
      req('selectAdmin',{}).then(data=>{
        this.adminList = data.data.map(item=>{
          return Object.assign({},item,{key:item.id})
        })
        // alert(JSON.stringify(this.adminList))
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.add{
  background: rgba(0, 255, 128, 0.815);
  color: white;
}
.update{
  background:rgb(148, 14, 81);
  color: white;
}
.delete{
  background: rgba(255, 81, 0, 0.699);
  color: white;
}
.a{
  background: linear-gradient(rgb(255, 51, 0),orangered,red);
}
</style>
