<template>
  <div class="container">
    <div class="first-floor">
      <div class="first-floor-left">
        <el-carousel 
          indicator-position="outside"
          height="450px" 
          :interval='3000'>
          <el-carousel-item v-for="item in RcBlogList.FstRcBlogs" :key="item.blogId">
            <div class="rc-pic-item" @click="blogView(item.blogId)">
              <el-image 
                :src="url+item.blogCoverImage" fit="cover" 
                :name="item.blogTitle" 
                class="rc-ric-item-img">
              </el-image>
              <p>{{item.blogTitle}}</p>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="first-floor-right">
        <el-carousel 
          indicator-position="outside"
          height="200px" 
          :autoplay="false">
          <el-carousel-item v-for="item in RcBlogList.ScdRcBlogs" :key="item.blogId">
            <div class="rc-pic-item" @click="blogView(item.blogId)">
              <el-image 
                :src="url+item.blogCoverImage" fit="cover" 
                :name="item.blogTitle" 
                class="rc-ric-item-img">
              </el-image>
              <p>{{item.blogTitle}}</p>
            </div>
          </el-carousel-item>
        </el-carousel>

        <el-carousel 
          indicator-position="outside"
          height="200px" 
          :autoplay="false" >
          <el-carousel-item v-for="item in RcBlogList.TrdRcBlogs" :key="item.blogId">
            <div class="rc-pic-item" @click="blogView(item.blogId)">
              <el-image 
                :src="url+item.blogCoverImage" fit="cover" 
                :name="item.blogTitle" 
                class="rc-ric-item-img">
              </el-image>
              <p>{{item.blogTitle}}</p>
            </div>
          </el-carousel-item>
        </el-carousel>

      </div>

    </div>
    <hr class="hrLine" style="width:100px"><span style="color:#999999;font-size:15px">最新博客</span><hr class="hrLine" style="width:600px;">
    <div class="second-floor">
      <div class="second-floor-left">
          <ul class="blog-list">
              <li v-for="(item,index) in BlogLists" :key="index">
                <blogCard :blogInfo="item" width="780px"></blogCard>
              </li>
          </ul>
      </div>

      <div class="second-floor-right">
        <el-card class="second-floor-right-tagLists">
            <div slot="header" class="clearfix">
                <span>标签云</span>
            </div>
            <el-tag   
                v-for="(item,index) in tagLists" 
                :key="index" 
                :effect="Dark"  
                :color="tagColor[Math.floor(Math.random()*5)]"
                @click="searchBlog(item)">
                {{item}}
            </el-tag>
            
        </el-card>

        <el-card class="the-forth-recommend">
            <el-carousel indicator-position="outside" height="170px" :autoplay="false" >
                <el-carousel-item v-for="item in RcBlogList.FthRcBlogs" :key="item.blogId">
                    <div class="rc-pic-item" @click="blogView(item.blogId)">
                        <el-image 
                            :src="url+item.blogCoverImage" fit="cover" 
                            :name="item.blogTitle" 
                            class="rc-ric-item-img">
                        </el-image>
                        <p>{{item.blogTitle}}</p>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </el-card>
      </div>

    </div>

  </div>
</template>

<script>
import BlogCard from '../../components/blog/BlogCard.vue'
export default {
  name: "Home",
  data() {
    return {
      RcBlogList:{},
      BlogLists:[],
      tagLists:[],
      tagColor:['rgb(64,158,255)','rgb(103,194,58)','rgb(103,194,58)','rgb(245,108,108)','rgb(230,162,60)']
    }
  },
  components:{BlogCard},
  created() {
    this.getRcBlogList()
  },
  methods: {
    async getRcBlogList(){
      const {data : res} = await this.$http.post('/getRecommendBlogs')
      console.log(res);
      if(this.checkReq(res.meta.status)){
        this.RcBlogList = res.data.RcBlogList
        this.BlogLists = res.data.BlogLists
        this.tagLists = res.data.tagLists
      }else{
        return this.$message.error('获取首页推荐信息失败!')
      }
   
    },
    searchBlog(blogClassify){
        console.log("标签为",blogClassify);
        let routeUrl=this.$router.resolve({path:'/search',
        query:{searchKey:'',classify:blogClassify,store:JSON.stringify(this.$store.state) }})
        window.open(routeUrl.href, '_blank');
    },
  },
}
</script>

<style scoped Lang="less">

body,html{
  width: 100%;
  height: 100%;
}
.container{
  width: 1200px;
  position: relative;
  /* border: 1px solid red; */
  margin:  0 auto;
}
.first-floor{
  width: 100%;
  margin-top: 15px;
  display: flex;
}
.first-floor-left{
  width:800px ;
  height: 460px;
}
.first-floor-right{
  margin-left: 20px;
  width: 380px;
  height: 460px;
}
.rc-pic-item{
  position: relative;
  height: 100%;
  width: 100%;
}
.rc-ric-item-img{
  position: relative;
  height: 100%;
  width: 100%;
}
.rc-pic-item>p{
  color: white;
  font-size: 15px;
  opacity: 0.75;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%,-50%);
}
.second-floor{
  width: 100%;
  display: flex;
}
.second-floor-left{
  width:800px ;
}
.second-floor-left>.el-card{
  width: 780px;
  height: 160px;
  margin-bottom: 5px;
}
.second-floor-right{
  margin-left: 20px;
  width: 380px;
  height: 300px;
}
.second-floor-right-tagLists{
  width: 370px;
  height: 290px;
}
.the-forth-recommend{
  margin-top: 25px;
  width: 380px;
  height: 250px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.blog-list{
  /* height: 50vh; */
  width: 780px;
  margin: 0 auto;
  /* box-shadow: 1px 1px 3px #999999 ; */
  overflow-y: auto;

}
.el-divider--horizontal {
    width: 800px;
    /* background-color: rgb(246, 246, 246); */
}
.hrLine{
    border: none;
    height:3px;
    vertical-align:middle; 
    display:inline-block;
    background-color: rgb(225, 225, 225);
}
.el-tag{
    color: #FFFFFF;
}
</style>
