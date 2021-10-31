<template>
<div>
<!--  style="position: absolute;top: 10%;left: 20%"-->
  <div class="container">
    <el-backtop target=".container">
      <i class="el-icon-caret-top"></i>
    </el-backtop>
    <div class="author-info">
        <div class="author-intro">
            <div class="basis-info">
              <el-image :src="url+authorInfo.headPortrait"></el-image>
              <p>{{authorInfo.nickName}}</p>
            </div>
            <el-divider></el-divider>
            <div class="author-achieve">
              <p>博客数:{{authorInfo.blogquantify}}</p>
              <p>点赞数:</p>
              <p>粉丝数:</p>
            </div>
        </div>

      <div class="blog-search">
        <el-input placeholder="请输入博客名称" clearable v-model="query">
          <el-button slot="append" icon="el-icon-search" ></el-button>
        </el-input>
      </div>
      <div class="popular-blog">
        <p style="font-size: 18px;font-weight: 600;line-height: 30px;padding-left: 15px;height: 30px;margin-top: 15px">热门文章</p>
        <el-divider></el-divider>
        <ul class="popularBlog-lists">
          <li>css学习笔记</li>
          <li>css学习笔记</li>
          <li>css学习笔记</li>
          <li>css学习笔记</li>
          <li>css学习笔记</li>
        </ul>
      </div>
      <div class="new-blog">
        <p style="font-size: 18px;font-weight: 600;line-height: 30px;padding-left: 15px;height: 30px;margin-top: 15px">最新文章</p>
        <el-divider></el-divider>
        <ul class="popularBlog-lists">
          <li v-for="(item,index) in exhibitBlogs.latestBlogs" :key="index" @click="getExhibitBlog(item.blog_id)">{{item.blog_title}}</li>
        </ul>
      </div>
    </div>

    <div class="blog-container">
        <div class="title">
        <p>{{blog.blogTitle}}</p>
        </div>
        <div class="blogIntro">
        <p class="item">{{authorInfo.nickName}}</p>
        <p class="item">{{blog.blogTime}}</p>
        <div class="button" v-if="blog.blogAuthorId === userInfo.userId">
            <el-button type="primary" icon="el-icon-edit" @click="blogEdit()"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="blogDelete()"></el-button>
        </div>
        </div>
        <el-divider></el-divider>
        <div class="blog-content">
            <mavon-editor
                :value="blog.blogContent"
                defaultOpen="preview"
                :boxShadow="false"
                style="z-index:1;width: 50vw"
                :editable="false"
                :subfield="false"
                :toolbarsFlag="false"
            >
            </mavon-editor>
        </div>
  </div>
  <div class="blog-comment">
        <el-input
        class="blog-comment-textarea" 
        type="textarea" 
        :rows="5"
        >
        </el-input>
        <el-button>发布</el-button>
  </div>



  </div>

</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "BlogVIEW",
  data(){
    return{
      //主博客的内容
      blog:{},
      //搜索的博客的关键词
      query:'',
      //作者信息
      authorInfo:{},
      //展示的博客信息(热门文章，最新文章)
      exhibitBlogs:{},
      // //主博客的id
      blogId:'',
      // userId:'',
    }
  },
  computed:{
     ...mapState(['loginState','userInfo'])
  },
  created(){
    this.blogId = this.$route.query.blogId
    this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(this.$route.query.store)));
    this.getBlog()
  },
  methods:{
    async getBlog(){
        const {data : res} = await this.$http.post('/getNowBlog',this.blogId)
        console.log("获取到的数据",res)
        this.blog=res.data.blog
        this.authorInfo= res.data.authorInfo
        this.exhibitBlogs = res.data.exhibitBlogs
    },
    //点击展示的博客，跳转进新的博客页面
    async getExhibitBlog(blogId){
        this.blogId =blogId
        await this.getBlog()
    },
    blogEdit(){
      console.log("blogid",this.blogId)
      this.$router.push({
        path:'/writeBlog',
        query:{blogId:this.blogId}
      })
    },

    async blogDelete(){
      const confirmResult = await this.$confirm('此操作将永久删除该博客,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      //如果用户确定删除，则返回值为字符串confirm
      //如果用户取消了删除，则返回值为字符串cancel
      //console.log(confirmResult)
      if(confirmResult !=='confirm'){
        return this.$message.info('已取消删除')
      }
      const {data : res} = await this.$http.get('/deleteBlog?blogId='+this.blogId)
      console.log("获取到的响应",res)
      if(res.meta.status===0){
        this.$message.success('您还未登录!')
        return this.$router.push('./home')
      }else if(res.meta.status===1){
        this.$message.success('登录信息失效,请重新登录!')
        return this.$router.push('./home')
      }else{
        this.$message.success('删除成功!')
        return this.$router.push('./myBlog')
      }
    }
  }
}
</script>

<style scoped Lang="less">
*{
  padding: 0;
  margin: 0;
}
.container{
  /* display:flex; */
  width: 100%;
  height: 100vh;
  /* border: 1px solid red; */
  /* justify-content: center; */
  overflow-x:hidden;
  background-color: rgb(245,246,247);
}
.blog-container{
  width: 50vw;
  margin: 100px auto 10px auto;
  box-shadow: 0 0 5px silver;
}
.title{
  width:50vw;
  font-size: 32px;
  font-weight: 600;
  margin:0;
  padding-left: 20px;
  box-shadow: 0 0 5px silver;
  height: 50px;
}
.blogIntro{
  position: relative;
  display: flex;
  width: 50vw;
  height: 80px;
  /* border: 1px solid red; */
  font-size: 15px;
}
.item{
  margin-top: 10px;
  height:30px ;
  line-height: 30px;
  margin-left: 40px;
  justify-self: center;
  color: #999999;
  /* border: 1px solid red; */
}
.blogIntro>.button{
  margin-top: 10px;
  height: 30px;
  position: absolute;
  right: 3%;
}
.blog-content{
  margin-top: 20px;
  box-shadow: 0 0 10px silver;
  border: 1px solid red;
  /* height: 50vh; */
}
.author-info{
  width: 13vw;
  height: 80vh;
  /* border: 1px solid red; */
  margin: 100px 0px;
  position: fixed;
  top: 0%;
  left: 8%;

}
.author-intro{
  width: 13vw;
  height: 300px;
  /* border: 1px solid red; */
  margin-top: 10px;
  text-align: center;
  box-shadow: 0 0 10px silver;
}
.basis-info{
  font-size: 25px;
}
.author-intro>.basis-info>.el-image{
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-top: 10px;
}
.author-achieve{
  display: flex;
  justify-content: center;
  /* border: 1px solid red; */
  font-size: 15px;
  color: #999999;
}
.author-achieve>p{
  margin-left: 10px;
}
.blog-search{
  height: 80px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 10px silver;
}

.popular-blog{
  /* height: 150px; */
  /* border: 1px solid red; */
  margin-top: 10px;
  box-shadow: 0 0 10px silver;
}
.popularBlog-lists{
  list-style: none;
}
.popularBlog-lists li{
  padding-left: 15px;
  font-size: 15px;
  padding-bottom: 10px;
  color: #999999;
}
.popularBlog-lists li:hover{
  color: red;
}
.new-blog{
  /* height: 150px; */
  /* border: 1px solid red; */
  margin-top: 10px;
  box-shadow: 0 0 10px silver;
}

.el-backtop{
  width: 50px;
  height: 50px;
  box-shadow: 2px 2px 5px ;
}
.blog-comment{
    height: 200px;
    margin: 0 auto;
    width: 50vw;
    background-color: #FFFFFF;
    border: 1px solid red;
}
.blog-comment-textarea{
    margin-top: 10px;
}

</style>
