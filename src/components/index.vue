<template>
  <div class="main indexPage">
    <!-- 首页轮播图 -->
    <mt-swipe class="index-swiper" :auto="4000">
      <mt-swipe-item  v-for="(item,index) in swiper" :key="index">
        <img  @click="toOther(item)" class="pic-c-c" :src="item.image" :data="item.image"/>
      </mt-swipe-item>
    </mt-swipe>
    <router-link to="/search" class="search">
      <i class="iconfont icon-sousuo"></i>
      <span>搜索课程、老师、书籍</span>
    </router-link>
    <!-- 首页轮播图 -->
    <!-- 首页导航栏 -->
    <nav class="index-nav f-r">
      <router-link class="items f-c-c" v-for="(item,index) in navlist" :key="index" :to="item.link">
        <img  v-lazy="item.img" :data="item"/>
        <p style="margin-top:1.5vw">{{item.tit}}</p>
      </router-link>
    </nav>
    <!-- 首页导航栏 -->
    <!-- 公开课列表 -->
    <div class="list-content openlist-content">
      <div class="list-tit f-r-sb">
        <div class="l">
          <span class="red-line"></span>
          <span class="font16 color333">公开课</span>
        </div>
        <div class="f-c-c">
          <router-link to="/public-class"><span class="font12 color63AA more-icon">更多<img  src="../assets/img/gengduo@2x.png"/></span></router-link>
        </div>
      </div>
      <open-list :list="publiclist"/>
    </div>
    <!-- 公开课列表 -->
    <!-- 好课推荐列表 -->
    <div class="list-content goodlist-content">
      <div class="list-tit f-r-sb">
        <div class="l">
          <span class="red-line"></span>
          <span class="font16 color333">好课推荐</span>
        </div>
        <div class="f-c-c">
           <router-link to="/good-class"><span class="font12 color63AA more-icon">更多<img  src="../assets/img/gengduo@2x.png"/></span></router-link>
        </div>
      </div>
      <open-list :list="goodlist"/>
    </div>
     <!-- 好课推荐列表 -->
     <!-- 名师推荐列表 -->
    <div class="list-content teacher-content">
      <div class="list-tit f-r-sb">
        <div class="l">
          <span class="red-line"></span>
          <span class="font16 color333">名师推荐</span>
        </div>
        <div class="f-c-c">
           <router-link to="/recommend-teacher"><span class="font12 color63AA more-icon">更多<img  src="../assets/img/gengduo@2x.png"/></span></router-link>
        </div>
      </div>
      <recommend-list :list="recommendlist"/>
    </div>
     <!-- 名师推荐列表 -->
     <Footer />
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import { mapState,mapActions } from "vuex";
import OpenList from "@/components/common/OpenList";
import RecommendList from "@/components/common/RecommendList";
import Footer from "@/components/common/Footer";
import C from "../assets/js/config.js";
// 首页
export default {
  components:{ OpenList, RecommendList, Footer },
  name: 'index',
  data () {
    return {
      swiper:[],// 轮播图片
      navlist:[
        {img:require('../assets/img/index/xiaoxue@2x.png'),tit:'小学',link:'/primary'},
        {img:require('../assets/img/index/chuzhong@2x.png'),tit:'初中',link:'/middle'},
        {img:require('../assets/img/index/shipinke@2x.png'),tit:'录播课',link:'/audio'},
        {img:require('../assets/img/index/yinpinke@2x.png'),tit:'音频课',link:'/video'},
        {img:require('../assets/img/index/mignshituijian@2x.png'),tit:'名师辅导',link:'/recommend-teacher'}
      ],// 首页导航栏
      recommendlist:[],//名师推荐
      publiclist:[], // 公开课
      goodlist:[], // 好课推荐
      token:'',
      uid:'',
      nickname:'', 
      image:'',
      integral:'',
    }
  },
  computed: {
    // ...mapState(['token']),
  },
  watch:{
    recommendlist(){
       Common.InitImg()
    },
    publiclist(){
       Common.InitImg()
    },
    goodlist(){
       Common.InitImg()
    },
  },
  created(){
    if(this.$route.query.token){
        this.token = this.$route.query.token
        this.uid = this.$route.query.uid
        this.nickname = this.$route.query.nickname
        this.image = this.$route.query.image
        this.integral = this.$route.query.integral
        this.service_id = this.$route.query.service_id
        localStorage.setItem('qtoken',this.token)
        localStorage.setItem('qid',this.uid)
        localStorage.setItem('qname',this.nickname)
        localStorage.setItem('qimage',this.image)
        localStorage.setItem('qintegral',this.integral)
        localStorage.setItem('qservice_id',this.service_id)
    }
    const is_binding = this.$route.query.is_binding;
    if(is_binding == 0){
      this.$router.push('/bind-phone')
      return
    }
    const _this = this;
    let swiperdata = new FormData();
    let recommenddata = new FormData();
    let publicdata = new FormData();
    let gooddata = new FormData();
    swiperdata.append('type','1')
    publicdata.append('type','public')
    gooddata.append('type','recommend')
    // 轮播图
    this.ajax({
        url: "/ad/list",
        type:'post',
        data:swiperdata,
        success(data) {
          _this.swiper = data.data;
        }
    })
    // 公开课
    this.ajax({
        url: "/course/index",
        type:'post',
        data:publicdata,
        success(data) {
          _this.publiclist = data.data
        }
    })
    // 好课推荐
    this.ajax({
        url: "/course/index",
        type:'post',
        data:gooddata,
        success(data) {
          _this.goodlist = data.data
        }
    })
    //名师推荐
    this.ajax({
        url: "/teacher/recommend",
        type:'post',
        data:recommenddata,
        success(data) {
          _this.recommendlist = data.data
        }
    })

  },
  mounted(){
    const _this = this;
    Common.InitImg()
    // 登录

    var data = new FormData()
    data.append('openid','1')
    this.ajax({
        url: "/account/login",
        type:'post',
        data,
        success(data) {
          // _this.setToken(data.data.token)
          // localStorage.setItem('qtoken',data.data.token)
          // localStorage.setItem('qid',data.data.uid)
        }
    })
  },
  methods:{
    ...mapActions(['setToken']),
    fix(){
    },
    toOther(item){
      if(item.url){
        window.location.href=item.url
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.main{
  min-height:100%;
  background:#f5f5f5;
  padding-bottom:10.1vw;
  .index-swiper{
    position: relative;
    width:100%;
    height:56vw;
    .pic-c-c{
      width:100%;
    }
  }
  .search{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      position: absolute;
      width:61.4vw;
      height:8vw;
      line-height: 8vw;
      top:2.7vw;
      left:0;
      right:0;
      margin:auto;
      background:rgba(255,255,255,0.3);
      border-radius: 4vw;
      color:#fff;
      z-index:200;
      i{
        font-size:4.8vw;
        margin:0 2.7vw;
      }
  }
  .index-nav{
    position: absolute;
    height:24vw;
    background:#fff;
    border-radius: 1.6vw;
    width:94.7vw;
    top:44vw;
    left:0;
    right:0;
    margin:auto;
    .items{
      width:20%;
        img{
          width:11.8vw;
          height:11.8vw;
          margin:0 auto;
        }
    }
  }
  .list-content{
    background:#fff;
    margin-top:16vw;
    .list-tit{
      height:10.7vw;
      line-height: 10.7vw;
      .l{
        display: flex;
        padding-top: 3vw;
      }
      .red-line{
        margin-left:4vw;
        margin-right:2.7vw;
      }
      .more-icon{
        display: flex;
        height: 100%;
        line-height: 10.7vw;
        img{
          display: inline-block;
          width:3.8vw;
          height:3.8vw;
          margin-right:4vw;
          margin-left:1.4vw;
          margin-top:3vw;
        }

      }
    }
  }
  .goodlist-content,.teacher-content{
    margin-top:2.7vw;
    margin-bottom:5.4vw;
  }
  .goodlist-content{
    margin-bottom:2.7vw;
  }
  .recommend-lists{
    margin-top:-3vw;
  }
}

</style>
<style lang="less">
  .index-swiper{
    .mint-swipe-indicators{
        bottom:13.4vw!important;
        z-index:400;
        .mint-swipe-indicator{
          opacity: 1;
          background:#fff;
        }
        .is-active{
          width:5.4vw;
          border-radius:1.6vw;
          background:#EB4C49;
        }
    }
  }

</style>

