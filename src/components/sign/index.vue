<template>
  <div  class="sign f-c">   
    <div class="top">
        <p class="fen font14 color333">我的积分：<span class="colorbuy">{{data.integral_user}}</span></p>
        <router-link  to="integral-rule" class=" rule font14 colorblue">积分规则</router-link>
        <div class="sign-ring f-c-c">
            <div @click="handleSign" :class="['out','f-c-c',data.is_sign == 1 ? 'is-sign' : '']">
                <div class="in f-c-c">
                    <p>{{data.is_sign == 1 ? '已签':'签到'}}</p>
                    <span class="line"></span>
                    <span class="font12 colorfff">连续签到赢积分</span>
                </div>
            </div>
            <router-link class="font14 color333" to="store">前往商城<i class="iconfont icon-qianwang"></i></router-link>
        </div>
    </div>
    <div class="b f-c">
        <p class="tit font16 color333">今日已签到<span class="colorbuy">+{{data.get}}</span>，连续签到<span class="colorbuy">{{data.days}}</span>天</p>
        <div>
            <div style="display:inline-block" class="f-c item f-item" v-for="(item,index) in data.integral" :key="index">
                <div :class="['circle','f-c-c',item.sign == 1 ? 'active': '']">
                    <span class="font16">{{item.integral}}</span>
                    <span class="font10">积分</span>
                    <i v-if="item.sign == 1" class="iconfont icon-xuanzhong"></i>
                </div>
                <p class="font12 color999">{{item.day}}</p>
            </div>
        </div>
        <p class="warning font12 color999 t-l">连续签到7天以上积分数都跟第7天相同</p>
    </div>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'

// 签到页面
export default {
  name: 'Sign',
  components:{
  },
  watch:{

  },
  data () {
    return {
       isSign:false,
       data:{}
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
            url: "/member/signin-detail",
            type:'post',
            data,
            success(data) {
                data= data.data
                _this.data = data
            }
        })      
    },
    handleSign(){
        if(this.data.is_sign == 1){
            return
        }
        const _this = this;
        let data = new FormData();
        data.append('token',localStorage.getItem('qtoken'))
        this.ajax({
            url: "/member/signin",
            type:'post',
            data,
            success(data) {
                if(data.code == 0){
                    _this.getData()
                }
            }
        })  
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .sign{
        width:100%;
        background:#f5f5f5;
        height:100%;
        .top{
            position: relative;
            background:#fff;
            width:100%;
            height:56vw;
            margin-bottom:2.7vw;
            .fen,.rule{
                position: absolute;
                top:4vw;
            }
            .fen{
                left:5.4vw;  
            }
            .rule{
                right:5.4vw;
                color:#63AAF5;
            }
            .sign-ring{
                height:100%;
                .out{
                    width:37.4vw;
                    height:37.4vw;
                    border-radius: 50%;
                    background:rgba(#eb4c49,0.3);
                    margin:0 auto;
                    margin-bottom:4vw;
                    border:1px solid transparent;
                    .in{
                        width:31.2vw;
                        height:31.2vw;
                        background:#eb4c49;
                        border-radius: 50%;
                        margin:0 auto;
                        p{
                            font-size:6.4vw;
                            color:#fff;
                        }
                        .line{
                            width:21.4vw;
                            height:0.6vw;
                            background:#fff;
                            margin:2.7vw auto;
                        }
                    }
                }
                .is-sign{
                    background:#fff;
                    border:1px solid #eb4c49;
                    .in{
                        background:#fff;
                        p{
                            color:#eb4c49;
                        }
                        .line{
                            background:#eb4c49
                        }
                        span{
                            color:#eb4c49;
                        }
                    }
                }
            }
        }
        .b{
            flex:1;
            background:#fff;
            .tit{
                margin-top:8vw;
            }
            .warning{
                margin-left:6.4vw;
                margin-top:8vw;
            }
            .item{
                width:16.6vw;
                margin-right:8vw;
                .circle{
                    position: relative;
                    width:16.6vw;
                    height:16.6vw;
                    background:#f2f2f2;
                    border:1px solid #999;
                    border-radius:50%;
                    margin-bottom:2.7vw;
                    span{
                        color:#999
                    }
                    .font16{
                        line-height: 5.3vw;
                    }
                }
                .active{
                    background:rgba(#eb4c49,0.3);
                    border-color:#eb4c49;
                    span{
                        color:#eb4c49
                    }
                    i{
                        position: absolute;
                        color:#eb4c49;
                        right:0;
                        bottom:-0.8vw;
                        z-index:200;
                        font-size:4.3vw;
                    }
                }
            }
            .f-item{
                margin-top:10vw;
                margin-bottom:0;
            }
            .f-item:last-child,.l-item:last-child{
                margin-right:0;
            }
            .f-item:nth-child(1){
                margin-left:5vw;
                margin-right:0;
            }
            .f-item:nth-child(2){
                margin:0 10vw;
            }
            .f-item:nth-child(3){
                margin-right:5vw;
            }
        }
    }
</style>
