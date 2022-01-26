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

      <div style="margin-left:50px">
            <div style="margin-top:30px;">
    <el-table @selection-change="handleSelectionChange" :data="goodsData" border style="width: 80%">
    <el-table-column width="133" v-for="(item,index) in tableData" :key="index" :prop="item.prop" :label="item.label"></el-table-column>
    <el-table-column label="操作" width="280" fixed="right">
      <template slot-scope="scope">
          <el-button icon="el-icon-plus" class="select" @click="clickadd(scope.row)">上传轮播图</el-button>
      </template>
    </el-table-column>
  </el-table> 

      </div>
      <div class="container">
        <div class="file-box">
          <el-button v-show="imgPath" @click="deleteImg" class="delete-btn" type="danger" icon="el-icon-delete"></el-button>
        </div>
        <input style="display:none" id="file" ref="file" type="file" value="" name="imageFile" @change="fileChange()"/>
    </div>   
  </div>  
  </div>
</template>

<script>
import req from'@/api/goods.js'
import reqq from'@/api/store.js'
import axios from 'axios'
export default {
  data(){
    return{
      param:'',
      inputId:'',         
      userData:{},       
      currentImagePath:'',
      currentGoodsId:'',
      imgPath:'',
      goodsData:[],
      tableData:[
        {label:'商品编号',prop:'goodsId'},
        {label:'商品名称',prop:'goodsName'},
        // {label:'图片',prop:'goodsImg'},
        {label:'商品状态',prop:'goodsState'},
        {label:'轮播图状态',prop:'slideState'},
        {label:'创建时间',prop:'createTime'},
      ]
    }
  },
  mounted(){
    this.getToken()      
    this.goodsManageSelectMethod()
  },
  methods:{
    activeMethod(){
      this.param = this.inputId
      this.goodsManageSelectMethod()
    },        
    getToken(){
        this.userData = JSON.parse(sessionStorage.getItem('token'))
        this.param = this.userData.id           
        // alert(this.userData.role)
    },     
    clickadd (item) {
      this.currentGoodsId = item.goodsId
      // alert(JSON.stringify(item.goodsId))
      this.$refs.file.click()
    },     
    fileChange () {
        let form = new FormData()
        let imgFile = document.getElementById('file').files[0]
        form.append('imageFile', imgFile) // 通过append向form对象添加数据
        // alert(form)
        // console.log(form)
        axios({
          method: 'post',
          // url: 'http://47.107.123.144/upload/image',
          url: 'http://localhost:9999/upload/image',
          data: form,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }).then(data => {
            // alert(JSON.stringify(data.data.data.imagePath))
            this.currentImagePath = data.data.data.imagePath

          reqq('updateGoodsSlide',{goodsId:this.currentGoodsId,slideState:'2'}).then(data=>{
            if(data.code===1){
              this.$message({
                message: '状态修改失败，请重试',
                type: 'warning'
                });              
            }
          })  

          reqq('slideApply',{
          goodsId:this.currentGoodsId,
          carousel:this.currentImagePath}).then(data=>{
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
                message: '提交成功',
                type: 'success'
                });
                this.goodsManageSelectMethod()
                }, 2000);                
            }
          })

        }).catch(() => {
        }) 

    },
    deleteImg () {
      this.imgPath = ''
    },    
    handleSelectionChange(val){
      console.log(val)
    },
    goodsManageSelectMethod(){
      req('goodsManageSelect',{shopManageId:this.param}).then(data=>{
        this.goodsData = data.data
        // alert(JSON.stringify(this.goodsData))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.select{
  background: springgreen;
  color: white;
}
</style>


