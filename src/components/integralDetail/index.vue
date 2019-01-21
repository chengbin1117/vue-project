<template>
  <div  class="integral-detail">   
    <div class="detail f-r-sb" v-for="(item,index) in data" :key="index">
        <div class="f-c-c">
            <p class="font16 color333 t-l">{{item.content}}</p>
            <p class="font12 color999 t-l mart10">{{item.add_time}}</p>
        </div>
        <p class="f-c-c">
            <span class="font16 color333">{{item.type == 1 ? '+' + item.integral : '-'+ item.integral}}</span>
        </p>
    </div>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import StoreList from "@/components/common/StoreList"

// 积分规则页面
export default {
  name: 'IntegralDetail',
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
        data:[],
        page:1
    }
  },
  created(){
    const _this = this
    let postdata = new FormData();
    postdata.append('token',localStorage.getItem('qtoken'))
    postdata.append('page',this.page)
    this.ajax({
        url: "/member/integral-detail",
        type:'post',
        data:postdata,
        success(data) {
            _this.data = data.data
        }
    })
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .integral-detail{
        width:100%;
        background:#fff;
        min-height:100%;
        padding:2.7vw; 
        .detail{
            width:100%;
            height:16vw;
            background:#fff;
            border-bottom:1px solid #ccc;
        }
        .detail:last-child{
            border-bottom:0;
        }
    }
</style>
