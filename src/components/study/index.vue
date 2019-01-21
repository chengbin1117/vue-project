<template>
  <div  class="study f-c">  
      <div class="type f-r-c">
        <router-link to="/collect" class="item f-c-c">
            <i class="iconfont icon-wodeshoucang3-copy"></i>
            <span>我的收藏</span>
        </router-link>
        <span class="line"></span>
        <router-link to="/my-mistakes" class="item f-c-c">
            <i class="iconfont icon-wodecuotiben"></i>
            <span>错题本</span>
        </router-link>
      </div>
      <div class="my-class">
          <div class="f-r-sb">
              <span class="font16 color333">我的课程</span>
              <p class="class-tab f-r">
                  <span @click="selectType($event,'0')" class="active tab-item font12 color999">最近学习</span>
                  <span class="tab-line"></span>
                  <span @click="selectType($event,'1')" class="tab-item font12 color999">最近添加</span>
              </p>
          </div>
          <study-list v-if="hasData" :list="studylist" :onChange="getClassData"/>
          <div v-else class="no-data f-c">
            <img src="../../assets/img/meiyoukecheng@2x.png" />
            <span class="font14 color999">没有相关课程哦~</span> 
          </div>
      </div>
    <Footer />
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import Footer from "@/components/common/Footer";
import StudyList from "@/components/common/StudyList";

// 学习中心页面
export default {
  name: 'Study',
  components:{
      Footer, StudyList
  },
  watch:{
      studylist(){
           Common.InitImg()
      }
  },
  data () {
    return {
      studylist:[],
      hasData:false,
      select:0,
    }
  },
  created(){

  },
  mounted(){
          const id = this.$route.params.id;
    if(id == '-1'){
        let tabs = document.getElementsByClassName('tab-item');
        for(var i=0,l=tabs.length;i<l;i++){
            tabs[i].className = 'tab-item font12 color999'
        }
        tabs[1].className = 'tab-item font12 color999 active'
        this.select = 1
        this.getData()
        const footer = document.getElementsByClassName('footer')[0];
        const _a = footer.childNodes
        _a.forEach(element => {
            element.className = ''
        });
        _a[1].className = 'router-link-exact-active router-link-active'
    }else{
        this.getData()
    }
    Common.InitImg()
  },
  methods:{
    getData(){
        const _this = this;
        let data = new FormData();
        data.append('token',localStorage.getItem('qtoken'))
        data.append('is_newest',this.select)
        this.ajax({
            url: "/course/list-my",
            type:'post',
            data,
            success(data) {
                if(data.data.length == 0){
                    _this.hasData = false
                    return
                }
                _this.hasData = true
               _this.studylist = data.data;
            }
        })    
    },
    getClassData(){
        //   this.studylist.push( {img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2393687535,4107070201&fm=27&gp=0.jpg',name:'米娜',tit:'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',type:'英语',class:'10节课',classType:"免费",num:'1002'})
    },
    selectType(e,item){
        e = e || window.event;
        const target = e.target;
        let tabs = document.getElementsByClassName('tab-item');
        for(var i=0,l=tabs.length;i<l;i++){
            tabs[i].className = 'tab-item font12 color999'
        }
        target.className = 'tab-item font12 color999 active'
        this.select = item
        this.getData()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .study{
        width:100%;
        background:#f5f5f5;
        min-height:100%;
        display: flex;
        flex-direction: column;
        .type{
            width:100%;
            height:26.7vw;
            border-radius: 1.6vw;
            margin-top:2.7vw;
            background:#fff;
            box-shadow: 0px 3px 3px rgba(0,0,0,0.1);
            .item{
                width:49%;
                i{
                    font-size:9.4vw;
                }
                .icon-wodeshoucang3-copy{
                    color:#78bbf8;
                }
                .icon-wodecuotiben{
                    color:#D37BDA;
                }
            }
            .line{
                display: inline-block;
                width:2px;
                height:16vw;
                background:#f5f5f5;
                margin-top:5.35vw;
            }

        }
        .my-class{
            padding:2.7vw;
            margin-top:2.7vw;
            background:#fff;
            margin-bottom:18.7vw;
            .class-tab{
                .font12{
                    line-height: 5.2vw;
                }
                .tab-line{
                    display: inline-block;
                    width:2px;
                    height:4.8vw;
                    background:#ccc;
                    margin:0 1.4vw;
                }
                .active{
                    color:#63AAF5;
                }
            }
            .no-data{
                position: fixed;
                width: 100%;
                height: 100%;
                background:#fff;
                left:0;
                // top:0;
                img{
                    margin:0 auto;
                    width:37.4vw;
                    margin-top:34.7vw;
                    margin-bottom:6vw;
                }
            }

        }
    }
</style>
