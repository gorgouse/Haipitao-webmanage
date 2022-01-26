<template>
  <div>
      <!-- <MyList :list="ss" /> -->
      <Myinput :list="ss"  :inputdata="Data" @sendMyInputMethod="receiveMethod"/>
  </div>
</template>

<script>
import MyList from '@/sec-cpmoent/MyList.vue'
import Myinput from '@/sec-cpmoent/Myinput.vue'
export default {
    data(){
        return{
            send:"",
            Data:"",
            ss:
            [
                {id:1,title:'xumintao'},
                {id:2,title:'yangruiying'},
                {id:3,title:'liuchenxi'}
            ]
        }
    },
    components:{
        MyList,
        Myinput
    },
    methods:{
        receiveMethod(data){
            alert(data);
            this.ss.push({id:Math.random(),title: data})
        }
    }
}
</script>

<style>

</style>