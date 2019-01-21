<template>
  <div  class="my-integral">   
    <div class="info f-c-c">
        <p class="font12 color333">当前积分</p>
        <p class="colorbuy integral">{{info.integral}}</p>
        <router-link to="integral-detail" class="integral-detail">
            <i class="iconfont icon-jifen"></i>
            <span class="font14 color333" >积分明细</span>
        </router-link>
        <router-link class="integral-rule font10 colorblue" to="integral-rule">积分规则</router-link>
    </div>
    <div class="content">
        <div class="f-r">
            <span class="red-line"></span>
            <span class="font16 color333">积分商品</span>
        </div>
        <store-list v-if="storeList.length!=0" :list="storeList"  :onChange="getStoreList" />
        <div v-else class="no-data f-c">
            <img src="../../assets/img/meiyoushangpin@2x.png" />
            <span class="font14 color999">暂无相关商品哦~</span>
        </div>
    </div>
    <p style="padding:2.7vw 0;"  v-if="loadMore" class="content-footer color999 font12">这里是底线~</p>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import StoreList from "@/components/common/StoreList"

// 我的积分页面
export default {
  name: 'MyIntegral',
  components:{
      StoreList
  },
  watch:{
        storeList(){
          Common.InitImg()
        },
  },
  data () {
    return {
        storeList:[], // 相关课程数据
        page:1,
        cat_id:0,
        info:{},
        loadMore:false,
    }
  },
  created(){
      this.getData()
      this.getMyIntegral()
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
    getData(){
        const _this = this
        // 积分商品列表
        let data = new FormData()
        data.append('goods_type',2)
        data.append('page',this.page)
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
    getMyIntegral(){
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
    getStoreList(){
        if(this.loadMore){
            return
        }
        this.page++
        const _this = this;
        let data = new FormData();
        data.append('goods_type',2)
        data.append('page',this.page)
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
    .my-integral{
        width:100%;
        background:#f5f5f5;
        min-height:100%;
        padding-top:2.7vw; 
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
        .info{
            position: relative;
            width:94.7vw;
            height:26.7vw;
            margin:0 auto;
            background:#fff;
            border-radius: 1.6vw;
            box-shadow: 0px 3px 5px rgba(#3b3b3b,0.15);
            .integral{
                font-size:8.6vw;
                line-height: 8.6vw;
                margin-top:4vw;
            }
            .integral-rule{
                position: absolute;
                right:5.4vw;
                top:5.4vw;
                color:#63AAF5!important;
                font-size:3.8vw;
            }
            .integral-detail{
                position: absolute;
                bottom:4vw;
                right:5.4vw;
            }
        }
        .content{
            margin-top:2.7vw;
            padding:2.7vw;
            background:#fff;
            .red-line{
                margin-right:2.7vw;
            }
        }
    }
</style>
