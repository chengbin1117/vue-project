import Vue from 'vue'
import Router from 'vue-router'

if (process.env.NODE_ENV === 'development') {
  Vue.use(Router)
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/#/',
      redirect: '/'
    },
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/components/index'], resolve)
    },
    {
      path: '/search',
      name: 'Search',
      component: resolve => require(['@/components/search/index'], resolve)
    },
    {
      path: '/public-class',
      name: 'PublicClass',
      component: resolve => require(['@/components/publicClass/index'], resolve)
    },
    {
      path: '/primary',
      name: 'Primary',
      component: resolve => require(['@/components/primary/index'], resolve)
    },
    {
      path: '/middle',
      name: 'Middle',
      component: resolve => require(['@/components/middle/index'], resolve)
    },
    {
      path: '/audio',
      name: 'Audio',
      component: resolve => require(['@/components/audio/index'], resolve)
    },
    {
      path: '/video',
      name: 'Video',
      component: resolve => require(['@/components/video/index'], resolve)
    },
    {
      path: '/good-class',
      name: 'GoodClass',
      component: resolve => require(['@/components/goodClass/index'], resolve)
    },
    {
      path: '/video-detail/:id/:read',
      name: 'VideoDetail',
      component: resolve => require(['@/components/videoDetail/index'], resolve)
    },
    {
      path: '/audio-detail/:id/:read',
      name: 'AudioDetail',
      component: resolve => require(['@/components/audioDetail/index'], resolve)
    },
    {
      path: '/class-order/:course_id',
      name: 'ClassOrder',
      component: resolve => require(['@/components/classOrder/index'], resolve)
    },
    {
      path: '/class-order-detail',
      name: 'ClassOrderDetail',
      component: resolve => require(['@/components/classOrderDetail/index'], resolve)
    },
    {
      path: '/pay-success/:id/:type',
      name: 'PaySuccess',
      component: resolve => require(['@/components/paySuccess/index'], resolve)
    },
    {
      path: '/recommend-teacher',
      name: 'RecommendTeacher',
      component: resolve => require(['@/components/recommendTeacher/index'], resolve)
    },
    {
      path: '/teacher-detail/:id',
      name: 'TeacherDetail',
      component: resolve => require(['@/components/teacherDetail/index'], resolve)
    },
    {
      path: '/exercises/:id/:course_id',
      name: 'Exercises',
      component: resolve => require(['@/components/exercises/index'], resolve)
    },
    {
      path: '/result/:id/:course_id',
      name: 'Result',
      component: resolve => require(['@/components/result/index'], resolve)
    },
    {
      path: '/mistakes/:id/:catalog_id/:num',
      name: 'Mistakes',
      component: resolve => require(['@/components/mistakes/index'], resolve)
    },
    {
      path: '/study/:id',
      name: 'Study',
      component: resolve => require(['@/components/study/index'], resolve)
    },
    {
      path: '/collect',
      name: 'MyCollect',
      component: resolve => require(['@/components/myCollect/index'], resolve)
    },
    {
      path: '/my-mistakes',
      name: 'MyMistakes',
      component: resolve => require(['@/components/myMistakes/index'], resolve)
    },
    {
      path: '/store',
      name: 'Store',
      component: resolve => require(['@/components/store/index'], resolve)
    },
    {
      path: '/goods-detail/:id',
      name: 'GoodsDetail',
      component: resolve => require(['@/components/goodsDetail/index'], resolve)
    },
    {
      path: '/goods-order/:id',
      name: 'GoodsOrder',
      component: resolve => require(['@/components/goodsOrder/index'], resolve)
    },
    {
      path: '/goods-order-detail',
      name: 'GoodsOrderDetail',
      component: resolve => require(['@/components/goodsOrderDetail/index'], resolve)
    },
    {
      path: '/msg',
      name: 'Msg',
      component: resolve => require(['@/components/msg/index'], resolve)
    },
    {
      path: '/system-msg',
      name: 'SystemMsg',
      component: resolve => require(['@/components/systemMsg/index'], resolve)
    },
    {
      path: '/mine',
      name: 'Mine',
      component: resolve => require(['@/components/mine/index'], resolve)
    },
    {
      path: '/order-list/:id',
      name: 'OrderList',
      component: resolve => require(['@/components/orderList/index'], resolve)
    },
    {
      path: '/order-detail/:id',
      name: 'OrderDetail',
      component: resolve => require(['@/components/orderDetail/index'], resolve)
    },
    {
      path: '/my-integral',
      name: 'MyIntegral',
      component: resolve => require(['@/components/myIntegral/index'], resolve)
    },
    {
      path: '/integral-rule',
      name: 'IntegralRule',
      component: resolve => require(['@/components/integralRule/index'], resolve)
    },
    {
      path: '/integral-detail',
      name: 'IntegralDetail',
      component: resolve => require(['@/components/integralDetail/index'], resolve)
    },
    {
      path: '/integral-store/:id',
      name: 'IntegralStore',
      component: resolve => require(['@/components/integralStore/index'], resolve)
    },
    {
      path: '/integral-order/:id',
      name: 'IntegralOrder',
      component: resolve => require(['@/components/integralOrder/index'], resolve)
    },
    {
      path: '/my-address/:id',
      name: 'MyAddress',
      component: resolve => require(['@/components/myAddress/index'], resolve)
    },
    {
      path: '/add-address/:id',
      name: 'AddAddress',
      component: resolve => require(['@/components/addAddress/index'], resolve)
    },
    {
      path: '/editor-address/:id',
      name: 'EditorAddress',
      component: resolve => require(['@/components/editorAddress/index'], resolve)
    },
    {
      path: '/my-info',
      name: 'MyInfo',
      component: resolve => require(['@/components/myInfo/index'], resolve)
    },
    {
      path: '/feed-back',
      name: 'FeedBack',
      component: resolve => require(['@/components/feedBack/index'], resolve)
    },
    {
      path: '/sign',
      name: 'Sign',
      component: resolve => require(['@/components/sign/index'], resolve)
    },
    {
      path: '/chat/:tid',
      name: 'Chat',
      component: resolve => require(['@/components/chat/index'], resolve)
    },
    {
      path: '/bind-phone',
      name: 'BindPhone',
      component: resolve => require(['@/components/bindPhone/index'], resolve)
    },
    {
      path: '/fix-phone',
      name: 'FixPhone',
      component: resolve => require(['@/components/fixPhone/index'], resolve)
    },
    {
      path: '/about-us',
      name: 'AboutUs',
      component: resolve => require(['@/components/aboutUs/index'], resolve)
    },
    {
      path: '/invite',
      name: 'Invite',
      component: resolve => require(['@/components/invite/index'], resolve)
    }
    // {
    //   path: '/bind-phone',
    //   name: 'BindPhone',
    //   component: resolve => require(['@/components/bindPhone/index'], resolve)
    // }
  ]
})
