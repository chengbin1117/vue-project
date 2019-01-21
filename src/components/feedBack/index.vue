<template>
  <div  class="feed-back">   
    <div class="type">
        <mt-radio
        v-model="value"
        align="left"
        :options="options">
        </mt-radio>
    </div>
    <textarea class="desc" rows="5" cols="5" v-model="desc" placeholder="请输入反馈内容"></textarea>
    <mt-button @click="submit" :disabled="disabled" class="btn-submit">提交</mt-button>
    <msg-box v-if="msgVisible" :content="msg"/>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import MsgBox from '@/components/common/MsgBox'

// 问题反馈页面
export default {
  name: 'FeedBack',
  components:{
      MsgBox
  },
  watch:{
      desc(newVal,oldVal){
          if(this.desc!=''){
              this.disabled = false
          }else{
              this.disabled = true
          }
      }
  },
  data () {
    return {
        options:[
            {
                label: '课程',
                value: '10',
            },
            {
                label: '商品',
                value: '20'
            },
            {
                label: '平台',
                value: '30'
            },
            {
                label: '其他',
                value: '40'
            }
        ],
        value:'10',
        desc:'',
        disabled:true,
        msgVisible:false,
        msg:''
    }
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
    submit(){
        const _this = this
        let data = new FormData();
        data.append('token',localStorage.getItem('qtoken'))
        data.append('type',this.value)
        data.append('content',this.desc)
        this.ajax({
            url: "/member/feedback",
            type:'post',
            data,
            success(data) {
                _this.msgVisible = true
                _this.msg = data.msg
                setTimeout(function(){
                    _this.msgVisible = false
                },1000)
            }
        }) 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .feed-back{
        width:100%;
        background:#f5f5f5;
        height:100%;
        padding:2.7vw;
        .type{
            height:12vw;
            line-height: 12vw;
            background:#fff;
            border-radius: 1.6vw;
            overflow: hidden;
        }
        .desc{
            margin-top: 2.7vw;
            width: 100%;
            background: #fff;
            height: 50.7vw;
            border-radius: 1.6vw;
            border: 0;
            outline: none;
            padding:4vw 2.7vw;
        }
        .btn-submit{
            margin-top:30vw;
        }
        input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
            color: #999;
            font-size:3.8vw;
        }
    }
</style>
<style lang="less">
    .feed-back{
        .type{
            .mint-radiolist-title{
                display: none;
            }
            .mint-cell-wrapper{
                padding:0;
            }
            .mint-cell{
                display: inline-block;
            }
            .mint-radio-input:checked + .mint-radio-core{
                background-color:#EB4C49;
                border-color:#EB4C49;
            }
        }
    }
</style>

