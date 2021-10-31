//进入新的页面时 判断用户的登录状态
var express=require('express');
var router = express.Router();   //可使用 express.Router 类创建模块化、可挂载的路由句柄
const {token} = require('../Tools/token')

const checkLogin =async function(req,res){
    console.log(req.url);
    let User={}
    let meta={} 
    if(req.headers.authorization !== 'null' ){
        let tokenData = token.decrypt(req.headers.authorization)
        console.log(tokenData);
        
        if(tokenData.token === true){
                meta['status'] = 201
                meta['msg'] = '处于登录状态!' 
                User['meta']=meta
                res.send(User)
        }else{
            meta['status'] = 200
            meta['msg'] = '处于未登录状态!' 
            User['meta']=meta
            res.send(User)
        }
    }else{
        meta['status'] = 200
        meta['msg'] = '处于未登录状态!' 
        // User['data']=data
        User['meta']=meta
        res.send(User)
    }

}

module.exports = {checkLogin}