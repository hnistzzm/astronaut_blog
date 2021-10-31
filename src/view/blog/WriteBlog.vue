<template>
  <div class="container" >
    <div class="editBlog">
      <el-form ref="WriteBlogRef"  :model="blog" :rules="writeBlogRules">
        <el-form-item label="标题:" label-width="100px" prop="blogTitle">
          <el-input v-model="blog.blogTitle" label="标题" placeholder="请输入文章标题(1-100字)" maxlength="100" show-word-limit style="width: 80%;"></el-input>
          <el-button round style="background-color: salmon;color: white;margin-left: 50px" @click="saveBlog">保存草稿</el-button>
          <el-button round style="background-color: cornflowerblue;color: white;" @click="submitFormVisibel=true">发布博客</el-button>
        </el-form-item>
        
        <el-form-item prop="blogContent">
          <mavon-editor
              ref="md"
              placeholder="请输入博客内容..."
              :boxShadow="false"
              v-model="blog.blogContent"
              :toolbars="toolbars"
              toolbarsBackground="#999999"
              @save="saveBlog"
              @imgAdd="imgAdd"
              style="height: 80vh"
          />
        </el-form-item>
      </el-form>
    </div>
    <el-dialog 
        :visible.sync="submitFormVisibel" 
        show-close title="发布文章"
        width="30%"
        class="submit-form">
      <el-form label-position="left">
          <el-form-item label="标  题"  label-width="80px">
            <el-input v-model="blog.blogTitle"></el-input>
          </el-form-item>
          <el-form-item label="封  面"  label-width="80px">
            <el-radio-group v-model="blog.blogHasCover">
              <el-radio :label="1">有封面</el-radio>
              <el-radio :label="0">无封面</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-upload
                class="avatar-uploader"
                action="#"
                :before-upload="beforeUpload"
                ref="upload"
                :show-file-list="false"
                v-show="blog.blogHasCover">
            <el-image  v-if="blog.blogCoverImage" :src="url+blog.blogCoverImage" class="avatar"></el-image>
            <i  v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

           <el-form-item label="文章标签" label-position="left" label-width="80px">
            <el-tag
                :key="tag"
                v-for="tag in blog.blogClassify"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
            </el-tag>
            <el-input
                class="input-new-tag"
                v-if="tagInputVisible"
                v-model="tagInputContent"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleTagInputConfirm"
                @blur="handleTagInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showTagInput">+ New Tag</el-button>
          </el-form-item>
          <el-form-item label="文章类型" label-position="left" label-width="80px">
            <el-radio-group v-model="blog.blogOrigin">
              <el-radio :label="1">原创</el-radio>
              <el-radio :label="0">转载</el-radio>
            </el-radio-group>
          </el-form-item>
      </el-form>
        <!--      底部区域-->
      <span slot="footer" class="dialog-footer">
          <el-button >取 消</el-button>
          <el-button >保存为草稿</el-button>
          <el-button @click="saveBlog">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      submitFormVisibel:false,
      // dynamicTags:[],
      tagInputVisible:false,
      tagInputContent:'',
      imgUrl:'',
      //博客
      blog:{
        blogTitle:'',
        blogContent: '',
        //文章封面 0为无封面
        blogHasCover:0,
        //文章来源 1为原创
        blogHasCover:1,
        blogClassify:['vue','js'],
        blogCoverImage:''
      },
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
        writeBlogRules:{

        },
        //编辑博客时需要从其他页面传递blogId
        blogId:''
      },
      writeBlogRules:{
        title:[
          {required:true,message:'请输入文章标题',trigger: 'blur'},
          { min: 1,max:100,message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ],
        content:[
          {required:true,message:'请输入文章内容',trigger: 'blur'},
          { min: 1,message: '内容不能为空', trigger: 'blur' }
        ]

      }
    }


  },
  created() {
    this.blogId = this.$route.query.blogId
    this.getBlog()
  },
  methods:{
     async getBlog(){
       console.log("blogid",this.blogId)
       const {data : res} = await this.$http.post('/getNowBlog',this.blogId)
       console.log(res)
      this.blog = res.data.blog
     },
    //保存blog
     saveBlog(){
      console.log(JSON.stringify(this.blog))
      this.$refs.WriteBlogRef.validate(async valid=>{
        if(!valid) return this.$message.error("格式错误!")
        if(this.blogId){
          const {data : res} =await this.$http.post('/saveBlog',{blog:this.blog,blogId:this.blogId} )
          console.log("获取到的响应",res)
          if(res.meta.status===201){
            this.$message.success('发布成功!')
            return this.$router.push('./myBlog')
          }
        }else{
          const {data : res} =await this.$http.post('/saveBlog',{blog:this.blog,blogId:'',coverImgUrl:this.blog.coverImgUrl} )
          console.log("获取到的响应",res)
          if(res.meta.status===201){
            this.$message.success('发布成功!')
            return this.$router.push('./myBlog')
          }
           await this.getBlog()
        }
      })

    },
    async imgAdd(pos,$file){
      let formdata = new FormData()
      console.log("filename",$file.name)
      console.log("filename",$file.name)
      formdata.append('file',$file)
      const {data : res} = await this.$http.post('/writeBlog/addImage',formdata)
      console.log(res)
      if(res.meta.status===0){
        return  this.$message.error('上传失败,请先登录!')
      }else if(res.meta.status===1){
        return this.$message.error('上传失败,登录失效,请重新登录!')
      }else{
        let Url =this.url+res.data
        let name = $file.name
         if (name.includes('-')) {
         name = name.replace(/-/g, '')
        }
        console.log("name",name)
        let content = this.blog.blogContent
        if(content.includes(name)){
          let oStr = `(${pos})`
          let nStr = `(${Url})`
          let index = content.indexOf(oStr)
          let str = content.replace(oStr, '')
          let insertStr = (soure, start, newStr) => {
            return soure.slice(0, start) + newStr + soure.slice(start)
          }
          this.blog.blogContent = insertStr(str, index, nStr)
        }else{
          this.$message.error("上传失败!")
        }
      }
    },
    showTagInput(){
       this.tagInputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
    },
    handleTagInputConfirm(){
      console.log(this.tagInputContent);
      if(this.tagInputContent){
        this.blog.blogClassify.push(this.tagInputContent)
      }
      this.tagInputVisible = false
      this.tagInputContent = ''
      
    },
    handleClose(tag){
      this.blogClassify.splice(this.blogClassify.indexOf(tag), 1);
    },
    async beforeUpload(file){
      console.log("file",file)
      let formData = new FormData()
      formData.append('file',file)
      console.log("formdata",formData)
      const {data : res} = await this.$http.post('/writeBlog/beforeAddCoverImage',formData)
      this.blog.blogCoverImage = res.data
      console.log(res)
    }
  }
}
</script>

<style scoped Lang="less">
html, body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

body {
  position: absolute;
  text-align: center;
  margin: auto;
  background: #04162E;
}
.container{
  height: 100vh;
  width: 100vw;
  background-color: #04162E;
}
.saveBlog{
  z-index: 999;
}
.saveBlog .el-button{
  color: white;
}
.editBlog{
  width: 80vw;
  height: 80vh;
  margin: 50px auto;
  opacity: 0.8;
}
.mavon-editor{
  height:800px;

}
.submit-form  .el-input{
  width: 50%;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px !important;
  margin-left: 10px;
  vertical-align: bottom;
}
.avatar-uploader .el-upload{
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader :hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  margin-left: 80px;
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  /* border-radius: 50%; */
}
.avatar {
  margin-left: 80px;
  width: 100px;
  height: 100px;
  display: block;
  /* border-radius: 50%; */
  border: 1px dashed #d9d9d9;
}
::v-deep .el-upload__input{
  display: none!important;
}


</style>
