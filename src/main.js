import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import './assets/css/reset.scss'
import './assets/css/base.scss'
import { formatDate } from './tools/tools'
import Loading from './plugin/loading/loading'
import MetaInfo from 'vue-meta-info'
// import Vconsole from 'vconsole'
// Vue.config.productionTip = false
// const vConsole = new Vconsole()
// Vue.use(vConsole)
Vue.use(MetaInfo)
Vue.use(Loading)
Vue.use(VueLazyload, {
  loading: require('./assets/images/loading.png')// 懒加载使用的图片
})
FastClick.attach(document.body)
// 自定义过滤器
Vue.filter('formatDuration', function (value) {
  return formatDate('mm:ss', new Date(value))
})
new Vue({
  router,
  store,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event('x-app-rendered'))
}).$mount('#app')
