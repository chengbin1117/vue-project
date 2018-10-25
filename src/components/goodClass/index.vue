<template>
  <div  class="good-class">   
        <class-list v-if="hasData" :list="classData" :onChange="getClassData"/> 
        <div v-else class="no-data f-c">
            <img src="../../assets/img/sousuokongzhuangtai@2x (2).png" />
            <span class="font14 color999">没有相关结果，可以看看其他的哦~</span>
            <div v-if="isExtend[typeIndex].isShow" class="mask"></div>
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
        classData:[  
          {img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2393687535,4107070201&fm=27&gp=0.jpg',name:'米娜',tit:'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',type:'英语',class:'10节课',classType:"免费",num:'1002'},
          {img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1425427484,3693134195&fm=26&gp=0.jpg',name:'米娜',tit:'标题标题标题标题标题标题标题标题标题标题',type:'英语',class:'10节课',classType:"免费",num:'1002'},
          {img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1425427484,3693134195&fm=26&gp=0.jpg',name:'米娜',tit:'标题标题标题标题标题标题标题标题标题标题',type:'英语',class:'10节课',classType:"免费",num:'1002'},
          {img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1425427484,3693134195&fm=26&gp=0.jpg',name:'米娜',tit:'标题标题标题标题标题标题标题标题标题标题',type:'英语',class:'10节课',classType:"免费",num:'1002'},
          {img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1425427484,3693134195&fm=26&gp=0.jpg',name:'米娜',tit:'标题标题标题标题标题标题标题标题标题标题',type:'英语',class:'10节课',classType:"免费",num:'1002'},
          {img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1425427484,3693134195&fm=26&gp=0.jpg',name:'米娜',tit:'标题标题标题标题标题标题标题标题标题标题',type:'英语',class:'10节课',classType:"免费",num:'1002'},
        ], // 好课推荐数据
        hasData:false,
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
        this.ajax({
            url: "/course/index",
            type:'post',
            data,
            success(data) {
                if(data.data.length == 0){
                    _this.hasData = false
                    return
                }
                _this.hasData = true
               _this.classData = data.data;
            }
        })
    },
    getClassData(){
          this.classData.push( {img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2393687535,4107070201&fm=27&gp=0.jpg',name:'米娜',tit:'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',type:'英语',class:'10节课',classType:"免费",num:'1002'})
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .goods-class{
        width:100%;
        background:#f5f5f5;
        padding-top:2.7vw;
        height:100%;       
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
