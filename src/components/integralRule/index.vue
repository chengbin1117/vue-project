<template>
  <div  class="integral-rule">   
    <div class="rules" v-for="(item,index) in rules" :key="index">
        <div class="header f-r">
            <span class="font18">Q</span>
            <span class="font16">{{item.tit}}</span>
        </div>
        <p class="t-l">{{item.desc}}</p>
    </div>

  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import StoreList from "@/components/common/StoreList"

// 积分规则页面
export default {
  name: 'IntegralRule',
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
        rules:[
            {desc:'123123123123123',tit:'什么是积分'},
            {desc:'123123123123123',tit:'什么是积分'},
            {desc:'123123123123123',tit:'什么是积分'},
            {desc:'123123123123123',tit:'什么是积分'},
            {desc:'123123123123123',tit:'什么是积分'}
        ]
    }
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
    .integral-rule{
        width:100%;
        background:#f5f5f5;
        min-height:100%;
        padding:2.7vw; 
        .rules{
            width:100%;
            height:auto;
            background:#fff;
            border-radius: 1.6vw;
            margin-bottom:2.7vw;
            .header{
                width:100%;
                height:12vw;
                line-height: 12vw;
                color:#fff;
                background:#eb4c49;
                border-top-left-radius: 1.6vw;
                border-top-right-radius: 1.6vw;
                span{
                    line-height: 12vw;
                }
                span:nth-child(1){
                    margin-left:1.4vw;
                    margin-right:2.7vw;
                }
            }
            p{
                padding:5.4vw 4vw;
            }
        }
    }
</style>
