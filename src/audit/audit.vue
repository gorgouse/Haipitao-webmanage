<template>
  <div class="spring">
      <div>
          <el-form :model="auditdata" label-width="110px" style="margin-left:20px" size="small">
              <div style="display:flex" >
                  <el-form-item style="width:280px" label="商品编号：">
                  <el-input v-model="auditdata.goodsId"></el-input>
                    </el-form-item>

                <el-form-item style="width:280px" label="商品名称：">
                  <el-input v-model="auditdata.goodsName"></el-input>
              </el-form-item>
            
              <el-form-item style="width:280px" label="商品描述：">
                  <el-input v-model="auditdata.goodsDesc"></el-input>
              </el-form-item>
              </div>

              <div style="display:flex">
                  <el-form-item style="width:280px" label="商品状态：">
                      <el-select v-model="auditdata.goodsState" placeholder="请选择">
                        <el-option v-for="item in options" 
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                        </el-option>
                        </el-select>
                  </el-form-item>

                  <el-form-item style="width:280px" label="店铺编号：">
                  <el-input v-model="auditdata.storeId"></el-input>
                  </el-form-item>

                  <el-form-item>
                      <el-button size="small" @click="fresh" style="margin-left:0px" type="info">刷新</el-button>
                      <el-button size="small" style="margin-left:10px" type="primary" @click="auditInfoListMethod">搜索</el-button>
                  </el-form-item>

              </div>

          </el-form>
      </div>
      <div>
            <el-table :pageInfo="pageInfo" 
            :data="goodsList.slice((pageInfo.pageNum -1)*pageInfo.pageSize,pageInfo.pageNum*pageInfo.pageSize)" 
            style="width: 85%;margin-left:5%" @selection-change="handleSelectionChange" border="" stripe >
                <el-table-column type="selection" width="40"></el-table-column>

                 <el-table-column label="商品编号" width="80">
                    <template slot-scope="scope">
                         {{scope.row.goodsId}}
                    </template>
                </el-table-column>      

                  <el-table-column label="商品图片" width="120">
                    <template slot-scope="scope">
                        <el-avatar shape="square" :size="100" :src="scope.row.goodsImg"></el-avatar>
                    </template>
                </el-table-column>                     

                  <el-table-column label="商品名称" width="140">
                    <template slot-scope="scope">
                         <el-tag  effect="dark" type="primary" size="medium"><b>{{scope.row.goodsName}}</b></el-tag>
                         <!-- <div style="color:rgb(0, 174, 255)">{{scope.row.goodsName}}</div> -->
                    </template>
                </el-table-column>               

                  <el-table-column label="商品价格" width="110">
                    <template slot-scope="scope">
                         <el-tag  effect="light" style="background:orange;color:white" size="medium"><b>¥{{scope.row.goodsPrice}}</b></el-tag>
                         <!-- <div style="color:orangered">{{scope.row.goodsPrice}}</div> -->
                    </template>
                </el-table-column>          

                 <el-table-column label="状态" width="80">
                    <template slot-scope="scope">
                         <el-tag  effect="dark" :type="scope.row.goodsState ==='待审核' ? 'danger':'info'" size="medium"><b>{{scope.row.goodsState}}</b></el-tag>
                    </template>
                </el-table-column>                    

                  <el-table-column label="商品描述" width="180">
                    <template slot-scope="scope">
                        <!-- <el-tag  effect="light" style="background:87dea1;color:white" size="medium"><b>¥{{scope.row.goodsDesc}}</b></el-tag> -->
                         <div style="color: gray"><b>{{scope.row.goodsDesc}}</b></div>
                    </template>
                </el-table-column>     

                  <el-table-column label="库存数量" width="80">
                    <template slot-scope="scope">
                         <div style="color:orange">{{scope.row.goodsTotal}}</div>
                    </template>
                </el-table-column>        

                    <el-table-column label="店铺编号" width="80">
                    <template slot-scope="scope">
                         <div style="color:gray">{{scope.row.storeId}}</div>
                    </template>
                </el-table-column>                                

                <el-table-column v-for="(item,index) in tableData" :key="index" :prop="item.prop" :label="item.label"></el-table-column>
                 
                 <el-table-column fixed="right" label="审核操作" width="220">
                    <template slot-scope="scope">
                        <el-button icon="el-icon-check" type="primary"  @click="handlePassClick(scope.row)" size="small">通过</el-button>
                         <el-button icon="el-icon-minus" class="down" @click="handleDownClick(scope.row)" size="small">下架</el-button>
                    </template>
                </el-table-column>
            </el-table>

              <div class="block">
    <span class="demonstration"></span>
    <el-pagination
     background
     style="width: 78%;margin-left:5%"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.pageNum"
      :page-sizes="[3, 4, 5, 20,100]"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total">
    </el-pagination>
  </div>
      </div>
  </div>
</template>

<script>
import req from '@/api/audit.js'
export default {
data(){
    return{
        options:[
            {label:'全部',value:''},
            {label:'待审核',value:'2'},
            {label:'审核通过/已发布',value:'3'},
        ],
        auditdata:{
            goodsId:'',
            goodsName:'',
            goodsDesc:'',
            goodsState:'',
            storeId:'',
        },
        pageInfo:{
            pageNum:3,
            pageSize:4,
            total:0,
        },
        loading: false,
        multipleSelection: [],
        goodsList:[],
        tableData: [
            // {label:'商品编号',prop:'goodsId'},
            // {label:'商品名称',prop:'goodsName'},
            // {label:'商品价格',prop:'goodsPrice'},
            // {label:'商品描述',prop:'goodsDesc'},
            // {label:'商品状态',prop:'goodsState'},
            // {label:'库存数量',prop:'goodsTotal'},
            // {label:'商品图片',prop:'goodsImg'},
            // {label:'店铺编号',prop:'storeId'},

        ],
    }
 },
 mounted(){
     this.auditInfoListMethod()
    //  this.pageInit()
 },
 methods:{
     fresh(){
         this.auditdata = null
         this.auditInfoListMethod()
     },
     pageInit(){
        this.pageInfo.pageNum = 2
        this.pageInfo.pageSize = 3
     },
     auditInfoListMethod(){
        req('auditInfoList',{...this.auditdata,pageNum:this.pageInfo.pageNum,pageSize:this.pageInfo.pageSize}).then(data=>{
            this.goodsList = data.data.list
            this.pageInfo.total = data.data.total
            this.pageInfo.pageNum = data.data.pageNum
            this.pageInfo.pageSize = data.data.pageSize
            // alert(JSON.stringify(data.data.pageNum))
            // alert(JSON.stringify(this.goodsList))
        })
     },
     handleSizeChange(val) {
        this.pageInfo.pageSize = val
      },
      handleCurrentChange(val) {
        this.pageInfo.pageNum = val
      },
     handleSelectionChange(){},
     handlePassClick(row){
        //  alert(JSON.stringify(row.goodsState))
        if(row.goodsState === '已发布'){
            this.$message({
                message: '该状态已经是发布状态',
                type: 'warning'
                });
                return
        }
        else{
            req('auditGoodsUpdate',{goodsId:row.goodsId,goodsState:3}).then(data=>{
            this.loading = true
            if(data.code == 0){
                const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                loading.close();
                this.$message({
                message: data.msg,
                type: 'success'
                });
                this.auditInfoListMethod()
                }, 2000);    
                  
                }
            })
        }

     },
     handleDownClick(row){
        //  alert(JSON.stringify(row))
        req('auditGoodsUpdate',{goodsId:row.goodsId,goodsState:1}).then(data=>{
            if(data.code == 0){
                const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                loading.close();
                this.$message({
                message: data.msg,
                type: 'success'
                });
                this.auditInfoListMethod()
                }, 2000);
            }
        })
     }
 }
}
</script>

<style lang="scss">
.spring{
    margin-left:30px;
    margin-top: -20px;
}
.pass{
    color: white;
  background:rgb(4, 119, 62);
}
.down{
    color: white;
  background: rgba(255, 68, 0, 0.699);
}
</style>