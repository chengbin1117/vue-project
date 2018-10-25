<template>
  <div  class="exercises">   
    <div class="subject">
        <p class="page">
            <span>{{data.sn}}</span>
            <span>/</span>
            <span>10</span>
        </p>
        <p class="topic font16 color333 t-l">{{data.question}}</p>
        <div class="answer">
            <p v-for="(item,index) in answerlist" :key="index" :class="item.class">
                <span @click="choose(item)">{{item.label}}</span>
                <span>{{item.val}}</span>
            </p>
            <p v-if="istrue && isover" class="success-warning f-r">
                <i class=" iconfont icon-dianzan1 colors"></i>
                <span class="colors">恭喜你，答对了</span>
            </p>
            <p v-if="!istrue && isover" class="error-warning f-r">
                <i class="iconfont icon-nanguo1 colorbuy"></i>
                <span class="colorbuy">答错了，加油哦</span>
            </p>
        </div>
        <div v-if="isover" class="subject-mask"></div>
    </div>
    <div v-if="isover" class="analysis">
        <p class="font14 color333">解析</p>
        <div class="font14 color333 mart10">{{data.analysis_txt}}</div>
    </div>
    <div class="handel mart10 f-c">
        <span @click="next" v-if="isover && !isend" class="red-btn font18 colorfff">下一题</span>
        <span @click="toResult" v-if="isover && isend" class="red-btn font18 colorfff">查看结果</span>
        <span @click="pushmistakes" v-if="isover && !isend" class="font14 color666">移入错题本</span>
    </div>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import { mapState } from "vuex";
// 练习题页面
export default {
  name: 'Exercises',
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
    }
  },
  created(){
    //   this.id = this.$route.course_id != 0 ? this.$route.course_id : null
      this.getData()
      this.token = localStorage.getItem('qtoken')
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
      checkboxOnclick(){
          
      },
      toResult(){
          this.$router.push('/result')
      },
      getData(){
        const _this = this;
        let objectdata = new FormData();
        objectdata.append('catalog_id',this.$route.params.id)
        if(this.id){
            objectdata.append('id',this.id)
        }
        // 获取练习题目
        this.ajax({
            url: "/course/practice",
            type:'post',
            data:objectdata,
            success(data) {
                data = data.data;
                _this.data = data;
                _this.id = data.next_id;
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
            }
        }) 
      },
      // 选择答案
      choose(item){
        const _this = this;
        let answerdata = new FormData();
        answerdata.append('catalog_id','36')
        answerdata.append('id',this.data.id)
        answerdata.append('answer',item.label.toLowerCase())
        answerdata.append('is_last',this.data.is_last)
        answerdata.append('token',this.token)
        if(item.label.toLowerCase() == this.data.answer){
            item.class = 'success'
            this.istrue = true
        }else{
            item.class = 'error'
            for(var i in this.answerlist){
                if(this.answerlist[i].label.toLowerCase() == this.data.answer){
                    this.answerlist[i].class = "success"
                }
            }
            this.istrue = false
        }
        this.isover = true
        this.ajax({
            url: "/user/answer",
            type:'post',
            data:answerdata,
            success(data) {
            }
        })
      },
      // 下一题
      next(){
        this.getData()
      },
      // 加入错题集
      pushmistakes(){
        const _this = this;
        let data = new FormData();
        data.append('catalog_id','36')
        data.append('id',this.data.id)
        data.append('token',this.token)
        // 获取练习题目
        this.ajax({
            url: "/user/error-add",
            type:'post',
            data,
            success(data) {
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
        // height:100%;
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
            }
        }
    }
</style>
