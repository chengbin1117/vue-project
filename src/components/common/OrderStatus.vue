<template>
  <div  class="order-status f-r-sb">   
    <div class="f-c-c">
        <span v-if="data.status == 0"  class="font16 color333 t-l">待付款</span>
        <span  v-if="data.status == 10"   class="font16 color333 t-l">待发货</span>
        <span v-if="data.status == 20" class="font16 color333 t-l">待收货</span>
        <span v-if="data.status == 40" class="font16 color333 t-l">已完成</span>
        <span v-if="true" class="font14 color666 t-l mart10">还剩15分钟订单关闭</span>
        <p v-if="data.status == 20" class="font14 color666 t-l mart10">
            <span class="marr10">{{data.express}}</span>
            <span>{{data.express_sn}}</span>
        </p>
    </div>
    <div class="f-c-c">
        <!-- 待付款 -->
        <img src="../../assets/img/daifukuan@2x.png"/>
        <img v-if="false" src="../../assets/img/daifahuo@2x.png"/>
        <img v-if="false" src="../../assets/img/daishouhuo@2x.png"/>
        <img v-if="false" src="../../assets/img/yiwancheng@2x.png"/>
        <!-- 待付款 -->
    </div>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'

// 订单状态 组件
export default {
  name: 'OrderStatus',
  components:{
  },
  props:{
      data:{}
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
