<template>
  <div>
      <div>
                    <div class="buttons" style="margin-top:30px;margin-left:-300px">
  <!-- <el-button @click="getCheckedNodes">通过 node 获取</el-button> -->
  <!-- <el-button @click="getCheckedKeys">通过 key 获取</el-button> -->
  <el-button @click="resetChecked" type="info">清空</el-button>
  <el-button class="addFirst" @click="addFirstVisble = true">新增父分类</el-button>
  <el-button class="addSecond" @click="addDialog">新增子分类</el-button>
  <el-button class="update" @click="updateResponse">修改</el-button>
  <el-button type="danger" @click="deleteClassifyMethod">删除</el-button>
</div>
          <div style="margin-left:210px;">
              <el-tree
              style="margin-top:20px"
  :data="classifyData"
  show-checkbox
  default-expand-all
  node-key="id"
  ref="tree"
  highlight-current
  :props="defaultProps">
</el-tree>

<div>
   <el-dialog title="新增父分类" :visible.sync="addFirstVisble">
      <el-form>
          <el-form-item label="分类名称">
              <el-input placeholder="请填写分类名称" v-model="classifyName"></el-input>
          </el-form-item>

          <el-form-item label="分类备注">
              <el-input placeholder="请填写分类备注" v-model="remark"></el-input>
          </el-form-item>

          <el-form-item>
              <el-button type="success" @click="addFirstClassifyMethod">新增</el-button>
          </el-form-item>

      </el-form>
   </el-dialog>

     <el-dialog title="新增子分类" :visible.sync="addSecondVisble">
      <el-form>
          <el-form-item label="分类名称">
              <el-input placeholder="请填写分类名称" v-model="classifyName"></el-input>
          </el-form-item>

          <el-form-item label="分类备注">
              <el-input placeholder="请填写分类备注" v-model="remark"></el-input>
          </el-form-item>

          <el-form-item>
              <el-button type="success" @click="addSecondClassifyMethod">新增</el-button>
          </el-form-item>
      </el-form>
   </el-dialog>

        <el-dialog title="修改分类" :visible.sync="updateVisble">
      <el-form>
          <el-form-item label="分类名称">
              <el-input placeholder="请填写分类名称" v-model="classifyName"></el-input>
          </el-form-item>

          <el-form-item label="分类备注">
              <el-input placeholder="请填写分类备注" v-model="remark"></el-input>
          </el-form-item>

          <el-form-item>
              <el-button type="warning" @click="updateClassifyMethod">修改</el-button>
          </el-form-item>
      </el-form>
   </el-dialog>


</div>

          </div>
      </div>
  </div>
</template>

<script>
import req from '@/api/classify.js'
export default {
    data(){
        return{
          classifyData:[],
          defaultProps: {
          children: 'children',
          label: 'label'
         },
         classifyName:'',
         parentId:'',
         remark:'',
         addFirstVisble:false,
         addSecondVisble:false,
         updateVisble:false,
        }

    },
    mounted(){
      this.sortSelectMethod()
    },
    methods: {
      sortSelectMethod(){
        req('sortSelect',{}).then(data=>{
          this.classifyData = data.data
          // alert(JSON.stringify(this.classifyData))
        })
      },
      addFirstClassifyMethod(){
       if(this.classifyName!= ''){
          req('addClassify',{classifyName:this.classifyName,parentId:0,remark:this.remark}).then(data=>{
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
                message: '新增分类成功',
                type: 'success'
                });
                this.sortSelectMethod()
                this.addFirstVisble = false
                }, 2000);              
            }
          })
       }
       else{
              this.$message({
              message: '请输入分类名称',
              type: 'warning'
              });     
              return    
       }
      },
      addDialog(){
        // alert(JSON.stringify(this.$refs.tree.getCheckedNodes()[0]))
      if(this.$refs.tree.getCheckedNodes()[0] !== undefined ){
          this.addSecondVisble = true
        }
      else{
        this.$message({
          message: '请先选择分类',
          type: 'warning'
        });
      }
      },
      addSecondClassifyMethod(){
          alert(JSON.parse(this.$refs.tree.getCheckedNodes()[0].id))
       if(this.classifyName!= ''){
          req('addClassify',{classifyName:this.classifyName,parentId:JSON.parse(this.$refs.tree.getCheckedNodes()[0].id),remark:this.remark}).then(data=>{
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
                message: '新增分类成功',
                type: 'success'
                });
                this.sortSelectMethod()
                this.addSecondVisble = false
                }, 2000);              
            }
          })
        }
       else{
              this.$message({
              message: '请输入分类名称',
              type: 'warning'
              });     
              return    
       }
      },
      updateResponse(){
        if(this.$refs.tree.getCheckedNodes()[0] != null){
          this.updateVisble = true
        }
        else{
            this.$message({
            message: '请先选择需要修改的分类',
            type: 'warning',
            });          
            return
        }
      },
      updateClassifyMethod(){
       if(this.classifyName!= ''){
        //  alert(JSON.parse(this.$refs.tree.getCheckedNodes()[0].id))
          req('updateClassify',{id:JSON.parse(this.$refs.tree.getCheckedNodes()[0].id),classifyName:this.classifyName,remark:this.remark}).then(data=>{
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
                message: '新增分类成功',
                type: 'success'
                });
                this.updateVisble = false
                this.sortSelectMethod()

                }, 2000);              
            }
          })
        }
       else{
              this.$message({
              message: '请输入分类名称',
              type: 'warning'
              });     
              return    
       }
      },
      deleteClassifyMethod(){
        if(this.$refs.tree.getCheckedNodes()[0]!=null){
          req('deleteClassify',{id:JSON.parse(this.$refs.tree.getCheckedNodes()[0].id)}).then(data=>{
                const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                loading.close();
                this.$message({
                message: '删除分类成功',
                type: 'success'
                });
                this.sortSelectMethod()
                }, 2000);                
          })
        }
        else{
              this.$message({
              message: '选择需要删除的分类',
              type: 'warning'
              });     
              return            
        }
      },
      // getCheckedNodes() {//对象
      //  alert(JSON.stringify(this.$refs.tree.getCheckedNodes()))
      // },
      // getCheckedKeys() {//id
      //   alert(JSON.stringify(this.$refs.tree.getCheckedKeys()));
      // },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      }
    }
}
</script>

<style lang="scss" scoped>
.addFirst{
  color: white;
  background: #87dea1;
}
.addSecond{
  color: white;
  background: #87dea1;
}
.update{
  color: white;
  background: rgb(255, 165, 0);
}
// .delete{
//   co
// }
</style>