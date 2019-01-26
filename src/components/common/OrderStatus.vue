<template>
  <div  class="order-status f-r-sb">   
    <div class="f-c-c">
        <span v-if="data.status == 0"  class="font16 color333 t-l">待付款</span>
        <span  v-if="data.status == 10"   class="font16 color333 t-l">待发货</span>
        <span v-if="data.status == 20" class="font16 color333 t-l">待收货</span>
        <span v-if="data.status == 40" class="font16 color333 t-l">已完成</span>
        <span v-if="data.status == 0" class="font14 color666 t-l mart10">{{data.order_auto_end > 0 ? '还剩'+data.order_auto_end+'分钟订单关闭' :'订单已关闭'}} </span>
        <p v-if="data.status == 20" class="font14 color666 t-l mart10">
            <span class="marr10">{{data.express}}</span>
            <span>{{data.express_sn}}<i @click="copy" v-if="data.status==20" class="iconfont icon-fuzhi colorblue"></i></span>
        </p>
        <!-- <input style="opacity:0" id="copyTarget" :value="data.express_sn"/> -->
    </div>
    <div class="f-c-c">
        <!-- 待付款 -->
        <img v-if="data.status == 0" src="../../assets/img/daifukuan@2x.png"/>
        <img v-if="data.status == 10"  src="../../assets/img/daifahuo@2x.png"/>
        <img v-if="data.status == 20" src="../../assets/img/daishouhuo@2x.png"/>
        <img v-if="data.status == 40" src="../../assets/img/yiwancheng@2x.png"/>
        <!-- 待付款 -->
    </div>
    <msg-box v-if="msgVisible" :content="msg"/>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import MsgBox from '@/components/common/MsgBox'
// 订单状态 组件
export default {
  name: 'OrderStatus',
  components:{
      MsgBox
  },
  props:{
      data:{}
  },
  watch:{

  },
  data () {
    return {
        msgVisible:false,
        msg:'复制成功'
    }
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
      copy(){
        const _this = this
         var input = document.createElement("input");
            input.value = this.data.express_sn;
            document.body.prepend(input);
            input.select();
            input.setSelectionRange(0, input.value.length), document.execCommand('Copy');
            document.body.removeChild(input);
        _this.msgVisible = true
        setTimeout(function(){
            _this.msgVisible = false
        },1000)
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .order-status{
        width:100%;
        height:26.7vw;
        background:#fff;
        border-radius: 1.6vw;
        box-shadow: 0px 3px 5px rgba(#3b3b3b,0.15);
        padding:0 8vw;
        img{
            display: inline;
            width:14.7vw;
            height:14.7vw;
        }
    }
</style>
