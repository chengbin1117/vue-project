<template>
  <div  class="chat">   
    <div class="chat-content">
        <mt-loadmore :top-method="loadTop"  :top-all-loaded="allLoaded" ref="loadmore">
            <div v-for="(item,index) in data" :key="index" class="chat-items">
                <div :class="['item','f-r','t-l',item.type == 1 ? '' : 'item-r']">
                    <div class="avatar">
                        <img class="pic-c-c" :src="item.img_path" :data="item.img_path"/>
                    </div>
                    <div  v-if="item.msg_type =='text'" class="content">{{item.msg}}</div>
                    <div  v-if="item.msg_type=='audio'" class="audio-play f-c-c" @click="play(item,index)">
                        <audio :id="'audioPlay'+index" controls preload="auto" controlsList="nodownload">
                            <source :src="item.msg">
                        </audio> 
                        <!-- <a :download="item.msg" href="item.msg">12123</a> -->
                        <i v-if="!item.playing && item.type != 1" class="iconfont icon-fankui"></i>
                        <i v-if="!item.playing && item.type == 1" class="iconfont icon-fankui-copy"></i>
                        <img v-if="item.playing && item.type != 1"  class="playing" src="../../assets/img/audio2.gif"/>
                        <img v-if="item.playing && item.type == 1" class="playing blackplaying" src="../../assets/img/audio1.gif"/>
                        <!-- v-if="item.playing && item.type == 1" -->
                    </div>
                    <div v-if="item.msg_type == 'image'" class="msgImage">
                        <img  @click="previewHandle(item.msg)" class="pic-c-c" :src="item.msg" :data="item.msg"/>
                    </div>
                </div>
            </div>
        </mt-loadmore>
    </div>
    <div class="chat-footer f-c">
        <div class="f-r-sb">
            <div class="f-c-c">
                <i @click="showAudio" class="iconfont icon-yuyin2"></i>
            </div>
            <div class="text f-c-c">
                <textarea @focus="uploadVisible=false"  v-show="!isAudio" autofocus=true  v-model="value" rows=1 cols=40 onfocus="window.activeobj=this;this.clock=setInterval(function(){activeobj.style.height=activeobj.scrollHeight+'px';activeobj.style.lineHeight='5.4vw'},200);" onblur="clearInterval(this.clock);"></textarea>
                <button id="messageBtn" v-show="isAudio"  class="audio-btn" >按住说话</button>
            </div>
            <div  class="f-c-c">
                <i @click="showUpload(true)" class="iconfont icon-icon02"></i>
            </div>
            <mt-button @click="sendText" class="send-btn" :disabled="value == ''" type="danger" size="small">发送</mt-button>
        </div>
        <div v-if="uploadVisible" class="uploadFile">
            <div class="upload f-c-c">
                <i class="iconfont icon-images"></i>
                <input @change="uploadImg" type="file" accept="image/*,video/*"/>
                <span>照片</span>
            </div>
        </div>
    </div>
    <div @click="closePreview" v-show="previewVisible" class="preview-box f-c-c">
        <img :src="previewData"/>
    </div>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import '@/assets/js/recorder.js'
import ReconnectingWebSocket from 'reconnecting-websocket';

// 聊天页面
export default {
  name: 'Chat',
  components:{
  },
  watch:{
      currentTime(){
        if(this.currentTime == this.duration){
            this.data[index].playing = false
        }
      },
      data(){
          Common.InitImg()
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
        allLoaded:false,
        tid:'',
        isAudio:false,
        wxConfig:{},
        startTime:'',
        audio_context:'',
        recorder:'',
        localId:'',
        uploadRes:'',
        downloadRes:'',
        stopRes:'',
        uploadVisible:false,
        qiData:null,
        previewData:'', // 预览图片数据
        previewVisible:false,
        imgPath:'',
        myName:'',
        uid:'',
    }
  },
  created(){
     if(location.href.indexOf("#reloaded")==-1){
        location.href=location.href+"#reloaded";
        location.reload();
        return
      }
      this.tid = this.$route.params.tid;
      this.uid = localStorage.getItem('qid')
      this.getData(this.srcoll)
      this.getQiToken()
      const _this = this;
      let data = new FormData();
      data.append('token',localStorage.getItem('qtoken'))
      this.ajax({
        url: "/member/userinfo",
        type:'post',
        data,
        success(data) {
            _this.imgPath = data.data.image;
            _this.myName = data.data.nickname;
        }
      }) 
  },
  mounted(){
    Common.InitImg()
    const _this = this
    if ("WebSocket" in window){
        this.ws = new ReconnectingWebSocket("ws://47.107.71.62:11212");
        this.ws.onopen = function(){
            var msg = "login";
            var send = {};
            send['role'] = 'U';
            send['from'] = _this.uid;
            send['to'] = _this.tid;
            send['msg_type'] = 'text';
            send['msg_content'] = msg;
            send['event'] = 'userLogin';
            _this.ws.send(JSON.stringify( send ));
        }
        this.ws.onmessage = function (e) { 
            if(JSON.parse(e.data).data.from){
                let res = JSON.parse(e.data).data;
                if(res.from == _this.uid){
                    res.type = 2
                }else{
                    res.type = 1
                }
                _this.data.push(res)
                _this.srcoll()
            }
        } 
        this.ws.onclose = function (e){
             reconnect("ws://47.107.71.62:11212");
        }; 
    }
    this.getWxInfo()
  },
  methods:{
      closePreview(){
        this.previewVisible = false;
        const _meta = document.getElementsByTagName('meta')[1]
        _meta.content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;"
        document.getElementsByTagName('body')[0].style.overflow = 'auto'
      },
      previewHandle(item){
          this.previewData = item
          this.previewVisible = true
          const _meta = document.getElementsByTagName('meta')[1]
          _meta.content="width=device-width, initial-scale=1.0;"
         document.getElementsByTagName('body')[0].style.overflow = 'hidden'
      },
      showUpload(item){
          this.uploadVisible = item
      },
      wxReady(){
          const _this = this;
          wx.ready(function(){         
                //返回音频的本地ID
                var localId;
                //返回音频的服务器端ID
                var serverId;
                //录音计时,小于指定秒数(minTime = 10)则设置用户未录音
                var startTime , endTime , minTime = 2;
                var btnElem=document.getElementById("messageBtn");//获取ID
                //开始录音
                btnElem.addEventListener("touchstart",function(e){
                    e.preventDefault();
                    startTime = new Date().getTime();
                    //开始录音
                    wx.startRecord();
                });
                // btnElem.addEventListener("touchmove", function(event) {
                //     event.preventDefault();//阻止浏览器默认行为
                //     posMove = 0;
                //     posMove = event.targetTouches[0].pageY;//获取滑动实时坐标
                //     if(posStart - posMove < 500){
                //         btnElem.value = '松开 结束';
                //     }else{
                //         btnElem.value = '松开手指，取消发送';
                //     }
                // });
                //***********************************//
                //停止录音接口
                 btnElem.addEventListener("touchend",  function(e){
                    //停止录音接口
                    wx.stopRecord({
                        success: function (res) {
                            _this.stopRes = res
                            localId = res.localId;
                            _this.localId = localId
                            wx.uploadVoice({
                                localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: function (res) {
                                    _this.uploadRes = res
                                    var serverId = res.serverId; // 返回音频的服务器端ID
                                    //上传音频
                                    _this.uploadAudio(serverId)
                                    // wx.downloadVoice({
                                    //     serverId: serverId, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
                                    //     isShowProgressTips: 1, // 默认为1，显示进度提示
                                    //     success: function (res) {
                                    //         _this.downloadRes = res
                                    //         // var localId = res.localId; // 返回音频的本地ID
                                    //         // alert('res',res)
                                    //         // alert('下载音频'+res.localId)
                                    //     }
                                    // });
                                }
                            });
                        }
                    });
                    endTime = new Date().getTime();
                    // alert((endTime - startTime) / 1000);
                    if((endTime - startTime) / 1000 < minTime){
                        localId = '';
                        alert('录音少于' + minTime +  '秒，录音失败，请重新录音');
                    }
                    
                });
                //监听录音自动停止接口
                wx.onVoiceRecordEnd({
                    //录音时间超过一分钟没有停止的时候会执行 complete 回调
                    complete: function (res) {
                        localId = res.localId;
                                            }
                });
                //监听语音播放完毕接口
                wx.onVoicePlayEnd({
                    //需要下载的音频的服务器端ID，由uploadVoice接口获得
                    serverId: localId,
                    success: function (res) {
                    }
                });
          })
      },
      getWxInfo(){
        const _this = this
        //获取微信配置
        let data = new FormData();
        data.append('url',location.href)
        this.ajax({
            url: "/account/wx-config",
            type:'post',
            data,
            success(data) {
                _this.wxConfig = data.data.config
                _this.wxConfig.debug = false
                _this.wxConfig.jsApiList = ["startRecord","stopRecord","playVoice","uploadVoice","downloadVoice","onVoiceRecordEnd","onVoicePlayEnd"]
                wx.config(_this.wxConfig)
                _this.wxReady()
            }
        }) 
      },
      touchend(){
      },
      touchmove(){
      },
      touchstart(e){
      },
      showAudio(){
        this.isAudio = !this.isAudio
        this.uploadVisible = false
      },
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
        data.append('to',this.tid)
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
                        item.type = item.from == _this.uid ? '2' : '1'
                        _this.data.unshift(item)
                    })
                }
            }
        }) 
      },
      loadBottom() {
        this.$refs.loadmore.onBottomLoaded();
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
        data.append('to',this.tid)
        data.append('role','U')
        this.ajax({
            url: "/chat/detail",
            type:'post',
            data,
            success(data) {
                if(data.code == 0){
                    data = data.data.reverse()
                    data.forEach(item=>{
                        item.type = item.from == _this.uid ? '2' : '1'
                    })
                    _this.data = data
                    fn()
                }
            }
        })  
      },
      sendText(){
          this.sendMsg('text',this.value)
      },
      sendMsg(type,value){
            const _this = this;
            var send = {};
            send['role'] = 'U';
            send['from'] = this.uid;
            send['to'] = this.tid;
            send['msg_type'] = type;
            send['msg_content'] = value;
            send['event'] = 'sendMsg';
            _this.ws.send(JSON.stringify( send ));
                this.data.push(
                    {from: _this.uid,
                    img_path: _this.imgPath,
                    type:2,
                    is_read: "1",
                    msg: value,
                    msg_type: type,
                    name: _this.myName})
            this.value = ''
            this.srcoll()
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
       
        
      },
      uploadAudio(id){
            const that = this
            let data = new FormData()
            data.append('server_id',id)
            this.ajax({
                url: "/account/voice-upload",
                type:'post',
                data,
                success(data) {
                    if(data.code == 0){
                        that.sendMsg('audio',data.data.url)
                    }
                }
            })
      },
      loadChange(){
        this.uploadImg()
      },
      uploadImg(e){
          var target = e.target.files[0];
          var subscription;
          var putExtra = {
            fname: Date.parse(new Date())+'/' + Math.floor(Math.random () * 900) + 100 + '/'+ target.name,
            params: {},
            mimeType: [] || null
          },
          config = {
            useCdnDomain: true,
            region: qiniu.region.z2
          },
          subObject = { 
            next: this.next,
            error: this.error,
            complete: this.complete
          };
          var observable = qiniu.upload(target,Date.parse(new Date())+'/' + Math.floor(Math.random () * 900) + 100 + '/'+ target.name, this.qiData.access_token, putExtra, config);
          subscription = observable.subscribe(subObject);
      },
      next(res){
      },
      error(err){
      },
      complete(res){
        this.sendMsg('image',this.qiData.domain+res.key)
        Common.InitImg()
      },
      getQiToken(){
            const that = this
            this.ajax({
                type: "POST",
                url: "/account/qiniu-token",
                data: '',
                async:false,
                dataType : "json",
                success: function(data){
                    that.qiData = data.data
                }
            })
       }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#app,body{
    /* height:auto */
}
</style>
<style scoped lang="less">
    .chat{
        width:100%;
        background:#f5f5f5;
        min-height:100%;
        padding:5.4vw 2.7vw;
        padding-bottom:13.4vw;
        .preview-box{
            position: fixed;
            width:100%;
            height:100%;
            left:0;
            top:0;
            background:rgba(0,0,0,0.8);
            img{
                display: inline-block;
                width:53.3vw;
                margin: 0 auto;
            }
        }
        .avatar{
            position: relative;
            width:10.7vw;
            height:10.7vw;
            overflow: hidden;
            border-radius: 50%;
            img{
                width:10.7vw;
                height:10.7vw;
            }
        }
        .msgImage{
            position: relative;
            width:26.7vw;
            height:26.7vw;
            overflow: hidden;
        }
        .item{
            margin-bottom:5.4vw;
            .content,.audio-play{
                max-width:64vw;
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
            width:64vw;
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
            max-height:50vw;
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
            .audio-btn{
                width:62vw;
                height:9.6vw;
                line-height: 9.6vw;
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
        .uploadFile{
            height:33.3vw;
            .upload{
                position: relative;
                width:26.7vw;
                i{
                    font-size:10.1vw;
                }
                input{
                    position: absolute;
                    width:100%;
                    height:100%;
                    opacity: 0;
                }
            }
        }
    }
</style>
