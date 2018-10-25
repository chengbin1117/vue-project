<template>
  <div  class="goods-detail">   
        <!-- 轮播图 -->
        <mt-swipe class="swiper" :auto="4000">
            <mt-swipe-item v-for="(item,index) in swiper" :key="index">
                <img class="pic-c-c" v-lazy="item" :data="item"/>
            </mt-swipe-item>
        </mt-swipe>
        <!-- 轮播图 -->
        <div class="goods-tit">
            <p class="tit font16 color333 omit2 t-l">{{data.goods_name}}</p>
            <p class="f-r-sb">
                <span class="colorbuy font16">￥{{data.shop_price}}</span>
                <span class="font12 color999" style="line-height:5.4vw">销量：{{data.sales_num}}</span>
            </p>
        </div>
        <div class="goods-info">
            <div class="f-r">
                <div class="f-c-c">
                    <span class="red-line"></span>
                </div>
                <span class="font16 color333">商品详情</span>
            </div>
            <p class="desc font14 color333 t-l" v-html="data.content"></p>
        </div>
        <span @click="submit" class="btn-buy">立刻购买</span>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'

// 商品详情页面
export default {
  name: 'GoodsDetail',
  components:{
  },
  watch:{

  },
  data () {
    return {
        swiper:[],// 轮播图片
        data:{}, // 商品详情
    }
  },
  created(){
    const _this = this;
    // 商品详情
    let detaildata = new FormData();
    detaildata.append('token',localStorage.getItem('qtoken'));
    detaildata.append('id',this.$route.params.id);
    this.ajax({
        url: "/goods/detail",
        type:'post',
        data:detaildata,
        success(data) {
            data = data.data
            _this.data = data
            _this.swiper = data.goods_album
        }
    })
    
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
      submit(){
          this.$router.push('/goods-order/' + this.data.id)
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .goods-detail{
        width:100%;
        background:#f5f5f5;
        height:100%;
        .swiper{
            position: relative;
            width:100%;
            height:56vw;
            .pic-c-c{
            width:100%;
            }
        } 
        .goods-tit{
            padding:5.4vw 4.3vw;
            background:#fff;
            margin-bottom:2.7vw;
            .tit{
                line-height: 5.2vw;
            }
            .f-r-sb{
                margin-top:3.2vw;
            }
        }
        .goods-info{
            padding:5.4vw 4.3vw;
            background:#fff;
            .red-line{
                margin-right:2.7vw;
            }
            .desc{
                margin-top:4vw;
                text-indent: 5.4vw;
                line-height: 5.4vw;
            }
        } 

    }
</style>
<style lang="less">
.goods-detail{
  .mint-swipe-indicators{
      z-index:400;
      .mint-swipe-indicator{
        opacity: 1;
        background:#fff;
      }
      .is-active{
        border-radius:1.6vw;
        background:#EB4C47;
      }
  }
}
</style>
