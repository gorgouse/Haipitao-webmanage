<template>
  <div style="margin-top:-20px">

    <div v-show="this.userData.role == 1 ||this.userData.role ==2">
      <el-form>
        <el-form-item>
          <el-input placeholder="查询搜索的店家用户编号" v-model="inputId" style="width:200px"></el-input>
          <el-button type="primary" @click="activeMethod">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="display:flex">
      <el-button icon="el-icon-plus" class="add" size="mini" @click="addVisble = true">新增商品</el-button>
      <el-button icon="el-icon-star-off" class="addType" size="mini" @click="clickAddType" >添加类型</el-button>
      <el-button icon="el-icon-star-on" class="addProp" size="mini" @click="clickAddProp">添加属性</el-button>
    </div>
    <div>
        <div style="margin-top:10px;">
        <el-table @selection-change="handleSelectionChange" :data="goodsData" border style="width: 100%">
     <el-table-column type="selection" width="45"></el-table-column>

      <el-table-column label="商品编号" width="80">
        <template slot-scope="scope">
        {{scope.row.goodsId}}
      </template>
    </el-table-column>        
    
      <el-table-column label="商品图片" width="80">
        <template slot-scope="scope">
          <el-avatar shape="square" :size="50" :src="scope.row.goodsImg"></el-avatar>
        <!-- {{scope.row.goodsImg}} -->
      </template>
    </el-table-column>         

      <el-table-column label="商品名称" width="150">
        <template slot-scope="scope">
          <el-tag type="primary" effect="dark"><b>{{scope.row.goodsName}}</b></el-tag>
          <!-- <div style="color: rgb(0, 174, 255)">{{scope.row.goodsName}}</div> -->
      </template>
    </el-table-column>     

      <el-table-column label="商品状态" width="80">
        <template slot-scope="scope">
          <el-tag
            effect="dark"
            :type="scope.row.goodsState === '待审核' ? 'danger' : scope.row.goodsState === '已发布'? 'success':'warning'"
            >{{scope.row.goodsState}}
          </el-tag>
      </template>
    </el-table-column>

      <el-table-column label="一级分类" width="80">
        <template slot-scope="scope">
          <!-- <el-tag class="aa" effect="light"><b>{{scope.row.firstClassifyName}}</b></el-tag> -->
          <div style="color: gray">{{scope.row.goodsName}}</div>
      </template>
    </el-table-column>   

      <el-table-column label="二级分裂" width="80">
        <template slot-scope="scope">
          <!-- <el-tag class="bb" effect="light"><b>{{scope.row.secondClassifyName}}</b></el-tag> -->
          <div style="color: gray">{{scope.row.goodsName}}</div>
      </template>
    </el-table-column>           

      <el-table-column label="商品描述" width="160">
        <template slot-scope="scope">
          <div style="color:gray">{{scope.row.goodsDesc}}</div>
      </template>
    </el-table-column>       

      <el-table-column label="价格" width="120">
        <template slot-scope="scope">
           <!-- <el-tag type="primary" style="background:orangered;color:white" effect="light"><b>¥{{scope.row.goodsPrice}}</b></el-tag> -->
          <div style="color:gray"><b>¥{{scope.row.goodsPrice}}</b></div>
      </template>
    </el-table-column>      

      <el-table-column label="商品类型" width="80">
        <template slot-scope="scope">
          <!-- <el-tag type="primary" style="background:orange;color:white" effect="light"><b>{{scope.row.goodsType}}</b></el-tag> -->
          <div style="color:gray">{{scope.row.goodsType}}</div>
      </template>
    </el-table-column>   

      <el-table-column label="商品属性" width="80">
        <template slot-scope="scope">
          <!-- <el-tag type="primary" style="background:rgb(224, 240, 6);color:white" effect="light"><b>{{scope.row.goodsProp}}</b></el-tag> -->
          <div style="color:gray">{{scope.row.goodsProp}}</div>
      </template>
    </el-table-column>           

    <el-table-column width="110" v-for="(item,index) in tableData" :key="index" :prop="item.prop" :label="item.label"></el-table-column>

    <el-table-column
      fixed="right"
      label="权限操作"
      width="360">
      <template slot-scope="scope">
         <el-button icon="el-icon-check" class="emit" size="mini" @click="issueMethod(scope.row)">发布</el-button>
        <el-button icon="el-icon-minus" type="primary" size="mini" @click="downMethod(scope.row)">下架</el-button>
        <el-button icon="el-icon-remove" class="update" size="mini" @click="updateRecord(scope.row)">修改</el-button>
        <el-button icon="el-icon-close" class="delete" size="mini" @click="deleteMethod(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
        </div>

      <el-dialog title="新增商品" :visible.sync="addVisble" width="50%">
          <el-form label-width="140px" style="margin-left:10%;width:70%" :model="form">

              <el-form-item label="一级分类">
                <el-select v-model="form.firstClassify" placeholder="请选择一级分类" @change="getSecondClassifyMethod(form.firstClassify)">
                  <el-option v-for="(item,index) in firstClassifyData" :key="index" :label="item.classifyName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>            

              <el-form-item label="二级分类">
                <el-select v-model="form.secondClassify" placeholder="请选择二级分类">
                  <el-option v-for="(item,index) in secondClassifyData" :key="index" :label="item.classifyName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>       

              <el-form-item label="商品名称">
                  <el-input placeholder="请输入商品名称" v-model="form.goodsName"></el-input>
              </el-form-item>                                       
              
               <el-form-item label="商品价格">
                  <el-input placeholder="请输入数字" v-model="form.goodsPrice"></el-input>
              </el-form-item>

               <el-form-item label="商品描述">
                  <el-input placeholder="请输入描述" v-model="form.goodsDesc"></el-input>
              </el-form-item>              

               <el-form-item label="库存数量">
                  <el-input placeholder="请输入数字" v-model="form.goodsTotal"></el-input>
              </el-form-item>

               <el-form-item label="商品类型">
                  <el-input placeholder="如商品的颜色分类" v-model="form.goodsType"></el-input>
              </el-form-item>

               <el-form-item label="商品属性">
                  <el-input placeholder="如商品的尺寸、大小" v-model="form.goodsProp"></el-input>
              </el-form-item>

               <el-form-item label="商品顺序">
                  <el-input placeholder="请输入商品顺序" v-model="form.goodsSort"></el-input>
              </el-form-item>

               <el-form-item label="">
                 <el-button style="margin-left:-320px" icon="el-icon-plus" @click="clickadd()" type="primary">添加图片</el-button>
              </el-form-item>

              <el-form-item>
                  <el-button type="primary" style="width:450px;margin-left:-70px" @click="addMethod">新增</el-button>
              </el-form-item>
          </el-form>
      </el-dialog>

      <div>
        <input style="display:none" id="file" ref="file" type="file" value="" name="imageFile"/>
      </div>

      <el-dialog title="修改商品" :visible.sync="updateVisble" width="50%">
          <el-form label-width="140px" style="margin-left:10%;width:70%" :model="form">

              <el-form-item label="商品名称">
                  <el-input v-model="form.goodsName"></el-input>
              </el-form-item>
               <el-form-item label="商品价格">
                  <el-input v-model="form.goodsPrice"></el-input>
              </el-form-item>
               <el-form-item label="库存数量">
                  <el-input v-model="form.goodsTotal"></el-input>
              </el-form-item>
               <el-form-item label="商品类型">
                  <el-input v-model="form.goodsType"></el-input>
              </el-form-item>
               <el-form-item label="商品属性">
                  <el-input v-model="form.goodsProp"></el-input>
              </el-form-item>
               <el-form-item label="商品描述">
                  <el-input v-model="form.goodsDesc"></el-input>
              </el-form-item>
               <el-form-item label="商品图片">
                 <el-button style="margin-left:-320px;background:skyblue;color:white" icon="el-icon-plus" @click="clickadd()">添加图片</el-button>
              </el-form-item>
               <el-form-item label="排序">
                  <el-input v-model="form.goodsSort"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="success" style="width:450px;margin-left:-70px" @click="updateMethod">修改</el-button>
              </el-form-item>
          </el-form>
      </el-dialog>      

            <el-dialog :title="'添加'+currentType" :visible.sync="addTypeVisble" width="50%">
          <el-form label-width="140px" style="margin-left:10%;width:70%" :model="typeForm">
              <el-form-item label="类型名称">
                  <el-input v-model="typeForm.tName"></el-input>
              </el-form-item>

               <el-form-item label="类型图片">
                  <el-button icon="el-icon-plus" @click="clickadd" style="width:320px;" :type="typeForm.tImg === '' ? 'primary' :'success'" class="select">添加图片</el-button>
              </el-form-item>
               <el-form-item label="类型价格">
                  <el-input v-model="typeForm.tPrice"></el-input>
              </el-form-item>
               <el-form-item label="排列顺序">
                  <el-input v-model="typeForm.tSort"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="margin-left:-80px;width:400px" @click="addTypeMethod">添加</el-button>
              </el-form-item>
          </el-form>
      </el-dialog>  

            <el-dialog :title="'添加'+currentProp" :visible.sync="addPropVisble" width="50%">
          <el-form label-width="140px" style="margin-left:10%;width:70%" :model="typeForm">
              <el-form-item label="类型名称">
                  <el-input v-model="propForm.pName"></el-input>
              </el-form-item>

               <el-form-item label="排列顺序">
                  <el-input v-model="propForm.sort"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="margin-left:-80px;width:400px" @click="addPropMethod">添加</el-button>
              </el-form-item>
          </el-form>
      </el-dialog>        



    </div>
  </div>
</template>

<script>
import axios from 'axios'
import req from '@/api/goods.js'
import request from '@/api/audit.js'
export default {
  data(){
    return{
      currentProp:'',
      currentType:'',
      addTypeVisble:false,
      addPropVisble:false,
      inputId:'',
      loading:false,
      goodsId:'',
      storeId:'',
      shopManageId:'',
      typeForm:{
        gId:'',
        tName:'',
        tImg:'',
        tPrice:'',
        tSort:''
      },
      propForm:{
        gId:'',
        pName:'',
        sort:''        
      },      
      form:{
        goodsName:'',
        goodsPrice:'',
        goodsTotal:'',
        goodsType:'',
        goodsDesc:'',
        goodsImg:'',
        goodsSort:'',
        goodsProp:'',
        firstClassify:'',
        secondClassify:''
      },
      userData:{}, 
      addVisble:false,
      issueVisble:false,
      downVisble:false,
      updateVisble:false,
      goodsData:[],
      tableData:[
        // {label:'商品编号',prop:'goodsId'},
        // {label:'商品名称',prop:'goodsName'},
        // {label:'状态',prop:'goodsState'},
        // {label:'描述',prop:'goodsDesc'},
        // {label:'价格',prop:'goodsPrice'},
        // {label:'商品类型',prop:'goodsType'},
        // {label:'商品属性',prop:'goodsProp'},
        {label:'库存数量',prop:'goodsTotal'},
        // {label:'商品图片',prop:'null'},//goodsImg
        {label:'商品排序',prop:'goodsSort'},
        // {label:'图片',prop:'预览'},
        {label:'创建时间',prop:'createTime'},
      ],
      currentImagePath:'',
      firstClassifyData:[],
      secondClassifyData:[],
      classifyId:'',
      param:'',
    }
  },
  mounted(){
    this.getToken()  
    this.goodsManageSelectMethod()
    this.getStoreManage()
    this.getFirstClassifyMethod() 
  },
  methods:{
    clickAddProp(){
      if(this.propForm.gId === '' || this.propForm.gId == null){
                this.$message({
                message: '请先选择商品',
                type: 'warning'
                });        
                return        
      }
      this.addPropVisble = true
    },
    addPropMethod(){
      req('addProp',{
        gId:this.propForm.gId,
        pName:this.propForm.pName,       
        sort:this.propForm.sort
        }).then(data=>{
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
                message: '商品属性添加成功',
                type: 'success'
                });
                this.addPropVisble = false
                }, 2000);    
                }        
      })      
    },
    addTypeMethod(){
      if(document.getElementById('file').files[0] == undefined){
                this.$message({
                message: '请先选择图片',
                type: 'warning'
                });        
                return    
      }  

        let form = new FormData()
        let imgFile = document.getElementById('file').files[0]
        form.append('imageFile', imgFile) // 通过append向form对象添加数据
        axios({
          method: 'post',
          // url: 'http://47.107.123.144/upload/image',
          url: 'http://localhost:9999/upload/image',
          data: form,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }).then(data => {

      req('addType',{
        gId:this.typeForm.gId,
        tName:this.typeForm.tName,
        tImg:data.data.data.imagePath,
        tPrice:this.typeForm.tPrice,        
        tSort:this.typeForm.tSort
        }).then(data=>{
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
                message: '商品属性添加成功',
                type: 'success'
                });
                this.addTypeVisble = false
                this.document.getElementById('file').files[0] = undefined
                }, 2000);    
                }        
      })

        }).catch(() => {
        })       


    },
    clickAddType(){
      if(this.typeForm.gId === '' || this.typeForm.gId == null){
                this.$message({
                message: '请先选择商品',
                type: 'warning'
                });        
                return        
      }
      else{
        this.addTypeVisble = true
      }
    },
    activeMethod(){
      this.param = this.inputId
      this.goodsManageSelectMethod()
    },
    getToken(){
        this.userData = JSON.parse(sessionStorage.getItem('token'))
        this.param = this.userData.id
        // alert(this.userData.role)
    },     
    getFirstClassifyMethod(){
      req('getFirstClassify',{}).then(data=>{
        this.firstClassifyData = data.data
        // alert(JSON.stringify(this.firstClassifyData))
      })
    },
    getSecondClassifyMethod(classifyId){
      req('getSecondClassify',{classifyId:classifyId}).then(data=>{
        this.secondClassifyData = data.data
        // alert(JSON.stringify(this.secondClassifyData))
      })      
    },
    updateRecord(row){
      this.goodsId = row.goodsId
      // alert(JSON.parse(this.goodsId))
      this.updateVisble = true
    },
    updateMethod(){
      if(document.getElementById('file').files[0] == undefined){
                this.$message({
                message: '请先选择图片',
                type: 'warning'
                });        
                return
      }

      let form = new FormData()
        let imgFile = document.getElementById('file').files[0]
        form.append('imageFile', imgFile) // 通过append向form对象添加数据
        axios({
          method: 'post',
          url: 'http://localhost:9999/upload/image',
          // url: 'http://47.107.123.144/upload/image',
          data: form,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }).then(data => {

      req('updateGoods',{
        goodsId:this.goodsId,
        goodsName:this.form.goodsName,
        goodsDesc:this.form.goodsDesc,
        goodsPrice:this.form.goodsPrice,
        goodsType:this.form.goodsType,
        goodsProp:this.form.goodsProp,
        goodsTotal:this.form.goodsTotal,
        goodsImg:data.data.data.imagePath,
        goodsSort:this.form.goodsSort
        }).then(data=>{
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
                message: '商品修改成功',
                type: 'success'
                });
                this.goodsManageSelectMethod()
                this.updateVisble = false
                this.document.getElementById('file').files[0] = undefined
                }, 2000);    
                }        
      })

        }).catch(() => {
        })       


    },
    clickadd(item){
      this.$refs.file.click()
    },
    addMethod(){
      // alert(document.getElementById('file').files[0])
      if(document.getElementById('file').files[0] == undefined){
                this.$message({
                message: '请先添加图片',
                type: 'warning'
                });        
                return
      }

       let form = new FormData()
        let imgFile = document.getElementById('file').files[0]
        form.append('imageFile', imgFile) // 通过append向form对象添加数据
        axios({
          method: 'post',
          url: 'http://localhost:9999/upload/image',
          // url: 'http://47.107.123.144/upload/image',
          data: form,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }).then(data => {
            this.currentImagePath = data.data.data.imagePath
        // alert(JSON.stringify(this.currentImagePath))
      req('addGoods',{
        storeId:this.storeId,
        firstClassify:this.form.firstClassify,
        secondClassify:this.form.secondClassify,
        goodsName:this.form.goodsName,
        goodsDesc:this.form.goodsDesc,
        goodsPrice:this.form.goodsPrice,
        goodsType:this.form.goodsType,
        goodsProp:this.form.goodsProp,
        goodsTotal:this.form.goodsTotal,
        goodsImg:this.currentImagePath,
        goodsSort:this.form.goodsSort,
        }).then(data=>{
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
                message: '商品新增成功',
                type: 'success'
                });
                this.addVisble = false
                this.goodsManageSelectMethod()
                this.document.getElementById('file').files[0] = undefined
                }, 2000);    
                }        
      })

        }).catch(() => {
        }) 

    },
    issueMethod(parameter){
      request('auditGoodsUpdate',{goodsId:JSON.parse(parameter.goodsId),goodsState:2}).then(data=>{
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
                message: '提交发布成功',
                type: 'success'
                });
                this.updateVisble = false
                this.goodsManageSelectMethod()
                }, 2000);    
                }  
      })
    },
    downMethod(parameter){
        request('auditGoodsUpdate',{goodsId:JSON.parse(parameter.goodsId),goodsState:1}).then(data=>{
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
                message: '商品下架成功',
                type: 'success'
                });
                this.goodsManageSelectMethod()
                }, 2000);    
                }  
      })
    },
    deleteMethod(row){
      this.goodsId = JSON.parse(row.goodsId)
      // alert(this.goodsId)
      req('deleteGoods',{goodsId:this.goodsId}).then(data=>{
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
                message: '删除商品成功',
                type: 'success'
                });
                this.goodsManageSelectMethod()
                }, 2000);    
                }         
        })
    },
    getStoreManage(){
      this.storeId = 1
      this.shopManageId = 2
    },
    goodsManageSelectMethod(){
      req('goodsManageSelect',{shopManageId:this.param}).then(data=>{
        this.goodsData = data.data
        // alert(JSON.stringify(this.goodsData))
      })
    },
    handleSelectionChange(val){
      if(val != null && val != ''){
        this.typeForm.gId = val[0].goodsId
        this.propForm.gId = val[0].goodsId
        this.currentType = val[0].goodsType
        this.currentProp = val[0].goodsProp
      }
      //  alert(val[0].goodsType)
    }
  }
}
</script>

<style lang="scss" scoped>
.aa{
  color: white;
  background:gray;
}
.bb{
  color: white;
  background:gray;
}
.emit{
    color: white;
  background: #87de8b;
}
.down{
  // color: white;
  // background: gray;
}
.add{
  // margin-right: 1100px;
  color: white;
  background: #87dea1;
}
.addType{
  color: white;  
  background: rgb(253, 192, 255);
}
.addProp{
    color: white;
    background: rgb(245, 203, 179);
}
.update{
  margin-left: 0;
    color: white;
  background: rgba(166, 255, 0, 0.897);
}
.delete{
    color: white;
  background: rgba(255, 38, 0, 0.747);
}
.a{
  background:rgb(224, 240, 6);
}
</style>