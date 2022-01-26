<template>
  <div>
      <el-input style="width:100px;" label="输入信息" v-model="inputdata"></el-input>
      <el-button style="width:100px" type="success" @click="appendMethod">提交</el-button>
      <div>
      <ul >
          <li v-for="item in list" :key="item.id">
                {{item.title}}
          </li>
      </ul>
      </div>

  </div>
</template>

<script>
export default {
    // name:'Myinput',
    props:{
        list: Array,
        inputdata: String,
    },
    data(){
        return{
            inputdata:''
        }
    },
    methods:{
        appendMethod(){
            this.$emit('sendMyInputMethod',this.inputdata)
        }
    }
}
</script>

<style>

</style>