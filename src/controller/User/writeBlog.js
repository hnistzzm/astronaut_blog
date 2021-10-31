var express=require('express');
var multiparty=require('multiparty')
var fs = require("fs");
var router = express.Router();   //可使用 express.Router 类创建模块化、可挂载的路由句柄
var {GenerateID} = require('../Tools/random')
const {exec} = require('../../db/mysql');
const { getTime } = require('../Tools/nowTime');
const {token} = require('../Tools/token')
const writeBlog = async function(req,res){
          let responce = {}
          let meta={}
          let tokenData = token.decrypt(req.headers.authorization)
          req.on("data",async function(data){
            //如果博客id已经存在(编辑博客操作)
            // console.log("blogId", JSON.parse(data).blogId);
            console.log("博客封面",JSON.parse(data).blog.blogCoverImage);
            if(JSON.parse(data).blogId){
              let blogId = JSON.parse(data).blogId
              let title = JSON.parse(data).blog.blogTitle
              let content =  JSON.parse(data).blog.blogContent;
              let classify = JSON.parse(data).blog.blogClassify.toString();
              let origin = JSON.parse(data).blog.blogOrigin;
              let coverImg = JSON.parse(data).blog.blogCoverImage;
              let hasCover = JSON.parse(data).blog.blogHasCover;
              let updateBlogSql =`update blog set blog_title ='${title}',blog_content=${JSON.stringify(content)},blog_classify='${classify}',blog_origin=${origin},
                                  blog_cover_image='${coverImg}',blog_has_cover='${hasCover}' where blog_id ='${blogId}'`
              await exec(updateBlogSql);
              meta['status']=201;
              meta['msg']='保存成功!';
              responce['meta']=meta;
              res.send(responce);
            }else{
                  console.log(JSON.parse(data).blog.blogClassify.toString());
                  let blogId = GenerateID(5);
                  let time = getTime();
                  let title = JSON.parse(data).blog.blogTitle
                  let content =  JSON.parse(data).blog.blogContent;
                  let classify = JSON.parse(data).blog.blogClassify.toString();
                  let origin = JSON.parse(data).blog.blogOrigin;
                  let coverImg = JSON.parse(data).blog.blogCoverImage;
                  let hasCover = JSON.parse(data).blog.blogHasCover;
                  let NickNameSql = `select user_nick_name from user where user_id=${tokenData.id}`
                  let authorNickName = await exec(NickNameSql)
                  console.log("NICKNAME",JSON.stringify(authorNickName));
                  let sql =`INSERT INTO blog (blog_title,blog_content,blog_id,blog_author_id,blog_author_name,blog_time,blog_origin,blog_classify,blog_cover_image,blog_has_cover) VALUES
                           ('${title}',${JSON.stringify(content)},'${blogId}','${tokenData.id}','${authorNickName[0].user_nick_name}','${time}',${origin},'${classify}','${coverImg}','${hasCover}')`;
                  await exec(sql);
                  meta['status']=201;
                  meta['msg']='保存成功!';
                  responce['meta']=meta;
                  res.send(responce);
            }
         })  
}
const addImage = async function(req,res){
        let responce = {}
        let meta={}
       
          let tokenData = token.decrypt(req.headers.authorization) 
            // 接收参数
            let form = new multiparty.Form();
            // 设置文件存储路径
            form.uploadDir = "public/static";
            // 设置单文件大小设置
            form.maxFilesSize = 2 * 1024 * 1024;
           // 上传完后处理
            form.parse(req, function (err, fields, files) {
            console.log(files);
            console.log(files.path);
             //同步重命名文件名
             let filename = "public/static/blogImage/"+files.file[0].originalFilename
              if(filename.includes(' ')){
                filename = filename.replace(/[\s]+/g,'-')
              }
             fs.renameSync(files.file[0].path,filename);
             meta['status'] = 201
             responce['data']=filename
             responce['meta']=meta
             res.send(responce)
            })
          
        

}
const beforeAddCoverImage = async function(req,res){
  console.log("进入了接口addCoverImage");
  const data ={}
  const responce = {}
  const meta = {}
        // 接收参数
    let form = new multiparty.Form();
    // 设置文件存储路径
    form.uploadDir = "public/static";
        // 设置单文件大小设置
    form.maxFilesSize = 2 * 1024 * 1024;
    // 上传完后处理
    form.parse(req, function (err, fields, files) {
    console.log(files);
    //    同步重命名文件名
        let filename = "public/static/blogCoverImage/"+files.file[0].originalFilename
        if(filename.includes(' ')){
        filename = filename.replace(/[\s]+/g,'-')
        }
        fs.renameSync(files.file[0].path,filename);
        meta['status'] = 201
        responce['data']=filename
        responce['meta']=meta
        res.send(responce)
    
  })
}



module.exports = {writeBlog,addImage,beforeAddCoverImage}