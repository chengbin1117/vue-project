<template>
    <div class="my-address">
        <!-- 非空地址 -->
        <div  v-if="visible" class="has-address">
            <div   class="list" v-for="(item,index) in data" :key="index">
                <div @click="chooseAddress(item)" class="t f-c">
                    <p class="info">
                        <span>{{item.user_name}}</span>
                        <span>{{item.phone}}</span>
                        <span v-if="item.is_default == 1" class="font14 colorbuy">[默认]</span>
                    </p>
                    <p class="site color666 font12">收货地址：{{item.province+item.city+item.district+item.address}}</p>
                </div>
                <div class="handel f-r-sb">
                    <div class="f-r l">
                        <div class="check" @click="checkDefault(item)">
                            <input type="checkbox">
                            <i v-if="item.is_default == 1" class="iconfont icon-xuanzhong colorbuy"></i>
                            <span v-else></span>
                        </div>
                        <span  class="color666 font14" style="line-height:12.8vw">设为默认</span>
                    </div>
                    <div class="f-r r">
                        <p @click="editor(item)"><i class="iconfont icon-cloud-redact"></i><span>编辑</span></p>
                        <p @click="del(item)"><i class="iconfont icon-shanchu2"></i><span>删除</span></p>
                    </div>
                </div>
            </div>
            <div class="foot-btn">
                <p @click="createAddress" class="btn">
                    <i class="iconfont icon-icon02"></i>
                    <span class="font18">添加新的收货地址</span>
                </p>
            </div>
        </div>
        <!-- 非空地址 -->
        <!-- 空地址 -->
        <div  v-if="!visible" class="empty-address f-c-c no-data">   
            <img src="../../assets/img/meiydizhi@2x.png"/>
            <p class="f-c-c">
                <span class="font14 color999">暂无收货地址哦~</span>
                <span @click="createAddress"  class="font14 color999">前往<span class="font14 colorblue">去添加</span></span>
            </p>
        </div>
        <!-- 空地址 -->
    </div>
</template>
<script>
import Common from '@/assets/js/common.js'

// 我的地址页面
export default {
  name: 'MyAddress',
  components:{
  },
  watch:{

  },
  data () {
    return {
        data:[], // 地址列表
        page:1,
        visible:true
    }
  },
  created(){
      this.getData()
      if(this.$route.params.id){
      }
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
      createAddress(){
        if(this.$route.params.id != '-1'){
            this.$router.push('/add-address/' + this.$route.params.id)
        }else{
            this.$router.push('/add-address/-1')
        }
      },
      chooseAddress(item){
        const _this = this;
        if(this.$route.params.id != '-1'){
            sessionStorage.setItem('address_id',item.id)
            _this.$router.push(localStorage.getItem('lastPath'))
        }
      },
      getData(){
        const _this = this;
        // 地址列表
        let addressdata = new FormData();
        addressdata.append('token',localStorage.getItem('qtoken'))
        addressdata.append('page',this.page)
        this.ajax({
            url: "/member/address-list",
            type:'post',
            data:addressdata,
            success(data) {
                if(data.data.length == 0){
                    _this.visible = false
                    return
                }
                _this.visible = true
                _this.data = data.data;
            }
        })
      },
      editor(item){
        this.$router.push('/editor-address/' + item.id)
      },
      del(item){
        const _this = this;
        // 删除地址
        let deldata = new FormData();
        deldata.append('token',localStorage.getItem('qtoken'))
        deldata.append('id',item.id)
        this.ajax({
            url: "/member/address-del",
            type:'post',
            data:deldata,
            success(data) {
                if(data.code == 0){
                    _this.getData()
                }
            }
        })
      },
      checkDefault(item){
          const _this = this;
          // 设置默认地址
          let data = new FormData();
          data.append('token',localStorage.getItem('qtoken'))
          data.append('id',item.id)
          this.ajax({
                url: "/member/address-default",
                type:'post',
                data,
                success(data) {
                    if(data.code == 0){
                        for(var i in _this.data){
                            _this.data[i].is_default = 0
                        }
                        if(item.is_default == 0){
                            item.is_default = 1
                        }else{
                            item.is_default = 0
                        }
                    }
                }
           })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .my-address{
        width:100%;
        min-height:100%;
        background:#f5f5f5;
        .empty-address{
            width:100%;
            height:100%; 
            img{
                display: inline-block;
                width:37.4vw;
                margin:0 auto;
                margin-bottom:7.5vw;
            }
            p{
                span{
                    line-height: 5.6vw;
                    a{
                        color:#63AAF5;
                    }
                }
            }
        }
        .no-data{
            position: fixed;
            width: 100%;
            height: 100%;
            background:#fff;
            left:0;
            // top:0;
            img{
                margin:0 auto;
                width:37.4vw;
                margin-bottom:6vw;
            }
        }
        .has-address{
            position: relative;
            width:100%;
            padding-bottom:16vw;
            .list{
                width:100%;
                min-height:33.1vw;
                background:#fff;
                margin-bottom:2.7vw;
                padding:2.7vw;
                padding-bottom:0;
                .t{
                    border-bottom:1px solid #ccc;
                    padding-bottom:3vw;
                    text-align: left;
                    .info{
                        margin-bottom:1vw;
                        span{
                            font-size:3.8vw;
                            color:#333;
                            margin-right:2.7vw;
                        }
                        .colorbuy{
                            color:#eb4c49;
                        }
                    }
                    .site{
                        width:83.8vw;
                        line-height: 4.8vw;
                    }
                }
                .handel{
                    width:100%;
                    height:11.8vw;
                    position: relative;
                    .check{
                        position: relative;
                        width:5.4vw;
                        height:100%;
                        margin-right:2.7vw;
                        i,input,span{
                            position: absolute;
                            top:-1vw;
                            bottom:0;
                            left:0;
                            right:0;
                            margin:auto;
                        }
                        input{
                            width: 4.3vw;
                            height: 100%;
                            z-index: 200;
                            opacity: 0;
                        }
                        span{
                            display: inline-block;
                            width:4.4vw;
                            height:4.4vw;
                            border-radius: 50%;
                            border:1px solid #ccc;
                        }
                        i{
                            z-index:100;
                            width:5.4vw;
                            height:5.4vw;
                            font-size:4.8vw;
                        }
                    }
                    .r{
                        p{
                            margin-left:8vw;
                            line-height: 11.8vw;
                            i{
                                margin-right:5px;
                                font-size:4.8vw;
                            }
                            span{
                                color:#333;
                                font-size:3.8vw;
                            }
                        }
                    }
                }
            }
            .foot-btn{
                width:100%;
                height:16vw;
                background:#fff;
                position: fixed;
                bottom:0;
                left:0;
                box-shadow: 0 3px 5px rgba(0,0,0,0.9);
                z-index:600;
                .btn{
                    display: inline-block;
                    width:86.7vw;
                    height:11.8vw;
                    line-height: 11.8vw;
                    border-radius: 5.9vw;
                    background:#eb4c49;
                    color:#fff;
                    margin:0 auto;
                    margin-top:2.1vw;
                    i{
                        font-size:4.6vw;
                    }
                }
            }
        }

    }

</style>
