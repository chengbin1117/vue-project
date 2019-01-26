<template>
  <div  class="order-list">   
    <div class="order-tab f-r">
        <span @click="tabClick($event,'1')" class="active tabname">实物订单</span>
        <span @click="tabClick($event,'2')" class="tabname">虚拟订单</span>
    </div>
    <div class="order-type f-r-sb">
        <span v-if="!isVirtual" @click="changType(item)" :class="item.class" v-for="(item,index) in orderType" :key="index">{{item.name}}</span>
        <span v-if="isVirtual" @click="changType(item)" :class="item.class" v-for="(item,index) in vOrderType" :key="index">{{item.name}}</span>
    </div>
    <div class="order-content">
        <order-list-status v-if="visible" :isVirtual="isVirtual" :list="orderList" :onChange="getMoreList" :getDataHandel="getData"/>
        <div v-else class="no-data f-c">
            <img src="../../assets/img/zanwudingdan@2x.png" />
            <span class="font14 color999">暂无相关订单，可以看看其他的哦~</span> 
        </div>
        <p style="padding:2.7vw 0;"  v-if="loadMore" class="content-footer color999 font12">这里是底线~</p>
    </div>
  </div>
</template>
<script>
import Common from '@/assets/js/common.js'
import OrderListStatus from "@/components/common/OrderListStatus";

// 订单列表页面
export default {
  name: 'OrderList',
  components:{
      OrderListStatus
  },
  watch:{
      orderList(){
        Common.InitImg()
      }
  },
  data () {
    return {
        orderType:[
            {name:'全部',id:'1',class:'typename active',order_status:null},
            {name:'待付款',id:'2',class:'typename',order_status:0},
            {name:'待发货',id:'3',class:'typename',order_status:10},
            {name:'待收货',id:'4',class:'typename',order_status:20},
            {name:'已完成',id:'5',class:'typename',order_status:40},
        ],// 实物订单状态
        vOrderType:[
            {name:'全部',id:'1',class:'vtypename active',order_status:null},
            {name:'待付款',id:'2',class:'vtypename',order_status:0},
            {name:'已完成',id:'5',class:'vtypename',order_status:40},
        ],// 虚拟订单状态
        orderList:[{}], // 订单列表
        isVirtual:false, // tab类型
        orderStatus:1, // 实物订单状态
        vOrderStatus:1, // 虚拟订单状态
        page:1,
        order_status:null,
        visible:true,
        loadMore:false
    }
  },
  created(){
      this.order_status = this.$route.params.id == '-1' ? null : this.$route.params.id
        if(!this.isVirtual){
            for(var i in this.orderType){
                this.orderType[i].class = 'typename'
            }
            this.orderType.forEach( item=>{
                if(item.order_status == this.order_status){
                    item.class = 'typename active'
                }
            })
        }
      this.getData()
  },
  mounted(){
     Common.InitImg()
  },
  methods:{
    getMoreList(){
        if(this.loadMore){
                return
            }
            this.page++
            const _this = this;
            let data = new FormData();
            data.append('token',localStorage.getItem('qtoken'))
            data.append('order_type',this.isVirtual ? 10 : 20)
            data.append('page',this.page)
            if(this.order_status != null){
                data.append('status',this.order_status)
            }
            this.loadMore = true
            this.ajax({
                url: "/user/order-list",
                type:'post',
                data,
                success(data) {
                    if(data.data.length == 0){
                        _this.loadMore = true
                        return
                    }
                    _this.loadMore = false
                    data = data.data;
                    data.forEach(item=>{
                        _this.orderList.push(item)
                    })
                }
            })
        },
      getData(){
        const _this = this;
        let data = new FormData();
        data.append('order_type',this.isVirtual ? 10 : 20)
        data.append('page',this.page)
        data.append('token',localStorage.getItem('qtoken'))
        if(this.order_status != null){
            data.append('status',this.order_status)
        }
        // 课程详情
        this.ajax({
            url: "/user/order-list",
            type:'post',
            data,
            success(data) {
                if(data.data.length == 0){
                    _this.visible = false
                    return
                }
                _this.visible = true
                _this.orderList = data.data
            }
        })  
      },
      tabClick(e,item){
        const target = e.target;
        const _tabs = document.getElementsByClassName('tabname');
        for(var i=0,l=_tabs.length;i<l;i++){
            _tabs[i].className = 'tabname'
        }
        target.className = 'active tabname'
        this.isVirtual = item === '1' ? false: true
        this.page = 1
        this.getData()
      },
      changType(item){
        if(!this.isVirtual){
            for(var i in this.orderType){
              this.orderType[i].class = 'typename'
            }
            item.class = 'typename active'
            this.orderStatus = item.id
        }else{
            for(var i in this.vOrderType){
              this.vOrderType[i].class = 'vtypename'
            }
            item.class = 'vtypename active'
            this.vOrderStatus = item.id
        }
        this.order_status = item.order_status;
        this.page = 1
        this.getData()

      },
      getOrderList(){
        //   this.orderList.push( {img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2393687535,4107070201&fm=27&gp=0.jpg',name:'米娜',tit:'标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题',type:'英语',class:'10节课',classType:"免费",num:'1002'})
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .order-list{
        width:100%;
        background:#f5f5f5;
        height:100%;
        padding-top:2.7vw;
        .order-tab{
            width:64vw;
            height:11.8vw;
            border-radius: 5.9vw;
            background:#fff;
            border:1px solid #eb4c49;
            margin:0 auto;
            margin-bottom:2.7vw;
            overflow: hidden;
            span{
                display: inline-block;
                width:50%;
                line-height: 11.8vw;
                background:#fff;
                color:#eb4c49;
                font-size:4.8vw;
            }
            .active{
                background:#eb4c49;
                color:#fff;
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
                margin-top:34.7vw;
                margin-bottom:6vw;
            }
        }
        .order-type{
            width:100%;
            height:12vw;
            line-height: 12vw;
            background:#fff;
            padding:0 5.4vw;
            span{
                font-size:4.3vw;
                color:333;
                padding-bottom:2.7vw;
            }
            .active{
                color:#eb4c49;
                border-bottom:2px solid #eb4c49;
            }
        }
        .order-content{
            background:#f5f5f5;
            margin-top:2.7vw;
            padding-bottom:13.4vw;
        }
    }
</style>
