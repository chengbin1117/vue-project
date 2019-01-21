<template>
  <div  class="bind-phone f-c">  
      <div v-if="!isHide">
        <img class="logo" src="../../assets/img/dengluanquan@2x.png"/>
        <p class="tit font14 color333">为了您的账户安全，请绑定手机号</p>
      </div> 
      <div v-else>
        <img class="logo" src="../../assets/img/yaoqing@2x.png"/>
        <p class="tit font14 color333">接收邀请并成功绑定可获得{{integral}}积分</p>
      </div>
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
      <mt-button @click="confirm" :disabled="!phone||!code" class="btn-submit">绑定</mt-button>
      <msg-box v-if="msgVisible" :content="msg"/>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import MsgBox from '@/components/common/MsgBox'

// 绑定手机页面
export default {
  name: 'BindPhone',
  components:{
      MsgBox
  },
  watch:{

  },
  data () {
    return {
        phone:'',
        code:'',
        sendVisible:true,
        time:60,
        timer:null,
        msgVisible:false,
        msg:'',
        isHide:false,
        integral:'',
        isWx:null
    }
  },
  created(){
    this.isWx = this.$route.query.ixWx;
    this.integral = this.$route.query.integral;
    this.isHide = this.isWx == 1? true : false
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
      sendCode(){
        const that = this;
        let data = new FormData();
        data.append('phone',this.phone)
        this.ajax({
            url: "/account/send-sms",
            type:'post',
            data,
            success(data) {
                if(data.code == 0){
                    that.time = 60;
                    clearInterval(that.timer)
                    that.sendVisible=false;
                    that.msg = '短信已发送'
                    that.timer = setInterval(function(){
                        that.time --
                        if(that.time < 0){
                            that.time = 0;
                            that.sendVisible = true
                            clearInterval(that.timer)
                        }
                    },1000)
                }else{
                    that.msg = data.msg
                }
                that.msgVisible = true
                setTimeout(function(){
                    that.msgVisible = false
                },1000)
            }
        })
      },
      confirm(){
        const _this = this
        let data = new FormData();
        data.append('token',localStorage.getItem('qtoken'))
        data.append('phone',this.phone)
        data.append('code',this.code)
        this.ajax({
            url: "/member/binding",
            type:'post',
            data,
            success(data) {
                if(data.code == 0){
                    _this.$router.push('/')
                }else{
                    that.msgVisible = true
                    that.msg = data.msg
                    setTimeout(function(){
                        that.msgVisible = false
                    },1000)
                }
            }
        })  
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
                width:45vw;
                height:100%;
                border:0;
                outline: none;
                font-size:3.7vw;
                margin-top:1vw;
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
