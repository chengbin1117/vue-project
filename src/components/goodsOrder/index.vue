<template>
  <div  class="goods-order">  
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
                <p class="font16 colorbuy mart10 t-l">￥{{data.shop_price}}</p>
            </div>
        </div>
    </div>
    <!-- 商品信息 -->
    <!-- 数量 -->
    <div class="num-handel f-r-sb">
        <span class="font16 color333">选择数量</span>
        <div class="handel f-r">
            <mt-button @click="minusNum" class="f-r-c" type="default" :disabled="goodsNum <= 1">-</mt-button>
            <span class="num">{{goodsNum}}</span>
            <mt-button @click="addNum" class="f-r-c" type="default">+</mt-button>
        </div>
    </div>
    <!-- 数量 -->
    <!-- 物流 -->
    <div class="pay f-c">
        <p class="f-r-sb">
            <span class="font16 color333">物流配送</span>
            <span class="font16 color999">运费￥{{data.freight}}</span>
        </p>
        <p class="f-r-sb">
            <span class="font16 color333">实际支付</span>
            <span class="font16 color999">￥{{data.total}}</span>
        </p>
    </div>
    <!-- 物流 -->
    <!-- 支付方式 -->
    <div class="pay-way f-r-sb">
        <p class="font16 color333">支付方式</p>
        <div class="f-r">
            <i class="iconfont icon-wxopen"></i>
            <span class="font16 color666">微信支付</span>
        </div>
    </div>
    <!-- 支付方式 -->
    <p class="warning">
        <i class="iconfont icon-jingshi"></i>
        <span>该商品购买不支持退货</span>
    </p>
    <div class="order-footer f-r">
        <div class="footer-pay f-r-c">
            <span class="font14 color333">实付：</span>
            <p class="f-c-c total">
                <span class="font18 colorbuy t-l">￥{{data.total}}</span>
                <span class="font12 color999 t-l">( 含运费￥{{data.freight}} )</span>
            </p>
        </div>
        <div @click="confirm" class="confirm font18 colorfff t-c">确认支付</div>
    </div>
    <msg-box v-if="msgVisible" :content="msg"/>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import OrderAddress from "@/components/common/OrderAddress";
import MsgBox from '@/components/common/MsgBox'

// 实物订单页面
export default {
  name: 'GoodsOrder',
  components:{
      OrderAddress,MsgBox
  },
  watch:{

  },
  data () {
    return {
        goodsNum:1,
        data:{
            freight: "",
            goods_cover: "",
            goods_name: "",
            goods_type: "1",
            id: "",
            integral: null,
            shop_price:'',
            total:''
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
            const data2 = data.data2
            _this.data = data1
            _this.data.freight =  parseInt(_this.data.freight).toFixed(2)
            _this.data.total = (_this.goodsNum * parseInt(data1.shop_price) + parseInt(data1.freight)).toFixed(2)
            _this.data2 = data2.addr ? data2.addr : null
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
        if(!this.data2){
            this.msgVisible = true
            _this.msg = '请先选择地址'
            setTimeout(function(){
                _this.msgVisible = false
            },1000)
            return
        }
        data.append('token',localStorage.getItem('qtoken'))
        data.append('id',this.id)
        data.append('num',this.goodsNum)
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
                    _this.$router.push('/pay-success/' + data.data +'/2')
                }
            }
        })
      },
      minusNum(){
          if(this.goodsNum <= 1){
              this.goodsNum = 1 
              return
          }else{
              this.goodsNum --
          }
           this.data.total = (this.goodsNum * parseInt( this.data.shop_price) + parseInt(this.data.freight)).toFixed(2)
      },
      addNum(){
          const _this = this
          if(this.goodsNum >= this.data.stock){
            this.msgVisible = true
            _this.msg = '库存不足'
            setTimeout(function(){
                _this.msgVisible = false
            },1000)
            return
          }
          this.goodsNum ++
          this.data.total = (this.goodsNum * parseInt( this.data.shop_price) + parseInt(this.data.freight)).toFixed(2)
      }
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .goods-order{
        width:100%;
        background:#f5f5f5;
        min-height:100%;    
        padding-top:2.7vw;
        // padding:0 2.7vw;
        padding-bottom:15vw;
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
            color:#fa8f44;
            text-align: left;
            padding-left:4.3vw;
            i{
                font-size:3.2vw;
            }
            span{
                font-size:3.2vw;
            }
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
