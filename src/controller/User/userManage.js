var toHumpFun = require('../../Tools/toHump')
const {exec} = require('../../db/mysql')
const getUserList = async function(req,res){
    console.log("请求获取用户列表",req.url);
    console.log("*********************************");
    const responce = {}
    const data = {}
    const meta = {}
    req.on("data",async function(queryInfo){
        const QueryInfo = JSON.parse(queryInfo)
        const searchKey = QueryInfo.searchKey
        const currentPage = QueryInfo.currentPage
        const pageSize = QueryInfo.pageSize
        console.log(searchKey,currentPage,pageSize);
       
        const getUserListSql = `SELECT user_id,user_nick_name,user_birthday,user_gender,
                                user_head_portrait,user_true_name,user_self_intro,user_state
                                FROM user
                                WHERE user_id LIKE '%${searchKey}%' OR
                                      user_nick_name LIKE '%${searchKey}%' OR
                                      user_true_name LIKE '%${searchKey}%' 
                                LIMIT ${(currentPage-1)*pageSize},${pageSize}
                                `
        const userList = await exec(getUserListSql)
        const userTotal = userList.length
        console.log(toHumpFun(userList));
        data['userList'] =toHumpFun(userList)
        data['total'] =  userTotal
        meta['status'] = 201
        responce['data'] = data
        responce['meta'] = meta
        res.send(responce)  
    })
   
}
const editUserInfo = async function(req,res){
    console.log("修改用户信息",req.url);
    console.log("******************************");   
    const responce = {}
    const meta = {}                 
    req.on("data",async function(userInfo){
        const UserInfo = JSON.parse(userInfo)
        console.log(UserInfo.userBirthday);
        const editUserInfoSql = `UPDATE user
                                SET user_gender='${UserInfo.userGender}',
                                    user_birthday='${UserInfo.userBirthday}',
                                    user_nick_name='${UserInfo.userNickName}',
                                    user_self_intro='${UserInfo.userSelfIntro}'
                                WHERE user_id='${UserInfo.userId}'`
        await exec(editUserInfoSql)
        meta['status'] = 201
        responce['meta'] = meta
        res.send(responce)
    })
}
const changeUserState = async function(req,res){
    console.log("切换用户账号状态",req.url);
    console.log("*******************************");
    const responce = {}
    const meta = {}       
    req.on("data",async function(changeStateInfo){
        console.log(changeStateInfo);
        const ChangeStateInfo = JSON.parse(changeStateInfo)
        const changeUserStateSql = `UPDATE user
                                    SET user_state='${ChangeStateInfo.userState}'
                                    WHERE user_id='${ChangeStateInfo.userId}'`
        await exec(changeUserStateSql)
        meta['status'] = 201
        responce['meta'] = meta
        res.send(responce)
    })  
}
const deleteUser = async function(req,res){
    console.log("注销用户",req.url);
    console.log("*****************************");
    const responce = {}
    const meta = {}    
    const userId = req.params.id
    const deleteUserSql = `DELETE FROM user WHERE user_id='${userId}'`
    await exec(deleteUserSql)
    meta['status'] = 201
    responce['meta'] = meta
    res.send(responce)

}
module.exports = {getUserList,editUserInfo,changeUserState,deleteUser}