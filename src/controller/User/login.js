var toHumpFun = require('../../Tools/toHump')
const {exec} = require('../../db/mysql')
const login =async function(req,res){
    console.log("请求登录",req.url);
    console.log("*********************************");
    req.on("data",async function(loginInfo){
        const responce = {}
        const data = {}
        const meta = {}
        const LoginInfo =JSON.parse(loginInfo)
        console.log("logininfo",LoginInfo);
        const loginSql = `select admin_nick_name,admin_id from admin where admin_id = '${LoginInfo.adminId}' and admin_pass_word = '${LoginInfo.adminPassWord}' `
        const adminInfo = await exec(loginSql)
        console.log("获取到的管理员信息",adminInfo);
        if(adminInfo.length){
            data['adminInfo'] = toHumpFun(adminInfo[0])
            meta['status'] = 201
            responce['data'] = data
            responce['meta'] = meta
            res.send(responce)
        }else{
            meta['status'] = 200
            responce['meta'] = meta
            res.send(responce)
        }
        
    })

}
module.exports = login