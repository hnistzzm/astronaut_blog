import Vue from 'vue'
import Router from 'vue-router'
import HomeCenter from "@/view/Home";
import BlogCenter from "@/view/blog/BlogNavigation";
import MyBlog from "@/view/blog/MyBlog";
import Classification from "@/view/blog/Classification";
import BlogHome from "@/view/blog/BlogHome"
import writeBlog from "@/view/blog/WriteBlog";
import BlogView from "@/view/blog/BlogView";
import SearchBlogs from "@/view/blog/SearchBlogs";
import UserCenter from "@/view/blog/UserCenter";
import PersonalData from "@/view/blog/PersonalData";
import AccountSettings from "@/view/blog/AccountSettings";



Vue.use(Router)

const  router = new Router({
  mode:'history',
  routes:[
    {path:'/',redirect:'/home'},
    {path:'/home',component:HomeCenter,meta:{title:'astronaut'}},
    {path:'/writeBlog',component:writeBlog,meta:{title:'写文章'}},
    {path:'/blogView',component:BlogView,meta:{title:'查看文章'}},
    {path:'/myBlog',component:MyBlog,meta:{title:'我的博客',isAuth:true}},
    {path:'/search',component:SearchBlogs,meta:{title:'搜索文章'}},
    {path:'/blogCenter',component:BlogCenter,meta:{title:'博客中心'},
      redirect:'/blogCenter/blogHome',
      children:[
        {path:'blogHome',component:BlogHome,meta:{title:'博客首页'}},
        {path:'classify',component:Classification,meta:{title:'分类'}}
      ]
    },
    {path:'/userCenter',component:UserCenter,meta:{title:'个人中心',isAuth:true},
      redirect:'/userCenter/personalData',
      children:[
        {path:'personalData',component:PersonalData,meta:{title:'用户资料',isAuth:true}},
        {path:'account',component:AccountSettings,meta:{title:'账号设置',isAuth:true}},
      ]
    },
  ]
})

router.beforeEach((to,from,next)=>{
  if(to.meta.isAuth){
    const tokenStr = window.sessionStorage.getItem('token')
    if(!tokenStr){
      return next('/home')
    }
  }
  next()
})
router.afterEach((to,from)=>{
  if(to.meta.title){
    document.title = to.meta.title
  }
})
export  default  router
