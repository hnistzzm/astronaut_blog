<template>
<el-container style="height:100%;background-color: rgb(242,242,242);">
  <!--    头部区域-->
    <el-header>
      <PriNavTop></PriNavTop>
    </el-header>
    <el-container>
        <el-aside width="200px">
        <el-menu  :router="true">
            <el-menu-item index="/userCenter/personalData">用户资料</el-menu-item>
            <el-menu-item index="/userCenter/account">账号设置</el-menu-item>
        </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
    

</el-container>
</template>

<script>
import PriNavTop from '../../components/blog/PriNavTop'
export default {
  name: "PersonalCenter",
  data(){
    return{

    }
  },
  components:{PriNavTop},
}
</script>

<style scoped Lang="less">
.el-aside{
    margin-left: 15%;
    text-align: center;
     margin-top:100px;
}
.el-main{
  width: 30%;
  margin-right: 30%;
  padding: 0;
  margin-top: 100px;
  height: 1000px;

}
 .el-header{
  display: flex;
  background-color: white;
  align-items: center;
  position: relative;
}

</style>
