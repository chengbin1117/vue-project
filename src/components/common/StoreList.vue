<template>
  <div  class="store-list"   
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
    <div 
        class="goods" 
        v-for="(item,index) in list" 
        :key="index"
    >
      <div class="pic">
        <img @click="toDetail(item)" class="pic-c-c" v-lazy="item.goods_cover" :data="item.goods_cover"/>
      </div>
      <p class="tit font14 color333 omit1 t-l">{{item.goods_name}}</p>
      <p v-if="item.goods_type == 1" class="font12 colorbuy">￥{{item.shop_price}}</p>
      <p v-else class="font12 colorbuy">{{item.integral}}积分</p>
    </div>
  </div>
</template>
<script>
// 学习中心列表
export default {
  name: 'StoreList',
  props:{
    list:{},
    onChange:{},
    loading: {
        type: [Boolean],
        default: false,
    },
  },
  data () {
    return {
        loading:false,
    }
  },
  mounted(){
     
  },
  methods:{
    loadMore() {
        const that = this;
        that.onChange()
    },
    toDetail(item){
        if(item.goods_type == 1){
            this.$router.push('./goods-detail/' + item.id)
        }else{
            this.$router.push('./integral-store/' + item.id)
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .store-list{
        width:100%;
        background:#fff;
        text-align: left;
        .goods{
            display: inline-block;
            width:45.9vw;
            margin-right:2.7vw;
            border-bottom:1px solid #ddd;
            margin-top:5.4vw;
            padding-bottom:5.4vw;
            .pic{
                position: relative;
                width:45.9vw;
                height:45.9vw;
                overflow: hidden;
                border-radius: 1.6vw;
                // border:1px solid #ccc;
            }
            .tit{
                margin:2.7vw 0;
                line-height: 4.8vw;
                height:4.8vw;
            }

        }
        .goods:nth-child(2n){
            margin-right:0;
        }
    }
</style>
