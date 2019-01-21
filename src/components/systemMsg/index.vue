<template>
  <div  class="system-msg">   
    <div class="items f-r" v-for="(item,index) in data" :key="index" > 
        <div class="l">
            <div class="avatar">
                <img v-if="item.send_type==10" class="pic-c-c" src="../../assets/icon-xiaoxi.png" data="../../assets/icon-xiaoxi.png"/>
                <img v-if="item.send_type==20" class="pic-c-c" src="../../assets/img/xiaoxi.png" data="../../assets/img/xiaoxi.png"/>
                <img v-if="item.send_type==30" class="pic-c-c" src="../../assets/img/moren@2x.png" data="../../assets/img/moren@2x.png"/>
            </div>
        </div>
        <div class="r f-c-c" style="flex:1">
            <div class="hd f-r-sb">
                <p v-if="item.send_type==10" class="tit font16 color333">系统消息</p>
                <p v-if="item.send_type==20" class="tit font16 color333">课程消息</p>
                <p v-else class="tit font16 color333">{{item.real_name}}</p>
                <p class="font12 color666">{{item.create_time}}</p>
            </div>
            <p class="font14 color999 t-l">{{item.content}}</p>
        </div>
    </div>
    <!-- <Footer /> -->
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import Footer from "@/components/common/Footer";

// 系统消息页面
export default {
  name: 'SystemMsg',
  components:{
      Footer
  },
  watch:{

  },
  data () {
    return {
        sysTotal:23,
        data:[
            {total:1},
            {total:23},
            {total:123},
        ],
        systemData:{},
        page:1
    }
  },
  created(){
  },
  mounted(){
     Common.InitImg()
    this.getData()

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
                // _this.systemData = data[0]
                _this.data = data
            }
        }) 
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
    .system-msg{
        width:100%;
        background:#fff;
        padding:0 2.7vw;     
        margin-top:2.7vw;   
        .items{
            width:100%;
            // height:24vw;
            background:#fff;
            border-bottom:1px solid #ccc;
            padding:4.3vw 0;
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
                .hd{
                    margin-top:4vw;
                }
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
