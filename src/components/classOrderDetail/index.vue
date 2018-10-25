<template>
  <div  class="class-order-detail">   
    <div class="order-info">
        <p class="tit font16 color333 t-l">商品信息</p>
        <div class="goods-info f-r">
            <div class="l">
                <img class="pic-c-c" v-lazy="'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2393687535,4107070201&fm=27&gp=0.jpg'" data='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2393687535,4107070201&fm=27&gp=0.jpg'/>
                <span class="type font10">录播课</span>
            </div>
            <div class="r f-c-c">
                <p class="font16 color333 t-l omit1">2018年二年级英语高阶方法学</p>
                <p v-if="true" class="font16 colorbuy mart10 t-l">￥107.00</p>
            </div>
        </div>
        <div class="singly">
            <p class="f-r-sb">
                <span class="font16 color333 omit1">01 基本初等函数初等函数···</span>
                <span class="font14 colorbuy omit1">￥35.00</span>
            </p>
             <p class="f-r-sb">
                <span class="font16 color333 omit1">01 基本初等函数初等函数···</span>
                <span class="font14 colorbuy omit1">￥35.00</span>
            </p>
             <p class="f-r-sb">
                <span class="font16 color333 omit1">01 基本初等函数初等函数···</span>
                <span class="font14 colorbuy omit1">￥35.00</span>
            </p>
        </div>
    </div>
    <div class="integral f-r-sb">
        <span class="font16 color333">积分抵扣</span>
        <span class="font14 color999">使用200积分抵扣5元</span>
    </div>
    <div class="real-pay f-c">
        <p class="f-r-sb">
            <span class="font16 color333">积分抵扣</span>
            <span class="font16 color999">-￥5.00</span>
        </p>
        <p class="f-r-sb">
            <span class="font16 color333">实际支付</span>
            <span class="font16 color999">￥107.00</span>
        </p>
    </div>
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
    <!-- <div class="pay-way f-r-sb">
        <p class="font16 color333">支付方式</p>
        <div class="f-r">
            <i class="iconfont icon-wxopen"></i>
            <span class="font16 color666">微信支付</span>
        </div>
    </div> -->
    <!-- <div class="order-footer f-r">
        <div class="footer-pay f-r-c">
            <span class="font14 color333">实付：</span>
            <span class="font18 colorbuy">￥109.00</span>
        </div>
        <div class="confirm font18 colorfff t-c">确认支付</div>
    </div> -->
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'

// 课程订单详情页面
export default {
  name: 'ClassOrderDetail',
  components:{
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
    .class-order-detail{
        width:100%;
        background:#f5f5f5;
        height:100%;    
        // padding:0 2.7vw;
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
                    .r{
                        flex:1;
                        .omit1{
                            line-height: 5.4vw;
                        }
                    }

                }
                .singly{
                    border-top:1px solid #ccc;
                    p{
                        padding:5.4vw 0;
                        span:nth-child(1){
                                width:55vw;
                                overflow: hidden;
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
            .check{
                position: relative;
                width:50px;
                height:100%;
                i,input{
                    position: absolute;
                    top:0;
                    bottom:0;
                    left:0;
                    right:0;
                    margin:auto;
                }
                input{
                    width: 4.3vw;
                    height: 100%;
                    z-index: 200;
                    opacity: 0;
                }
                i{
                    z-index:100;
                    width:5.4vw;
                    height:5.4vw;
                    font-size:5.4vw;
                }
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
