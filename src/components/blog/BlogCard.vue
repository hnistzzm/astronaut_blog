<template>
  
<div class="blog-list-item" :style="{'width':width}">

    <div class="blog-cover-image" v-show="blogInfo.blogCoverImage">
        <el-image :src="url+blogInfo.blogCoverImage" fit="cover" ></el-image>
    </div>
    <div class="blog-content">
        <div class="blog-title" @click="blogView(blogInfo.blogId)">
            <p>{{blogInfo.blogTitle}}</p>
        </div>
        <div class="blog-intro">
            <p>{{blogInfo.blogContent|filterBlogContent('blogContent')}}</p>
        </div>
        <div class="blog-info">
            <el-tag effect="dark" type="danger" size="mini" class="blog-info-tag" v-if="blogInfo.blogOrigin == 1">原创</el-tag>
            <el-tag effect="dark" type="success" size="mini" class="blog-info-tag" v-else-if="blogInfo.blogOrigin == 0">转载</el-tag>
            <span class="blog-info-authorName el-icon-user" >{{blogInfo.blogAuthorName|filterBlogContent('authorName')}}</span>
            <span class="blog-info-blogTime el-icon-alarm-clock" >{{blogInfo.blogTime|filterBlogContent('blogTime')}}</span>
            <div class="blog-thumbsUp" @click="blogThumbsUp(blogInfo.blogId)">
                <el-image :src="require('../../static/image/thumbUpNative.png')" v-if="blogInfo.isThumbsUp"></el-image>
                <el-image :src="require('../../static/image/thumbUp.png')" v-else></el-image>
                <span 
                    class="blog_info_blog-like"
                    >{{blogInfo.blogLikes}}
                </span>
            </div>
            
            <span class="blog_info_blog-comment el-icon-chat-square" >{{0}}</span>
        </div>
    </div>
    
</div>

</template>
<script>
import dayjs from 'dayjs'
export default {
    data() {
        return {
            
        }
    },
    props:['blogInfo','width'],
    filters:{
        filterBlogContent(val,type){
            if(type === 'authorName'){
                if(val.length>20){
                    return val.slice(0,20)+'...' 
                }else{
                    return val
                }
            }else if(type === 'blogContent'){
                if(val.length>80){
                    return val.slice(0,100)+'...' 
                }else{
                    return val
                }
            }else if(type === 'blogTime'){
                return dayjs(val).format('YYYY-MM-DD')
            }
        }
    },
    methods: {
        async blogThumbsUp(blogId){
            console.log("blogid",blogId);
            const {data:res} =await this.$http.post('/blogThumbsUp',blogId)
            console.log(res);
            this.blogInfo.blogLikes = res.data.blogLike
            this.blogInfo.isThumbsUp = res.data.isThumbsUp
        }
    },
        
}
</script>

<style Lang="less" scoped>
.blog-list-item{
  width:800px;
  height: 150px;
  margin: 1px auto;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  position: relative;
  background-color: white;
  padding-left: 10px;
  padding-right: 10px;
  /* border: 1px solid red; */

}


.blog-title{
  font-size: 20px;
  cursor: pointer;
  font-weight: 600;
  height: 20%;
  line-height: height;
  margin-top: 10px;
}
.blog-title:hover{
  color: red;
}
.blog-title>p{
  padding-left: 10px;
}
.blog-content{
  width: 100%;
  height: 80%;
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
}
.blog-intro{
  height: 85%;
  color: #999999;
  margin-right: 5px;
  overflow: hidden;
}
.blog-intro>p{
  padding-left: 10px;
  
}
.blog-cover-image{
  width: 150px;
  height: 90%;
  margin-right: 20px;
  display: flex;
  align-items: center;
}
.blog-cover-image>.el-image{
  width: 150px;
  height: 80%;
}
.blog-info{
  height: 15%;
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  /* justify-content: space-between; */
}
.blog-info-tag{
  margin-left: 10px;
}
.blog-info-authorName{
  color: #999999;
  cursor: pointer;
  margin-left: 15px;
}
.blog-info-authorName:hover{
  color: red;
}
.blog-info-blogTime{
  margin-left: 15px;  
  color: #999999;
}
.blog_info_blog-like{
    color: #999999;
}
.blog_info_blog-comment{
    margin-left: 15px;
    cursor: pointer;
    color: #999999;
}
.blog-thumbsUp{
    margin-left: 15px;
    cursor: pointer;
}
.blog-thumbsUp>.el-image{
    width: 15px;
    height: 15px;
    /* background-color: yellow; */
}


</style>