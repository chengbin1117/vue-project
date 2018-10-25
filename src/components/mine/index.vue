<template>
  <div  class="mine">   
    <div  class="mine-info f-c-c">
        <div @click="toMyInfo" class="avatar">
            <img class="pic-c-c" v-lazy="info.image" :data="info.image"/>
        </div>
        <p @click="toMyInfo" class="font16 colorfff omit1">{{info.nickname}}</p>
        <i @click="toSign" class="iconfont icon-qiandao"></i>
    </div>
    <div class="my-order">
        <div class="t f-r-sb">
            <span class="t-item font16 color333">我的订单</span>
            <router-link to="order-list/-1" class="t-item">
                <span class="font14 color999">查看全部订单</span>
                <i class="iconfont icon-fanhui-copy color999"></i>
            </router-link>
        </div>
        <div class="b f-r-sb">
            <router-link :to="item.link" class="b-item f-c-c" v-for="(item,index) in orderStatus" :key="index">
                <i :class="item.icon"></i>
                <span class="font14 color333">{{item.name}}</span>
            </router-link>
        </div>
    </div>
    <div class="to-other">
        <router-link class="other-item f-r-sb" :to="item.link" v-for="(item,index) in others" :key="index">
            <span>
                <i :class="item.icon"></i>
                <span class="font16 color333">{{item.name}}</span>
            </span>
            <i class="iconfont icon-fanhui-copy color999"></i>
        </router-link>
    </div>
    <Footer />
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import Footer from "@/components/common/Footer";

// 个人中心页面
export default {
  name: 'Mine',
  components:{
      Footer
  },
  watch:{

  },
  data () {
    return {
        orderStatus:[
            {name:'待付款',icon:'color5BD4B6 iconfont icon-daifukuan',link:'/order-list/0'},
            {name:'待发货',icon:'colorF09C52 iconfont icon-daifahuo',link:'/order-list/10'},
            {name:'待收货',icon:'color5FA8ED iconfont icon-dsh',link:'/order-list/20'},
            {name:'已完成',icon:'colorEC6060 iconfont icon-yiwancheng',link:'/order-list/40'}
        ], // 订单状态
        others:[
            {name:'我的积分',icon:'colorbuy iconfont icon-jifen',link:'/my-integral'},
            {name:'我的地址',icon:'colorbuy iconfont icon-dizhi',link:'my-address/-1'},
            {name:'邀请好友',icon:'colorbuy iconfont icon-yaoqinghaoyou',link:'/invite'},
            {name:'手机号',icon:'colorbuy iconfont icon-shouji1',link:'/fix-phone'},
            {name:'帮助与反馈',icon:'colorbuy iconfont icon-fankui3',link:'/feed-back'},
            {name:'关于我们',icon:'colorbuy iconfont icon-women',link:'/about-us'},
        ],
        info:{}
    }
  },
  created(){
    this.getData()
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
    getData(){
        const _this = this;
        let data = new FormData();
        data.append('token',localStorage.getItem('qtoken'))
        this.ajax({
            url: "/member/userinfo",
            type:'post',
            data,
            success(data) {
                _this.info = data.data;
            }
        })      
    },
    toMyInfo(){
        this.$router.push('my-info')
    },
    toSign(){
        this.$router.push('sign')
    }
  }
}
</script>

<style scoped lang="less">
    .mine{
        position: relative;
        width:100%;
        background:#f5f5f5;
        height:100%;
        .mine-info{
            position: relative;
            width:100%;
            height:56vw;
            background:#eb4c49;
            .avatar{
                position: relative;
                width:18.7vw;
                height:18.7vw;
                border-radius: 50%;
                overflow: hidden;
                margin:0 auto;
                margin-bottom:2.7vw;
            }
            p{
                width: 38.4vw;
                height: 4.3vw;
                overflow: hidden;
                margin: 0 auto;
            }
            i{
                position: absolute;
                top:11.8vw;
                right:8vw;
                color:#fff;
                font-size:6.7vw;
            }
        }   
        .my-order{
            position: absolute;
            height:37.9vw;
            width:94.7vw;
            background:#fff;
            border-radius: 1.6vw;
            top:45.4vw;
            left:0;
            right:0;
            margin:auto;
            .t{
                width:100%;
                height:13.4vw;
                border-bottom:1px solid #ccc;
                .t-item{
                    margin:0 2.7vw;
                    line-height: 13.4vw;
                }
            }
            .b{
                width:100%;
                height:24.3vw;
                .b-item {
                    i{
                        font-size:8.5vw;
                        margin-bottom:4vw;
                    }
                }
                .b-item:nth-child(1){
                    margin-left:2.7vw;
                }
                .b-item:last-child{
                    margin-right:2.7vw;
                }
                .color5BD4B6{
                    color:#5BD4B6;
                }
                .colorF09C52{
                    color:#F09C52;
                }
                .color5FA8ED{
                    color:#5FA8ED;
                }
                .colorEC6060{
                    color:#EC6060;
                }
            }
        }
        .to-other{
            width:100%;
            padding:0 2.7vw;
            background:#fff;
            margin-top:30.2vw;
            .other-item{
                height:12vw;
                line-height: 12vw;
                border-bottom:1px solid #ddd;
                .colorbuy{
                    margin-right:2.7vw;
                    font-size:4.8vw;
                }
            }
            .other-item:last-child{
                border-bottom:0;
            }
        }
    }
</style>
