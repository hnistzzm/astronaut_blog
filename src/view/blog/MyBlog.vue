<template>
<div class="container">
  <el-header>
    <PriNavTop></PriNavTop>
  </el-header>

  <div style="height: 50px;margin-top: 60px;">
    <el-row :gutter="30">
      <el-col :span="10"><div class="grid-content bg-purple">
        介绍
      </div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple-light">
              <el-tag type="success">标签二</el-tag>
              <el-tag type="info">标签三</el-tag>
              <el-tag type="warning">标签四</el-tag>
              <el-tag type="danger">标签五</el-tag>
      </div>
      </el-col>
      <el-col :span="6"><div class="grid-content bg-purple"><span style="font-size: 25px;color: black">Boys will be boys</span></div></el-col>
    </el-row>
  </div>

  <el-divider></el-divider>
  <div class="block">
    <el-timeline :reverse="reverse">
      <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp">
        {{activity.content}}
      </el-timeline-item>
    </el-timeline>
  </div>
  <div class="blog">
    <el-input placeholder="请输入博客名称" clearable v-model="queryInfo.query">
      <el-button slot="append" icon="el-icon-search" @click="searchBlog()"></el-button>
    </el-input>
    <el-timeline :reverse="reverse">
      <el-timeline-item :timestamp=item.blogTime placement="top" v-for="(item,index) in blogList" :key="index">
        <!-- <el-card>
          <div @click="blogView(item.blogId)" style="cursor: pointer">
            <p class="blog-title">{{item.blogTitle}}</p>
            <p class="blog-time">{{item.blogTime}}</p>
          </div>
        </el-card> -->
        <blogCard :blogInfo="item" width="900px"></blogCard>
      </el-timeline-item>
    </el-timeline>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[5, 8, 10, 12]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
import PriNavTop from '../../components/blog/PriNavTop'
import BlogCard from '../../components/blog/BlogCard.vue'
export default {
  data(){
    return{
      //查询参数
      queryInfo:{
        //搜索的关键字
        query:'',
        //每页的博客数量
        pageSize:5,
        //当前页
        pageNum:1
      },
      //获取到的博客总数
      total:0,
      reverse:false,
      //获取到的博客列表
      blogList:[],
      activities: [{
        content: '活动按期开始',
        timestamp: '2018-04-15'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }]
    }
  },
  components:{PriNavTop,BlogCard},
  computed:{
     ...mapState(['loginState','userInfo'])
  },
  created() {
    this.getBlogList()
  },
  methods:{
      async getBlogList(){
        const {data : res} =await this.$http.post('/getBlogList',JSON.stringify(this.queryInfo) )
        console.log(res)
        if(res.meta.status===201){
          this.blogList = res.data.blogList
          this.total = res.data.total
        }else{
          if(res.meta.status===0){
            return this.$message.error('请先登录!')
          }else{
            return this.$message.error('token令牌失效,请重新登录!')
          }
        }

      },
      //分页操作
      handleSizeChange(newSize){
        this.queryInfo.pageSize=newSize
        this.getBlogList()
      },
      handleCurrentChange(newPage){
        this.queryInfo.pageNum=newPage
        this.getBlogList()
      },
      //搜索博客
      searchBlog(){
        this.queryInfo.pageNum = 1
        this.getBlogList()

      },
      menuRoute(key){
        if(key === 'blogCenter'){
          this.$router.push('/blogCenter/blogHome')
        }
      },
      userRouter(key){
        if(key === 'myBlog'){
          this.$router.push('/myBlog')
        }else if(key === 'layout'){
          this.logOut()
        }else if(key === 'userCenter'){
          this.$router.push('userCenter')
        }
      }
  },

}
</script>

<style scoped Lang="less">
.container{
  height: 100%;
  width: 100%;
  position: relative;
  background-color: rgb(242,242,242);
  overflow-y: scroll;
}
.head-container{
  display: flex;
  background-color: white;
  align-items: center;
  /* border: 1px solid red; */
  height: 50px;
  position: relative;

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

.block{
  position: absolute;
  top: 25%;
  left: 20%;
  /* border:1px solid red; */
  width:300px
}
.blog{
  margin: 10px auto 50px auto;
  width: 40vw;
  /* border: 1px solid red; */
}
.blog-title{
  color: #222226;
  font-weight: 500;
  font-size: 18px;
}
.blog-title:hover{
  color: red;
}
.blog-time{
  color: #999999;
}
.blog>.el-timeline>.el-timeline-item>.el-card{
  width:20vw;
}
.blog>.el-pagination{
  padding-left: 100px;
}
.blog>.el-input {
  position: relative;
  left: 70%;
  width: 300px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
