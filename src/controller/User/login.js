var express=require('express');
var router = express.Router();   //可使用 express.Router 类创建模块化、可挂载的路由句柄
const {exec} = require('../../db/mysql')
const {token} = require('../Tools/token')
const toHumpFun = require('../Tools/toHump')


 const login =async function(req,res){
    console.log("请求",req.body );
    console.log("进入登录请求了");
    req.on("data",async function(DATA){
        console.log("进入登录请求了");
        const sql =`select user_id,user_nick_name,user_gender,user_birthday,user_head_portrait,user_true_name,user_self_intro from user  where user_id='${JSON.parse(DATA).userId}' and user_pass_word ='${JSON.parse(DATA).passWord}'`
        console.log( JSON.parse(DATA).userId);
        let UserInfo =await exec(sql)
        console.log("userid",JSON.parse(DATA).userId);
        //发送给前端的数据
        let User={} 
        //发送给前端的data数据 包含token等
        let data={}
        //发送给前端的meta数据 包含status msg等
        let meta={}
        if(UserInfo.length>0){
            let Token =token.encrypt({id:JSON.parse(DATA).userId},'15d')//设置token令牌有效时间为15天
                data['userInfo']=toHumpFun(UserInfo[0])  
                data['Token'] = Token
                meta['status'] = 201
                meta['msg'] = '登录成功!' 
                User['data']=data
                User['meta']=meta
                res.send(User)
        }else{
            meta['status'] = 200
            meta['msg'] = '登录失败!'
            User['meta']=meta
            res.send(User)
        }

    })
    
}

module.exports =login