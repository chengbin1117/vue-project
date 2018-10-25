<template>
  <div  class="bind-phone f-c">   
      <img class="logo" src="../../assets/img/dengluanquan@2x.png"/>
      <p class="tit font14 color333">为了您的账户安全，请绑定手机号</p>
      <div class="form">
          <div class="f-r phone">
              <i class="iconfont icon-shouji"></i>
              <input class="font14 color333" autofocus="true" v-model="phone" placeholder="请输入手机号码"/>
          </div>
          <div class="f-r">
            <i class="iconfont icon-yanzhengma"></i>
            <input class="font14 color333" v-model="code" autofocus="true" placeholder="请输入验证码" />
            <mt-button v-if="sendVisible"  @click="sendCode" :disabled="!phone" class="code font10 colorbuy">获取验证码</mt-button>
            <mt-button v-else :disabled="true" class="code recode font10 colorbuy">{{time}}s后重试</mt-button>
          </div>
      </div>
      <mt-button :disabled="!phone||!code" class="btn-submit">绑定</mt-button>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'

// 绑定手机页面
export default {
  name: 'BindPhone',
  components:{
  },
  watch:{

  },
  data () {
    return {
        phone:'',
        code:'',
        sendVisible:true,
        time:60,
        timer:null
    }
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
      sendCode(){
          const that = this;
          this.time = 60;
          clearInterval(this.timer)
          this.sendVisible=false;
          this.timer = setInterval(function(){
              that.time --
              if(that.time < 0){
                  that.time = 0;
                  that.sendVisible = true
                  clearInterval(this.timer)
              }
          },1000)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .bind-phone{
        width:100%;
        background:#f5f5f5;
        min-height:100%;
        .logo{
           display: inline-block;
           width:14.4vw;
           margin:0 auto;
           margin-top:8vw;
        }
        .tit{
            margin-top:5.4vw;
            margin-bottom:8vw;
        }
        .form{
            width:86.7vw;
            // height:24vw;
            background:#fff;
            border-radius: 1.6vw;
            margin:0 auto;
            margin-bottom:8vw;
            padding:0 2.7vw;
            .f-r{
                position: relative;
            }
            div{
                padding:2.7vw 0;
            }
            .phone{
                border-bottom:1px solid #ccc;
            }
            i{
                font-size:6.2vw;
                color:#999;
            }
            input{
                // flex:1;
                margin-left:2.7vw;
            }
            .code{
                position: absolute;
                padding:2.2vw 1.4vw;
                font-size:3.2vw;
                height:auto;
                background:#fff;
                border-color:#eb4c49;
                color:#eb4c49;
                box-shadow:0 0 1px #eb4c49;
                right:0;
            }
            .resend{
                color:#999;
                border-color:#999;
                box-shadow:0 0 1px #999;

            }
        }
        .btn-submit{
            margin:0 auto;
        }
    }
</style>
