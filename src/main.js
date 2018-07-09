// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'//引入饿了么UI
import 'element-ui/lib/theme-chalk/index.css'
//全局引入js css(js已在/build/webpack.base.conf.js中引入)
import $ from 'jquery'
import '../static/js/bootstrap/bootstrap-3.3.7-dist/js/bootstrap.js'
import '../static/js/bootstrap/bootstrap-3.3.7-dist/css/bootstrap.css'
import '../static/js/match.js'
import '../static/css/match.css'

import Axios from 'axios'//引入axiosee
Axios.defaults.baseURL = 'http://47.97.223.234:8888'
// 'http://47.97.223.234:8888'  http://127.0.0.1:8880  http://127.0.0.1:8889
Vue.prototype.$axios = Axios//挂载属性

Vue.use(ElementUI, { size: 'medium' })//饿了么配置

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
