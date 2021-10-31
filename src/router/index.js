import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/User/Login'
import Home from '../components/User/Home'
import UserManage from '../components/User/UserManage';
import BlogManage from '../components/Blog/BlogManage';
Vue.use(Router)
const  router = new Router({
    routes:[
        {path:'/',redirect:'/login'},
        {path:'/login',component:Login},
        {path:'/home',component:Home,
          children:[
            {path:'userManage',component:UserManage},
            {path:'blogManage',component:BlogManage},
            {path:'recommendManage',component:BlogManage}
          ]
        }
    ]
  })
  export  default  router