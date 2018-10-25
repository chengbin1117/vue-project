// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import './assets/style/reset.css'

import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import store from './store'
import 'mint-ui/lib/style.css'
import { Button, Swipe, SwipeItem, Spinner, InfiniteScroll, Field, Picker, Radio, Loadmore } from 'mint-ui'
import VideoPlayer from 'vue-video-player'
import myaxios from './assets/js/request'
// Vue.use(Lazyload)
Vue.component(Button.name, Button)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Spinner.name, Spinner)
Vue.component(Field.name, Field)
Vue.component(Picker.name, Picker)
Vue.component(Radio.name, Radio)
Vue.component(Loadmore.name, Loadmore)
Vue.use(InfiniteScroll)
Vue.use(VueLazyLoad, {
  error: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537165022822&di=4e20530afbabe12775d8b28f585d8067&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01c3a156052ea232f875a132de20c4.gif',
  loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537165022822&di=4e20530afbabe12775d8b28f585d8067&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01c3a156052ea232f875a132de20c4.gif'
})
Vue.use(VideoPlayer)
Vue.use(myaxios)
Vue.config.productionTip = false
console.log('token', localStorage.getItem('qtoken'))

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('qtoken')
  if (to.name != 'index' && !token) {
    next({path:'/'})
  } else {
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
