<template>
  <div  class="my-info">
    <div class="my-avatar f-r-sb">
        <span class="font16 color333">头像</span>
        <div class="f-r">
            <div class="avatar f-c-c">
                <img class="pic-c-c" :data="form.image" :src="form.image"/>
            </div>
            <i class="iconfont icon-qianwang"></i>
        </div>
        <input @change="upload('inputFile')" ref="inputFile" type="file" accept="image/*"/>
    </div>   
    <div class="top">
        <mt-field label="昵称"  v-model="form.nickname"></mt-field>
        <mt-field label="真实姓名"  v-model="form.username"></mt-field>
        <div @click="showModal" class="sex f-r-sb">
            <span>性别</span>
            <div style="width:13vw" class="f-r-end">
                <span class="type" v-if="form.sex">{{form.sex === '1' ? '男' : '女'}}</span>
                <i class="iconfont icon-qianwang"></i>
            </div>
        </div>
    </div>
    <mt-button @click="submit" :disabled="disabled" class="btn btn-submit">确定</mt-button>
    <div v-if="visible" class="mask"></div>
    <!-- 性别选择弹窗 -->
    <div v-if="visible" class="sex-modal">
        <p class="tit font18 color333">选择性别</p>
            <mt-radio
            v-model="form.sex"
            :options="options">
            </mt-radio>
        <p @click="closeModal" class="font18 colorbuy">确定</p>
    </div>
    <msg-box v-if="msgVisible" :content="msg"/>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import MsgBox from '@/components/common/MsgBox'

// 个人信息 页面
export default {
  name: 'MyInfo',
  components:{
      MsgBox
  },
  watch:{
    'form.nickname'(newVal,oldVal){
       this.disabledChange()
    },
    'form.username'(newVal,oldVal){
       this.disabledChange()
    },
    'form.sex'(newVal,oldVal){
       this.disabledChange()
    },
    'form.image'(newVal,oldVal){
       this.disabledChange()
    }
  },
  data () {
    return {
        form:{
            nickname:'',
            username:'',
            sex:'1',
            image:''
        },
        options:[
            {
                label: '男',
                value: '1'
            },
            {
                label: '女',
                value: '0'
            }
        ],
        visible:false,
        base64:'',
        msgVisible:false,
        msg:'',
        disabled:true,
    }
  },
  created(){
    this.getData()
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
    disabledChange(){
          if(this.form.nickname!='' &&this.form.username!='' && this.form.sex!=''&& this.form.image!=''){
              this.disabled = false
          }else{
            this.disabled = true
          }
    },
    getData(){
        const _this = this;
        let data = new FormData();
        data.append('token',localStorage.getItem('qtoken'))
        this.ajax({
            url: "/member/userinfo",
            type:'post',
            data,
            success(data) {
                _this.form = data.data;
            }
        })      
    },
    submit(){
        const _this = this;
        let data = new FormData();
        data.append('token',localStorage.getItem("qtoken"))
        data.append('nickname',this.form.nickname)
        data.append('username',this.form.username)
        data.append('image',this.form.image)
        data.append('sex',this.form.sex)
        this.ajax({
            url: "/member/user-edit",
            type:'post',
            data,
            success(data) {
                _this.msgVisible = true
                _this.msg = data.msg
                setTimeout(function(){
                    _this.msgVisible = false
                    if(data.code == 0){
                        _this.$router.push('/mine')
                    }
                },1000)
            }
        })  
    },
    upload(target){
        let _this = this;
        const file = this.$refs[target].files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            const base64 = reader.result; 
            let data = new FormData();
            data.append('image',base64);
            _this.ajax({
                url: "/upload/image",
                type:'post',
                data,
                success(data) {
                    if(data.code == 0){
                        _this.base64 = base64
                        _this.form.image = data.data.url_show
                    }
                }
            })
        };

       
    },
    showModal(){
        this.visible = true;
    },
    closeModal(){
        this.visible = false;
    },
    encodeBase64(uploadFile){
       
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .my-info{
        width:100%;
        background:#f5f5f5;
        height:100%;
        padding-top:2.7vw;
        .msg-box p{
            margin-top:100px;
        }
        .my-avatar{
            position: relative;
            width:100%;
            height:21.4vw;
            line-height: 21.4vw;
            background:#fff;
            margin-bottom:2.7vw;
            padding-left:4vw;
            padding-right:2.7vw;
            input{
                width:100%;
                height:100%;
                position: absolute;
                top:0;
                left:0;
                opacity: 0;
            }
            .avatar{
                width:13.4vw;
                height:13.4vw;
                position: relative;
                overflow: hidden;
                border-radius: 50%;
                margin-top:4vw;
            }
            i{
                font-size:7.4vw;
                color:#999;
                margin-left:0.7vw;
            }
            span{
                line-height: 21.4vw;
            }
        }
        .sex{
            position: relative;
            width:100%;
            height:14.7vw;
            background:#fff;
            span{
                line-height: 14.7vw;
                color:#333;
                font-size:4.3vw;
            }
            .type{
                color:#999;
            }
            i{
                line-height: 14.7vw;
                font-size: 7vw;
                color: #999;
                // position: absolute;
                // right: 0.7vw;  
            }
        }
        .top{
            width:100%;
            background:#fff;
            padding:0 2.7vw;

        }
        .btn{
            margin:0 auto;
            margin-top:8vw;
            width:86.7vw;
            height:11.8vw;
            line-height: 11.8vw;
            background:#eb4c49;
            color:#fff;
            border-radius: 5.9vw;
            text-align: center;
            font-size:4.8vw;
        }
        .mask{
            top:0;
            left:0;
        }
        .sex-modal{
            position: absolute;
            z-index:999;
            width:80vw;
            height:53.4vw;
            background:#fff;
            border-radius: 2.2vw;
            left:0;
            right:0;
            margin:auto;
            top:40vw;
            .tit{
                margin-top:5.4vw;
            }
            .colorbuy{
                height:12.6vw;
                line-height: 12.6vw;
                border-top:1px solid #ccc;
            }
        }
    }
</style>
<style lang="less">
    .my-info{
        .msg-box p{
            margin-top:100px!important;
        }
    }
    body{
        font-family: "PingFangSC","Hiragino Sans GB","Helvetica Neue",Helvetica,tahoma,arial,Verdana,sans-serif,"WenQuanYi Micro Hei","\5B8B\4F53"
    }
    .my-info{
        .top{
            input::-webkit-input-placeholder{
                color:#999;
            }
        }
        .mint-field-core{
            text-align:right;
            color:#999;
        }
        .mint-cell-wrapper{
            padding:0;
        }
        .mint-cell{
            border-bottom:1px solid #ccc;
        }
        .mint-cell:last-child{
            border:0;
        }
        .mint-cell-title{
            display: inline-block;
            text-align:left;
            width:20vw;
        }
        .mint-radio-input:checked + .mint-radio-core{
            background-color:#EB4C49;
            border-color:#EB4C49;
        }
        .sex-modal{
             .mint-cell{
                 border:0;
             }
             .mint-radio-label{
                 float:left;
                 margin-left:28vw;
             }
             .mint-radio-core{
                 margin-left:5.4vw;
                 margin-top:-0.6vw;
             }
        }
    }
</style>

