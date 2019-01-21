<template>
  <div class="footer">
    <router-link v-for="(item,index) in data" :key="index" :to="item.link">
      <i :class="item.class"></i>
      <span>{{item.name}}</span>
    </router-link>
  </div>
</template>
<script>
// 底部导航
export default {
  name: 'Footer',
  data () {
    return {
        data:[
          {class:'icon iconfont icon-shouye1-copy',name:'首页',link:'/'},
          {class:'icon iconfont icon-xuexi-copy',name:'学习',link:'/study/0'},
          {class:'icon iconfont icon-shangcheng2-copy',name:'商城',link:'/store'},
          {class:'icon iconfont icon-xiaoxi2-copy-copy',name:'消息',link:'/msg'},
          {class:'icon iconfont icon-zhanghao-copy',name:'我的',link:'/mine'},
        ]
    }
  },
  mounted(){
    if(this.$route.query.token){
      let _a = document.getElementsByClassName('footer')[0].firstChild;
      _a.style.color = '#EB4C49'
    } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .footer{
        position: fixed;
        left:0;
        bottom:0;
        width:100%;
        height:13.1vw;
        background:#fff;
        z-index:600;
        display: flex;
        border-top:1px solid #ddd;
        a{
          width:20%;
          height:100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        i{
          font-size:5.4vw;
        }
        .router-link-exact-active{
          color:#EB4C49;
        }
    }
</style>
