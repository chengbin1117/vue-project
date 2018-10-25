<template>
  <div  class="msg-box f-c-c">   
    <p class="font14 color999">{{content}}</p>
  </div>
</template>
<script>
// 消息提示 组件
export default {
  name: 'MsgBox',
  props:{
    content:{}
  },
  data () {
    return {
        
    }
  },
  mounted(){
     
  },
  methods:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .msg-box{ 
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left:0;
       p{
        background:rgba(0,0,0,1);
        margin:auto;
        padding:2.7vw 8vw;
        color:#fff;
        border-radius: 1.6vw;
        width: 54vw;
        line-height: 6vw;
       }
    }
</style>
