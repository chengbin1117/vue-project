<template>
  <div  class="invite">
      <div class="bg">
          <div class="avatar">
            <img class="pic-c-c" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3102645874,1757154740&fm=27&gp=0.jpg" data="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3102645874,1757154740&fm=27&gp=0.jpg" />
          </div>
          <p class="font16 colorfff">去问问</p>
      </div>
      <div class="info f-c-c">
          <p class="font14 color333">每邀请一位新用户关注服务号并进行注册可获得500积分</p>
          <p class="font18 color333">邀请流程</p>
          <img src="../../assets/img/liucheng@2x.png"/>
          <div class="btn-submit" @click="visible=true">立刻邀请</div>
      </div>
      <div v-if="visible" class="mask">
          <img src="../../assets/img/fenxiangyindao@2x.png"/>
      </div>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'

// 邀新页面
export default {
  name: 'Invite',
  components:{
  },
  watch:{
  },
  data () {
    return {
        visible:false
    }
  },
  mounted(){
     Common.InitImg()
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope
d lang="less">
    .invite{
        width:100%;
        background:#f5f5f5;
        min-height:100%;
        .mask{
            top:0;
            left:0;
            img{
                display: inline-block;
                position: absolute;
                right:2.7vw;
                top:2.7vw;
                width:60vw;
            }
        }
        .bg{
            width:100%;
            height:40vw;
            background:#eb4c49;
            padding-top:2.7vw;
            .avatar{
                position: relative;
                width:18.7vw;
                height:18.7vw;
                overflow: hidden;
                border-radius: 50%;
                margin:0 auto;
                margin-bottom:2.7vw;
            }
        }
        .info{
            width:94.7vw;
            position: absolute;
            top:32vw;
            left:0;
            right:0;
            background:#fff;
            border-radius: 1.6vw;
            padding:0 4vw;
            margin:auto;
            .font14{
                width:66.7vw;
                margin:6vw auto;
            }
            img{
                display: inline-block;
                width:64vw;
                margin:0 auto;
                margin-top:5.2vw;
                margin-bottom:8vw;
            }
            .btn-submit{
                margin-bottom:4vw;
            }
        }
    }
</style>
