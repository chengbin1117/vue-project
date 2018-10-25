<template>
  <div  class="result">   
      <div class="level f-c-c">
          <p class="font16 color333">本次星级</p>
          <div class="start">
              <i v-for="(item,index) in start" :key="index" :class="[item.class,item.isred ? 'active' : '']"></i>
          </div>
          <p v-if="true" class="warning font14 color333">恭喜首次答题完成获得{{result.integral}}积分</p>
          <p v-else class="warning font14 color333">很棒哦，继续加油~</p>
          <div class="info f-r-c">
              <p>
                  <span>总题数</span>
                  <span>{{result.num_all}}</span>
              </p>
              <p>
                  <span>答对</span>
                  <span>{{result.num_right}}</span>
              </p>
              <p>
                  <span>答错</span>
                  <span>{{result.num_error}}</span>
              </p>
          </div>
      </div>
      <div class="quality">
          <div class="f-r">
              <p class="tit">
                  <span>正确</span>
                  <span class="dot colors"></span>
              </p>
              <p class="tit">
                  <span>错误</span>
                  <span class="dot colorbuy"></span>
              </p>
          </div>
          <div class="order">
              <span :class="item.result === '0' ? 'error' : ''" v-for="(item,index) in data" :key="index">{{item.num}}</span>
          </div>
          <p class="warning font12 color999">注：每套练习题根据首次练习成绩获得相应积分，之后的重复练习成绩不得积分。</p>
      </div>
      <div class="handel">
          <router-link to="exercises">再刷一遍</router-link>
          <router-link to="/">返回课程</router-link>
      </div>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'

// 练习题结果页面
export default {
  name: 'Result',
  components:{
  },
  watch:{

  },
  data () {
    return {
        start:[
            {class:'iconfont icon-xing',isred:false},
            {class:'iconfont icon-xing',isred:false},
            {class:'iconfont icon-xing',isred:false}
        ],
        data:[],
        result:{},// 答题结果
        token:null,
    }
  },
  created(){
        const _this = this;
        this.token = localStorage.getItem('qtoken')
        let answerdata = new FormData();
        answerdata.append('catalog_id','36')
        answerdata.append('token',this.token)
        this.ajax({
            url: "/user/answer-result",
            type:'post',
            data:answerdata,
            success(data) {
                _this.result = data.data
                _this.data = data.data.result
                _this.start.forEach((item,index) => {
                    if(index < data.data.star){
                        item.isred = true
                    }else{
                        item.isred = false
                    }
                })
            }
        })
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .result{
        width:100%;
        background:#f5f5f5;
        height:100%;
        padding:2.7vw;
        .level{
            background:#fff;
            height:59.5vw;
            border-radius: 1.6vw;
            .start{
                margin-top:6.2vw;
                margin-bottom:7.2vw;
                i{
                    color:#ccc;
                    font-size:11.2vw;
                }
                i:nth-child(2){
                    margin:0 9.4vw;
                }
                .active{
                    color:#EB4C49;
                }
            }
            .warning{
                margin-bottom:8vw;
            }
            .info{
                p{
                    span{
                        font-size:3.8vw;
                        color:#333;
                    }
                    span:nth-child(1){
                        margin-right:2.7vw;
                    }
                }
                p:nth-child(2){
                    margin:0 14.7vw;
                }
            }
        }
        .quality{
            background:#fff;
            height:71.2vw;
            padding:2.7vw;
            border-radius: 1.6vw;
            margin-top:2.7vw; 
            .tit{
                text-align: left;
                font-size:3.8vw;
                color:#333;
                display: flex;
                margin-right:8vw;
                .dot{
                    display: inline-block;
                    width:3.8vw;
                    height:3.8vw;
                    border-radius: 50%;
                    margin-top:0.8vw;
                    margin-left:2.7vw;
                }
                .colors{
                    background:#41B5A3;
                }
                .colorbuy{
                    background:#EB4C49;
                }
            }
            .order{
                margin-top:8vw;
                span{
                    display: inline-block;
                    width:11.2vw;
                    height:11.2vw;
                    line-height: 11.2vw;
                    text-align: center;
                    border-radius: 50%;
                    border:1px solid #41B5A3;
                    color:#41B5A3;
                    margin-right:4.6vw;
                    margin-bottom:5.4vw;
                    font-size:4.3vw;
                }
                span:nth-child(5),span:last-child{
                    margin-right:0;
                }
                .error{
                    border-color:#EB4C49;
                    color:#EB4C49;
                }
            }
            .warning{
                line-height: 4.8vw;
                width:68vw;
                margin:0 auto;
            }
        }
        .handel{
            margin-top:5.4vw;
            a{
                display: inline-block;
                border-radius: 5.9vw;
                border:1px solid #EB4C49;
                color:#EB4C49;
                width:37.4vw;
                height:11.8vw;
                line-height: 11.8vw;
                text-align: center;
                font-size:4.8vw;
            }
            a:nth-child(2){
                margin-left:6.7vw;
                background:#EB4C49;
                color:#fff;
            }
        }
    }
</style>
