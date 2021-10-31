var express=require('express');
var multiparty=require('multiparty')
var showdown = require('showdown')
var router = express.Router();   //可使用 express.Router 类创建模块化、可挂载的路由句柄
var {GenerateID} = require('../Tools/random')
const {exec} = require('../../db/mysql');
const { getTime } = require('../Tools/nowTime');
const {token} = require('../Tools/token')
const toHumpFun = require('../Tools/toHump')

const searchBlog = async function(req,res){
    let responce = {}
    let Data = {}
    let meta ={}
    req.on("data",async function(data){
        console.log("bloginfo", JSON.parse(data));

        const blogClassify = JSON.parse(data).blogClassify
        const searchKey = JSON.parse(data).searchKey
        const total = JSON.parse(data).total
        console.log(searchKey,total,blogClassify);
        const searchBlogSql = `SELECT * FROM blog 
                               WHERE blog_title 
                               LIKE '%${searchKey}%' 
                               AND
                               locate('${blogClassify}', blog_classify)>0
                               limit ${total},10`    
        const searchBlogSql1 = `SELECT * FROM blog 
                               WHERE 
                               find_in_set('${blogClassify}', blog_classify)
                               `
        let blogList =await exec(searchBlogSql)
        console.log("blogList数量",blogList);
        if(blogList.length < 10){
            Data['blogLimit']=false
        }else{
            Data['blogLimit']=true
        }
        if(blogList.length){
            blogList.forEach((item)=>{
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
     
        Data['blogList'] = toHumpFun(blogList)
        console.log("blogList",blogList);
        meta['status'] = 201
        meta['msg'] = '搜索成功'
        responce['data'] =  Data
        responce['meta'] = meta
        console.log(responce);
        res.send(responce)
    })
   
        
 }
 module.exports={searchBlog}
