var express=require('express');
var showdown = require('showdown')
var router = express.Router();   //可使用 express.Router 类创建模块化、可挂载的路由句柄
var {GenerateID} = require('../Tools/random')
const {exec} = require('../../db/mysql')
const {token} = require('../Tools/token')
var dayjs = require('dayjs')
const toHumpFun = require('../Tools/toHump')
const getNowBlog = async function(req,res){
    console.log(req.url);
    let responce = {};
    let meta={};
    let Data={};
    
    req.on("data",async function(data){
        console.log(JSON.stringify(JSON.parse(data)));
        // console.log(dayjs().format());
        let sql = `select * from blog where blog_id =${JSON.parse(data)}`
        let blogInfo =await exec(sql)
        let BlogInfo = blogInfo[0]
        //将分类字符串拼接成数组
        if(BlogInfo.blog_classify !== null){
            BlogInfo.blog_classify = BlogInfo.blog_classify.split(",")
        }else{
            BlogInfo.blog_classify = []
        }   
        //获取博客数量
        let blogQuantitySql=`SELECT COUNT(1) as total  from blog where blog_author_id =${BlogInfo.blog_author_id}`
        //获取作者信息
        let blogAuthorNameSql=`select user_nick_name,user_head_portrait from user where user_id = ${BlogInfo.blog_author_id}`
        //获取最新博客
        let exhibitBlog ={}
        const latestBlogSql =`select blog_title,blog_id from blog where blog_author_id =${BlogInfo.blog_author_id} order by blog_time desc limit 5 `
        let latestBlog = await exec(latestBlogSql)
        //exhibitBlog.push(latestBlog)
        //获取热门博客
        exhibitBlog['latestBlogs']=latestBlog
        let authorInfo={}
        let blogquantify = await exec(blogQuantitySql)
        let AuthorInfo = await exec(blogAuthorNameSql)
        authorInfo['blogquantify'] = blogquantify[0].total
        authorInfo['nickName'] = AuthorInfo[0].user_nick_name
        authorInfo['headPortrait'] =AuthorInfo[0].user_head_portrait
        //console.log("获取到的博客数据",userInfo);
        meta['status']=201;
        meta['msg']='获取博客信息成功!';
        Data['blog']=toHumpFun(BlogInfo) ;
        Data['authorInfo']=authorInfo
        Data['exhibitBlogs']=exhibitBlog
        responce['meta']=meta
        responce['data']=Data
        res.send(responce);
         
    })
}
const getBlogList = async function(req,res){
    let responce = {};
    let meta={};
    let Data={};
    console.log(req.url);
        let tokenData = token.decrypt(req.headers.authorization)
        req.on("data",async function(data){
            let queryStart = (JSON.parse(data).pageNum-1)*JSON.parse(data).pageSize
            let queryEnd = JSON.parse(data).pageSize
            let query = JSON.parse(data).query
            console.log(queryStart,queryStart);
            let getTotalSql=`SELECT COUNT(1) as total  from blog where blog_author_id=${tokenData.id} and blog_title like '%${query}%'`
            let getDataSql =`select blog_title,blog_likes,blog_id,blog_time,blog_content,blog_author_name,blog_origin,blog_cover_image from blog where blog_author_id=${tokenData.id} and blog_title like '%${query}%' ORDER BY blog_time desc limit ${queryStart},${queryEnd}`
            let blogLists =await exec(getDataSql)
            let total =await exec(getTotalSql)
            let Total = total[0].total

            if(blogLists.length){
                blogLists.forEach((item)=>{
                    var converter = new showdown.Converter()
                    var htmlcontent = converter.makeHtml((item.blog_content).slice(0,150))
                    //将md转换成纯文本用于展示
                    //定义script的正则表达式，去除js可以防止注入
                    let scriptRegex="<script[^>]*?>[\\s\\S]*?<\\/script>";
                    let styleRegex="<style[^>]*?>[\\s\\S]*?<\\/style>";
                    let htmlRegex="<[^>]+>";
                    let spaceRegex = "\\s*|\t|\r|let"
                    htmlcontent = htmlcontent.replace(new RegExp(scriptRegex,"gm"), "");
                    htmlcontent = htmlcontent.replace(new RegExp(styleRegex,"gm"), "");
                    htmlcontent = htmlcontent.replace(new RegExp(htmlRegex,"gm"), "");
                    htmlcontent = htmlcontent.replace(new RegExp(spaceRegex,"gm"), "");
                    item.blog_content = htmlcontent
                })
            }
            meta['status']=201
            meta['msg']='获取博客信息成功!'
            Data['blogList']=toHumpFun(blogLists);
            Data['total']=Total
            responce['meta']=meta
            responce['data']=Data
            res.send(responce) 
        })  
}
const getRecommendBlogs = async function(req,res){
    console.log("获取推荐博客列表",req.url);
    console.log("****************************************");
    const tokenData = token.decrypt(req.headers.authorization)
    let responce = {};
    let meta={};
    let data={};
    const BlogList = {}
    const RcBlogList = {}

    const getRcBlogListSql = `SELECT
                              blog_title,blog_likes,blog_id,blog_classify,blog_content,blog_time,blog_author_name,blog_origin,blog_cover_image
                              FROM blog
                              ORDER BY
                              blog_time DESC 
                              LIMIT 8 `
    // 获取推荐等级为1的博客
    const getRcFstBlogSql =    `SELECT 
                                blog_title,blog_likes,blog_id,blog_cover_image
                                FROM blog
                                WHERE blog_rc_level = 1`
                                 
    const getRcScdBlogSql =    `SELECT 
                                blog_title,blog_likes,blog_id,blog_cover_image
                                FROM blog
                                WHERE blog_rc_level = 2`
    const getRcTrdBlogSql =    `SELECT 
                                blog_title,blog_likes,blog_id,blog_cover_image
                                FROM blog
                                WHERE blog_rc_level = 3`
    const getRcFthBlogSql =    `SELECT 
                                blog_title,blog_likes,blog_id,blog_cover_image
                                FROM blog
                                WHERE blog_rc_level = 4` 
    const BlogLists = await exec(getRcBlogListSql)      
    const FstRcBlogs = await exec(getRcFstBlogSql) 
    const ScdRcBlogs = await exec(getRcScdBlogSql)     
    const TrdRcBlogs = await exec(getRcTrdBlogSql)     
    const FthRcBlogs = await exec(getRcFthBlogSql)  

    const isLikeSql =`SELECT blog_id
                      FROM blog_like 
                      WHERE
                      user_id=${tokenData.id} AND like_state=1`
    const isLikeLists = await exec(isLikeSql)
    const tagLists =await getTagList(req,res)
    console.log(JSON.stringify(isLikeLists));

    BlogLists.forEach((blog)=>{
        blog.isThumbsUp = 0
        isLikeLists.forEach((like)=>{
           if(blog.blog_id ===like.blog_id){
                blog.isThumbsUp = 1
           } 
        })  
    })
    RcBlogList['FstRcBlogs'] = toHumpFun(FstRcBlogs)  
    RcBlogList['ScdRcBlogs'] = toHumpFun(ScdRcBlogs)  
    RcBlogList['TrdRcBlogs'] = toHumpFun(TrdRcBlogs)   
    RcBlogList['FthRcBlogs'] = toHumpFun(FthRcBlogs)    
    data['RcBlogList'] = RcBlogList
    data['BlogLists'] = toHumpFun(BlogLists) 
    data['tagLists'] = tagLists
    meta['status'] = 201
    responce['data'] = data
    responce['meta'] = meta
    res.send(responce)              
}
const getTagList = async function(req,res){
    console.log("获取标签列表");
    console.log("*************************");
    const getTagSql = `SELECT blog_classify
                       FROM blog`
    const tagLists =await exec(getTagSql)
    console.log(JSON.stringify(tagLists));
    const tagArr = []
    for (let i = 0; i < tagLists.length; i++) {
        if(tagLists[i].blog_classify!==null&&tagLists[i].blog_classify!==''){
            const tag = (tagLists[i].blog_classify).split(',')
            for (let j = 0; j < tag.length; j++) {
                if(tagArr.indexOf(tag[j])==-1){
                    tagArr.push(tag[j])
                }
                
            }
        }
    }
    console.log("过滤后的tagLists",tagArr);
    return tagArr

}
module.exports=
{
 getNowBlog,
 getBlogList,
 getRecommendBlogs,
 getTagList
}