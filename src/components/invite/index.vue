<template>
  <div  class="invite" v-if="data">
      <div class="bg">
          <div class="avatar">
            <img class="pic-c-c" :src="data.image" :data="data.image" />
          </div>
          <p class="font16 colorfff">{{data.nickname}}</p>
      </div>
      <div class="info f-c-c">
          <span id='wxcode' class='video-wxcode'></span>
          <p class="code">扫码注册</p>
          <div class="rule">
              <p><i></i><span>每邀请一位新用户进行注册可获得{{data.integral_invite}}积分</span></p>
              <p><i></i><span>接受邀请并成功注册可获得{{data.integral_invite}}积分</span></p>
              <p><i></i><span>所获得的积分可用于购买课程或兑换积分商品</span></p>
          </div>
          <div v-if="!isHide" class="btn-submit" @click="visible=true">立刻邀请</div>
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
        visible:false,
        data:null,
        url:'',
        newUrl:'',
        isHide:false,
        token:''
    }
  },
  created(){
      if(!this.$route.query.reloaded){
          this.$router.push('/invite' + '?reloaded=1')
        location.reload();
      }
      this.url = window.location.href;
      this.isHide = this.url.indexOf('from=') != '-1' ? true : false
      this.token = this.$route.query.token ? this.$route.query.token  : localStorage.getItem('qtoken')

  },
  mounted(){
    this.getData()
       const _this = this
        //获取微信配置
        let data = new FormData();
        data.append('url',location.href)
        this.ajax({
            url: "/account/wx-config",
            type:'post',
            data,
            success(data) {
                data = data.data.config
                _this.wxConfig = data
                wx.config({
                        debug: false,
                        appId: data.appId,
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        signature: data.signature,
                        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
                })
            
                 setTimeout(() => {
                    _this.wxInit();
                }, 2000);
            }
        }) 
  },
  methods:{
    getData(){
        const _this = this;
        let data = new FormData();
        data.append('token',this.token)
        this.ajax({
            url: "/member/userinfo",
            type:'post',
            data,
            success(data) {
                _this.data = data.data
                setTimeout(function(){
                const code = document.getElementById("wxcode");
                const QRCode = require('qrcodejs2')
                // 生成二维码
                new QRCode(code, {
                    text: data.data.url_share,
                    width: 100,
                    height: 100,
                    colorDark: "#000000",
                    colorLight: "#ffffff"
                });  
                },20)
                Common.InitImg()
            }
        })
    },
    wxInit(sd) {
      const that = this;
      let links = window.location.href + '&token=' +this.token; //分享出去的链接
      let title = '邀请好友'; //分享的标题
      let desc = '邀请好友详情' //分享的详情介绍
      let image = 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=ee9bedd9b8de9c82b268f1dd0de8eb6f/3ac79f3df8dcd100c662f1c1798b4710b8122f57.jpg'
      //生成微信二维码
      wx.ready(function() {
        wx.onMenuShareTimeline({
          title: title, // 分享标题
          link: links, // 分享链接'
          imgUrl: image, // 分享图标
          success: function() {
              that.visible = false
              
          },
          cancel: function() {}
        });
        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: links, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: image, // 分享图标
          success: function() {
            // 用户确认分享后执行的回调函数
            that.visible = false
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
      });
      wx.error(function(res){
                alert(res)
      });
    },
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
                /* margin-bottom:8vw; */
            }
            .btn-submit{
                margin-bottom:4vw;
            }
            .code{
                font-size:4.3vw;
                color:#333;
                margin:2.7vw 0;
            }
            .rule{
                text-align: left;
                p{
                 margin-bottom:4vw;
                }
                i{
                    display: inline-block;
                    width:3.7vw;
                    height:3.7vw;
                    border-radius: 50%;
                    background:#eb4c49;
                    margin-right:2.7vw;
                }
                span{
                    text-align: left;
                    font-size:3.7vw;
                    color:#333;
                }
            }
        }
    }
</style>
