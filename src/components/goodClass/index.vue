<template>
  <div  class="good-class">   
        <class-list v-if="hasData" :list="classData" :onChange="getClassData" :loading="loadMore"/> 
        <p style="padding:2.7vw 0;"  v-if="loadMore" class="content-footer color999 font12">这里是底线~</p>
        <div v-else class="no-data f-c">
            <img src="../../assets/img/sousuokongzhuangtai@2x (2).png" />
            <span class="font14 color999">没有相关结果，可以看看其他的哦~</span>
        </div>
 </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import ClassList from "@/components/common/ClassList"

// 好课推荐页面
export default {
  name: 'GoodClass',
  components:{
      ClassList
  },
  watch:{
      classData(){
          Common.InitImg()
      }
  },
  data () {
    return {
        classData:[  
          {img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2393687535,4107070201&fm=27&gp=0.jpg',name:'米娜',tit:'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',type:'英语',class:'10节课',classType:"免费",num:'1002'},
          {img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1425427484,3693134195&fm=26&gp=0.jpg',name:'米娜',tit:'标题标题标题标题标题标题标题标题标题标题',type:'英语',class:'10节课',classType:"免费",num:'1002'},
          {img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1425427484,3693134195&fm=26&gp=0.jpg',name:'米娜',tit:'标题标题标题标题标题标题标题标题标题标题',type:'英语',class:'10节课',classType:"免费",num:'1002'},
          {img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1425427484,3693134195&fm=26&gp=0.jpg',name:'米娜',tit:'标题标题标题标题标题标题标题标题标题标题',type:'英语',class:'10节课',classType:"免费",num:'1002'},
          {img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1425427484,3693134195&fm=26&gp=0.jpg',name:'米娜',tit:'标题标题标题标题标题标题标题标题标题标题',type:'英语',class:'10节课',classType:"免费",num:'1002'},
          {img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1425427484,3693134195&fm=26&gp=0.jpg',name:'米娜',tit:'标题标题标题标题标题标题标题标题标题标题',type:'英语',class:'10节课',classType:"免费",num:'1002'},
        ], // 好课推荐数据
        hasData:false,
        page:1,
        loadMore:false,
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
        let data = new FormData();
        data.append('type','recommend')
        data.append('page',this.page)
        this.ajax({
            url: "/course/index",
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
        data.append('type','recommend')
        data.append('page',this.page)
        this.loadMore = true
        this.ajax({
            url: "/course/index",
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .good-class{
        width:100%;
        background:#f5f5f5;
        padding-top:2.7vw;
        min-height:100%;       
    }
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
</style>
