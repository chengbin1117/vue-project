<template>
  <div  class="add-address">   
    <div class="top">
        <mt-field label="姓名" placeholder="请输入收件人姓名" v-model="form.name"></mt-field>
        <mt-field label="电话" placeholder="请输入11位手机号" type="number" v-model="form.phone"></mt-field>
        <div class="city f-r" @click="showPicker">
            <span>城市</span>
            <span v-if="form.province">{{form.province}}/{{form.city}}</span>
            <span v-else class="placeholder">请选择城市</span>
            <i class="iconfont icon-qianwang"></i>
        </div>
        <mt-field label="地址" placeholder="请输入详细地址" v-model="form.address"></mt-field>
    </div>
    <mt-button @click="submit" :disabled="disabled" class="btn btn-submit">确定</mt-button>
    <div v-show="pickerVisible" class="address-picker">
        <p @click="pickCity" class="tit">完成</p>
        <mt-picker  :slots="slots" @change="onValuesChange" :value-key="slots[2].values.citysName"></mt-picker>
    </div>
    <msg-box v-if="msgVisible" :content="msg"/>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import areas from '@/assets/js/area.js'
import MsgBox from '@/components/common/MsgBox'
// 新增地址 页面
export default {
  name: 'AddAddress',
  components:{
      MsgBox
  },
  watch:{
    'form.name'(newVal,oldVal){
       this.disabledChange()
    },
    'form.phone'(newVal,oldVal){
       this.disabledChange()
    },
    'form.address'(newVal,oldVal){
       this.disabledChange()
    },
    'form.city'(newVal,oldVal){
       this.disabledChange()
    },
    'form.province'(newVal,oldVal){
       this.disabledChange()
    },
  },
  data () {
    return {
        msg:'添加成功',
        form:{
            name:'',
            phone:'',
            address:'',
            city:'',
            province:''
        },
        slots: [
            {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'right'
            }, {
            divider: true,
            content: '-',
            className: 'slot2'
            }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'left',
            }
        ],
        province:'',
        city:'',
        pickerVisible:false,
        disabled:true,
        msgVisible:false,
    }
  },
  mounted(){
     Common.InitImg()
     const data = areas.areas
     for(var i in data){
         this.slots[0].values.push(data[i].provinceName)
     }
  },
  methods:{
      disabledChange(){
          if(this.form.name!='' &&this.form.phone!='' && this.form.address!=''&& this.form.city!=''&&this.form.province!=''){
              this.disabled = false
          }else{
            this.disabled = true
          }
      },
     submit(){
        const _this = this;
        // 新增address-add
        let data = new FormData();
        data.append('token',localStorage.getItem('qtoken'))
        data.append('user_name',this.form.name)
        data.append('phone',this.form.phone)
        data.append('province',this.form.province)
        data.append('city',this.form.city)
        data.append('address',this.form.address)
        // 课程详情
        this.ajax({
            url: "/member/address-add",
            type:'post',
            data,
            success(data) {
                _this.msgVisible = true
                _this.msg = data.msg
                setTimeout(function(){
                    _this.msgVisible = false
                    if(data.code == 0){
                         _this.$router.push('/my-address/' +_this.$route.params.id)
                    }
                },1000)
            }
        })
     },
     onValuesChange(picker, values) {
        const data = areas.areas
        var cityArr = [];
        for(var i in data){
            if(picker.getSlotValue(0) == data[i].provinceName){
                var citys = data[i].citys
                for(var j in citys){
                    cityArr.push(citys[j].citysName)
                }
            }
        }
        this.slots[2].values = cityArr;
        this.province = picker.getSlotValue(0)
        this.city = picker.getSlotValue(1)
    },
    showPicker(){
        this.pickerVisible = true;
    },
    pickCity(){
        this.pickerVisible = false;
        this.form.province = this.province;
        this.form.city = this.city;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .add-address{
        width:100%;
        background:#f5f5f5;
        height:100%;
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
        .city{
            position: relative;
            width:100%;
            height:14.7vw;
            background:#fff;
            span{
                line-height: 14.7vw;
                color:#333;
                font-size:4.3vw;
            }
            i{
                line-height: 14.7vw;
                font-size: 7vw;
                color: #999;
                position: absolute;
                right: 0.7vw;  
            }
            .placeholder{
                color:#999;
                font-size:3.8vw
            }
        }
        .address-picker{
            width:100%;
            background:#fff;
            position: absolute;
            bottom:0;
            left:0;
            .tit{
                border-bottom: 1px solid #ccc;
                text-align: right;
                padding-right: 2.7vw;
                font-size: 4.3vw;
                height: 10vw;
                line-height: 10vw;
                color: #63AAF5;
            }
        }
    }
</style>
<style lang="less">
    body{
        font-family: "PingFangSC","Hiragino Sans GB","Helvetica Neue",Helvetica,tahoma,arial,Verdana,sans-serif,"WenQuanYi Micro Hei","\5B8B\4F53"
    }
    .add-address{
        .top{
            input::-webkit-input-placeholder{
                color:#999;
            }
        }
        .mint-cell-wrapper,.mint-cell:last-child{
            padding:0;
            background-size:0;
        }
        .mint-cell,.city{
            border-bottom:1px solid #ccc;
        }
        .mint-cell:last-child{
            border:0;
        }
        .mint-cell-title,.city span:nth-child(1){
            display: inline-block;
            text-align:left;
            width:16vw!important;
        }
        .picker-slot-right,.picker-slot-left{
            text-align:center!important;
        }
    }
</style>

