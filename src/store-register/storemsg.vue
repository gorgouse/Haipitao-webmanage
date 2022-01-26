<template>
  <div>
      <div>
                       <div style="margin-top:20px;color:gray;">请上传清晰营业执照图片，系统识别公司信息自动进行填写，营业执照复印件需加盖公司红章扫描上传，若营业执
照上未体现注册资本、经营范围，请在营业执照后另行上传企业信息公示网上的截图。</div>
         <div style="font-size:22px;margin-top:40px;"> <b>营业执照与店铺信息</b></div>
         
          <div style="margin-top:50px;margin-left:23%;width:40%">
             <el-form :rules="rules" :model="form" label-width="140px">

                 <el-form-item label="执照类型" :rules="[{ required: true, message: '请选择执照类型', trigger: 'blur' }]">
                      <el-select style="width:460px" v-model="form.licenseType" placeholder="请选择活动区域">
                         <el-option label="多证合一营业执照（统一社会信用代码）" value="多证合一营业执照（统一社会信用代码）"></el-option>
                      </el-select>
                 </el-form-item>

                 <el-form-item label="营业执照注册号">
                     <el-input v-model="form.licenseAccount"></el-input>
                 </el-form-item>

                 <el-form-item label="营业执照详细地址" >
                     <el-input v-model="form.licenseAddress"></el-input>
                 </el-form-item>

                 <el-form-item label="成立日期" >
                     <el-date-picker style="width:460px"
                    v-model="form.bornDate"
                    type="date"
                    placeholder="选择日期">
    </el-date-picker>
                 </el-form-item>

                 <el-form-item label="店铺名称" >
                     <el-input v-model="form.storeName"></el-input>
                 </el-form-item>
                
                 <el-form-item label="" >
                    <el-button icon="el-icon-plus" @click="clickadd" type="primary">点击添加门店图片</el-button>
                 </el-form-item>

                <el-form-item label="账号" :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' }]">
                     <el-input v-model="form.acct"></el-input>
                 </el-form-item>

                 <el-form-item label="密码" :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' }]">
                     <el-input type="password" v-model="form.password"></el-input>
                 </el-form-item>

                 
                 <el-form-item label="确认密码" :rules="[{ required: true, message: '请输入邮箱地址', trigger: 'blur' }]">
                     <el-input type="password" v-model="form.ensure"></el-input>
                 </el-form-item>
                 

                 <el-form-item>
                     <el-button type="info" @click="$router.push({path:'/mainbodymsg'})">上一步</el-button>
                     <el-button type="primary" @click="submit">下一步，提交审核</el-button>
                 </el-form-item>

             </el-form>
             <input style="display:none" id="file" ref="file" type="file" value="" name="imageFile" @change="fileChange()"/>


          </div>
      </div>
      <!-- <div>{{dialogImageUrl}}</div> -->
  </div>
</template>

<script>
export default {
    data(){
        return{
              currentStoreImg:'',
             dialogImageUrl: '',
        dialogVisible: false,
            form:{
                licenseType:'',
                licenseAccount:'',
                licenseAddress:'',
                bornDate:'',
                storeName:'',
                storeImg:'',
                acct:'',
                password:'',
                ensure:''
            },
       rules: {
          licenseType: [
            {required: true, message: '营业执照类型', trigger: 'change' }
          ],
          licenseAccount: [
            { required: true, message: '请输入营业执照注册号', trigger: 'blur' }
          ],
         licenseAddress: [
            {  required: true, message: '请填写营业地址', trigger: 'blur' }
          ],
          bornDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          
          storeName: [
            { required: true, message: '请填写店铺名称', trigger: 'change' }
          ],
          storeImg: [
            { required: true, message: '请选择店铺图片', trigger: 'change' }
          ],
          acct: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 6, max: 10, message: '长度在 6 到 12 个字符左右', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          ensure: [
            { required: true, message: '请输入确认密码', trigger: 'blur' }
          ],
        }
        }
    },
    mounted(){
        this.senParent()
    },
    methods:{
    clickadd () {
      this.$refs.file.click()
    },         
    fileChange(){
      this.form.storeImg = document.getElementById('file').files[0]
    },
        handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        // alert(this.dialogImageUrl)
        this.dialogVisible = true;
      },
        senParent(){
            this.$emit('show',3)
        },
        getStoreInfoMethod(){
            this.$emit('getStoreInfoMethod',this.form)
        },
        submit(){
            if( this.form.licenseType == '' ||this.form.licenseAccount == '' ||
                this.form.licenseAddress == '' ||this.form.bornDate == '' ||
                this.form.storeName == '' ||
                this.form.acct == '' ||this.form.password == '' ||this.form.ensure == '' 
                ){
                    this.$message({
                     message: '请填写完整信息',
                     type: 'warning'
                     });
                }
            else{
                if(this.form.storeImg === undefined || this.form.storeImg === ''){
                    this.$message({
                     message: '请选择店铺图片',
                     type: 'warning'
                     });
                }
                else{
                  this.getStoreInfoMethod()
                }
            }
        },
       
    }
}
</script>

<style>

</style>