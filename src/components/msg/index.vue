<template>
  <div  class="my-msg">   
    <div class="system my-items f-r" @click="toSystemMsg">
        <div class="l f-c-c">
            <div class="avatar">
                <img class="pic-c-c" src="../../assets/icon-xiaoxi.png" data="../../assets/icon-xiaoxi.png"/>
            </div>
            <span v-if="systemData.count && systemData.count != 0" class="total">{{systemData.count >= 99 ? '99+' : systemData.count}}</span>
        </div>
        <div class="r f-c-c" style="flex:1">
            <div class="f-r-sb">
                <p class="tit font16 color333">系统消息</p>
                <p class="font12 color666">{{systemData.create_time}}</p>
            </div>
            <p class="font14 color999 omit1">{{systemData.msg}}</p>
        </div>
    </div>
    <div @click="toTeacher(item)" class="my-items f-r teacher-msg" v-for="(item,index) in data" :key="index"> 
        <div class="l f-c-c">
            <div class="avatar">
                <img class="pic-c-c" :src="item.img_path" :data="item.img_path"/>
            </div>
            <span v-if="item.msg_num  && item.msg_num  != 0"  class="total">{{item.msg_num >= 99 ? '99+' : item.msg_num}}</span>
        </div>
        <div class="r f-c-c"  style="flex:1">
            <div class="f-r-sb">
                <p class="tit font16 color333">{{item.name}}</p>
                <p class="font12 color666">{{item.create_time}}</p>
            </div>
            <p class="font14 color999 omit1">{{item.msg}}</p>
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
        systemData:{},
        page:1,
    }
  },
  created(){
  },
  mounted(){
     Common.InitImg()
    this.getTeacherMsg()

  },
  methods:{
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
                _this.data = data.data
                _this.systemData = data.data2
                if(_this.data.length == 0){
                    document.getElementsByClassName('system')[0].style.border = 0
                }
            }
        }) 
      },
      toSystemMsg(){
          this.$router.push('./system-msg')
      },
      toTeacher(item){
           this.$router.push('./chat/'+item.to)
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
        margin-top:2.7vw; 
        .my-items{
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
            .omit1{
                line-height:4.8vw;
                text-align: left;
            }
        }
        .my-items:last-child{
            border-bottom:0;
        }
    }
</style>
