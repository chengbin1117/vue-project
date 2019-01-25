<template>
 <div v-if="course" class="detail-content">   
    <div class="detail-play">
        <audio  id="audioPlay" :src="source" controls preload="auto" controlsList="nodownload"></audio> 
        <div @click="play" class="play-btn">
            <span>{{h}}:</span>
            <span>{{m}}:</span>
            <span>{{s}}</span>
        </div>
        <div v-if="!isPlay" class="to-buy">
            <div  class="content f-c-c">
                <span @click="submit" class="buy font16 ">购买学习</span>
                <span class="info font14 colorfff mart10">{{isCanPlay?'试看已结束,购买后学习整个课程':'购买后学习整个课程'}}</span>
            </div>
        </div>
    </div>
    <div v-if="!read" class="detail-tit f-c-c">
        <p class="tit font16 color333 t-l">{{course.course_name}}</p>
        <p class="info t-l f-r-sb">
            <span v-if="course.charge_type == 10" class="f-c-c font16 colorfree mart10">免费</span>
            <span v-if="course.charge_type == 20 && !course.time_limit" class="f-c-c font16 colorbuy mart10">￥{{course.price}}</span>
            <span v-if="course.charge_type == 20 && course.time_limit" class="f-c-c font16 colorlimit">限时观看</span>
            <span class="f-c-c num font12 color999 mart10">{{course.sales_num}}人报名</span>
            <span @click="allBuy" v-if="course.is_all == 0 && course.charge_type != 10" class="buy font14 colorbuy">全选</span>
        </p>
        <p v-if="course.charge_type == 20 && course.time_limit"  class="font12 color999 t-l mart10">({{course.time_limit}}前免费观看，报名需购买)</p>
    </div>
    <div v-else class="detail-tit f-c-c">
        <p class="tit font16 color333 t-l">{{course.course_name}}</p>
        <div class="f-r-sb">
            <div class="f-r">
                <div class="avatar">
                    <img :src="course.teacher_img_path" :data="course.teacher_img_path" class="pic-c-c"/>
                </div>
                <span class="font14 color333 f-c-c">{{course.teacher_name}}</span>
            </div>
            <div @click="chatTeacher(null)" class="chat-teacher f-r">
                <i class="iconfont icon-liaotian"></i>
                <span class="f-c-c font14 color333">联系老师</span>
            </div>   
        </div>
    </div>
    <p v-if="course.is_all != 0" class="limit-warning">
        <i></i>
        <span>本套课程仅支持整套购买</span>
    </p>
    <div class="detail-introduce">
        <div class="tab f-r-sb">
            <span @click="tabChange($event,'1')" class='menu font16 color333 active'>课程目录</span>
            <span class="line"></span>
            <span @click="tabChange($event,'2')" class='menu font16 color333'>课程详情</span>
        </div>
        <!-- 课程目录 -->
        <div v-if="!iscatalog" class="class-menu">
            <div v-if="catalog" class="item" v-for="(item,index) in catalog" :key="index">
                <p @click="toAudio(item)" :class="['video','t-l','f-r',item.is_playing == 1 && item.status!=20 ? 'is-playing':'']">
                    <span :class="['font12','f-c-c','class-type',item.status== 10 ? 'color333 border999' :'color999 bordereee']">音频</span>
                    <span :class="[item.status== 10 ? 'color333' :'color999','omit1','font14','color333','f-c-c']">{{item.course_name}}</span>
                    <span v-if="course.charge_type != 10 && course.is_all == 0" class="price f-r">
                        <span v-if="item.is_buy !=1" :class="[ 'colorbuy','omit1','font14','f-c-c','item-price']">￥{{item.price}}</span>
                        <i v-if="item.is_buy !=1" @click="choose($event,item)" :class="[item.is_checked == 1 ? 'colorbuy' : 'color999','font20','iconfont','icon-select']"></i>
                        <span v-if="item.is_buy==1" style="margin-top:0" class="color999">已购买</span>
                    </span>
                </p>
                <p @click="toExercise(item)" class="exercise t-l f-r">
                    <span :class="['font12','f-c-c',item.status== 10 ? 'color333' :'color999']">练习</span>
                    <span :class="[item.status== 10 ? 'color333' :'color999','omit1','font14','f-c-c']">{{item.course_name}}</span>
                </p>
            </div>
        </div>
        <!-- 课程详情 -->
        <div v-show="iscatalog" class="class-detail">
            <div class="f-r">
                <span class="red-line"></span>
                <span class="font16 color333">授课老师</span>
            </div>
            <div class="teacher f-r">
                <div class="avatar">
                    <img class="pic-c-c" :src="course.teacher_img_path" :data="course.teacher_img_path"/>
                </div>
                <span class="font14 color333">{{course.teacher_name}}</span>
            </div>
            <div class="f-r mart10">
                <span class="red-line"></span>
                <span class="font16 color333">课程介绍</span>
            </div>
            <div class="class-intro" v-html="course.course_content"></div>
        </div>
    </div>
    <div v-if="!read" class="detail-footer f-r">
        <div class="white-btn f-r">
            <div @click="toServer" class="f-c-c">
                <i class="iconfont icon-dayi"></i>
                <span  class="font14 color333">咨询</span>
            </div>
            <div @click="collect" class="f-c-c">
                <i v-if="course.is_collect == 0" class='iconfont icon-shoucang'></i>
                <i v-else class="iconfont icon-wodeshoucang2-copy colorbuy"></i>
                <span :class="['font14','color333',course.is_collect == 0 ? '' : 'colorbuy']">{{course.is_collect == 0 ? '收藏' : '已收藏'}}</span>
            </div>
        </div>
        <div @click="submit" class="submit">
            <span class="font18">立刻报名</span>
            <span v-if="course.charge_type != 10" class="font14">（￥{{toFixed(totalPrice)}}）</span>
        </div>
    </div>
    <msg-box v-if="msgVisible" :content="msg"/>
 </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import ClassList from "@/components/common/ClassList"
import MsgBox from '@/components/common/MsgBox'

// 音频详情页面
export default {
  name: 'audioDetail',
  components:{
      ClassList,MsgBox
  },
  watch:{
    course(){
          Common.InitImg()
    }
  },
  computed: {
    player() {
    //   return this.$refs.videoPlayer.player
    },
  },
  data () {
    return {
      source:'http://qsjqcdn.sclonsee.com/201901/1548396852540.mp3',
      tab:[
          {name:'课程目录',id:'1',class:'font16 color333'},
          {name:'课程详情',id:'2',class:'font16 color333'}
      ],
      data:[1,2,3,4,5,6],
      ms:'00', // 毫秒
      h:'00', // 小时
      m:'00',// 分
      s:'00',// 秒
      iscatalog:false,
      course:null, // 课程详情
      catalog:null,// 课程目录
      totalPrice:0, // 购买总价
      isall:false,
      chooseId:[],
      read:false,
      msgVisible:false,
      msg:'',
      isPlay:true,
      intervaltimer:null,
      isCanPlay:false
    }
  },
  created(){
      const path = this.$route.path
      localStorage.setItem('classPath',path)
  },
  mounted(){
    Common.InitImg()
    this.getData()
  },
  methods:{
    toServer(){
        const _this = this;
        if( localStorage.getItem('qservice_id') > 0){
            this.$router.push('/chat/' + localStorage.getItem('qservice_id'))
        }else{
            this.msgVisible = true
            this.msg = '客服暂时不在线'
            setTimeout(function(){
                _this.msgVisible = false
            },1000)
        }
    },
    chatTeacher(_id){
        if(_id){
            this.$router.push('/chat/' + _id)
            return
        }
         this.$router.push('/chat/' + this.course.admin_uid)
    },
    toExercise(item){
        const _this = this
        if(item.status == 20){
            return
        }
        if((this.course.is_all != 0 && this.course.is_buy != 1) || (this.course.is_all == 0 && item.is_buy == 0)){
            this.msgVisible = true
            this.msg = '请先购买课程'
            setTimeout(function(){
                _this.msgVisible = false
            },1000)
            return
        }
        this.$router.push('/exercises/' + item.id +'/' + item.course_id)
    },
    toAudio(item){
        if(item.status == 20){
            return
        }
        this.source = item.file_path
        if(this.catalog){
            this.catalog.forEach(item=>{
                item.is_playing = 0
            })
            item.is_playing = 1
        }

    },
    getData(){
      const _this = this
      let data = new FormData()
      data.append('id',this.$route.params.id)
      data.append('token',localStorage.getItem('qtoken'))
      // 课程详情
      this.ajax({
        url: "/course/detail",
        type:'post',
        data,
        success(data) {
            if(data.code !=0 ){
                return
            }
            //is_all == 0 为单买
            let timer = parseInt(data.data.course.time_limit) * 1000
            data = data.data
           _this.course = data.course
           if(data.course.time_limit){
                _this.course.time_limit =  new Date(timer).getFullYear() + '-' + parseInt(new Date(timer).getMonth()+1 )+ '-' + new Date(timer).getDate()
           }
           if(data.catalog){
                    // 默认第一节课正在播放
                data.catalog.forEach(item=>{
                    item.is_playing = 0
                })
                data.catalog[0].is_playing = 1  
           }
           _this.catalog = data.catalog
           _this.source = data.course.file_path
           _this.read = _this.course.is_buy == 1 ? true : false
           // 判断该课程是否允许播放
           if(data.course.charge_type == 10 || data.course.free_time){
                _this.isPlay = true
           }else{
               _this.isPlay = false
           }
           // 判断是否为试看课程
            _this.isCanPlay = data.course.free_time ? true : false
           // 判断整套或单买时候的初始总价
           if(data.course.is_all == 0){
               //单买时候的总价
                data.catalog.forEach(element => {
                    // if(element.status != 20 &&  element.is_buy == 1){
                    //      _this.totalPrice += parseInt(element.price)               
                    //  }
                     // 判断单买时候 是否购买课程
                     if(element.is_buy == 1){
                         element.is_checked = 1
                     }else{
                         element.is_checked = 0
                     }
                }); 
           }else{
               // 整套买时候的总价
                _this.totalPrice = parseFloat(data.course.price).toFixed(2)
           }
                        
           const myAudio = document.getElementById('audioPlay')
            const limittimer = _this.course.free_time * 60
        //     console.log('limittimer',limittimer)
        //     console.log('myAudio',myAudio)
        //    if(myAudio != null){
        //         getAudioProgress();
        //         // 实时获取音频播放进度
        //         function getAudioProgress() {
        //             setTimeout(function () {
        //             const currentTime=myAudio.currentTime.toFixed(2);
        //             console.log('currentTime',currentTime)
        //             if(_this.course.charge_type == 20 && !_this.course.time_limit && _this.course.free_time){
        //                 if(limittimer < currentTime ){
        //                     _this.isPlay = false
        //                     myAudio.pause();
        //                 }
        //             }
        //             if(currentTime == myAudio.duration){
        //                 return false
        //             }
        //                 _this.h = Math.floor(currentTime/60/60%24);
        //                 _this.m = Math.floor(currentTime/60%60);
        //                 _this.s = Math.floor(currentTime%60);     
        //                 if(_this.h < 10){
        //                     _this.h = '0' + _this.h
        //                 }
        //                 if(_this.m < 10){
        //                     _this.m = '0' + _this.m
        //                 }
        //                 if(_this.s < 10){
        //                     _this.s = '0' + _this.s
        //                 }
        //                 getAudioProgress();
        //             }, 50);
        //         }
        //     }
        }
       })
    },
    // 收藏
    collect(){
      const _this = this;
      let data = new FormData();
      data.append('token',localStorage.getItem('qtoken'))
      data.append('type',1)
      data.append('id',this.$route.params.id)
      // 课程详情
      this.ajax({
        url: "/user/collect",
        type:'post',
        data,
        success(data) {
            _this.getData()
        }
       })
    },
    // 立刻报名
    submit(){
        const _this = this;
        if(!this.catalog){
             this.msgVisible = true
            this.msg = '课程不存在'
            setTimeout(function(){
                _this.msgVisible = false
            },1000)
            return
        }
        if(this.course.is_all != 0 || this.course.charge_type == 10){
            this.$router.push({path: '/class-order/' + this.course.id +'_0', replace: true})
            // this.$router.push({path: '/class-order/' + this.course.id +'/0', replace: true})
        }else{
            this.catalog.forEach(element => {
                if( element.is_checked == 1 && element.is_buy != 1){
                    this.chooseId.push(element.id)
                }
            });
            if(this.chooseId.length == 0){
                this.msgVisible = true
                this.msg = '请选择要购买的课程'
                setTimeout(function(){
                    _this.msgVisible = false
                },1000)
                return
            }
            this.chooseId = this.chooseId.join(',')
            this.$router.push('/class-order/0_' +this.chooseId)
            // this.$router.push('/class-order/0/' +this.chooseId)
        }
    },
    // 全部购买
    allBuy(){
        if(!this.isall){
            this.catalog.forEach(element => {
                // if(element.status != 20){
                    if( element.is_checked != 1 && element.is_buy !=1){
                        element.is_checked = 1
                        this.totalPrice += parseFloat(element.price)
                    }
                // }
            }); 
            this.isall = true
        }else{
            this.catalog.forEach(element => {
                element.is_checked = 0
            }); 
            this.isall = false
            this.totalPrice = 0
            this.chooseId = []
        }   
        this.catalog.forEach(element => {
            if( element.is_checked == 1 && element.is_buy !=1){
                this.chooseId.push(element.id)
            }
        });
    },
    // 选择购买课程
    choose(e,item){
        const _this = this
        e.stopPropagation();
        e.preventDefault();
        item.is_checked = item.is_checked == 1 ? 0 : 1;
        if(item.is_checked == 1){
            this.totalPrice += parseFloat(item.price)
             this.chooseId.push(item.id)
        }else{
             this.totalPrice -= parseFloat(item.price)
             this.chooseId.forEach((target,i)=>{
                 if(target == item.id){
                     _this.chooseId.splice(i,1)
                 }
             })
        }
    },
    play(){
        const _this = this
        const myAudio = document.getElementById("audioPlay");
        const limittimer = _this.course.free_time * 60
        if(myAudio != null){
                getAudioProgress();
                // 实时获取音频播放进度
                function getAudioProgress() {
                    setTimeout(function () {
                    const currentTime=myAudio.currentTime.toFixed(2);
                    if(_this.course.charge_type == 20 && !_this.course.time_limit && _this.course.free_time){
                        if(limittimer < currentTime ){
                            _this.isPlay = false
                            myAudio.pause();
                        }
                    }
                    if(currentTime == myAudio.duration){
                        return false
                    }
                        _this.h = Math.floor(currentTime/60/60%24);
                        _this.m = Math.floor(currentTime/60%60);
                        _this.s = Math.floor(currentTime%60);     
                        if(_this.h < 10){
                            _this.h = '0' + _this.h
                        }
                        if(_this.m < 10){
                            _this.m = '0' + _this.m
                        }
                        if(_this.s < 10){
                            _this.s = '0' + _this.s
                        }
                        getAudioProgress();
                    }, 50);
                }
            }
        if (myAudio.paused) {
            myAudio.play();
        }else{
            myAudio.pause();
        }
    },
    // 切换tab
    tabChange(e,item){
        this.iscatalog = item == 1 ? false : true
        e = e || window.event;
        const target = e.target;
        const menus = document.getElementsByClassName('menu');
        for(var i=0,l=menus.length;i<l;i++){
            menus[i].className = 'menu font16 color333'
        }
        target.className = 'menu font16 color333 active'
    },
    toFixed(item){
       return  parseFloat(item).toFixed(2)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .detail-content{
        width:100%;
        background:#f5f5f5;
        height:100%;
        .detail-play{
            position: relative;
            width:100%;
            height:56vw;
            padding-top:2.6vw;
            background:url('../../assets/img/cover.png') no-repeat;
            background-size:cover;
            audio{
                width:100%;
                position: absolute;
                left:0;
                bottom:0;
                background:transparent;
            }
            .play-btn{
                width:34.7vw;
                height:34.7vw;
                line-height: 34.7vw;
                background:#fff;
                border-radius: 50%;
                margin:0 auto;
                span{
                    color:#eb4c49;
                    font-size:6.4vw;
                }
            }
            .to-buy{
                position: absolute;
                z-index:200;
                width:100%;
                height:100%;
                background:rgba(0,0,0,0.75);
                left:0;
                top:0;
                .content{
                    width:100%;
                    height:100%;
                }
                .buy{
                    display: block;
                    width:26.7vw;
                    height:9.1vw;
                    line-height: 9.1vw;
                    text-align: center;
                    background:#fff;
                    margin:0 auto;
                    border-radius: 1.6vw;
                    color:#EB4C49;
                }
            }
        }
        .detail-tit{
            position: relative;
            padding:5.4vw 4.3vw 4vw 4.3vw;
            background:#fff;
            .tit{
                line-height: 7.2vw;
            }
            .info{
                .buy{
                    border:1px solid #eb4c49;
                    border-radius: 1.6vw;
                    padding:1.7vw 3.2vw;
                }
            }
            .avatar{
                position: relative;
                width:9vw;
                height:9vw;
                border-radius: 50%;
                overflow: hidden;
                margin-right:2.7vw;
            }
            .chat-teacher{
                i{
                    font-size:7vw;
                    margin-right:2.7vw;
                    color:#F58F44;
                }
            }
        }
        .limit-warning{
            width:100%;
            height:8vw;
            line-height: 8vw;
            background:#FDEEDD;
            color:#FA8F44;
            font-size:3.2vw;
            padding-left:4vw;
            text-align: left;
        }
        .detail-introduce{
            margin-top:2.7vw;
            background:#fff;
            padding-bottom: 13.8vw;
            .tab{
                height:10.7vw;
                border-bottom:1px solid #ddd;
                span{
                    display: inline-block;
                    width:49%;
                    height:100%;
                    line-height: 10.7vw;
                }
                .line{
                    width:1px;
                    height:6.4vw;
                    background:#ccc;
                    margin-top:2.1vw;
                }
                .active{
                    border-bottom:1px solid #eb4c49;
                    color:#eb4c49;
                    position: relative;
                    box-sizing: content-box;
                }
                .active:after, .active:before {
                    border: solid transparent;
                    content: ' ';
                    height: 0;
                    // top: 65%;
                    position: absolute;
                    width: 0;
                }

                .active:after {
                    border-width: 7px;
                    border-bottom-color: #fff;
                    left: 44%;
                    top:67%;
                }
                .active:before {
                    border-width: 7px;
                    border-bottom-color: #eb4c49;
                    left: 44%;
                    top: 64%;
                }
            }
            .class-menu{
                padding:0 2.7vw;
                .item{
                    p{
                        height:12.3vw;
                        border-bottom:1px solid #ddd;
                        padding-top:3.45vw;
                        span:nth-child(1){
                            margin-right:2.7vw;
                            width:12vw;
                            height:5.4vw;
                            line-height: 5.4vw;
                            text-align: center;
                        }
                        span:nth-child(2){
                            flex:1;
                            height:5.4vw;
                            line-height: 5.4vw;
                        }
                    }
                    .video{
                        .border999{                            
                            border:1px solid #999;
                            border-radius: 1.1vw;
                        }
                        .bordereee{
                            border:1px solid #eee;
                        }
                        .price{
                            span{
                                height:100%;
                                margin-top:-2px;
                            }
                            .font20{
                                font-size:6.4vw;
                            }
                             .item-price{
                                width:auto;
                            }
                        }
                        
                    }
                    .is-playing{
                        .class-type{
                            border-color:#eb4c49;
                            color:#eb4c49;
                        }
                    }
                }
                .item:last-child{
                    p:last-child{
                        border-bottom:0;
                    }
                }
            }
        }
        .class-detail{
                padding:3.2vw;
                .red-line{
                    margin-right:2.7vw;
                }
                .teacher{
                    padding:4vw 0;
                    // border-bottom:1px solid #ccc;
                    .avatar{
                        position: relative;
                        width:9.4vw;
                        height:9.4vw;
                        border-radius: 50%;
                        overflow: hidden;
                        margin-right:2.7vw;
                    }
                    .font14{
                        line-height: 9.4vw;
                    }
                }
                .class-intro{
                    margin-top:2.7vw;
                    text-align: left;
                }
        }
        .detail-footer{
            width:100%;
            height:12.8vw;
            line-height: 12.8vw;
            background:#fff;
            position: fixed;
            left:0;
            bottom:0;
            .white-btn{
                width:50%;
                border-top:1px solid #ddd;
                .f-c-c{
                    width:50%;
                    i{
                        font-size:5.4vw;
                        margin-top:-3.4vw;
                    }
                    span{
                        margin-top:-2.4vw;
                    }
                }
            }
            .submit{
                width:50%;
                background:#EB4C49;
                height:100%;
                text-align: center;
                color:#fff;
                border-top:1px solid #EB4C49;
            }
        }

    }
</style>
<style lang="less">
    .detail-content{
        .vjs-custom-skin > .video-js .vjs-big-play-button{
                    top: 0px;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    width: 17.1vw;
                    line-height: 17.1vw;
                    border-radius: 50%;
                    margin:auto!important;            
            }
    }
</style>
