<template>
  <div  class="store">   
        <!-- 轮播图 -->
        <mt-swipe class="swiper" :auto="4000">
            <mt-swipe-item v-for="(item,index) in swiper" :key="index">
                <img @click="toOther(item)" class="pic-c-c" v-lazy="item.image" :data="item.image"/>
            </mt-swipe-item>
        </mt-swipe>
        <!-- 轮播图 -->
        <div class="store-nav">
            <span @click="navChange(item)" :class="item.class" v-for="(item,index) in navData" :key="index">{{item.title}}</span>
        </div>
        <div class="store-content">
            <store-list v-if="storeList.length!=0" :list="storeList"  :onChange="getStoreList" :loading="loadMore"/>
            <div v-else class="no-data f-c">
                <img src="../../assets/img/meiyoushangpin@2x.png" />
                <span class="font14 color999">暂无相关商品哦~</span>
            </div>
        </div>
        <p style="padding:2.7vw 0;"  v-if="loadMore" class="content-footer color999 font12">这里是底线~</p>
        <Footer />
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import StoreList from "@/components/common/StoreList";
import Footer from "@/components/common/Footer";

// 商城页面
export default {
  name: 'Store',
  components:{
      StoreList,Footer
  },
  watch:{
      storeList(){
          Common.InitImg()
      },
  },
  data () {
    return {
        swiper:[],// 轮播图片
        navData:[],
        activeNav:'all',
        storeList:[], // 相关课程数据
        page:1,
        loadMore:false,
    }
  },
  created(){
    const _this = this;
    // 轮播图
    let swiperdata = new FormData();
    swiperdata.append('type','2')
    this.ajax({
        url: "/ad/list",
        type:'post',
        data:swiperdata,
        success(data) {
          _this.swiper = data.data;
        }
    })
    // 商品分类
    let typedata = new FormData();
    typedata.append('token',localStorage.getItem('qtoken'));
    this.ajax({
        url: "/goods/category",
        type:'post',
        data:typedata,
        success(data) {
            data.data.forEach((item,index) => {
                item.class = 'font16 color333'
            })
            data.data[0].class = 'font16 color333 active'
            _this.navData = data.data;
        }
    })
    this.getData()

  },
  mounted(){
     Common.InitImg()
  },
  methods:{
    toOther(item){
      if(item.url){
        window.location.href=item.url
      }
    },
    getData(){
        const _this = this
        // 商品列表
        let data = new FormData()
        data.append('goods_type',1)
        data.append('page',this.page)
        data.append('cat_id',this.activeNav)
        this.ajax({
            url: "/goods/list",
            type:'post',
            data,
            success(data) {
                if(data.data.length < 10){
                    _this.loadMore = true
                }
                _this.storeList = data.data
            }
        })    
    },
    navChange(item){
          this.activeNav = item.id;
          this.page = 1;
          for(var i in this.navData){
              this.navData[i].class = 'font16 color333';
              item.class = 'font16 color333 active'
          }
          this.getData()
    },
    getStoreList(){
      if(this.loadMore){
            return
        }
        this.page++
        const _this = this;
        let data = new FormData();
        data.append('goods_type',1)
        data.append('page',this.page)
        data.append('cat_id',this.activeNav)
        this.loadMore = true
        this.ajax({
            url: "/goods/list",
            type:'post',
            data,
            success(data) {
                if(data.data.length == 0){
                    _this.loadMore = true
                    return
                }
                _this.loadMore = false
                data = data.data;
                data.forEach(item=>{
                    _this.storeList.push(item)
                })
            }
        })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .store{
        width:100%;
        background:#f5f5f5;
        min-height:100%;
        padding-bottom: 13.2vw;
        .no-data{
            position: fixed;
            width: 100%;
            height: 100%;
            background:#fff;
            left:0;
            img{
                margin:0 auto;
                width:37.4vw;
                margin-top:10vw;
                margin-bottom:6vw;
            }
        }  
        .swiper{
            position: relative;
            width:100%;
            height:45.1vw;
            margin-bottom:2.7vw;
            .pic-c-c{
                width:100%;
            }
        }
        .store-nav{
            width: 100%;
            overflow: scroll;
            height: 12vw;
            line-height: 12vw;
            border-bottom: 1px solid #ddd;
            background: #fff;
            display: -webkit-box;
            overflow-y: hidden;
            word-break:keep-all;
            padding:0 5.4vw;
            span{
                margin-right:8vw;
                padding-bottom:1.7vw;
            }
            span:last-child{
                margin-right:5.4vw;
            }
            .active{
                color:#eb4c49;
                border-bottom:3px solid #eb4c49;

            }
        }
        .store-content{
            background:#fff;
            padding:0 2.7vw;
            padding-bottom: 5vw;
        }
    }
</style>
<style lang="less">
.store{
  .mint-swipe-indicators{
      z-index:400;
      .mint-swipe-indicator{
        opacity: 1;
        background:#fff;
      }
      .is-active{
        width:5.4vw;
        border-radius:1.6vw;
        background:#EB4C47;
      }
  }
}
</style>
