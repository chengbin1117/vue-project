<template>
  <div  class="my-collect">   
    <div class="collect-content">
        <div class="collect-header f-r-sb">
            <div class="collect-tab">
                <span @click="changeTab($event,'1')" class="tabname active">课程</span>
                <span class="line">|</span>
                <span @click="changeTab($event,'2')" class="tabname">老师</span>
            </div>
            <span @click="handelEditor" class="editor">{{editor ? '取消':'编辑'}}</span>
        </div>
        <div :class="['collect-main', editor ? '':'']">
            <class-list   v-if="visible" v-show="tabName==='1'" :editor="editor" :list="classData" :onChange="getClassData" />
            <teacher-list v-if="visible" v-show="tabName==='2'" :editor="editor" :list="classData" :onChange="getClassData"/>
            <div v-else class="no-data f-c">
                <img src="../../assets/img/meiyoushoucang@2x.png" />
                <span class="font14 color999">还没有任何收藏，赶紧去添加吧~</span> 
            </div>
        </div>
    </div>
    <div v-if="editor" class="fooer">
        <span @click="checkAll" class="font18 colorbuy">全选</span>
        <mt-button @click="handelDel" class="font18" type="danger">删除</mt-button>
    </div>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import ClassList from "@/components/common/EditorClassList"
import TeacherList from "@/components/common/EditorTeacherList"
// 收藏页面
export default {
  name: 'MyCollect',
  components:{
      ClassList,TeacherList
  },
  watch:{
      classData(){
          Common.InitImg()
      }
  },
  data () {
    return {
        classData:[], // 相关课程数据
        editor:false, // 是否编辑
        tabName:'1', // 选项卡
        isAll:false,
        visible:true,
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
        // 收藏列表
        let collectdata = new FormData();
        collectdata.append('token',localStorage.getItem('qtoken'))
        collectdata.append('type',this.tabName)
        this.ajax({
            url: "/user/collect-list",
            type:'post',
            data:collectdata,
            success(data) {
                if(data.data.length == 0){
                    _this.visible = false
                }
                _this.visible = true
                data.data.forEach(element =>{
                    element.checked = false
                })
                _this.classData = data.data;
            }
        })
    },
    changeClassData(item){
        this.classData = item
    },
    getClassData(){
        //   this.classData.push( {img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2393687535,4107070201&fm=27&gp=0.jpg',name:'米娜',tit:'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',type:'英语',class:'10节课',classType:"免费",num:'1002'})
    },
    handelEditor(){
        this.editor = !this.editor;
    },
    changeTab(e,item){
        this.tabName = item;
        const tabnames = document.getElementsByClassName('tabname');
        for(var i=0,l=tabnames.length;i<l;i++){
            tabnames[i].className = 'tabname'
        }
        this.editor = false
        this.getData()
        e.target.className = 'tabname active'
    },
    checkAll(){
        const _this = this
        this.classData.forEach(item => {
            item.checked = _this.isAll ? false : true
        })
        _this.isAll = !_this.isAll
    },
    handelDel(){
      const _this = this;
      let data = new FormData();
      data.append('token',localStorage.getItem('qtoken'))
      data.append('type',this.tabName)
      let postData = []
      for(var i in this.classData){
          if(this.classData[i].checked){
              postData.push(this.classData[i].id)
          }
      }
      postData = postData.join(',')
      if(postData == ''){
          alert('请勾选')
          return
      }
      data.append('id',postData)
      this.ajax({
        url: "/user/collect",
        type:'post',
        data,
        success(data) {
            _this.getData()
        }
       })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .my-collect{
        width:100%;
        background:#f5f5f5;
        height:100%; 
        padding-top:2.7vw;
        .collect-content{
            background:#fff;
            .collect-header{
                padding:4vw;
                padding-bottom:0;
                .collect-tab{
                    span{
                        font-size:3.8vw;
                        color:#999;
                    }
                    .active{
                        color:#333;
                    }
                    .line{
                        margin:0 2.7vw;
                    }
                }
                .editor{
                    color:#63aaf5;
                }
            }
            .padb50{
                padding-bottom:13.4vw;
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
        .fooer{
            position: fixed;
            bottom:0;
            width: 100%;
            height:13.4vw;
            background: #fff;
            border-top:1px solid #ccc;
            z-index: 666;
            display: flex;
            span{
                display: inline-block;
                width:50%;
                height:100%;
                line-height: 13.4vw;
                text-align: center;
            }
            button{
                width:50%;
                height:100%;
                border-radius: 0;
                box-sizing: content-box;
                border:0;
                outline: none;
                margin:0;
                padding:0;
                background:#EB4C49;
                color:#fff;
            }
        }
    }
</style>
