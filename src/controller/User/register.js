var express=require('express');
var router = express.Router();   //可使用 express.Router 类创建模块化、可挂载的路由句柄
var {GenerateID} = require('../Tools/random')
const {exec} = require('../../db/mysql')


 const register =async function(req,res){

    req.on("data",async function(data){
        //生成随机id
        let userId
        while(1){
            userId = GenerateID(9)
            console.log("生成的id是",userId);
            Idquerysql = `select user_id from user where user_id='${userId}'`
            let queryInfo = await exec(Idquerysql)
            console.log("queryInfo",queryInfo)
            if(queryInfo.length===0)
                break;
        }
        const addUsersql =`INSERT INTO user (user_nick_name, user_pass_word,user_id) VALUES ('${JSON.parse(data).nickName}', '${JSON.parse(data).passWord}','${userId}')`
        await exec(addUsersql)
        let Data = {}
        Data['status'] = 201
        Data['msg'] = '注册成功!'
        res.send(Data)
        console.log("注册成功");
        })
          
}

module.exports = register