const { json } = require('express');
var express=require('express');
var fs = require("fs");
var router = express.Router();   //可使用 express.Router 类创建模块化、可挂载的路由句柄
const {exec} = require('../../db/mysql')
const {token} = require('../Tools/token')
var multiparty=require('multiparty')
var dayjs = require('dayjs')
const toHumpFun = require('../Tools/toHump')
//获取用户信息
const getUserInfo = async function(req,res){
    let responce = {}
    let meta = {}
    let data = {}
    if(req.headers.authorization == 'null'){
        meta['status']=0
        meta['msg']='请先登录!'
        responce['meta']=meta
        res.send(responce)
    }else{
        let tokenData = token.decrypt(req.headers.authorization) 
        console.log("tokendata",tokenData);
        if(tokenData.token === true){
            let getUserInfoSql = `select user_id,user_nick_name,user_head_portrait,user_gender,user_birthday,user_true_name,user_self_intro from user where user_id=${tokenData.id}`
            let UserInfo =await exec(getUserInfoSql)
            console.log("userinfo",UserInfo);
            meta['status']=201
            meta['msg']='获取用户信息成功!'
            data['userInfo']=toHumpFun(UserInfo[0])  
            responce['meta'] = meta
            responce['data'] = data
            console.log("发给前端");
            res.send(responce)
        }else{
            meta['status']=1
            meta['msg']='token令牌失效,请重新登录!'
            responce['meta']=meta
            res.send(responce)
        }
    }
}
//修改用户信息
const editUserInfo = async function(req,res){
    let responce = {}
    let meta = {}
    let Data = {}

        let tokenData = token.decrypt(req.headers.authorization) 
        console.log("tokendata",tokenData);

            req.on("data",async function(data){
                let gender = JSON.parse(data).userGender
                let Birthday = dayjs((JSON.parse(data).userBirthday) ).format('YYYY-MM-DD') 
                let nickName = JSON.parse(data).userNickName
                let trueName = JSON.parse(data).userTrueName
                let userIntro = JSON.parse(data).userSelfIntro
                const editUserInfoSql = `update user set user_gender = '${gender}',user_birthday = '${Birthday}', user_nick_name = '${nickName}', user_true_name = '${trueName}', user_self_intro = '${userIntro}' where user_id = ${tokenData.id}`
                exec(editUserInfoSql)
                meta['status'] = 201
                meta['msg'] = '修改个人信息成功!'
                responce['meta']=meta
                res.send(responce)
            })
}
const beforeUploadHeadPortrait =async function(req,res){
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
                let filename = "public/static/headPortrait/"+files.file[0].originalFilename
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
const uploadHeadPortrait =async function(req,res){
    let responce = {}
    let meta={}
    let Data={}
   
      let tokenData = token.decrypt(req.headers.authorization) 

          req.on("data",async function(data){
              console.log(JSON.parse(data));
              const updateSql = `update user set user_head_portrait = '${JSON.parse(data).imgUrl}' where user_id =${tokenData.id}`
              await exec(updateSql)
              meta['status'] = 201
              meta['msg'] = '上传头像成功!'
              responce['meta'] =meta
              res.send(responce)
          })

}
module.exports = {getUserInfo,editUserInfo,beforeUploadHeadPortrait,uploadHeadPortrait}