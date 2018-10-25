<template>
  <div  class="no-data f-c-c">   
    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2393687535,4107070201&fm=27&gp=0.jpg"/>
    <p class="font14 color999">{{content}}</p>
  </div>
</template>
<script>
// 无数据页面
export default {
  name: 'NotFound',
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
    .no-data{
        width:100%;
        background:#fff;
        padding:0px 2.7vw;
        height:100%;
        padding-top:21.4vw;
        img{
            display:inline-block;
            width:24.3vw;
            height:14.7vw;
            margin:0 auto;
            margin-bottom:8vw;
        }
    }
</style>
