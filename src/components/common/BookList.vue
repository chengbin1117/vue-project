<template>
  <div  class="book-lists"   
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
    <div 
        class="list f-r-sb" 
        v-for="(item,index) in list" 
        :key="index"
    >
       <div class="avatar">
           <img class="pic-c-c" v-lazy="item.img" :data="item.img"/>
       </div>
       <div class="r">
           <p class="tit omit1 font16 color333">{{item.tit}}</p>
           <p class="amount font12">￥{{item.num}}</p>
           <p class="font12 color666">销量：{{item.num}}</p>
       </div>
    </div>
  </div>
</template>
<script>
// 相关书籍列表
export default {
  name: 'BookList',
  props:{
    list:{},
    onChange:{}
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
        this.loading = true;
        setTimeout(() => {
            that.onChange()
            that.loading = false;
        }, 1000);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .book-lists{
        width:100%;
        background:#fff;
        padding:0px 2.7vw;
        .list{
            margin:5.4vw 0;
        }
        .avatar{
            position: relative;
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
            border-bottom: 1px solid #ccc;
            padding-bottom: 5.4vw;
            p{
                text-align: left;
            }
            .tit{
                margin:2.7vw 0;
                line-height: 5.8vw;
            }
            .amount{
                color:#EB4C49;
                margin:2.7vw 0;
            }
        }
        .list:last-child{
            .r{
                border-bottom:0;
            }
        }
    }
</style>
