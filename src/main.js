import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import {mixin} from './mixin/index'
import store from './store/index'
import './plugins/element.js'
import './assets/css/global.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
//引入全局混入
Vue.mixin(mixin)
// 关闭Vue的生产提示
Vue.config.productionTip = false

Vue.use(mavonEditor)
import axios from 'axios'
//在连接端口之前，通过axios拦截器添加token，保证拥有获取数据的权限.
axios.interceptors.request.use(config=>{
  console.log("vuex中的token",store.state.token);
  //为请求头对象添加token验证的Authorization字段
  if(store.state.token){
     config.headers.Authorization=store.state.token
  }
  return config
})
axios.defaults.baseURL="http://localhost:8090/"
//axios.defaults.baseURL="http://211.69.238.167:8090/"
axios.defaults.withCredentials=false
Vue.prototype.$http=axios
//render的功能
//render实际上就是一个函数，它将app指定为creatElement函数的具体内容并且返回给页面
//实际上就是
// render(createElement){
// return createElement(App)
//}
//在这里使用render函数而不是使用template模板解析组件是因为Vue默认使用更精简的运行版Vue，这样可以在开发过程中
//节约内存，如果一定要使用template模板解析器，需要引入完整版Vue(不推荐，没必要)
//import Vue from 'vue/dist/vue.js'
new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
})
Vue.prototype.HOST = "/"
