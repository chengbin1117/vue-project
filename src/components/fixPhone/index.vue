<template>
  <div  class="fix-phone f-c">
      <div v-if="!fixVisible" class="old-phone">
          <p class="f-r-sb">
              <span class="font16 color333">手机号码</span>
              <span class="font16 color999">{{userInfo.mobile}}</span>
          </p>
           <mt-button @click="fixVisible=true" class="btn-submit">更改手机号码</mt-button>
      </div>
      <div v-else class="fix">
        <div class="form">
            <div class="f-r phone">
                <input class="font14 color333" autofocus="true" v-model="phone" placeholder="请输入手机号码"/>
            </div>
            <div class="f-r">
                <input class="font14 color333" v-model="code" autofocus="true" placeholder="请输入验证码" />
                <mt-button v-if="sendVisible"  @click="sendCode" :disabled="!phone" class="code font10 colorbuy">获取验证码</mt-button>
                <mt-button v-else :disabled="true" class="code resend font10 color999">{{time}}s后重试</mt-button>
            </div>
        </div>
        <mt-button @click="confirm" :disabled="!phone||!code" class="btn-submit">确认修改</mt-button>
      </div>   
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'

// 修改手机页面
export default {
  name: 'FixPhone',
  components:{
  },
  watch:{

  },
  data () {
    return {
        fixVisible:false,
        phone:'',
        code:'',
        sendVisible:true,
        time:60,
        timer:null,
        userInfo:{}
    }
  },
  created(){
      this.getData()
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
      getData(){
        const _this = this
        let data = new FormData();
        data.append('token',localStorage.getItem('qtoken'))
        this.ajax({
            url: "/member/userinfo",
            type:'post',
            data,
            success(data) {
                _this.userInfo = data.data
                if(data.data.mobile == '' || !data.data.mobile){
                    _this.fixVisible = true
                }
            }
        }) 
      },
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
        let data = new FormData();
        data.append('phone',this.phone)
        this.ajax({
            url: "/account/send-sms",
            type:'post',
            data,
            success(data) {
                
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
                    window.location.reload()
                }
            }
        })  
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .fix-phone{
        width:100%;
        background:#f5f5f5;
        min-height:100%;
        padding-top:2.7vw;
        .old-phone{
            p{
                padding:4vw;
                background:#fff;
                margin-bottom:16vw;
            }
        }
        .form{
            background:#fff;
            margin-bottom:16vw;
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
            input{
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
