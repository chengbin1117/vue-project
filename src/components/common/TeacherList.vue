<template>
  <div  class="teacher-lists"  
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
    <div class="list f-r-sb" v-for="(item,index) in list" :key="index">
       <div class="f-r">
            <div class="check" v-if="editor">
                <input type="checkbox"  >
                <i v-if="true" class="iconfont icon-select colorbuy"></i>
                <i v-else class="iconfont icon-select color999"></i>
            </div>
            <div class="avatar">
                <img @click="toTeacher(item)" class="pic-c-c" v-lazy="item.img_path" :data="item.img_path"/>
            </div>
       </div>
       <div class="r">
           <p class="name omit1 font16 color333">{{item.real_name}}</p>
           <p class="tit omit1 font14 color666">{{item.good_at}}</p>
           <p class="b font14 color333">
               <span class="type">{{item.subject}}</span>
               <span class="line">|</span>
               <span class="class">{{item.grade}}</span>
           </p>
       </div>
    </div>
  </div>
</template>
<script>
// 相关老师列表
export default {
  name: 'TeacherList',
  props:{
    list:{},
    onChange:{},
    editor: {
        type: [Boolean],
        default: false,
    }
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
    },
    toTeacher(item){
        console.log(item.id)
        this.$router.push('teacher-detail/' +2)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .teacher-lists{
        width:100%;
        background:#fff;
        padding:0px 2.7vw;
        .list{
            padding:5.4vw 0;
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
            width:18.7vw;
            height:18.7vw;
            overflow: hidden;
            border-radius: 50%;
            margin-right:4vw;
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
                line-height: 4.8vw;
            }
            .b{
                .line{
                    margin:0px 2.7vw;
                }
            }
        }
        .list:last-child{
            .r{
                border-bottom:0;
            }
        }
    }
</style>
