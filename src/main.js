import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import TypeNav from './components/TypeNav'
import Pagination from './components/Pagination'

import {MessageBox} from 'element-ui'

import './mock/mockServe'

Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

import "swiper/swiper-bundle.min.css"
// 图片懒加载
import VueLazyload from 'vue-lazyload'
import loading from './assets/loading.gif'

import './plugins/validate' 

// 图片懒加载
Vue.use(VueLazyload,{
  loading:loading
})

new Vue({
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  render: h => h(App),
}).$mount('#app')
