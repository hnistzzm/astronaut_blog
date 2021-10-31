var express=require('express');
var multiparty=require('multiparty')
var fs = require("fs");
var url = require("url");
var querystring = require("querystring");
var router = express.Router();   //可使用 express.Router 类创建模块化、可挂载的路由句柄
var {GenerateID} = require('../Tools/random')
const {exec} = require('../../db/mysql');
const { getTime } = require('../Tools/nowTime');
const {token} = require('../Tools/token')
const deleteBlog = async function(req,res){
    let responce = {}
    let meta = {}
    if(req.headers.authorization == 'null'){
        meta['status']=0
        meta['msg']='请先登录!'
        responce['meta']=meta
        res.send(responce)
    }else{
        let tokenData = token.decrypt(req.headers.authorization) 
        if(tokenData.token === true){
            var arg = url.parse(req.url).query;
            var params = querystring.parse(arg);
            let blogId = params.blogId
            let deleteBlogSql = `delete from blog where blog_id =${blogId}`
            let Res = exec(deleteBlogSql)
            meta['msg']='删除博客成功!'
            meta['status']=201
            responce['meta']=meta
            res.send(responce)

        }else{
            meta['status']=1
            meta['msg']='token令牌失效,请重新登录!'
            responce['meta']=meta
            res.send(responce)
        }
     }
    
}
module.exports={deleteBlog}
