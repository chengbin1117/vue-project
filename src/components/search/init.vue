<template>
  <div class="search-init">
    <!-- <p class="hot">
        <i class="iconfont icon-remen3-copy marr10"></i>
        <span class="font16 color333">热门搜索</span>
    </p>
    <div class="hot-items">
        <span @click="onChange(item)" v-for="(item,index) in data" :key="index" class="hot-item font14 color666">{{item.name}}</span>
    </div> -->
    <div class="history f-r-sb">
        <p class="l">
            <i class="iconfont icon-lishi marr10"></i>
            <span class="font16 color333">搜索历史</span>
        </p>
        <i v-if="history.length!=0" @click="clear" class="r iconfont icon-shanchu"></i>
    </div>
    <p  @click="onChange(item)" v-for="(item,index) in history" :key="index" class="history-item font16 color333 t-l">{{item}}</p>
  </div>
</template>
<script>
// 搜索页 默认状态
export default {
  name: 'SearchInit',
  props:{
      history:{},
      reset:{},
      getData:{}
  },
  data () {
    return {
        data:[
          {name:'初中语文'},
          {name:'语文'},
          {name:'语文'},
          {name:'初中语文'},
          {name:'初中语文'},
          {name:'初中语文'},
          {name:'初中语文'},
        ],
        historyData:{

        } 
    }
  },
  mounted(){
     
  },
  methods:{
      onChange(item){
          this.getData(item)
          console.log(item)
      },
      clear(){
          this.reset()
          localStorage.clear('searchList')
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .search-init{
        .hot{
            text-align: left;
            margin-bottom:7.5vw;
            i{
                color:#EB4C49;
                font-size:5.4vw;
            }
        }
        .hot-items{
            text-align: left;
            .hot-item{
                display: inline-block;
                // padding:2.2vw;
                min-width:16.5vw;
                padding:0 2.2vw;
                height:8vw;
                line-height: 8vw;
                border:1px solid #999;
                border-radius: 1.6vw;
                margin-right:4.8vw;
                margin-bottom:5.4vw;
                text-align: center;
            }
        }
        .history{
            margin-bottom:5.4vw;
            .l{
                i{
                    font-size:5.4vw;
                    color:#00BCFA;
                }
            }
            .r{
                font-size:5.4vw;
                color:#999;
            }
        }
        .history-item{
            margin-bottom:6.4vw;
        }
    }
</style>
