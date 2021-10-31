<template>
    <el-header>
        <div class="top-navbar">
            <div class="blog-navbar">
                <ul class="blog-navbar-ul">
                    <li><router-link to="/blogCenter/blogHome" active-class="active">大厅</router-link></li>
                    <li><router-link to="/blogCenter/classify" active-class="active">分类</router-link></li>
                    <li><router-link to="" >标签</router-link></li>
                    <li><router-link to="" >一起学习</router-link></li>
                    
                </ul>
            </div>
            <div class="blog-option">
                <div class="blog-option-search">
                    <el-input 
                        prefix-icon="el-icon-search"
                        placeholder="搜点什么"
                        v-model="searchKey"
                        @keyup.enter.native="searchBlog">
                    </el-input>
                </div>
                <div class="blog-option-write" @click="$router.push('/writeBlog')">
                    <i class="el-icon-edit-outline"></i>
                    <span>写博客</span>
                </div>
                <div class="blog-option-user">
                    <el-dropdown @command="userRouter">
                        <span class="el-dropdown-link">
                        <el-image :src="url+userInfo.userHeadPortrait" v-if="userInfo.userHeadPortrait"></el-image>
                        <el-image :src="require('../../static/image/user.png')" v-else></el-image>
                        </span>
                        <el-dropdown-menu slot="dropdown" split-button="true">
                        <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
                        <el-dropdown-item command="myBlog">我的博客</el-dropdown-item>
                        <el-dropdown-item>内容管理</el-dropdown-item>
                        <el-dropdown-item command="layout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
           

        </div>
        
    </el-header>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "BlogCenter",
  data(){
    return{
      searchKey:''
    }
  },
  computed:{
     ...mapState(['loginState','userInfo'])
  },
  methods:{
    searchBlog(blogClassify){
      let routeUrl=this.$router.resolve({path:'/search',query:{searchKey:this.searchKey,classify:'',store:JSON.stringify(this.$store.state) }})
      window.open(routeUrl.href, '_blank');
    },
    userRouter(instructions){
      if(instructions==='myBlog'){
        this.$router.push('/myBlog')
      }else if(instructions==='layout'){
        this.layout()
      }else if(instructions === 'userCenter'){
        this.$router.push('/userCenter')
      }
    },
    //退出登录
    layout(){
      console.log("退出登录")
      //销毁session
      window.sessionStorage.clear();
      this.$router.push('/home')
    },
  }
}
</script>

<style scoped Lang="less">
.el-header{
  position: relative;
  padding: 0;
  width: 100%;
  background-color: rgb(30, 30, 30);
}
.el-dropdown-link .el-image{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.search-input{
  border-radius: 10px;
  width: 500px;
}
.el-menu{
  width: 100%;
  display: flex;
  justify-content: center;
  
}
.top-navbar{
    width: 1200px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
}
.blog-navbar{
    height: 100%;
    width: 300px;
    position: relative;
}
.blog-navbar-ul{
    font-size: 15px;
    height: 100%;
    color: #999999;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.blog-navbar-ul>li{
    margin-right: 20px;
}
.blog-navbar-ul a{
    color: #999999;
    text-decoration-line: none;
}
.blog-navbar-ul a:hover{
    color: #FFFFFF;
    cursor: pointer;
    
}
.blog-navbar-ul:active{
    color: yellow;
}
.blog-option{
    width: 400px;
    height: 100%; 
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.blog-option-search .el-button{
    background-color: rgb(57, 57, 57);
    border: none;
}
::v-deep .el-input__inner{
  background-color: rgb(57, 57, 57);
  border-width: 0;
  color: aliceblue;
}
.blog-option-write{
    color: #999999;
    font-size: 15px;
}
.blog-option-write:hover{
    color: #FFFFFF;
    cursor: pointer;
}
.blog-option-user .el-image{
    width: 40px;
    height: 40px;
}

@media screen and  (min-width: 1200px) {
    .blog-option{
        
    }

}

@media screen and (max-width:1200px) and (min-width: 900px) {
    .blog-option{
        position: absolute;
        right: 0;
    }

}
@media screen and (max-width:900px)  {
    .blog-option{
        width: 400px;
        height: 100%;
        margin-left: 180px;
    }
    .top-navbar{
        justify-content: left;
    }

}
.active{
    color: gold !important;
    text-decoration-line: none;
    
    
}
</style>