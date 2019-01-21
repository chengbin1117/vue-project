<template>
  <div  class="public-class">   
    <div class="header f-r">
        <div @click="unfold(item,index)" :class="item.class" v-for="(item,index) in classType" :key="index">
            <span class="type-name font16 color333">{{item.name}}</span>
            <i v-if="item.isDown" class="iconfont icon-xiala1"></i>
            <i v-else class="iconfont icon-xiala1-copy"></i>
        </div>
        <!-- 年级类型 -->
        <div v-if="isExtend[0].isShow" class="type-extend f-r">
            <div class="grade-child">
                <p @click="childSelect($event,item,'grade')" :class="item.class" v-for="(item,index) in gradeChild" :key="index">{{item.name}}</p>
            </div>
        </div>
         <!-- 年级类型 -->
         <!-- 学科类型 -->
        <div v-if="isExtend[1].isShow" class="type-extend f-r">
            <div class="grade-child">
                <p @click="childSelect($event,item,'subject')" :class="item.class" v-for="(item,index) in subjectList" :key="index">{{item.title}}</p>
            </div>
        </div>
         <!-- 学科类型 -->
         <!-- 分类类型 -->
        <div v-if="isExtend[2].isShow" class="type-extend f-r">
            <div class="grade-child">
                <p @click="childSelect($event,item,'other')" :class="item.class" v-for="(item,index) in otherList" :key="index">{{item.name}}</p>
            </div>
        </div>
         <!-- 分类类型 -->
    </div>
    <div v-if="hasData" class="content">
        <div v-if="isExtend[typeIndex].isShow" class="mask"></div>
        <class-list :list="classData" :onChange="getClassData" :loading="loadMore"/>
        <p style="padding:2.7vw 0;" v-if="loadMore" class="content-footer color999 font12">这里是底线~</p>
    </div>
    <div v-else class="no-data f-c">
        <img src="../../assets/img/meiyoukecheng@2x.png" />
        <span class="font14 color999">没有相关结果，可以看看其他的哦~</span>
        <div v-if="isExtend[typeIndex].isShow" class="mask"></div>
    </div>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import ClassList from "@/components/common/ClassList"

// 初中
export default {
  name: 'Middle',
  components:{
      ClassList
  },
  watch:{
      classData(){
          Common.InitImg()
      },
      typeIndex(newVal,oldVal){
          this.classType[oldVal].isDown = true;
          this.classType[oldVal].class = 'class-type f-r-c'
          this.classType[newVal].class = 'class-type f-r-c colorbuy'
          this.isExtend[oldVal].isShow = false;
          this.isExtend[newVal].isShow = true;
      }
  },
  data () {
    return {
        classType:[
            {name:'年级',id:'1',isDown:true,class:'class-type f-r-c'},
            {name:'学科',id:'2',isDown:true,class:'class-type f-r-c'},
            {name:'分类',id:'3',isDown:true,class:'class-type f-r-c'}
        ],// 公开课类型
        gradeChild:[], // 年级分类
        subjectList:[], // 学科类型
        otherList:[
            {name:'全部',id:'1',class:'child font14 color333 text-l'},
            {name:'录播课',id:'2',class:'child font14 color333 text-l'},
            {name:'音频课',id:'3',class:'child font14 color333 text-l'}
        ], // 分类类型
        gradeChildSelect:'0', // 年级子级被选中项
        subjectSelect:'全部', // 学科被选中项
        otherSelect:'0', // 分类被选中项
        page:1,// 页码
        classData:[], // 相关课程数据
        typeIndex:0,// 分类索引
        isExtend:[
            {isShow:false},
            {isShow:false},
            {isShow:false}
        ], // 是否展开
        hasData:false,
        loadMore:false,
    }
  },
  created(){
    const _this = this;
    let gradedata = new FormData()
    let subjectdata = new FormData()
    let otherdata = new FormData()
    gradedata.append('type','2')
    gradedata.append('is_all','1')
    subjectdata.append('token',localStorage.getItem('qtoken'))
    subjectdata.append('type','2')
    otherdata.append('token',localStorage.getItem('qtoken'))
    // 初中年级
    this.ajax({
        url: "/course/grade",
        type:'post',
        data:gradedata,
        success(data) {
          _this.gradeChild = data.data;
          for(var i in _this.gradeChild){
              _this.gradeChild[i].class = 'child font14 color333 text-l'
          }
        }
    })
    // 初中学科
    this.ajax({
        url: "/course/subject",
        type:'post',
        data:subjectdata,
        success(data) {
            _this.subjectList = data.data;
            for(var i in _this.subjectList){
              _this.subjectList[i].class = 'child font14 color333 text-l'
            }
        }
    })
    // 课程分类
    this.ajax({
        url: "/course/course-type",
        type:'post',
        data:otherdata,
        success(data) {
            _this.otherList = data.data;
            for(var i in _this.subjectList){
              _this.otherList[i].class = 'child font14 color333 text-l'
            }
        }
    })
    // 获取课程列表
    this.getData()
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
    // 获取课程数据
    getData(){
        const _this = this;
        let data = new FormData();
        data.append('page',this.page)
        data.append('grade',this.gradeChildSelect)
        data.append('subject',this.subjectSelect == '全部' ? '0' : this.subjectSelect)
        data.append('course_type',this.otherSelect)
        data.append('rank','2')
        this.ajax({
            url: "/course/list",
            type:'post',
            data,
            success(data) {
                if(data.data.length == 0){
                    _this.hasData = false
                    return
                }
                if(data.data.length < 10){
                    _this.loadMore = true
                }
                _this.hasData = true
               _this.classData = data.data;
            }
        })
    },
    getClassData(){
        if(this.loadMore){
            return
        }
        this.page++
        const _this = this;
          let data = new FormData();
        data.append('page',this.page)
        data.append('grade',this.gradeChildSelect)
        data.append('subject',this.subjectSelect == '全部' ? '0' : this.subjectSelect)
        data.append('course_type',this.otherSelect)
        data.append('rank','2')
        this.loadMore = true
        this.ajax({
            url: "/course/list",
            type:'post',
            data,
            success(data) {
                if(data.data.length == 0){
                    _this.loadMore = true
                    return
                }
                _this.loadMore = false
                data = data.data;
                data.forEach(item=>{
                    _this.classData.push(item)
                })
            }
        })
    },
    // 展开分类
    unfold(item,index){
        const _this = this
        item.isDown = !item.isDown
        this.typeIndex = index
        this.isExtend[index].isShow = !this.isExtend[index].isShow
        this.resetClass(this.gradeChild,'font14 color333  text-l')
        this.resetClass(this.subjectList,'font14 color333 text-l')
        this.resetClass(this.otherList,'font14 color333 text-l')
        this.gradeChild.forEach(item =>{
            if(item.grade == _this.gradeChildSelect){
                item.class = 'font14 color333 active text-l'
            }
        })
        this.subjectList.forEach(item =>{
            if(item.title == _this.subjectSelect){
                item.class = 'font14 color333 active text-l'
            }
        })
        this.otherList.forEach(item =>{
            if(item.type == _this.otherSelect){
                item.class = 'font14 color333 active text-l'
            }
        })
    },
    // 父分类操作
    gradeSelect(e,item){
        this.gradeParentSelect = item.id
        const target = e.target;
        const parents = document.getElementsByClassName('parent');
        for(var i = 0,l = parents.length; i < l; i++){
            parents[i].className = 'parent font16 color333'
        }
        target.className = 'active parent font16 color333'
    },
    // 子分类操作
    childSelect(e,item,type){
        const target = e.target;
        const childs = document.getElementsByClassName('child');
        this.type = '3';
        if(type === 'grade'){
            this.gradeChildSelect = item.grade
            this.classType[0].name = item.name
        }else if(type === 'subject'){
            this.subjectSelect = item.title
            this.classType[1].name = item.title
        }else{
            this.otherSelect = item.type
            this.classType[2].name = item.name
        }
        for(var i in this.classType){
            this.classType[i].isDown = true
        }
        this.isExtend[this.typeIndex].isShow = false;
        this.page = 1;
        this.getData()
         document.getElementsByTagName('body')[0].style.overflow = 'auto'
    },
    resetClass(item,name){
        for(var i = 0,l = item.length;i < l;i++){
            item[i].class= name
        }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .public-class{
        width:100%;
        background:#f5f5f5;
        padding-top:2.7vw;
        min-height:100%;
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
        .header{
            width:100%;
            height:12vw;
            line-height: 12vw;
            background:#fff;
            border-bottom:1px solid #ddd;
            .class-type{
                position: relative;
                width:33%;
                .type-name{
                   line-height: 12vw;
                }
                i{
                    font-size:6.7vw;
                    color:#999;
                }
            }
            .colorbuy{
                span,i{
                    color:#EB4C49;
                }
            }
            .type-extend{
                    position: absolute;
                    background:#fff;
                    width:100%;
                    height:72vw;
                    overflow: scroll;
                    left:0;
                    top:14.6vw;
                    z-index:888;
                    .grade{
                        width:32vw;
                        background:#f5f5f5;
                        p{
                            height:12vw;
                            line-height: 12vw;
                        }
                        .active{
                            background:#fff;
                            color:#EB4C49;
                        }
                    }
                    .grade-child{
                        flex:1;
                        p{
                            padding:4vw 0;
                        }
                        .text-l{
                            text-align: left;
                            padding-left:9.9vw;
                            font-size:4.3vw;
                        }
                        .active{
                            background:#f5f5f5;
                            color:#EB4C49;
                        }
                    }
            }
        }    
    }
</style>
