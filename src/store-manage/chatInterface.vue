<template>
  <el-container style="margin-top:-20px">
      <el-card class="box-card" style="background:wheat">
      <el-aside>
        <el-input placeholder="搜索" v-model="searchValue"></el-input>
    <div style="margin-top:20px">
        <div>
            <div v-for="(item,index) in chatList" :key="index">
                <div class="list" @click="selectObjectMethod(item)" style="margin-top:5px">
                    <div style="display:flex">
                        <div style="margin-left:10px;">
                            <el-image style="width: 50px; height: 50px" :src="item.img" fit="fill"></el-image>
                        </div>
                        <div>
                          <div>{{item.name}}</div>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
      </el-aside>
      </el-card>

    <el-card>
      <el-main>
         <div v-if="websocket != null" style="">
        <div class="title"><h3>{{titleName}}</h3></div>

        <div class="message" v-for="(item,index) in messageList" :key="index">
          <el-tag v-if="item.fromUserId == thisId" type="success" style="float:left"> 
            {{thisName}}：{{item.msg}}
          </el-tag>
            <br/>
          <el-tag v-if="item.fromUserId != thisId" style="float:right">
            {{item.name}}：{{item.msg}}
          </el-tag>
          <br/>
        </div>

       <div class="aq">
         <div style="height:50px;background:white;display:flex">
          <el-input style="margin-left:0px;height:40px;width:400px" v-model="messageValue" label="" placeholder="请输入...." />
          <el-button  size="normal" style="height:40px;margin-left:5px;" @click="sendMessage" type="primary">发送</el-button>
        </div>
       </div>    
                
         </div>
      </el-main>
    </el-card> 
  </el-container>
</template>

<script>
import req from '@/api/chat.js'
export default {
    data(){
        return{
            searchValue:'',
            titleName:'',
            thisId:'',
            thisName:'',
            websocket:null,
            data:{},
            chatList:[],
            userData:{},
            thisId:'',
            toUserId:'',
            name:'',
            toUserName:'',
            messageList:[],
            messageValue:'',
        }
    },
    mounted(){
      this.buildWebSocket()        
    },
    created(){
      this.userDataMethod()
      this.userChatListMethod()          
    },
    methods:{
    selectObjectMethod(item){
      // alert(JSON.stringify(item.userId))
      // alert(JSON.stringify(item.name))
      this.toUserId = item.userId
      this.toUserName = item.name
      this.titleName = item.name
      // alert(this.toUserId)
      // alert(this.toUserName)
      this.selectChatRecordMethod()      
    },
    userDataMethod(){
      this.thisId = JSON.parse(sessionStorage.getItem('token')).id
      this.thisName = JSON.parse(sessionStorage.getItem('token')).nickname
      // alert(JSON.stringify(this.thisName))
    },
    buildWebSocket(){//getBasicRemote
      // this.websocket = new WebSocket("ws://localhost:9999/personalChat/"+this.thisName +'/'+this.thisId)
      this.websocket = new WebSocket("ws://47.107.123.144:9999/personalChat/"+this.thisName +'/'+this.thisId)
      this.websocket.onerror = function(){}
      this.websocket.onopen = function(){}
      var that = this
      this.websocket.onmessage = function(event){
        var object = eval("(" + event.data + ")");
        //  alert(object)
        if(object.type == 0){
          // alert('连接成功,type：'+ object.type+ ' ,人数: ' + object.people + ' ,sessionId: ' + object.sessionId)//aisle
          that.thisSessionId = object.sessionId
        }
        if(object.type == 1){
          // alert("接受消息")
          // alert(JSON.stringify(object))
          that.messageList.push(object)
          // alert(JSON.parse(sessionStorage.getItem('token')).id)
        }
      }
      this.websocket.onclose = function(){}
      window.onbeforeunload = function(){
        this.websocket.close() 
      }
    },                
    userChatListMethod(){
            req('userChatList',{userId:this.userData.id}).then(data=>{
                this.chatList = data.data
                // alert(JSON.stringify(this.chatList))
            })
        },
     //聊天内容部分   
   selectChatRecordMethod(){
      req('selectChatRecord',{fromUserId:this.thisId,toUserId:this.toUserId}).then(data=>{
        this.messageList = data.data
        // alert(JSON.stringify(this.messageList))
      })
    },
    sendMessage:function(){

      req('addChat',{
            fromUserId:JSON.parse(sessionStorage.getItem('token')).id,
            toUserId:this.toUserId,
            msg:this.messageValue}).then(data=>{
            if(data.code === 0){
              // alert("success")
            }
          })      
          
      var socketMsg = { 
      toUserId:this.toUserId,msg:this.messageValue,
      fromUserName:this.thisName,toUserName:this.toUserName
      }
      socketMsg.type = 1
      // alert(socketMsg)//对象
      // alert(JSON.stringify(socketMsg))//json 对象
      this.websocket.send(JSON.stringify(socketMsg))//发送json对象
      this.messageValue = ''
    },
    },
}
</script>

<style lang="scss" scoped>
.box-card{
  width: 350px;
}
.aq{
  position: absolute;
  bottom: 100px;
}
.title{
  // background: skyblue;
  
}
.top{
    height: 30px;
}
.show{
    border-radius: 20px;
    background:whitesmoke;
    height: 370px;
}
.bottom{
    position: fixed;
    width: 100%;
    margin-left: -260px;
    bottom: 110px;
    z-index: 20px;
    margin-top: 20px;
    .inputcontent{
        width: 400px;
        flex: left;
    }
    // .send{}
}
.el-aside{
    // border-radius: 20px;
    // margin-top: 20px;
    height: 460px;
    // background: rgb(128, 128, 128);
    width:160px;
}
.el-main{
    // border-radius: 20px;
    // margin-top: 20px;
    background: white;
    width:550px;
    // height: 500px;
}

.message {
//  height: 370px;
 background: white;
}

</style>