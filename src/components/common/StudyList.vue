<template>
  <div  class="study-list"   
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
    <div 
        class="list f-c" 
        v-for="(item,index) in list" 
        :key="index"
    >
        <p class="tit omit1 font16 color333 t-l">{{item.course_name}}</p>
        <p class="class-type font14 color333 t-l">
            <span class="type">{{item.subject}}</span>
            <span class="line">|</span>
            <span class="class font12">{{item.course_num}}节课</span>
        </p>
        <div class="f-r-sb author">
            <div class="l">
                <span @click="toTeacher(item)" class="avatar">
                    <img class="pic-c-c" :src="item.img_path" :data="item.img_path"/>
                </span>
                <span>{{item.real_name}}</span>
            </div>
            <span @click="toStudy(item)" class="go-study">开始学习</span>
        </div>
    </div>
  </div>
</template>
<script>
// 学习中心列表
export default {
  name: 'StudyList',
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
        const that = this
        this.loading = true
        setTimeout(() => {
            that.onChange()
            that.loading = false
        }, 1000)
    },
    toStudy(item){
        if(item.course_type == '10'){
            this.$router.push('/audio-detail/' + item.id +'/1')
        }else{
            this.$router.push('/video-detail/' + item.id + '/1')
        }
    },
    toTeacher(item){
        this.$router.push('/teacher-detail/' + item.admin_uid)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .study-list{
        width:100%;
        background:#fff;
        .list{
            padding-bottom:5.4vw;
            .tit{
                line-height: 6.3vw;
                margin-top:5.4vw;
            }
            border-bottom:1px solid #ddd;
        }
        .class-type{
            margin:3.2vw 0;
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
        .author{
            .l{
                display: flex;
                line-height: 9.1vw;
            }
            .avatar{
                position: relative;
                display: inline-block;
                width:9.1vw;
                height:9.1vw;
                overflow: hidden;
                border-radius: 50%;
                margin-right:4vw;
                a{
                    width:100%;
                    height:100%;
                }
            }
            .go-study{
                display: inline-block;
                width:24vw;
                height:8vw;
                line-height: 8vw;
                text-align: center;
                border-radius: 4vw;
                border:1px solid #eb4c49;
                color:#eb4c49;
            }
        }

        .list:last-child{
            border-bottom:0;
        }
    }
</style>
