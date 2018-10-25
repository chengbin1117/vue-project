<template>
  <div class="search">
    <header>
        <div class="l f-r">
            <div class="select" @click="showSelect">
                <span class="font14 color333">{{searchSelect}}</span>
                <span class="down"></span>
                <div v-if="selectVisible" class="search-type">
                    <p @click="onSelect($event,item)" :class="item.class" v-for="(item,index) in searchType" :key="index">{{item.name}}</p>
                </div>
            </div>
            <span class="line"></span>
            <div class="s-input f-r">
                <i class="iconfont icon-sousuo font18 color999 marr10"></i>
                <input v-model="searchVal" autofocus="true" class="font14 color333" placeholder="请输入搜索内容" />
                <i @click="clear" v-if="searchVal" class="iconfont icon-shanchu1 font15 color999 marr10"></i>
            </div>
        </div>
        <span class="r font14 color333 marl10" @click="onSearch">搜索</span>
    </header>
    <div v-if="hasData" class="content" >
        <search-init v-if="initVisible" :history="searchData" :reset="resetHistory" :getData="getData"/>
        <!-- 相关课程 -->
        <div v-if="searchId==='1' && !initVisible" class="list-content">
            <p class="font16 color333 t-l">相关课程</p>
            <class-list :list="listResult" :onChange="getClassData"/>
        </div>
        <!-- 相关课程 -->
        <!-- 相关老师 -->
         <div v-if="searchId==='2'" class="list-content">
            <p class="font16 color333 t-l">相关老师</p>
            <teacher-list :list="listResult" :onChange="getClassData"/>
         </div>
        <!-- 相关老师 -->
        <!-- 相关书籍 -->
        <div v-if="searchId==='3'" class="list-content">
            <p class="font16 color333 t-l">相关书籍</p>
            <book-list :list="listResult" :onChange="getClassData"/>
         </div>
        <!-- 相关书籍 -->
        <!-- 无数据页面 -->
        <div v-if="searchId==='4'">
            <not-found content='共搜到0个课程' />
        </div>
        <!-- 无数据页面 -->
        <!-- <mt-spinner type="fading-circle"></mt-spinner> -->
    </div>
    <div v-else class="no-data f-c-c">
        <img src="../../assets/img/sousuokongzhuangtai@2x (2).png"/>
        <span class="font14 color999">共搜到0个课程</span>
    </div>
  </div>
</template>
<script>
import SearchInit from "@/components/search/init"
import ClassList from "@/components/common/ClassList"
import TeacherList from "@/components/common/TeacherList"
import BookList from "@/components/common/BookList"
import NotFound from "@/components/common/NotFound"
import Common from '@/assets/js/common.js'

// 搜索页
export default {
  name: 'Search',
  components:{
      SearchInit, ClassList, TeacherList, BookList, NotFound
  },
  watch:{
      listResult(){
          Common.InitImg()
      }
  },
  data () {
    return {
        data:null,
        searchVal:'', // 搜索内容
        searchData:[], // 搜索历史
        searchType:[
            {name:'课程',id:'1',class:'font14 color333 active'},
            {name:'老师',id:'2',class:'font14 color333'},
            {name:'书籍',id:'3',class:'font14 color333'}
        ], // 筛选类型
        searchSelect:'课程', // 选中类型
        searchId:'1', // 选中类型
        selectVisible:false,
        listResult:[],// 搜索结果数据
        initVisible:true, // 初始化
        page:1,
        hasData:true
    }
  },
  mounted(){
     if(JSON.parse(localStorage.getItem('searchList'))){
         this.searchData = JSON.parse(localStorage.getItem('searchList'))
     }
      Common.InitImg()
  },
  methods:{
      getData(val){
        const _this = this;
        let data = new FormData();
        data.append('page',this.page)
        data.append('keyword',val)
        if(this.searchId == '1'){
            this.ajax({
                url: "/course/list",
                type:'post',
                data,
                success(data) {
                    if(data.data.length!=0){
                        _this.listResult = data.data;
                        _this.hasData = true
                    }else{
                        _this.hasData = false
                    }
                    
                }
            }) 
        }else if(this.searchId == '2'){
            this.ajax({
                url: "/teacher/list",
                type:'post',
                data,
                success(data) {
                    _this.listResult = data.data;
                }
            }) 
        }else if(this.searchId == '3'){
            this.ajax({
                url: "/course/list",
                type:'post',
                data,
                success(data) {
                    _this.listResult = data.data;
                }
            }) 
        }
  
      },
      onSearch(){
          if(this.searchVal == ''){
              return
          }
          this.initVisible = false
          let searchlist = JSON.parse(localStorage.getItem('searchList'))
          if(searchlist){
            searchlist.push(this.searchVal)
            this.searchData = searchlist;
          }else{
            this.searchData.push(this.searchVal)
          }
          localStorage.setItem('searchList',JSON.stringify(this.searchData))
          this.getData(this.searchVal)
      },
      clear(){
          this.searchVal = '';
      },
      resetHistory(){
          this.searchData = []
      },
      showSelect(){
          this.selectVisible = true;
      },
      onSelect(e,item){
          const _this = this;
          e = e || window.event;
          e.stopPropagation();
          for(var i in this.searchType){
              this.searchType[i].class = 'font14 color333'
          }
          item.class = 'font14 color333 active'
          this.selectVisible = false;
          this.searchSelect = item.name;
          this.searchId = item.id;
          this.initVisible = false
          this.getData(this.searchVal)
      },
      getClassData(){
        //   this.listResult.push( {img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2393687535,4107070201&fm=27&gp=0.jpg',name:'米娜',tit:'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',type:'英语',class:'10节课',classType:"免费",num:'1002'})
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .search{
        width:100%;
        min-height:100%;
        background:#fff;
        header{
            padding:2.7vw 5.4vw;
            background:#f5f5f5;
            display: flex;
            flex-direction: row;
            .l{
                width:77.4vw;
                height:9.1vw;
                line-height: 9.1vw;
                background:#e6e6e6;
                border-radius: 4.6vw;
                .select{
                    position: relative;
                    padding: 0 2.2vw;
                    .search-type{
                        position: absolute;
                        width:14.4vw;
                        padding:3.8vw 0;
                        background:#e6e6e6;
                        left:0;
                        top:10vw;
                        z-index:888;
                        p:nth-child(2){
                            margin:5.9vw 0;
                        }
                        .active{
                            color:#EB4C49;
                        }
                    }
                    .font14{
                        padding-right:1.6vw;
                    }
                    .down{
                        position: absolute;
                        top:0;
                        right:0;
                        bottom:0;
                        margin:auto;
                        width: 0;
                        height: 0;
                        // margin-right:2.2vw;
                        border-left: 4px solid transparent;  
                        border-right: 4px solid transparent;
                        border-top: 8px solid #999;
                    }
                }
                .line{
                    display: inline-block;
                    height:5.4vw;
                    width:1px;
                    background:#ccc;
                    margin:1.85vw 2.7vw 0 2.2vw;
                }
                .s-input{
                    input{
                        background:transparent;
                        outline: none;
                        border:0;
                    }
                    input::placeholder{
                        color:#999;
                    }
                }
            }
            .r{
                line-height: 8.8vw;
            }
        }
        .content{
            padding:0 2.7vw;
            padding-top:3.2vw;
            .list-content{
                p{
                    margin-left:2.7vw;
                }
            }
        }
        .no-data{
            img{
                margin:0 auto;
                width:37.4vw;
                margin-top:34.7vw;
                margin-bottom:6vw;
            }
        }
    }
</style>
