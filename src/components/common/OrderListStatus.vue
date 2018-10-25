<template>
  <div  class="order-list-status"   
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
    <div 
        class="list f-c" 
        v-for="(item,index) in list" 
        :key="index"
    >  
       <div class="order-num f-r-sb">
           <span class="font14 color333">订单编码：{{item.order_sn}}</span>
           <span v-if="item.status == 0" class="font14 colors">待付款</span>
           <span v-if="item.status == 10" class="font14 colorlimit">待发货</span>
           <span v-if="item.status == 20" class="font14 colorblue">待收货</span>
           <span v-if="item.status == 40" class="font14 color333">已完成</span>
       </div>
       <div @click="toDetail(item)" class="order-detail f-r">
           <div class="pic">
                <img class="pic-c-c" :data="item.image" v-lazy="item.image"/>
                <span v-if="isVirtual" class="type font10">录播课</span>
           </div>
           <div class="info f-c-c">
               <p class="font16 color333 omit1">{{item.goods_name}}</p>
               <p class="f-r-sb">
                   <span class="font16 colorbuy">￥{{item.price_one}}</span>
                   <span class="font14 color666">X{{item.num}}</span>
               </p>
           </div>
       </div>
       <p class="order-price font14 color333 f-r-end">实付：<span class="font18 colorbuy">￥{{item.price_pay}}</span><span v-if="!isVirtual">(含运费￥{{item.price_freight}})</span></p>
       <div v-if="item.status == 0" class="order-pay f-r-end">
           <span class="pay">立刻支付</span>
       </div>
  </div>
  </div>
</template>
<script>
// 订单状态列表 组件
export default {
  name: 'OrderListStatus',
  props:{
    list:{},
    onChange:{},
    isVirtual:{
        type:[Boolean],
        default:false
    }
  },
  data () {
    return {
        loading:false,
    }
  },
  mounted(){
     
  },
  methods:{
    loadMore() {
        const that = this;
        this.loading = true;
        setTimeout(() => {
            that.onChange()
            that.loading = false;
        }, 1000);
    },
    toDetail(item){
        this.$router.push('/order-detail/' + item.id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .order-list-status{
        width:100%;
        .list{
            margin-bottom:2.7vw;
        }
        .order-num,.order-detail,.order-price,.order-pay{
            padding-left:2.7vw;
            padding-right:6.7vw;
        }
        .order-num{
            width:100%;
            height:10.7vw;
            background:#fff;
            span{
                line-height: 10.7vw;
            }
        }
        .order-detail{
            width:100%;
            height:26.7vw;
            background:#f5f5f5;
            .pic{
                position: relative;
                width:21.4vw;
                height:21.4vw;
                border-radius: 1.6vw;
                background:#fff;
                overflow: hidden;
                margin-top:2.65vw;
                margin-right:2.7vw;
                .type{
                    position: absolute;
                    display: inline-block;
                    width:10.7vw;
                    height:4.3vw;
                    line-height: 4.5vw;
                    color:#fff;
                    background:rgba(0,0,0,0.3);
                    border-top-right-radius:2.7vw;
                    border-bottom-right-radius:2.7vw;
                    left:0;
                    top:2.7vw;
                    z-index:100; 
                }
            }
            .info{
                flex:1;
                .omit1{
                    margin-bottom:5.4vw;
                    line-height: 5.3vw;
                    text-align: left;
                }
            }
        }
        .order-price{
            width:100%;
            height:12vw;
            line-height: 12vw;
            background:#fff;
        }
        .order-pay{
            width:100%;
            height:12vw;
            background:#fff;
            border-top:1px solid #ccc;
            .pay{
                display: inline-block;
                width:24vw;
                height:8vw;
                line-height: 8vw;
                border:1px solid #eb4c49;
                border-radius: 4vw;
                color:#eb4c49;
                background:#fff;
                margin-top:2vw;
            }
        }
    }
</style>
