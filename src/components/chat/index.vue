<template>
  <div  class="chat">   
    <div class="chat-content">
        <mt-loadmore :top-method="loadTop"  :top-all-loaded="allLoaded" ref="loadmore">
            <div v-for="(item,index) in data" :key="index" class="chat-items">
                <div :class="['item','f-r','t-l',item.type == 1 ? '' : 'item-r']">
                    <div class="avatar">
                        <img class="pic-c-c" :src="item.avatar" :data="item.img_path"/>
                    </div>
                    <div  v-if="item.msg_type =='text'" class="content">{{item.msg}}</div>
                    <div  v-if="item.msg_type=='audio'" class="audio-play f-c-c" @click="play(item,index)">
                        <audio :id="'audioPlay'+index" controls preload="auto" controlsList="nodownload">
                            <source :src="item.src">
                        </audio> 
                        <i v-if="!item.playing && item.type != 1" class="iconfont icon-fankui"></i>
                        <i v-if="!item.playing && item.type == 1" class="iconfont icon-fankui-copy"></i>
                        <img v-if="item.playing && item.type != 1"  class="playing" src="../../assets/img/audio2.gif"/>
                        <img v-if="item.playing && item.type == 1" class="playing blackplaying" src="../../assets/img/audio1.gif"/>
                        <!-- v-if="item.playing && item.type == 1" -->
                    </div>
                    <img v-if="item.msg_type == 'image'" :src="item.image"/>
                </div>
            </div>
        </mt-loadmore>
    </div>
    <div class="chat-footer f-r-sb">
        <div class="f-c-c">
             <i class="iconfont icon-yuyin2"></i>
        </div>
        <div class="text f-c-c">
            <textarea autofocus=true  v-model="value" rows=1 cols=40 onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';},200);" onblur="clearInterval(this.clock);"></textarea>
        </div>
        <div  class="f-c-c">
            <i class="iconfont icon-icon02"></i>
        </div>
        <mt-button @click="sendMsg" class="send-btn" :disabled="value == ''" type="danger" size="small">发送</mt-button>
    </div>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'

// 聊天页面
export default {
  name: 'Chat',
  components:{
  },
  watch:{
      currentTime(){
          console.log('this.currentTime ',this.currentTime )
        if(this.currentTime == this.duration){
            this.data[index].playing = false
        }
      }
  },
  data () {
    return {
        data:[],
        value:'',
        duration:'',
        timer:null,
        page:1,
        to:'1',
        postdata:null,
        ws:null,
        allLoaded:false
    }
  },
  created(){
      this.getData(this.srcoll)

  },
  mounted(){
     Common.InitImg()
         const _this = this
         
    if ("WebSocket" in window){
        this.ws = new WebSocket("ws://112.74.193.145:11212");
        this.ws.onopen = function(){
            var msg = "login";
            var send = {};
            send['role'] = 'U';
            send['from'] = '28';
            send['to'] = 8;
            send['msg_type'] = 'text';
            send['msg_content'] = msg;
            send['event'] = 'userLogin';
            _this.ws.send(JSON.stringify( send ));
        }
        this.ws.onmessage = function (e) { 
            _this.postdata = JSON.parse(e.data)
            console.log('postdata',_this.postdata)
        }
        // ws.onclose = function(){ 
        // }
    }
  },
  methods:{
      loadTop() {
        if(this.allLoaded){
              this.$refs.loadmore.onTopLoaded();
            return
        }
        const _this = this
        this.$refs.loadmore.onTopLoaded();
        this.page += 1;
        let data = new FormData();
        data.append('token',localStorage.getItem('qtoken'))
        data.append('page',this.page)
        data.append('to',8)
        this.ajax({
            url: "/chat/detail",
            type:'post',
            data,
            success(data) {
                if(data.code == 0){
                    data =data.data
                    if(data.length == 0){
                        _this.allLoaded = true;
                        return
                    }
                    data.forEach(item=>{
                        item.type = item.from == localStorage.getItem('qid') ? '2' : '1'
                        _this.data.unshift(item)
                    })
                }
            }
        }) 
      },
      loadBottom() {
        this.$refs.loadmore.onBottomLoaded();
        alert('向下')
      },
      srcoll(){
        setTimeout(function(){
            const container = document.getElementsByClassName('chat')[0]
            document.body.scrollTop = document.documentElement.scrollTop = container.clientHeight;
        },1)
      },
      getData(fn){
        const _this = this
        let data = new FormData();
        data.append('token',localStorage.getItem('qtoken'))
        data.append('page',this.page)
        data.append('to',8)
        data.append('role','U')
        this.ajax({
            url: "/chat/detail",
            type:'post',
            data,
            success(data) {
                if(data.code == 0){
                    data = data.data.reverse()
                    data.forEach(item=>{
                        item.type = item.from == localStorage.getItem('qid') ? '2' : '1'
                    })
                    _this.data = data
                    fn()
                }
            }
        })  
      },
      sendMsg(){
            const _this = this;
            var send = {};
            send['role'] = 'U';
            send['from'] = '28';
            send['to'] = '8';
            send['msg_type'] = 'text';
            send['msg_content'] = this.value;
            send['event'] = 'sendMsg';
            _this.ws.send(JSON.stringify( send ));
            // if(this.postdata.code == 0){
                this.data.push(
                    {from: "28",
                    img_path: "http://qsjq.demo.sclonsee.com/storage/image/http://qsjq.demo.sclonsee.com/storage/image/1",
                    is_read: "1",
                    msg: this.value,
                    msg_type: "text",
                    name: "cb"})
            // }
            this.value = ''
            this.srcoll()
      },
      postData(){
         let data = new FormData();
        data.append('role','U')
        data.append('from','26')
        data.append('to','28')
        data.append('msg_type','text')
        data.append('msg_content','123123qwe')
        data.append('event','sendMsg')
        // ws://112.74.193.145:11212
        // this.ajax({
        //     url: "/chat/detail",
        //     type:'post',
        //     data,
        //     success(data) {
        //         if(data.code == 0){
        //         }
        //     }
        // })           
      },
      play(item,index){
        clearTimeout(this.timer)
        const target = document.getElementById("audioPlay" + index);
        const audios = document.getElementsByTagName('audio')
        for(var i=0,l=audios.length; i<l;i++){
            audios[i].pause()
        }
        if(item.playing){
            item.playing = false;
            target.pause()
            target.currentTime = 0;
            return
        }
        for(var i in this.data){
            this.data[i].playing = false
        }
        const duration = target.duration * 1000;
        item.playing = true;
        target.currentTime = 0;
        target.play();
        this.timer = setTimeout(function(){
            item.playing = false;
        },duration)
       
        
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#app,body{
    height:auto
}
</style>

<style scoped lang="less">
    .chat{
        width:100%;
        background:#f5f5f5;
        min-height:100%;
        padding:5.4vw 2.7vw;
        padding-bottom:13.4vw;
        .avatar{
            position: relative;
            width:10.7vw;
            height:10.7vw;
            overflow: hidden;
            border-radius: 50%;
        }
        .item{
            margin-bottom:5.4vw;
            .content,.audio-play{
                width:64vw;
                border-radius: 4vw;
                background:#fff;
                color:#333;
                background:#fff;
                border-top-left-radius: 0;
                padding:2.7vw 4vw;
                margin-top:2.7vw;
                margin-left:2.7vw;
                font-size:3.8vw;
            }
        }
        .item-r{
            flex-direction: row-reverse;
            .content,.audio-play{
                border-radius: 4vw;
                border-top-right-radius: 0;
                background:#eb4c49;
                color:#fff;
                margin-left:0;
                margin-right:2.7vw;
            }
        }
        .audio-play{
            position: relative;
            height:11.8vw;
            audio{
                position: absolute;
                top:0;
                left:0;
                width:100%;
                height:100%;
                z-index:-1;
                opacity: 0;
            }
            i{
                position: absolute;
                height:6.4vw;
                right:2.7vw;
                top:0;
                bottom:0;
                margin:auto;
                font-size:4.8vw;
            }
            .icon-fankui-copy{
                left:2.7vw;
            }
            img{
                display: inline-block;
                width: 4.3vw;
                position: absolute;
                right: 2.7vw;
                top: 3vw;
            }
            .blackplaying{
                left:2.7vw;
            }
        }
        .chat-footer{
            position: fixed;
            bottom:0;
            left:0;
            width:100%;
            max-height:20.4vw;
            line-height: 13.4vw;
            background:#fff;
            padding:0 2.7vw;
            textarea{
                width:62vw;
                min-height:9.6vw;
                border:1px solid #ccc;
                outline: none;
                overflow:scroll;
                overflow-x:hidden;
            }
            i{
                font-size:6.7vw;
                color:#666;
            }
            .send-btn{
                width:12vw;
                height:7vw;
                font-size:4vw;
                padding:0;
                margin-top:3.5vw;
            }
        }
    }
</style>
