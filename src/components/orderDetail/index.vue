<template>
  <div  v-if="data" class="order-detail">   
    <div class="order-detail-header">
        <div class="red-bg"></div>
        <div class="bg"></div>
    </div>
    <!-- 订单状态 -->
    <order-status :data="data" class="status"/>
    <!-- 订单状态 -->
    <!-- 订单地址 -->
    <order-address v-if="!isVirtual" :hideShadow="true" class="address"/>
    <!-- 订单地址 -->
    <div class="order-info">
        <p class="tit font16 color333 t-l">商品信息</p>
        <div class="goods-info f-r">
            <div class="l">
                <img class="pic-c-c" v-lazy="data.target_data.goods_cover" :data='data.target_data.goods_cover'/>
                <span v-if="isVirtual" class="type font10">{{data.target_data.course_type != 10 ? '录播课':'音频课'}}</span>
            </div>
            <div class="r f-c-c">
                <p class="font16 color333 t-l omit1">{{data.goods_name}}</p>
                <div v-if="!isSingle">
                    <p v-if="!isIntegralGoods || isVirtual" class="font16 colorbuy mart10 t-l">￥{{data.target_data.shop_price}}</p>
                    <p v-if="isIntegralGoods && !isVirtual" class="font16 colorbuy mart10 t-l">{{data.target_data.integral}}积分</p>
                </div>
            </div>
        </div>
         <div v-if="isVirtual && isSingle" class="singly">
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
    <!-- 实物积分 -->
    <div v-if="isIntegralGoods && !isVirtual" class="integral f-c mart10">
        <p class="f-r-sb">
            <span class="font16 color333">积分抵扣</span>
            <span class="font16 colorbuy">-3349积分</span>
        </p>
    </div>
    <!-- 实物积分 -->
    <!-- 虚拟积分 -->
    <div v-if="isVirtual && !isSingle && isIntegralGoods" class="integral f-c mart10">
        <p class="f-r-sb">
            <span class="font16 color333">积分抵扣</span>
            <span class="font14 color999">{{data.integral_desc}}</span>
        </p>
    </div>
    <!-- 虚拟积分 -->
    <!-- 物流+金额 -->
    <div  class="pay f-c mart10">
        <p v-if="!isSingle" class="f-r-sb">
            <span class="font16 color333">支付金额</span>
            <span class="font16 color999">￥{{data.price_all}}</span>
        </p>
        <p v-if="!isSingle && isIntegralGoods" class="f-r-sb">
            <span class="font16 color333">积分抵扣</span>
            <span class="font16 color999">-￥{{data.integral}}</span>
        </p>
        <p v-if="!isVirtual" class="f-r-sb">
            <span class="font16 color333">物流配送</span>
            <span class="font16 color999">运费￥{{data.price_freight}}</span>
        </p>
        <p class="f-r-sb">
            <span class="font16 color333">实付金额</span>
            <span class="font16 colorbuy">￥{{data.price_pay}}</span>
        </p>
    </div>
    <!-- 物流+金额 -->
    <div class="pay f-c">
        <p class="f-r-sb">
            <span class="font16 color333">订单编码：</span>
            <span class="font16 color999">{{data.order_sn}}</span>
        </p>
        <p class="f-r-sb">
            <span class="font16 color333">下单时间：</span>
            <span class="font16 color999">{{data.create_time}}</span>
        </p>
        <p class="f-r-sb">
            <span class="font16 color333">支付时间：</span>
            <span class="font16 color999">{{data.pay_time}}</span>
        </p>
    </div>
    <div class="order-detail-footer f-r-end">
        <span class="white-btn">取消订单</span>
        <span class="red-btn">支付订单</span>
        <span v-if="false" class="red-btn">确认收货</span>
    </div>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import OrderAddress from "@/components/common/OrderAddress";
import OrderStatus from "@/components/common/OrderStatus";

// 订单详情页面
export default {
  name: 'OrderDetail',
  components:{
      OrderAddress, OrderStatus
  },
  watch:{

  },
  data () {
    return {
        isVirtual:false,
        isSingle:false,
        isIntegralGoods:false,
        course_id:null,
        catalog_ids:null,
        id:null,
        course:null, // 全套
        catalog:null, // 单个
        data:null,
    }
  },
  created(){
    const _this = this;
    let data = new FormData();
    data.append('token',localStorage.getItem('qtoken'))
    data.append('id',this.$route.params.id)
    this.ajax({
        url: "/user/order-detail",
        type:'post',
        data,
        success(data) {
            if(data.code == 0){
                data = data.data
                _this.data = data
                _this.isVirtual = data.order_type == 10 ? true : false
                _this.isSingle = data.order_type == 10 && data.type_son == 0 ? true : false
                _this.isIntegralGoods = data.order_type == 20 && data.type_son == 1 ? true : false
            }
        }
    }) 
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
    .order-detail{
        position: relative;
        width:100%;
        background:#f5f5f5;
        min-height:100%;    
        padding-bottom:13.4vw;
        .order-detail-header{
            width:100%;
            height:35vw;
            background:#f5f5f5;
            .red-bg{
                height:50%;
                background:#eb4c49;
            }
        }
        .status{
            position: absolute;
            width:94.7vw;
            top:5.4vw;
            left:0;
            right:0;
            margin:auto;
        }
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
                    padding-top:5.4vw;
                    span:nth-child(1){
                            width:55vw;
                            overflow: hidden;
                    }
                }
                p:last-child{
                    padding-bottom:5.4vw;
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
        .pay:last-child{
            margin-bottom:0;
        }
        .real-pay{
            padding:7.8vw 2.7vw;
            background:#fff;
            margin-bottom:2.7vw;
            p:nth-child(1){
                margin-bottom:4vw;
            }
        }
        .order-detail-footer{
            position: fixed;
            bottom:0;
            left:0;
            width:100%;
            height:13.4vw;
            background:#fff;
            z-index:666;
            border-top:1px solid #ccc;
            padding-right:5.4vw;
            span{
                display: inline-block;
                width:24vw;
                height:8vw;
                line-height:8vw;
                border-radius: 4vw;
                text-align: center;
                font-size:3.8vw;
                border:1px solid #eb4c49;
                margin-top:2.2vw;
                margin-left:5.4vw;
            }
            .white-btn{
                background:#fff;
                color:#eb4c49;
            }
            .red-btn{
                color:#fff;
                background:#eb4c49;
            }
        }
    }
</style>
