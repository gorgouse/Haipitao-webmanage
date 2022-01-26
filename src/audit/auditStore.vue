<template>
  <div>
      <div>
        <el-form style="margin-top:-20px" :model="registerData" label-width="100px">

           <div style="display:flex">
             <el-form-item style="width:250px" label="申请人：">
              <el-input size="small" v-model="registerData.shopManager"></el-input>
           </el-form-item>
           <el-form-item style="width:250px" label="手机号码：">
              <el-input size="small" v-model="registerData.phone"></el-input>
           </el-form-item>           
           <el-form-item style="width:250px" label="店铺名称：">
              <el-input size="small" v-model="registerData.storeName"></el-input>
           </el-form-item>
           <el-form-item style="width:250px" label="执照类型：">
              <el-input size="small" v-model="registerData.licenseType"></el-input>
           </el-form-item>
           </div>

          <div style="display:flex">
           <el-form-item style="width:250px" label="营业账号：">
              <el-input size="small" v-model="registerData.licenseAcct"></el-input>
           </el-form-item>     

           <el-form-item style="width:250px" label="执照地址：">
              <el-input size="small" v-model="registerData.licenseAddress"></el-input>
           </el-form-item>      

           <el-form-item style="width:250px" label="创办时间：">
              <el-input size="small" v-model="registerData.bornDate"></el-input>
           </el-form-item>

           <el-form-item>
              <el-button size="mini" type="info">刷新</el-button>
              <el-button size="mini" type="primary">搜索</el-button>
           </el-form-item> 
          </div>                                           
        </el-form>
      </div>
              <!-- {label:'申请人',prop:'shopManager'},
         {label:'手机',prop:'phone'},
         {label:'店铺名称',prop:'storeName'},
         {label:'营业执照类型',prop:'licenseType'},
         {label:'营业执照账号',prop:'licenseAcct'},
         {label:'营业执照地址',prop:'licenseAddress'},
         {label:'创办时间',prop:'bornDate'}, -->
      <div class="table">
           <el-table border="" :data="storeRegisterList" style="width: 95%">
             <el-table-column type="selection"></el-table-column>
              <!-- <el-table-column width="110" v-for="(item,index) in tableData" :key="index" :prop="item.prop" :label="item.label"></el-table-column> -->
              <el-table-column label="申请人" width="90">
                <!-- rgb(0, 174, 255) -->
                 <template slot-scope="scope">
                     <div style="color:gray"><b>{{scope.row.shopManager}}</b></div>
                </template> 
              </el-table-column>  

              <el-table-column label="用户头像">
              <template slot-scope="scope">
                <el-avatar :size="50" :src="scope.row.img"></el-avatar>
                </template> 
              </el-table-column>  
<!-- skyblue -->
              <el-table-column label="店铺名称" width="110">
                 <template slot-scope="scope">
                     <div style="color:gray"><b>{{scope.row.storeName}}</b></div>
                </template> 
              </el-table-column>    

              <el-table-column label="店铺图片" width="130">
                 <template slot-scope="scope">
               <el-avatar :size="60" fit="fill" :src="scope.row.storeImg"></el-avatar>
                </template> 
              </el-table-column>                 

              <el-table-column label="手机" width="110">
                 <template slot-scope="scope">
                     <div style="color:gray"><b>{{scope.row.phone}}</b></div>
                </template> 
              </el-table-column>  

              <el-table-column label="营业执照类型" width="280">
                 <template slot-scope="scope">
                     <div style="color:gray"><b>{{scope.row.licenseType}}</b></div>
                </template> 
              </el-table-column>  

              <el-table-column label="营业执照账号" width="130">
                 <template slot-scope="scope">
                     <div style="color:gray"><b>{{scope.row.licenseAcct}}</b></div>
                </template> 
              </el-table-column>  

              <el-table-column label="营业执照地址" width="210">
                 <template slot-scope="scope">
                     <div style="color:gray"><b>{{scope.row.licenseAddress}}</b></div>
                </template> 
              </el-table-column>  

              <el-table-column label="创办时间" width="150">
                 <template slot-scope="scope">
                     <div style="color:gray"><b>{{scope.row.bornDate}}</b></div>
                </template> 
              </el-table-column>  

              <el-table-column fixed="right" label="审核操作" width="230">
                 <template slot-scope="scope">
                     <el-button icon="el-icon-check"  @click="handlePassClick(scope.row)" size="mini" class="pass">通过</el-button>
                    <el-button icon="el-icon-close" type="danger"  @click="handleRejectClick(scope.row)" size="mini">否决</el-button>
                </template>
      </el-table-column>
    </el-table>
      </div>
  </div>
</template>

<script>
import req from '@/api/audit.js'
export default {
  data(){
    return{
      registerData:{
        shopManager:'',
        phone:'',
        storeName:'',
        licenseType:'',
        licenseAcct:'',
        licenseAddress:'',
        bornDate:''
      },
      pageInfo:{
        pageNum:7,
        pageSize:1,
      },
      storeRegisterList:[],
       tableData: [
        //  {label:'申请人',prop:'shopManager'},
        //  {label:'手机',prop:'phone'},
        //  {label:'店铺名称',prop:'storeName'},
        //  {label:'营业执照类型',prop:'licenseType'},
        //  {label:'营业执照账号',prop:'licenseAcct'},
        //  {label:'营业执照地址',prop:'licenseAddress'},
        //  {label:'创办时间',prop:'bornDate'},
        //  {label:'账号',prop:'username'},
         ]
    }
  },
  mounted(){
    this.getAuditStoreMethod()
  },
  methods:{
    getAuditStoreMethod(){
      req('selectAuditStoreRegister',{pageNum:this.pageInfo.pageNum,pageSize:this.pageInfo.pageSize}).then(data=>{
        this.storeRegisterList = data.data.list
        // alert(JSON.stringify(this.storeRegisterList))
      })
    },
    handlePassClick(row){
       this.$confirm('是否通过该店铺注册审核?', '确认提示', {
          confirmButtonText: '通过',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {

        req('storeAuditPass',{
          username:row.username,password:row.password,shopManager:row.shopManager,idCard:row.idCard,email:row.email,
          phone:row.phone,img:row.img,bornDate:row.bornDate,
          storeName:row.storeName,storeImg:row.storeImg,licenseAddress:row.licenseAddress,
          licenseAcct:row.licenseAcct,licenseType:row.licenseType,auditId:row.id
        }).then(data=>{
          if(data.code ==0){
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
                this.getAuditStoreMethod()
                }, 2000);               
              }
            })

         }).catch(() => {
        });

    },
    handleRejectClick(row){
      // alert(JSON.stringify(row))
      this.$confirm('确定否决该店铺注册审核?', '确认提示', {
          confirmButtonText: '否决',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        req('storeAuditNotPass',{auditId:row.id}).then(data=>{
          if(data.code ==0){
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
                this.getAuditStoreMethod()
                }, 2000);               
              }
            })
        }).catch(() => {
        });   
    }
  }
}
</script>

<style lang="scss" scoped>
.table{
  margin-top: 0px;
  margin-left: 4%;
}
.pass{
   color: white;
  background: #87dea1;
}
.a{
  background:rgb(9, 233, 203);
}
</style>