<template>
  <div class="recommend-lists">
    <div @click="toTeacher(item)" class="list f-r-sb" v-for="(item,index) in list" :key="index">
       <div  class="avatar">
           <img class="pic-c-c" :src="item.img_path" :data="item.img_path"/>
       </div>
       <div class="r">
           <p class="name omit1 font16 color333">{{item.real_name}}</p>
           <p class="tit omit1 font14 color666">擅长{{item.good_at}}</p>
           <p class="omit1 b font14 color333">
               <span class="type">{{item.subject}}</span>
               <span class="line">|</span>
               <span class="class">{{item.grade}}</span>
           </p>
       </div>
    </div>
  </div>
</template>
<script>
// 名师推荐列表
export default {
  name: 'recommendList',
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
    toTeacher(item){
        this.$router.push('/teacher-detail/' + item.id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .recommend-lists{
        width:100%;
        background:#fff;
        padding:0px 2.7vw;
        .list{
            padding:5.4vw 0;
            padding-bottom:0vw;
        }
        .avatar{
            position: relative;
            width:18.7vw;
            height:18.7vw;
            border-radius: 50%;
            margin-right:4vw;
            // overflow: hidden;
            img{
                width:100%;
                height:100%;
                border-radius: 50%;
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
                line-height: 4.8vw;
            }
            .b{
                .line{
                    margin:0px 2.7vw;
                }
            }
            .omit1{
                height:4.3vw;
                .class{
                    line-height:4.8vw;
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
