<template>
<div class="container" @scroll="scroll($event)" ref="scrollRef">
    <el-backtop target=".container">
        <i class="el-icon-caret-top"></i>
    </el-backtop>
    <el-header> 
        <PriNavTop></PriNavTop>
    </el-header>
    <div class="search" :style="scrollTop>60?{'position':'fixed','top':'0'+'px','z-index':'999','margin-top':'0'}:{}">
        <el-input class="search-input" placeholder="查点什么.." clearable v-model="searchKey" @keyup.enter.native="searchBlog">
            </el-input>
        <el-button @click="searchBlog">点一下</el-button>
    </div>
    <el-main>
        <el-row>
            <el-col  :md="13" :lg="12" :xl="11" :offset="5">
                <ul class="blog-list">
                    <li v-for="(item,index) in blogList" :key="index">
                      <blogCard :blogInfo="item" width="900px"></blogCard>
                    </li>
                </ul>
                <div class="loading">
                    <i v-if="blogLimit"  class="el-icon-loading" style="font-size:50px;"></i>
                    <p v-else>到底了哦..</p>
                </div>
            </el-col>
            <el-col :xs="2" :sm="3" :md="4" :lg="5" :xl="3" :offset="1"><div class="sidebar"></div></el-col>
        </el-row>
    </el-main>
</div>
</template>

<script>
import {mapState} from 'vuex'
import PriNavTop from '../../components/blog/PriNavTop'
import BlogCard from '../../components/blog/BlogCard.vue'
export default {
  data(){
    return{
      searchKey:'',
      blogClassify:'',
      blogList:[],
      blogLimit:true,
      total:'',
      scrollTop:0,
    }
  },
  components:{PriNavTop,BlogCard},
  computed:{
    ...mapState(['loginState','userInfo'])
  },
  created() {
    this.searchKey = this.$route.query.searchKey||''
    this.blogClassify = this.$route.query.classify||''
    console.log("获取到的store",JSON.parse(this.$route.query.store) );
    this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(this.$route.query.store)));
    this.searchBlog()
  },
  methods:{
    async searchBlog(){
      console.log(this.searchKey);
      const {data : res} = await this.$http.post('/search',{searchKey:this.searchKey,blogClassify:this.blogClassify,total:0})
      console.log("res",res)
      if(res.meta.status === 201){
        this.blogList = res.data.blogList
      }
      this.blogLimit = res.data.blogLimit

    },
    load(){
        console.log("进入load函数");
      if(this.blogLimit === true){
        setTimeout(async()=>{
          const {data : res} = await this.$http.post('/search',{searchKey:this.searchKey,blogClassify:this.blogClassify,total:this.blogList.length})
          console.log("res",res)
          if(res.meta.status === 201){
            res.data.blogList.forEach((item)=>{
              this.$set(this.blogList,this.blogList.length,item)
            })
          }
          this.blogLimit = res.data.blogLimit
        },1000)
      }
    },
    scroll(){
      const sh = this.$refs['scrollRef'].scrollHeight // 滚动条高度
      const st = this.$refs['scrollRef'].scrollTop // 滚动条距离顶部的距离
      const ch = this.$refs['scrollRef'].clientHeight // 滚动条外容器的高度
      console.log(sh,st,ch);   
      this.scrollTop = st
      console.log(this.scrollTop);
      if(st+ch === sh&&this.blogLimit){
        this.load()
      }

    },
  }
}
</script>

<style scoped Lang="less">
.container{
  width: 100%;
  background-color: rgb(242,242,242);
  overflow-y: scroll;
  height: 100%;
}

.search .el-input{
  width: 50vw;
}
.search .el-button{
  height: 50px;
  background-color: rgb(254,107,0);
  color: white;
}
.search{
  width: 100%;
  height: 65px;
  background-color: rgb(255,255,255);
  justify-content: center;
  display: flex;
  align-items: center;
  margin-top: 5px;
}
::v-deep .el-input__inner{
  height: 50px;
  background-color:rgb(242,242,242) ;
}
.main{
  width: 90vw;
  margin: 30px auto;

}
.blog-list{
  /* height: 50vh; */
  width: 900px;
  margin: 0 auto;
  box-shadow: 1px 1px 3px #999999 ;
  overflow-y: auto;


}
.blog-title{
  font-size: 20px;
  cursor: pointer;
  font-weight: 600;
}
.blog-title:hover{
  color: red;
}
.blog-title>p{
  padding-left: 10px;
}
.blog-content{
  width: 100%;
  height: 90px;
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-between;
}
.blog-intro{
  color: #999999;
  /* width: 80%; */
  margin-right: 5px;
  overflow: hidden;
}
.blog-intro>p{
  padding-left: 10px;
  
}
.blog-cover-image{
  width: 150px;
  height: 80px;
  /* border: 1px solid green; */
  margin-right: 20px;
  /* position: absolute; */
}
.blog-cover-image>.el-image{
  width: 150px;
  height: 80px;
}
.blog-info{
  /* border: 1px solid black; */
  height: 20%;
  width: 100%;
  /* flex-direction:row-reverse; */
  display: flex;
  /* justify-content: end; */
  position: relative;
  align-items: center;
}
.blog-info-tag{
  margin-left: 10px;
}
.blog-info-authorName{
  position: absolute;
  right: 10%;
  width: 20%;
  /* height: 15%; */
  color: #999999;
  cursor: pointer;
}
.blog-info-authorName:hover{
  color: red;
}
.blog-info-blogTime{
  position: absolute;
  right: 5%;
  color: #999999;
}



.sidebar{
  background-color: white;
  height: 50vh;
}
.el-col {
  border-radius: 4px;
}
.loading{
  width: 100%;
  /* border: 1px solid red; */
  background-color: rgb(230,230,230);
  margin: 0 auto;
  font-size: 30px;
  color: #999999;
  text-align: center;
}


</style>
