<template>
  <div  class="exercises">   
    <div class="subject">
        <p class="page">
            <span>{{data.sn}}</span>
            <span>/</span>
            <span>10</span>
        </p>
        <p class="topic font16 color333 t-l">{{data.question}}？（）</p>
        <div class="answer">
            <p v-for="(item,index) in answerlist" :key="index" :class="item.class">
                <span>{{item.label}}</span>
                <span>{{item.val}}</span>
            </p>
        </div>
        <div  class="subject-mask"></div>
    </div>
    <div class="analysis">
        <p class="font14 color333">解析</p>
        <div class="font14 color333 mart10">{{data.analysis_txt}}</div>
    </div>
    <div class="handel mart10 f-c">
        <div class="f-r">
            <span @click="last" v-if="sn != 1" class="half-btn last-btn font18 colorfff">上一题</span>
            <span @click="next" v-if="!isend" :class="[sn ==1 ? '' : 'half-btn','red-btn','font18','colorfff']">下一题</span>
            <span @click="toMyMistakes" v-if="isend" class="half-btn red-btn font18 colorfff">返回错题本</span>
        </div>
        <!-- <span @click="next" v-if="isover && !isend" class="red-btn font18 colorfff">下一题</span> -->
        <span @click="pushmistakes"  class="font14 color666">移出错题本</span>
    </div>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import { mapState } from "vuex";
// 错题页面
export default {
  name: 'Mistakes',
  components:{
  },
  watch:{

  },
  computed:{
    // ...mapState(['token']),
  },
  data () {
    return {
        data:{}, // 题目数据
        answerlist:[
            {label:'A',val:'a',class:''},
            {label:'B',val:'a',class:''},
            {label:'C',val:'a',class:''},
            {label:'D',val:'a',class:''}
        ], // 答案列表
        id:null, // 题目id
        istrue:false, // 是否答对
        isover:false, // 答题结束
        isend:false, // 是否为最后一题
        last_id:'',
        sn:'',
        catalog_id:''
    }
  },
  created(){
      this.id = this.$route.params.id
      this.catalog_id = this.$route.params.catalog_id
      console.log('id',this.id)
      this.getData()
      this.token = localStorage.getItem('qtoken')
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
      toMyMistakes(){
          this.$router.push('/my-mistakes')
      },
      getData(){
        const _this = this;
        let objectdata = new FormData();
        objectdata.append('catalog_id',this.catalog_id)
        objectdata.append('is_error','1')
        objectdata.append('id',this.id)
        // 获取练习题目
        this.ajax({
            url: "/course/practice",
            type:'post',
            data:objectdata,
            success(data) {
                data = data.data;
                _this.data = data;
                _this.id = data.next_id;
                _this.sn = data.sn;
                _this.last_id = data.last_id
                _this.answerlist[0].val = data.a
                _this.answerlist[1].val = data.b
                _this.answerlist[2].val = data.c
                _this.answerlist[3].val = data.d
                // 初始化状态
                _this.istrue = false
                _this.isover = false
                _this.isend = data.is_last == 1 ? true : false
                for(var i in _this.answerlist){
                    _this.answerlist[i].class = ''
                }
                for(var i in _this.answerlist){
                    if(_this.answerlist[i].label.toLowerCase() == _this.data.answer){
                        _this.answerlist[i].class = "success"
                    }
                    if(_this.answerlist[i].label.toLowerCase() == _this.data.answer_my && _this.data.answer_my != _this.data.answer){
                         _this.answerlist[i].class = "error"
                    }
                }
            }
        }) 
      },
      // 下一题
      next(){
        this.getData()
      },
      // 上一题
      last(){
          this.id = this.last_id;
          this.getData()
          console.log('last',this.last_id)
          console.log('id',this.id)
      },
      // 移除错题集
      pushmistakes(){
        const _this = this;
        let data = new FormData();
        data.append('catalog_id',this.catalog_id)
        data.append('is_del',1)
        data.append('id',this.data.id)
        data.append('token',this.token)
        // 获取练习题目
        this.ajax({
            url: "/user/error-add",
            type:'post',
            data,
            success(data) {
                if(data.code == 0){
                    _this.toMyMistakes()
                }
            }
        })    
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .exercises{
        width:100%;
        background:#f5f5f5;
        height:100%;
        padding:2.7vw;
        .subject{
            position: relative;
            background:#fff;
            border-radius: 1.6vw;
            padding:0 8vw;
            padding-bottom:13.4vw;
            .subject-mask{
                width:100%;
                height:100%;
                position: absolute;
                background:transparent;
                top:0;
                left:0;
                z-index:600;
            }
            .page{
                position: absolute;
                right:2.7vw;
                top:2.7vw;
                color:#999;
                span{
                    font-size:3.2vw;
                }
                span:nth-child(1){
                    font-size:4.3vw;
                }
            }
            .topic{
                padding:8vw 0;
                line-height: 6.4vw;
            }
            .answer{  
                p{
                    text-align: left;
                    margin-bottom:5.4vw;
                    span{
                        font-size:4.3vw;
                    }
                    span:nth-child(1){
                        display: inline-block;
                        width:8.6vw;
                        height:8.6vw;
                        line-height: 8.6vw;
                        text-align: center;
                        border-radius: 50%;
                        color:#333;
                        border:1px solid #333;
                        margin-right:5.4vw;
                    }
                }
                .success{
                    span:nth-child(1){
                        background:#41B5A3;
                        color:#fff;
                        border-color: #41B5A3;
                    }
                    span:nth-child(2){
                        color:#41B5A3;
                    }  
                }
                .error{
                    span:nth-child(1){
                        background:#EB4C49;
                        color:#fff;
                        border-color:#EB4C49;
                    }
                    span:nth-child(2){
                        color:#EB4C49;
                    }  
                }
                .success-warning,.error-warning{
                    position: absolute;
                    bottom:2.7vw;
                    right:2.7vw;
                    margin-bottom:0;
                    i{
                        font-size:5.4vw;
                        margin-right:5px;
                    }
                    span{
                        font-size:3.8vw;
                        margin-top:0.8vw;
                    }
                }

            }
        }
        .analysis{
            padding:4.6vw 2.7vw;
            padding-bottom:26.7vw;
            background:#fff;
            margin-top:2.7vw;
            border-radius: 1.6vw;
            text-align: left;
        }
        .handel{
            width:100%;
            span{
                display: block;
                width:86.7vw;
                height:11.8vw;
                line-height: 11.8vw;
                margin:0 auto;
                text-align: center;
            }
            .red-btn{
                border-radius: 5.9vw;
                background:#EB4C49;
                border:1px solid #eb4c49;
            }
            .last-btn{
                background:transparent;
                color:#EB4C49;
                border:1px solid #eb4c49;
                border-radius: 5.9vw;
            }
            .half-btn{
                width:48%;
            }
        }
    }
</style>
