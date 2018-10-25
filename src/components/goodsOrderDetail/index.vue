<template>
  <div  class="goods-order-detail">   
    <!-- 订单地址 -->
    <order-address class="address"/>
    <!-- 订单地址 -->
    <div class="order-info">
        <p class="tit font16 color333 t-l">商品信息</p>
        <div class="goods-info f-r">
            <div class="l">
                <img class="pic-c-c" v-lazy="'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2393687535,4107070201&fm=27&gp=0.jpg'" data='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2393687535,4107070201&fm=27&gp=0.jpg'/>
            </div>
            <div class="r f-c-c">
                <p class="font16 color333 t-l omit1">2018年二年级英语高阶方法学</p>
                <p class="font16 colorbuy mart10 t-l">￥107.00</p>
            </div>
        </div>
    </div>
    <!-- 物流 -->
    <div class="pay f-c mart10">
        <p class="f-r-sb">
            <span class="font16 color333">物流配送</span>
            <span class="font16 color999">运费￥108</span>
        </p>
        <p class="f-r-sb">
            <span class="font16 color333">实际支付</span>
            <span class="font16 color999">￥108</span>
        </p>
    </div>
    <!-- 物流 -->
    <div class="pay f-c">
        <p class="f-r-sb">
            <span class="font16 color333">订单编码：</span>
            <span class="font16 color999">2018082413512030</span>
        </p>
        <p class="f-r-sb">
            <span class="font16 color333">下单时间：</span>
            <span class="font16 color999">2018-09-12 12:00:00</span>
        </p>
        <p class="f-r-sb">
            <span class="font16 color333">支付时间：</span>
            <span class="font16 color999">2018-09-12 12:00:00</span>
        </p>
    </div>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import OrderAddress from "@/components/common/OrderAddress";

// 实物订单详情页面
export default {
  name: 'GoodsOrderDetail',
  components:{
      OrderAddress
  },
  watch:{

  },
  data () {
    return {
        checked:false,
    }
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
      checkboxOnclick(){
          
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .goods-order-detail{
        width:100%;
        background:#f5f5f5;
        height:100%;    
        padding-top:2.7vw;
        // padding:0 2.7vw;
        .address{
            margin-bottom:2.7vw;
        }
        .tit{
            background:#fff;
        }
        .order-info{
            padding:0 2.7vw;
            padding-top:3.2vw;
            background:#fff;
            .goods-info{
                    background:#fff;
                    padding:4vw 0;
                    .l{
                        position: relative;
                        display: inline-block;
                        width:26.7vw;
                        height:26.7vw;
                        overflow: hidden;
                        border-radius: 1.6vw;
                        margin-right:4vw;
                    }
                    .r{
                        flex:1;
                        .omit1{
                            line-height: 5.4vw;
                        }
                    }

                }
        }
        .integral{
            width:100%;
            height:12vw;
            margin:2.7vw 0;
            padding:0 2.7vw;
            background:#fff;
            span{
                line-height: 12vw;
            }
        }
        .pay{
            padding:8vw 2.7vw;
            background:#fff;
            margin-bottom:2.7vw;
            p{
                margin-bottom:4.3vw;
            }
            p:last-child{
                margin-bottom:0;
            }
        }
        .real-pay{
            padding:7.8vw 2.7vw;
            background:#fff;
            margin-bottom:2.7vw;
            p:nth-child(1){
                margin-bottom:4vw;
            }
        }
    }
</style>
