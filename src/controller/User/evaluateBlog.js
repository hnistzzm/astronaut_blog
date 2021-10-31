var express=require('express');
const toHumpFun = require('../Tools/toHump')
const {token} = require('../Tools/token')
const {exec} = require('../../db/mysql');
const dayjs = require('dayjs')
const blogThumbsUp =async function(req,res){
    let tokenData = token.decrypt(req.headers.authorization)
    let responce = {}
    let Data = {}
    let meta ={}
    req.on("data",async function(data){
        console.log(JSON.parse(data));
        console.log("用户id",tokenData.id);
        const blogLikeTime = dayjs().format('YYYY-MM-DD HH:mm:ss') //获取当前时间
        const blogId = JSON.parse(data)//博客id
        const userId = tokenData.id//点赞or取消点赞的用户id

        //判断用户是否曾经点赞过这条博客
        const judgeSql = `SELECT COUNT(1) as total FROM blog_like  
                          WHERE
                          user_id=${userId} AND blog_id=${blogId}`
        console.log(JSON.stringify(await exec(judgeSql)) );
        //如果点赞过
        const isCreated = (await exec(judgeSql))[0].total
        let blogLikeState;
        console.log(isCreated);
        if(isCreated){
            const updateLikeSql =  `UPDATE blog_like 
                                    SET 
                                    like_time='${blogLikeTime}',like_state=abs(like_state-1) 
                                    WHERE 
                                    user_id=${userId} AND blog_id=${blogId}`
            await exec(updateLikeSql)
            const getBlogLikeStateSql = `SELECT like_state
                                         FROM blog_like
                                         WHERE
                                         user_id=${userId} AND blog_id=${blogId}`
            blogLikeState =(await exec(getBlogLikeStateSql))[0].like_state
            const blogLikeChangeNum = (blogLikeState==1?1:-1)
            console.log("获取到的点赞状态为",blogLikeState);
            console.log(blogLikeChangeNum);
            const updateLikeBlogSql = ` UPDATE blog
                                        SET
                                        blog_likes=blog_likes+${blogLikeChangeNum}
                                        WHERE
                                        blog_id=${blogId}`
            await exec(updateLikeBlogSql)


        }else{
            //如果没有点赞过
            const creatLikeSql = `INSERT INTO blog_like 
                                  (user_id,blog_id,like_time) 
                                  VALUES
                                  (${userId},${blogId},'${blogLikeTime}')`
            const likeBlogSql = `UPDATE blog
                                 SET
                                 blog_likes=blog_likes+1
                                 WHERE
                                 blog_id=${blogId}`
            blogLikeState = 1
            await exec(creatLikeSql)
            await exec(likeBlogSql)
        }
        const getBloglikeNumSql = `SELECT blog_likes
                                FROM blog
                                WHERE
                                blog_id=${blogId}`
        const blogLike = (await exec(getBloglikeNumSql))[0].blog_likes;
        const isThumbsUp = blogLikeState
        meta['status'] = 201
        Data['blogLike']= blogLike
        Data['isThumbsUp']= isThumbsUp
        responce['meta'] = meta
        responce['data'] = Data
        res.send(responce)

    })

}

module.exports={blogThumbsUp}