<template>
  <div  class="about-us">
      <div class="bg"></div>
      <div class="info f-c-c">
          <div class="logo">
            <img class="pic-c-c" :src="data.logo"/>
          </div>
          <p class="tit font18 color333">{{data.title}}</p>
          <p class="font14 color999">V1.0</p>
      </div>
      <div class="content">
          <p class="font14 color333 t-l" v-html="data.content"></p>
      </div>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'

// 关于我们页面
export default {
  name: 'AboutUs',
  components:{
  },
  watch:{
  },
  data () {
    return {
        data:{}
    }
  },
  created(){
    const _this = this;
    let data = new FormData();
    this.ajax({
        url: "/ad/about",
        type:'post',
        data,
        success(data) {
            _this.data = data.data
        }
    }) 
  },
  mounted(){
     Common.InitImg()
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .about-us{
        width:100%;
        background:#f5f5f5;
        min-height:100%;
        .bg{
            width:100%;
            height:32vw;
            background:#eb4c49;
        }
        .info{
            position: absolute;
            width:94.7vw;
            height:48vw;
            border-radius: 1.6vw;
            background:#fff;
            top:8vw;
            left:0;
            right:0;
            margin:0 auto;
            .logo{
                width:26.7vw;
                height:26.7vw;
                border-radius: 50%;
                overflow: hidden;
                position: relative;
                margin:0 auto;
            }
            .tit{
                margin:2.7vw 0;
            }
        }
        .content{
            padding:8vw 5.4vw;
            background:#fff;
            margin-top:26.7vw;
            p{
                text-indent: 5.4vw;
                line-height: 5.4vw;
            }
        }
    }
</style>
