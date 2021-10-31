var toHumpFun = require('../../Tools/toHump')
const {exec} = require('../../db/mysql')
const getBlogList = async function(req,res){
    console.log("请求获取博客列表",req.url);
    console.log("*********************************");
    const responce = {}
    const data = {}
    const meta = {}
    const getBlogListSql = `select blog_title,blog_id,blog_author_id,blog_author_name,
                            blog_classify,blog_time,blog_origin,blog_cover_image,blog_rc_level from 
                            blog order by blog_time desc`
    const blogList = await exec(getBlogListSql)
    //将分类字符串拼接成数组 
    blogList.forEach((blog)=>{
        if(blog.blog_classify !== null){
            blog.blog_classify = blog.blog_classify.split(",")   
        }
    })            
    console.log(blogList);
    data['blogList'] =toHumpFun(blogList) 
    meta['status'] = 201
    responce['data'] = data
    responce['meta'] = meta
    res.send(responce)
}
module.exports = {getBlogList}