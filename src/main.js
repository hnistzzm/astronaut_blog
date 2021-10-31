import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import {mixin} from './mixin/index'
import './router/index'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
axios.defaults.baseURL="http://localhost:8085/admin"
// axios.defaults.withCredentials=false
Vue.prototype.$http=axios
Vue.config.productionTip = false
Vue.mixin(mixin)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
