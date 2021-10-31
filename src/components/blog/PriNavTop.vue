<template>
    <div class="header">
        <div class="head-container-menus">
            <el-image :src="require('../../static/image/dreamboy.png')"></el-image>
            <p @click="menuRoute('blogCenter')">博客大厅</p>
            <p>首页</p>
            <p>专栏</p>
        </div>
        <div class="head-portrait">
        <el-dropdown @command="userRouter">
            <span class="el-dropdown-link">
                <el-image :src="url+userInfo.headPortrait" v-if="userInfo.headPortrait"></el-image>
            </span>
            <el-dropdown-menu slot="dropdown" split-button="true">
            <el-dropdown-item command="userCenter">个人中心</el-dropdown-item>
            <el-dropdown-item command="myBlog">我的博客</el-dropdown-item>
            <el-dropdown-item>内容管理</el-dropdown-item>
            <el-dropdown-item command="layout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        </div>
        <div class="creation">
            <el-button type="danger" style="border-radius: 20px" @click="$router.push('/writeBlog')">写博客</el-button>
        </div>
    </div>
  <!-- <el-header>785</el-header> -->
   
</template>

<script>
import {mapState} from 'vuex'
export default {
     name: "PersonalCenter",
  data(){
    return{

    }
  },
  computed:{
    ...mapState(['loginState','userInfo'])
  },
  created() {
    
  },
  methods:{
    userRouter(key){
      if(key === 'myBlog'){
        this.$router.push('/myBlog')
      }else if(key === 'layout'){
        this.logOut()
      }
    },
    menuRoute(key){
      if(key === 'blogCenter'){
        this.$router.push('/blogCenter/blogHome')
      }
    },
    
  }
}
</script>

<style scoped Lang="less">
.header{
  width: 100%;
   height: 50px;
  display: flex;
  background-color: white;
  align-items: center;
  position: relative;
  margin-bottom: 5px;

}
.head-container-menus{
  height: 100%;
  width: 20%;
  display: flex;
  margin-left: 10%;
}
.head-container-menus>p{
  height: 50px;
  width: 15%;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}
.head-container-menus>p:hover{
  background-color: rgb(240,240,245);
}
.head-container-menus .el-image{
  width: 50px;
  height: 50px;
  border-radius: 90%;
  margin-right: 5%;
  cursor: pointer;
}
.head-portrait{
  position: absolute;
  right: 20%;
}
.head-portrait .el-image{
  width: 45px;
  height: 45px;
  border-radius: 50%;

}
.creation{
  position: absolute;
  right: 10%;
}
</style>
