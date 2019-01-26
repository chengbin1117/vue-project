<template>
  <div  class="pay-success">   
    <div class="t f-r-c">
        <i class="colorwx iconfont icon-menzhenjiaofei-zhifuchenggong"></i>
        <span class="font16 color333">{{msg}}</span>
    </div>
    <div class="go-my-class font14 color999">可在<span class="jump" @click="jump">“{{data}}”</span>中查看哦~</div>
    <div class="go-back f-r-c">
        <span @click="toDetail" class="font18 colorbuy" to="/class-order-detail">查看详情</span>
        <router-link  class="font18 colorfff" to="/">返回首页</router-link>
    </div>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'

// 支付成功页面
export default {
  name: 'PaySuccess',
  components:{
  },
  watch:{

  },
  props:{
  },
  data () {
    return {
        checked:false,
        data:'',
        msg:''
    }
  },
  created(){
      this.data = this.$route.params.type == '1'? '学习-我的课程' :'我的订单'
      // type 1 课程 ， type 2 现金物品  type 3 积分兑换
      if(this.$route.params.type == '1'){
          this.msg = '报名成功'
      }else if(this.$route.params.type == '2'){
          this.msg = '购买成功'
      }else if(this.$route.params.type == '3'){
          this.msg = '兑换成功'
      }
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
      jump(){
        if(this.$route.params.type == 1){
            this.$router.push('/study/-1')
        }else{
            this.$router.push('/order-list/-1')
        }
      },
      checkboxOnclick(){
      },
      toDetail(){
        this.$router.push('/order-detail/'+this.$route.params.id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .pay-success{
        width:100%;
        background:#f5f5f5;
        height:100%;
        padding-top:21.4vw;
        .t{
            width:100%;
            height:13.9vw;
            line-height: 13.9vw;
            i{
                font-size:13.9vw;
            }
            .font16{
                display: inline-block;
                height:100%;
                line-height:13.9vw;
            }
        } 
        .go-my-class{
            margin-top:8vw;
            .jump{
                color:#63AAF5
            }
        }
        .go-back{
            margin-top:10.7vw;
            a,span{
                display: inline-block;
                width:32vw;
                height:11.8vw;
                line-height:11.8vw;
                border-radius: 5.9vw;
                border:1px solid #eb4c49;
                color:#eb4c49;
            }
            a:nth-child(2){
                color:#fff;
                background:#eb4c49;
                margin-left:8vw;
            }
        }   
    }
</style>
