<template>
  <div  class="my-mistakes">   
    <div v-if="visible" @click="handleFold(item)" :class="['rows',item.unfold ? 'unfoldrows': '']" v-for="(item,index) in data" :key="index">
        <div :class="['f-r-sb', 'parent',!item.unfold ? 'unfoldtit': '']">
            <div :class="['tit','f-r']" style="margin-left:5.4vw">
                <i v-if="item.unfold" class="iconfont icon-shouqi-copy"></i>
                <i v-else class="iconfont icon-shouqi"></i>
                <span  class="font14 color333">{{item.course_name}}</span>
            </div>
            <span style="margin-right:5.4vw" class="font12 color999">（共{{item.num}}题）</span>
        </div>
        <div v-if="!item.unfold" class="child">
            <p @click="childClick($event,child,item)" class="f-r-sb" v-for="(child,key) in item.list" :key="key">
                <span>{{child.course_name}}</span>
                <i class="iconfont icon-fanhui-copy color999 font18"></i>
            </p>
        </div>
    </div>
    <div v-if="!visible" class="no-data f-c">
        <img src="../../assets/img/zanwucuoti@2x.png" />
        <span class="font14 color999">暂无相关错题哦~</span>
    </div>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'

// 我的错题本页面
export default {
  name: 'MyMistakes',
  components:{
  },
  watch:{

  },
  data () {
    return {
        data:[],// 错题列表
        page:1,
        visible:false
    }
  },
  created(){
    const _this = this;
    // 错题集列表
    let mistakedata = new FormData();
    mistakedata.append('token',localStorage.getItem('qtoken'))
    mistakedata.append('page',this.page)
    this.ajax({
        url: "/user/error-list",
        type:'post',
        data:mistakedata,
        success(data) {
            if(data.data.length == 0){
                _this.visible = false
                return
            }
            _this.visible = true
            data.data.forEach((item,index) => {
                item.unfold = true
            })
            _this.data = data.data;
        }
    })  
  },
  mounted(){

  },
  methods:{
        handleFold(item){
          item.unfold = !item.unfold
        },
        childClick(e,item,parent){
            e = e || window.event;
            e.stopPropagation();
            this.$router.push('mistakes/' + item.id +"/" + item.catalog_id +'/'+parent.num)
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .my-mistakes{
        width:100%;
        background:#f5f5f5;
        height:100%;
        padding-top:2.7vw;
        .no-data{
            position: fixed;
            width: 100%;
            height: 100%;
            background:#fff;
            img{
                margin:0 auto;
                width:37.4vw;
                margin-top:34.7vw;
                margin-bottom:6vw;
            }
        }
        .rows{
            position: relative;
            width:100%;
            min-height:12vw;
            line-height: 12vw;
            // padding:0 5.4vw;
            background:#fff;
            .parent{
                border-bottom:1px solid #ddd;
                i{
                    font-size:4.8vw;
                    margin-right:2.7vw;
                }
                span{
                    line-height: 12vw;
                }
            }
            .child{
                // position: absolute;
                background:#fff;
                width:100%;
                padding:0 2.7vw;
                p{
                    padding-left:2.7vw;
                    border-bottom:1px solid #ddd;
                    span{
                        color:#333;
                        font-size:3.8vw;
                    }
                }
            }
        }
        .rows:last-child{
            // .parent{
            //     border:0;
            // }
            .child{
                p:last-child{
                    border-bottom:0;
                }
            }
        }
        .unfoldrows:last-child{
            .parent{
                border:0;
            }
        }
    }
</style>
