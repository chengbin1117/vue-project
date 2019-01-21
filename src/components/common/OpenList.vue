<template>
  <div class="open-class-lists">
    <div @click="toDetail(item)" class="list" v-for="(item,index) in list" :key="index">
        <div class="list-t">
            <span>{{item.course_type == 10 ? '音频课' :'录播课'}}</span>
            <img class="pic-c-c" v-lazy="item.course_cover" :data="item.course_cover"/>
        </div>
        <div class="list-b">
            <p class="omit1 font14 color333 martb10">{{item.course_name}}</p>
            <p class="f-r-sb">
                <span v-if="item.charge_type == 10" class="free font14">免费</span>
                <span v-if="item.charge_type == 20 && item.time_limit" class="limit font14">限时观看</span>
                <span v-if="item.charge_type == 20 && !item.time_limit" class="colorbuy font14">￥{{item.price}}</span>
                <span class="font12 color999">{{item.sales_num}}人报名</span>
            </p>
        </div>
    </div>
  </div>
</template>
<script>
// 公开课列表
export default {
  name: 'OpenList',
  props:{
      list:{}
  },
  data () {
    return {
    }
  },
  mounted(){
  },
  methods:{
    toDetail(item){
        if(item.course_type == 10){
            this.$router.push('audio-detail/' + item.id +'/0')
        }else{
            this.$router.push('video-detail/' + item.id + '/0')
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .open-class-lists{
        width:100%;
        background:#fff;
        padding:0px 2.7vw;
        text-align: left;
        .list{
            display:inline-block;
            width:48%;
        }
        .list:nth-child(odd){
            margin-right:2.7vw;
        }
        .list-t{
            position: relative;
            width:45.9vw;
            height:45.9vw;
            border-radius: 1.6vw;
            overflow: hidden;
            span{
                position: absolute;
                display: inline-block;
                // width:13.4vw;
                // height:5.4vw;
                // line-height:5.4vw;
                // text-align: center;
                padding:1.1vw 2.7vw 1.1vw 1.3vw;
                font-size:3.2vw;
                color:#fff;
                background:rgba(0,0,0,0.3);
                border-top-right-radius:2.7vw;
                border-bottom-right-radius:2.7vw;
                left:0;
                top:2.7vw;
                z-index:100;
            }
        }
        .list-b{
            border-bottom:1px solid #ddd;
            margin-bottom:5.4vw;
            padding-bottom:4vw;
            .omit1{
                text-align: left;
                line-height:4.8vw;
                height:4.6vw;
            }
            .free{
                color:#41B5A3;
            }
            .limit{
                color:#F58F44;
            }
        }
    }
</style>
