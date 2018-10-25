<template>
  <div  class="my-msg">   
    <div class="system items f-r" @click="toSystemMsg">
        <div class="l f-c-c">
            <div class="avatar">
                <img class="pic-c-c" src="../../assets/icon-xiaoxi.png" data="../../assets/icon-xiaoxi.png"/>
            </div>
            <span class="total">{{sysTotal >= 99 ? '99+' : sysTotal}}</span>
        </div>
        <div class="r f-c-c">
            <div class="f-r-sb">
                <p class="tit font16 color333">{{systemData.content}}</p>
                <p class="font12 color666">{{systemData.create_time}}</p>
            </div>
            <p class="font14 color999 omit1">通知内容一行显示通知内容一行显示通知内容...</p>
        </div>
    </div>
    <div class="items f-r" v-for="(item,index) in data" :key="index"> 
        <div class="l f-c-c">
            <div class="avatar">
                <img class="pic-c-c" src="../../assets/icon-xiaoxi.png" data="../../assets/icon-xiaoxi.png"/>
            </div>
            <span class="total">{{item.total >= 99 ? '99+' : item.total}}</span>
        </div>
        <div class="r f-c-c">
            <div class="f-r-sb">
                <p class="tit font16 color333">{{item.content}}</p>
                <p class="font12 color666">{{item.create_time}}</p>
            </div>
            <p class="font14 color999 omit1">通知内容一行显示通知内容一行显示通知内容...</p>
        </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import Footer from "@/components/common/Footer";

// 消息页面
export default {
  name: 'Msg',
  components:{
      Footer
  },
  watch:{

  },
  data () {
    return {
        sysTotal:23,
        data:[],
        systemData:[],
        page:1,
    }
  },
  created(){
    this.getData()
    this.getTeacherMsg()
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
      getData(){
        const _this = this
        let data = new FormData()
        data.append('token',localStorage.getItem('qtoken'))
        data.append('page',this.page)
        this.ajax({
            url: "/member/message",
            type:'post',
            data,
            success(data) {
                data = data.data
                _this.systemData = data[0]
            }
        }) 
      },
      getTeacherMsg(){
        //   chat/list
        const _this = this;
        let data = new FormData()
        data.append('token',localStorage.getItem('qtoken'))
        data.append('role','U')
        this.ajax({
            url: "/chat/list",
            type:'post',
            data,
            success(data) {
                data = data.data
                _this.data = data
            }
        }) 
      },
      toSystemMsg(){
          this.$router.push('./system-msg')
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    body{
        background:#f5f5f5;
    }
</style>
<style scoped lang="less">
    .my-msg{
        width:100%;
        background:#fff;
        padding:0 2.7vw;        
        .items{
            width:100%;
            height:24vw;
            background:#fff;
            border-bottom:1px solid #ccc;
            .l{
                position: relative;
                margin-right:4vw;
                .avatar{
                    position: relative;
                    width:10.7vw;
                    height:10.7vw;
                    border-radius: 50%;
                    overflow: hidden;
                }
                .total{
                    background:#eb4c49;
                    color:#fff;
                    position: absolute;
                    left: 7vw;
                    top: 5vw;
                    min-width: 3.8vw;
                    max-width:8vw;
                    height: 3.8vw;
                    line-height: 3.8vw;
                    border-radius: 1.9vw;
                    padding:0 1vw;
                    font-size: 3.2vw;
                    text-align: center;
                }
            }
            .r{
                .tit{
                    margin-bottom:3.8vw;
                }
            }
        }
        .items:last-child{
            border-bottom:0;
        }
    }
</style>
