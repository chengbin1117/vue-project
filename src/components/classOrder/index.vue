<template>
  <div  class="class-order">   
    <div class="order-info" >
        <p class="tit font16 color333 t-l">商品信息</p>
        <div class="goods-info f-r">
            <div class="l">
                <img class="pic-c-c" :src="course.course_cover" :data='course.course_cover'/>
                <span class="type font10">{{course.course_type != 10 ? '录播课':'音频课'}}</span>
            </div>
            <div class="r f-c-c">
                <p class="font16 color333 t-l omit1">{{course.course_name}}</p>
                <p v-if="false" class="font16 colorbuy mart10 t-l">￥{{course.price}}</p>
            </div>
        </div>
        <div v-if="isSingle" class="singly">
            <p class="f-r-sb" v-for="(item,index) in catalog" :key="index">
                <span class="font16 color333 omit1 t-l">{{item.course_name}}</span>
                <span class="font14 colorbuy omit1">￥{{item.price}}</span>
            </p>
        </div>
    </div>
    <div v-if="isIntegralGoods" class="integral f-r-sb">
        <span class="font16 color333">积分抵扣</span>
        <span class="font14 color666">{{course.integral_desc}}</span>
        <div class="check">
            <input type="checkbox" v-model="checked" @change="checkboxOnclick" >
            <i v-if="checked && course.can_integral==1" class="iconfont icon-select colorbuy"></i>
            <i v-else class="iconfont icon-select color999"></i>
        </div>
    </div>
    <div   class="pay f-c mart10">
        <p class="f-r-sb">
            <span class="font16 color333">支付金额</span>
            <span class="font16 color999">￥{{isSingle ? toFixed(singlePrice): course.price}}</span>
        </p>
        <p v-if="checked && course.can_integral==1" class="f-r-sb">
            <span class="font16 color333">积分抵扣</span>
            <span class="font16 color999">-￥{{toFixed(course.discount)}}</span>
        </p>
        <p class="f-r-sb">
            <span class="font16 color333">实付金额</span>
            <span class="font16 colorbuy">￥{{isSingle ? toFixed(singlePrice):toFixed(course.total)}}</span>
        </p>
    </div>
    <div class="pay-way f-r-sb">
        <p class="font16 color333">支付方式</p>
        <div class="f-r">
            <i class="iconfont icon-wxopen"></i>
            <span class="font16 color666">微信支付</span>
        </div>
    </div>
    <div class="order-footer f-r">
        <div class="footer-pay f-r-c">
            <span class="font14 color333">实付：</span>
             <p class="f-c-c total" style="line-height:0">
                <span class="font18 colorbuy">￥{{isSingle ? toFixed(singlePrice):toFixed(course.total)}}</span>
                <span v-if="checked && course.can_integral==1" class="font12 color999 t-l">( 已抵扣￥{{toFixed(course.discount)}} )</span>
            </p>
        </div>
        <div @click="confirm" class="confirm font18 colorfff t-c">确认支付</div>
    </div>
    <span>{{testPay}}</span>
    <msg-box v-if="msgVisible" :content="msg"/>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import MsgBox from '@/components/common/MsgBox'

// 课程订单页面
export default {
  name: 'ClassOrder',
  components:{
      MsgBox
  },
  watch:{

  },
  data () {
    return {
        checked:false,
        isVirtual:true,
        isSingle:false,
        isIntegralGoods:true,
        course_id:null,
        catalog_ids:null,
        id:null,
        course:{
            course_cover: '',
            course_name:'',
            course_type:'',
            integral:'',
            is_all:'',
            price:'',
            total:'',
        }, // 全套
        singlePrice:0,
        catalog:null, // 单个
        is_integral:null, // 是否使用积分,
        img:'',
        msgVisible:false,
        msg:'',
        wxConfig:{},
        testPay:'支付数据'
    }
  },
  mounted(){
     Common.InitImg()
     this.getWxInfo()
  },
  created(){
    const _this = this
    const url = this.$route.params.course_id
    this.course_id = url.split('_')[0]
    this.catalog_ids = url.split('_')[1]
    let data = new FormData()
    data.append('token',localStorage.getItem('qtoken'))
    if( this.course_id != 0){
        data.append('course_id',this.course_id)
        this.isSingle = false
    }else if(this.catalog_ids != 0 ){
        data.append('catalog_ids',this.catalog_ids)
        this.isSingle = true
    }
    this.ajax({
        url: "/user/order-confirm",
        type:'post',
        data,
        success(data) {
            if(data.code == 0){
                data = data.data
                _this.course = data.course
                _this.course.total = parseInt(_this.course.price)
                _this.catalog = data.catalog
                data.catalog.forEach( (item)=>{
                    _this.singlePrice += parseInt(item.price)
                })
                _this.isIntegralGoods = data.course.integral == 0 ? false : true
            }
        }
    }) 
  },
  methods:{
      getWxInfo(){
        const _this = this
        //获取微信配置
        let data = new FormData();
        alert("location.href:"+location.href)
        data.append('url',location.href)
        this.ajax({
            url: "/account/wx-config",
            type:'post',
            data,
            success(data) {
                _this.wxConfig = data.data.config
                _this.wxConfig.debug = true
                _this.wxConfig.jsApiList = ["chooseWXPay"]
                wx.config(_this.wxConfig)
                // _this.wxReady()
            }
        }) 
      },
      wxPay(config){
          wx.chooseWXPay({
                timestamp: config.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: config.nonceStr, // 支付签名随机串，不长于 32 位
                package: config.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                signType: config.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: config.paySign, // 支付签名
                success: function (res) {
                // 支付成功后的回调函数
                }
          });
      },
      checkboxOnclick(){
        const _this = this;
        if(this.course.can_integral == 0){
            _this.msgVisible = true
            _this.msg = '积分不足'
            setTimeout(function(){
                _this.msgVisible = false
            },1000)
            this.checked = false
            return 
        }
        if(this.checked){
            this.course.total = parseInt(this.course.price) - parseInt(this.course.discount)
        }else{
            this.course.total = parseInt(this.course.price)
        }
        console.log('checked',this.checked)

      },
      confirm(){
        const  _this = this;
        let is_integral = this.checked ? 1 : 0;
        let data = new FormData();
        data.append('token',localStorage.getItem('qtoken'))
        console.log('wxConfig',this.wxConfig)
        data.append('wx_config',this.wxConfig)
        if( this.course_id != 0){
            data.append('course_id',this.course_id)
            data.append('is_integral',is_integral)
        }else if(this.catalog_ids != 0 ){
            data.append('catalog_ids',this.catalog_ids)
        }
        this.ajax({
            url: "/user/order-create",
            type:'post',
            data,
            success(data) {
                if(data.code == 0){
                    _this.testPay = data.pay_data
                    _this.wxPay(data.pay_data)
                    // _this.$router.push('/pay-success/'+ data.data + '/1')
                }else{
                    _this.msgVisible = true
                    _this.msg = data.msg
                    setTimeout(function(){
                        _this.msgVisible = false
                    },1000)   
                }
            }
        }) 
      },
      toFixed(item){
          return parseInt(item).toFixed(2)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .class-order{
        width:100%;
        background:#f5f5f5;
        min-height:100%;   
        padding-bottom: 13.4vw;
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
        .order-footer{
            width:100%;
            height:13.4vw;
            position: fixed;
            bottom:0;
            .footer-pay,.confirm{
                width:50%;
            }
            .footer-pay{
                background:#fff;
                span{
                    line-height: 13.4vw;
                }
            }
            .confirm{
                background:#EB4C49;
                line-height: 13.4vw;
            }
            .total{
                span{
                    line-height:4.8vw;
                }
            }
        }
    }
</style>
