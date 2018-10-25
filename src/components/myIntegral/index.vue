<template>
  <div  class="my-integral">   
    <div class="info f-c-c">
        <p class="font12 color333">当前积分</p>
        <p class="colorbuy integral">520</p>
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
        cat_id:0
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
                _this.storeList = data.data
            }
        })    
    },
    getStoreList(){
        // this.storeList.push( {img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2393687535,4107070201&fm=27&gp=0.jpg',name:'米娜',tit:'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',type:'英语',class:'10节课',classType:"免费",num:'1002'})
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .my-integral{
        width:100%;
        background:#f5f5f5;
        height:100%;
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
