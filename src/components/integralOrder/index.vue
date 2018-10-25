<template>
  <div  class="integral-order">  
    <!-- 订单地址 -->
    <order-address :data="data2" class="address"/>
    <!-- 订单地址 -->
    <!-- 商品信息 -->
    <div class="order-info">
        <p class="tit font16 color333 t-l">商品信息</p>
        <div class="goods-info f-r">
            <div class="l">
                <img class="pic-c-c" v-lazy="data.goods_cover" :data='data.goods_cover'/>
            </div>
            <div class="r f-c-c">
                <p class="font16 color333 t-l omit1">{{data.goods_name}}</p>
                <p class="font16 colorbuy mart10 t-l">{{data.integral}}积分</p>
            </div>
        </div>
    </div>
    <!-- 商品信息 -->
    <!-- 支付 -->
    <div class="pay f-c">
        <p class="f-r-sb">
            <span class="font16 color333">积分抵扣</span>
            <span class="font16 colorbuy">-{{data.integral}}积分</span>
        </p>
    </div>
    <!-- 支付 -->
    <p class="warning">
        <i class="iconfont icon-jingshi"></i>
        <span>该商品购买不支持退货</span>
    </p>
    <div class="order-footer f-r">
        <div class="footer-pay f-r-c">
            <span class="font14 color333">抵扣积分：</span>
            <span class="font18 colorbuy">{{data.integral}}</span>
        </div>
        <div @click="confirm" class="confirm font18 colorfff t-c">马上兑换</div>
    </div>
    <msg-box v-if="msgVisible" :content="msg"/>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import OrderAddress from "@/components/common/OrderAddress";
import MsgBox from '@/components/common/MsgBox'

// 积分确认订单页面
export default {
  name: 'IntegralOrder',
  components:{
      OrderAddress,MsgBox
  },
  watch:{

  },
  data () {
    return {
        data:{
            freight: "",
            goods_cover: "",
            goods_name: "",
            goods_type: "1",
            id: "",
            integral: null,
            shop_price:'',
            total:'',
        },
        data2:{},
        msgVisible:false,
        msg:''
    }
  },
  created(){
    const _this = this;
    this.id = this.$route.params.id;
    let data = new FormData();
    data.append('token',localStorage.getItem('qtoken'))
    data.append('id',this.id)
    if(sessionStorage.getItem('address_id')){
        data.append('addr_id',sessionStorage.getItem('address_id'))
    }
    this.ajax({
        url: "/user/order-confirm-goods",
        type:'post',
        data,
        success(data) {
            const data1 = data.data
            const data2 = data.data2.addr ? data.data2.addr : null
            _this.data = data1
            _this.data2 = data2
        }
    })    
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
      checkboxOnclick(){
          
      },
     confirm(){
        const _this = this;
        this.id = this.$route.params.id;
        let data = new FormData();
        data.append('token',localStorage.getItem('qtoken'))
        data.append('id',this.id)
        data.append('user_name',this.data2.user_name)
        data.append('phone',this.data2.phone)
        data.append('province',this.data2.province)
        data.append('city',this.data2.city)
        data.append('address',this.data2.address)
        this.ajax({
            url: "/user/order-create-goods",
            type:'post',
            data,
            success(data) {
                if(data.code == 0){
                    _this.$router.push('/pay-success/' + data.data)
                }else{
                    _this.msgVisible = true
                    _this.msg = data.msg
                    setTimeout(function(){
                        _this.msgVisible = false
                    },2000)
                }
            }
        })
      },
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .integral-order{
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
        .num-handel{
            width:100%;
            height:12vw;
            margin:2.7vw 0;
            padding:0 2.7vw;
            background:#fff;
            span{
                line-height: 12vw;
            }
            button{
                display: flex;
                flex-direction: row;
                justify-content: center;
                width:6.4vw;
                height:6.4vw;
                line-height: 6.4vw;
                color:#fff;
                background:#999;
                border-radius: 1.1vw;
                outline: none;
                border:0;
                font-size:5.4vw;
                font-weight: bold;
                margin-top:3.3vw;
            }
            .num{
                margin:0 2.7vw;
            }
            
        }
        .pay{
            padding:4.8vw;
            background:#fff;
            margin-top:2.7vw;
            margin-bottom:2.7vw;
            p{
                margin-bottom:4.3vw;
            }
            p:last-child{
                margin-bottom:0;
            }
        }
        .pay-way{
            background:#fff;
            padding:8vw 2.7vw;
            margin-bottom:2.7vw;
            i{
                font-size:6.4vw;
                margin-right:3.5vw;
                color:#41b035;
            }
            p,span{
                 line-height: 6.4vw;
            }
        }
        .warning{
            font-size:3.2px;
            color:#fa8f44;
            text-align: left;
            padding-left:4.3vw;
        }
        .order-footer{
            width:100%;
            height:13.4vw;
            position: fixed;
            bottom:0;
            left:0;
            z-index:666;
            .footer-pay,.confirm{
                width:50%;
            }
            .footer-pay{
                background:#fff;
                span{
                    line-height: 13.4vw;
                }
                .total{
                    span{
                        line-height: 7.2vw;
                    }
                    span:last-child{
                        line-height: 3.2vw;
                    }
                }
            }
            .confirm{
                background:#EB4C49;
                line-height: 13.4vw;
            }
        }
    }
</style>
