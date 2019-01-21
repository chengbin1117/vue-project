<template>
  <div  class="class-lists"   
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
    <div 
        class="list f-r-sb" 
        v-for="(item,index) in list" 
        :key="index"
        @click="toDetail(item)"
    >  
        <div class="f-r">
            <div class="check" v-if="editor">
                <input type="checkbox"  >
                <i v-if="true" class="iconfont icon-select colorbuy"></i>
                <i v-else class="iconfont icon-select color999"></i>
            </div>
            <div class="avatar">
                <p >
                    <img class="pic-c-c" v-lazy="item.course_cover" :data="item.course_cover"/>
                    <span class="type font10">{{item.course_type == 10 ? '音频课':'录播课'}}</span>
                </p>
            </div>
        </div>
       <div class="r">
           <p class="tit omit1 font16 color333">{{item.course_name}}</p>
           <p class="b font14 color333">
               <span class="type">{{item.subject}}</span>
               <span class="line">|</span>
               <span class="class font12">{{item.course_num}}节课</span>
           </p>
           <p class="f-r-sb">
               <span v-if="item.charge_type==10" class="colorfree font14">免费</span>
               <span v-if="item.charge_type == 20 && !item.time_limit" class="colorbuy font14"> ￥{{item.price}}</span>
               <span v-if="item.charge_type == 20 && item.time_limit" class="colorlimit font14">限时观看</span>
               <span class="font12 color999">{{item.sales_num}}人报名</span>
           </p>
       </div>
    </div>
  </div>
</template>
<script>
// 相关课程列表
export default {
  name: 'ClassList',
  props:{
    list:{},
    onChange:{},
    editor: {
        type: [Boolean],
        default: false,
    },
    loading: {
        type: [Boolean],
        default: false,
    },
  },
  data () {
    return {
       
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
        if(item.course_type == 10){
            this.$router.push('/audio-detail/' + item.id +'/0')
        }else{
            this.$router.push('/video-detail/' + item.id + '/0')
        } 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .class-lists{
        width:100%;
        background:#fff;
        padding:0px 2.7vw;
        .list{
            padding:5.4vw 0;
            padding-bottom:0vw;
             .check{
                position: relative;
                width:5.4vw;
                height:100%;
                margin-right:2.7vw;
                i,input{
                    position: absolute;
                    top:0;
                    bottom:0;
                    left:0;
                    right:0;
                    margin:auto;
                }
                input{
                    width: 4.3vw;
                    height: 100%;
                    z-index: 200;
                    opacity: 0;
                }
                i{
                    z-index:100;
                    width:5.4vw;
                    height:5.4vw;
                    font-size:5.4vw;
                }
            }
        }
        .avatar{
            position: relative;
            display: inline-block;
            width:26.7vw;
            height:26.7vw;
            overflow: hidden;
            border-radius: 1.6vw;
            margin-right:4vw;
            .type{
                position: absolute;
                display: inline-block;
                width:10.7vw;
                height:4.3vw;
                line-height: 4.5vw;
                color:#fff;
                background:rgba(0,0,0,0.3);
                border-top-right-radius:2.7vw;
                border-bottom-right-radius:2.7vw;
                left:0;
                top:2.7vw;
                z-index:100; 
            }
        }
        .r{
            flex:1;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5.4vw;
            p{
                text-align: left;
            }
            .tit{
                margin:2.7vw 0;
                line-height: 5.8vw;
            }
            .b{
                .line{
                    margin:0px 2.7vw;
                }
                .class{
                    display: inline-block;
                    padding:0.8vw 1.9vw;
                    background:rgba(#EB4C49,0.2);
                    // opacity: 0.2;
                    border-radius: 1.1vw;
                    color:#eb4c49;
                }
            }
            .f-r-sb{
                margin-top:4.6vw;
            }
        }
        .list:last-child{
            .r{
                border-bottom:0;
            }
        }
    }
</style>
