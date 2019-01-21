<template>
  <div  class="teacher-detail">   
    <div class="red-block"></div>
    <div class="teacher-avatar">
        <div class="avatar">
            <img class="pic-c-c" v-lazy="detail.img_path"  :data="detail.img_path"/>
        </div>
        <p class="font16 color333 mart10">{{detail.real_name}}</p>
        <p class="info f-r-c">
            <span class="font14 color333">{{detail.subject}}</span>
            <span class="font14 color333">教龄{{detail.date_tech}}年</span>
        </p>
        <img class="b-pic" src="../../assets/img/1@2x.png" />
        <i v-if="detail.is_collect == 1" @click="onCollect"  class="collect iconfont icon-wodeshoucang2-copy"></i>
        <i v-else @click="onCollect" class="iconfont icon-shoucang"></i>
    </div>
    <div class="teacher-tab">
        <div class="tab f-r-sb">
            <span @click="tabChange($event,'1')" class='menu font16 color333 active'>在售课程</span>
            <span class="line"></span>
            <span @click="tabChange($event,'2')" class='menu font16 color333'>名师简介</span>
        </div>
    </div>
    <!-- 在售课程 -->
    <div v-show="onlineShow" class="sell-online">
        <class-list :list="classData" :onChange="getClassData"/>
    </div>
    <!-- 在售课程 -->
    <!-- 名师简介 -->
    <div v-show="!onlineShow"  class="teacher-info">
        <p class="tit">
            <i class="red-line"></i>
            <span>基本信息</span>
        </p>
        <p>
            <span>姓名：</span>
            <span>{{detail.real_name}}</span>
        </p>
        <p>
            <span>科目：</span>
            <span>语文</span>
        </p>
        <p>
            <span>教龄：</span>
            <span>{{detail.date_tech}}年</span>
        </p>
        <p class="grade">
            <span>年级：</span>
            <span>{{detail.grade}}</span>
        </p>
        <p class="tit">
            <i class="red-line"></i>
            <span>教师介绍</span>
        </p>
        <p class="des teacher-detail-des" v-html="detail.introduction"></p>
    </div>
    <!-- 名师简介 -->
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import ClassList from "@/components/common/ClassList"

// 老师详情页面
export default {
  name: 'TeacherDetail',
  components:{
      ClassList
  },
  watch:{
      classData(){
          Common.InitImg()
      },
  },
  data () {
    return {
        checked:false,
        classData:[], // 在售课程数据
        detail:{},// 老师简介
        onlineShow:true, // 在线课程显示
        collectVisible:false, // 是否收藏
        teacher_id:'',// 老师id
    }
  },
  created(){
    this.getData()
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
    getData(){
        const _this = this;
        this.teacher_id = this.$route.params.id
        let techaerdata = new FormData();
        techaerdata.append('token',localStorage.getItem('qtoken'))
        techaerdata.append('id',this.teacher_id)
        // 老师主页数据
        this.ajax({
            url: "/teacher/detail",
            type:'post',
            data:techaerdata,
            success(data) {
            _this.classData = data.data.course;
            _this.detail = data.data.teacher;
            }
        })
    },
    // 切换tab
    tabChange(e,item){
        e = e || window.event;
        const target = e.target;
        const menus = document.getElementsByClassName('menu');
        for(var i=0,l=menus.length;i<l;i++){
            menus[i].className = 'menu font16 color333'
        }
        target.className = 'menu font16 color333 active'
        this.onlineShow = item === '1' ? true : false;
    },
    getClassData(){
        //   this.classData.push( {img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2393687535,4107070201&fm=27&gp=0.jpg',name:'米娜',tit:'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',type:'英语',class:'10节课',classType:"免费",num:'1002'})
    },
    onCollect(){
        // this.collectVisible = !this.collectVisible
        const _this = this;
        let data = new FormData();
        data.append('token',localStorage.getItem('qtoken'))
        data.append('type','2')
        data.append('id',this.$route.params.id)
        // 课程详情
        this.ajax({
            url: "/user/collect",
            type:'post',
            data,
            success(data) {
                _this.getData()
            }
        })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .teacher-detail{
        position: relative;
        width:100%;
        background:#f5f5f5;
        height:100%;
        .red-block{
            width:100%;
            height:32vw;
            background:#EB4C49;
        }
        .teacher-avatar{
            position: absolute;
            width:94.7vw;
            height:48vw;
            background:#fff;
            border-radius: 1.6vw;
            top:8vw;
            left:0;
            right:0;
            margin:auto;
            .avatar{
                position: relative;
                width:18.7vw;
                height:18.7vw;
                border-radius: 50%;
                overflow: hidden;
                margin:0 auto;
                margin-top:4vw;
            }
            .info{
                margin-top:4vw;
                span:nth-child(1){
                    margin-right:10.7vw;
                }
            }
            .b-pic{
                position: absolute;
                display: inline-block;
                width:100%;
                bottom:0;
                left:0;
            }
            i{
                position: absolute;
                right:8vw;
                top:6.7vw;
                font-size:6.4vw;
            }
            .collect{
                color:#EB4C49;
            }
        }
        .teacher-tab{
            margin-top:26.7vw;
            background:#fff;
            .tab{
                height:10.7vw;
                border-bottom:1px solid #ddd;
                span{
                    display: inline-block;
                    width:49%;
                    height:100%;
                    line-height: 10.7vw;
                }
                .line{
                    width:1px;
                    height:6.4vw;
                    background:#ccc;
                    margin-top:2.1vw;
                }
                .active{
                    border-bottom:1px solid #eb4c49;
                    color:#eb4c49;
                    position: relative;
                    box-sizing: content-box;
                }
                .active:after, .active:before {
                    border: solid transparent;
                    content: ' ';
                    height: 0;
                    // top: 65%;
                    position: absolute;
                    width: 0;
                }

                .active:after {
                    border-width: 7px;
                    border-bottom-color: #fff;
                    left: 44%;
                    top:67%;
                }
                .active:before {
                    border-width: 7px;
                    border-bottom-color: #eb4c49;
                    left: 44%;
                    top: 64%;
                }
            }
        }
        .teacher-info{
            position: fixed;
            height:100%;
            background:#fff;
            padding:0 2.7vw;
            padding-top:5.4vw;
            p{
                text-align: left;
                span{
                    font-size:3.8vw;
                    color:#333;
                }
            }
            .tit{
                display: flex;
                margin-bottom:5.4vw;
                i{
                    margin-top:1.5vw;
                    margin-right:2.7vw;
                    height:3.2vw;
                }
                span{
                    color:#333;
                    font-size:4.3vw;
                }
            }
            .grade{
                margin-bottom:4vw;
            }
            .des{
                text-indent: 5.4vw;
                img{
                    display:inline-block;
                    width:26.7vw;
                }
            }
        }
    }
</style>
<style lang="less">
    .teacher-detail-des{
        img{
            display:block;
            width:26.7vw;
        }
    }
</style>
