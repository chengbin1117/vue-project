<template>
 <div  class="detail-content">   
    <div class="detail-play">
        <video-player  class="video-player vjs-custom-skin"
                        ref="videoPlayer"
                        :playsinline="true"
                        :options="playerOptions"
                        @play="onPlayerPlay($event)"
                        @pause="onPlayerPause($event)"
        >
        </video-player>
        <div v-if="course.charge_type != 10" class="to-buy">
            <div  class="content f-c-c">
                <span class="buy font16 ">购买学习</span>
                <span class="info font14 colorfff mart10">购买后可学习整个课程</span>
            </div>
        </div>
    </div>
    <div v-if="!read" class="detail-tit f-c-c">
        <p class="tit font16 color333 t-l">{{course.course_name}}</p>
        <p class="info t-l f-r-sb">
            <span v-if="course.charge_type == 10" class="f-c-c font16 colorfree">免费</span>
            <span v-if="course.charge_type == 20" class="f-c-c font16 colorbuy">￥102.00</span>
            <span v-if="course.charge_type == 20 && course.time_limit" class="f-c-c font16 colorlimit">限时观看</span>
            <span class="f-c-c num font12 color999">{{course.sales_num}}人报名</span>
            <span @click="allBuy" v-if="course.is_all == 0 && course.charge_type != 10" class="buy font12 colorbuy">全部购买</span>
        </p>
        <p v-if="course.charge_type == 20 && course.time_limit"  class="font12 color999 t-l">(2018-09-14前免费观看，报名需购买)</p>
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
            <div class="chat-teacher f-r">
                <i class="iconfont icon-liaotian"></i>
                <span class="f-c-c font14 color333">联系老师</span>
            </div>   
        </div>
    </div>
    <p v-if="course.is_all == 1" class="limit-warning">
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
            <div class="item" v-for="(item,index) in catalog" :key="index">
                <p  @click="toVideo(item)" class='video t-l f-r'>
                    <span :class="['font12','f-c-c',item.status== 10 ? 'color333' :'color999']">视频</span>
                    <span class="omit1 font14 color333 f-c-c">{{item.course_name}}</span>
                    <span v-if="course.charge_type != 10" class="price f-r">
                        <span class="omit1 font14 colorbuy">￥{{item.price}}</span>
                        <i @click="choose(item)" :class="[item.is_buy == 1 ? 'colorbuy' : 'color999','font20','iconfont','icon-select']"></i>
                    </span>
                </p>
                <p @click="toExercise(item)" class="exercise t-l f-r">
                    <span :class="['font12','f-c-c',item.status== 10 ? 'color333' :'color666']">练习</span>
                    <span class="omit1 font14 color666 f-c-c ">{{item.course_name}}</span>
                </p>
            </div>
        </div>
        <!-- 课程详情 -->
        <div v-else class="class-detail">
            <div class="f-r">
                <span class="red-line"></span>
                <span class="font16 color333">授课老师</span>
            </div>
            <div class="teacher f-r">
                <div class="avatar">
                    <img class="pic-c-c" v-lazy="course.teacher_img_path" :data="course.teacher_img_path"/>
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
    <div v-if ="!read" class="detail-footer f-r">
        <div class="f-c-c">
            <i class="iconfont icon-dayi"></i>
            <span class="font14 color333">答疑</span>
        </div>
        <div @click="collect" class="f-c-c">
            <i v-if="course.is_collect == 0" class='iconfont icon-shoucang'></i>
            <i v-else class="iconfont icon-wodeshoucang2-copy colorbuy"></i>
            <span :class="['font14','color333',course.is_collect == 0 ? '' : 'colorbuy']">{{course.is_collect == 0 ? '收藏' : '已收藏'}}</span>
        </div>
        <div @click="submit" class="submit">
            <span class="font18">立刻报名</span>
            <span v-if="course.charge_type != 10" class="font14">（￥{{totalPrice}}）</span>
        </div>
    </div>
 </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import ClassList from "@/components/common/ClassList"

// 好课推荐页面
export default {
  name: 'VideoDetail',
  components:{
      ClassList
  },
  watch:{
     course(){
          Common.InitImg()
     }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  data () {
    return {
      playerOptions: {
//        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",
          src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" //你的视频地址（必填）
        }],
        poster: "poster.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
//        controlBar: {
//          timeDivider: true,
//          durationDisplay: true,
//          remainingTimeDisplay: false,
//          fullscreenToggle: true  //全屏按钮
//        }
      },
      tab:[
          {name:'课程目录',id:'1',class:'font16 color333'},
          {name:'课程详情',id:'2',class:'font16 color333'}
      ],
      data:[1,2,3,4,5,6],
      iscatalog:false,
      course:{}, // 课程详情
      catalog:{},// 课程目录
      totalPrice:0, // 购买总价
      isall:false,
      chooseId:[],
      read:false,
    }
  },
  created(){
    this.getData()
    this.read = this.$route.params.read == 0 ? false : true
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
    toExercise(item){
        this.$router.push('/exercises/' + item.id +'/' + item.course_id)
    },
    toVideo(item){
        this.playerOptions.sources[0].src = item.file_path
    },
    getData(){
      const _this = this;
      let data = new FormData();
      data.append('id',this.$route.params.id)
      data.append('token',localStorage.getItem('qtoken'))
      // 课程详情
      this.ajax({
        url: "/course/detail",
        type:'post',
        data,
        success(data) {
            data = data.data
           _this.course = data.course
           _this.catalog = data.catalog
           _this.playerOptions.sources[0].src = data.course.file_path
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
        this.chooseId = this.chooseId.join('')
        if(this.course.is_buy == 0 || this.course.charge_type == 10){
            // this.$router.push('order-detail/' + this.course.id)
            this.$router.push({path: '/class-order/' + this.course.id +'/0', replace: true})
        }else{
            this.$router.push('class-order/0/' +this.chooseId)
        }
    },
    // 全部购买
    allBuy(){
        if(!this.isall){
            this.catalog.forEach(element => {
                element.is_buy = 1
                this.totalPrice += parseInt(element.price)
            }); 
            this.isall = true
        }else{
            this.catalog.forEach(element => {
                element.is_buy = 0
            }); 
            this.isall = false
            this.totalPrice = 0
        }   

    },
    // 选择购买课程
    choose(item){
        if(item.status == 20){
            return
        }
        item.is_buy = item.is_buy == 1 ? 0 : 1;
        this.catalog.forEach(element => {
            if(element.is_buy == 1){
                this.totalPrice += parseInt(element.price)
                this.chooseId.push(item.id)
            }else{
                this.totalPrice -= parseInt(element.price)
            }
        });
    },
    onPlayerPlay(player) {
      console.log("play");
    },
    onPlayerPause(player){
      console.log("pause");
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
            .to-buy{
                position: absolute;
                z-index:200;
                width:100%;
                height:100%;
                background:rgba(#333,0.4);
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
                    padding:2.7vw 3.2vw;
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
                        span:nth-child(1){                            
                            border:1px solid #999;
                            border-radius: 1.1vw;
                        }
                        .price{
                            span{
                                border:0;
                            }
                            .omit1{
                                width:22vw;
                            }
                            i{
                                margin-top:-1vw;
                            }
                        }
                    }
                }
                .item:last-child{
                    p:last-child{
                        border-bottom:0;
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
                    border-bottom:1px solid #ccc;
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
        }
        .detail-footer{
            width:100%;
            height:12.8vw;
            line-height: 12.8vw;
            background:#fff;
            position: fixed;
            left:0;
            bottom:0;
            border-top:1px solid #ddd;
            .f-c-c{
                width:25%;
                i{
                    font-size:5.4vw;
                     margin-top:-3.4vw;
                }
                span{
                    margin-top:-2.4vw;
                }
            }
            .submit{
                width:50%;
                background:#EB4C49;
                height:100%;
                text-align: center;
                color:#fff;
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
