<template>
  <div   @click="toAddress" :class="['order-address','f-r-c',hideShadow ? 'hide-shadow' : '']">   
    <div class="f-c-c"><i class="sign iconfont icon-weizhi1"></i></div>
    <p v-if="data" class="address-detail t-l f-c-c">
        <span class="font16 color333">{{data.user_name}}</span>
        <span class="font14 color333 omit1">{{data.province}}{{data.city}}{{data.address}}</span>
    </p>
    <p v-else class="f-c-c address-detail t-l">请选择收货地址</p>
    <div v-if="!hideShadow" class="f-c-c"><i class="corner iconfont icon-fanhui-copy"></i></div>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'

// 订单地址 组件
export default {
  name: 'OrderAddress',
  props:{
      hideShadow:{
          type:[Boolean],
          default:false
      },
      data:{}
  },
  components:{

  },
  watch:{

  },
  data () {
    return {
    }
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
      toAddress(){
          if(!this.hideShadow){
            localStorage.setItem('lastPath',this.$route.path)
            this.$router.push('/my-address/' + this.$route.params.id)
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .order-address{
        width:100%;
        height:26.7vw;
        background:#fff;
        border-radius: 1.6vw;
        box-shadow: 0px 3px 5px rgba(#3b3b3b,0.15);
        .address-detail{
            width:100%;
        }
        i{
            font-size:4.8vw;
            color:#999;
        }
        .sign{
            font-size:8vw;
            color:#eb4c49;
            margin:0 5.4vw;
        }
        .corner{
            margin-right:2.7vw;
            margin-left:5.4vw;
        }
        .address-detail{
            .omit1{
                line-height: 4.8vw;
                margin-top:2.7vw;
            }
        }
    }
    .hide-shadow{
        border-radius: 0;
        box-shadow: none;
    }
</style>
