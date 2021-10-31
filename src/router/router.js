
var login = require('../controller/User/login')
var register = require('../controller/User/register')
var writeBlog = require('../controller/User/writeBlog')
var getBlog =require('../controller/User/getBlog')
var deleteBlog=require('../controller/User/deleteBlog')
var checkLogin = require('../controller/Tools/checkLogin')
var getUserInfo = require('../controller/User/getUserInfo')
var search = require('../controller/User/searchBlog')
var evaluateBlog = require('../controller/User/evaluateBlog')

const route = function(app){
    app.post('/userLogin',login)
    app.post('/userRegister',register)
    app.post('/saveBlog',writeBlog.writeBlog)
    app.post('/getNowBlog',getBlog.getNowBlog)
    app.post('/getBlogList',getBlog.getBlogList)
    app.post('/getTagList',getBlog.getTagList)
    app.post('/getRecommendBlogs',getBlog.getRecommendBlogs)
    app.post('/checkLogin',checkLogin.checkLogin)
    app.post('/writeBlog/addImage',writeBlog.addImage)
    app.post('/writeBlog/beforeAddCoverImage',writeBlog.beforeAddCoverImage)
    app.get('/deleteBlog',deleteBlog.deleteBlog)
    app.post('/getUserInfo',getUserInfo.getUserInfo)
    app.post('/editUserInfo',getUserInfo.editUserInfo)
    app.post('/beforeUpload',getUserInfo.beforeUploadHeadPortrait)
    app.post('/upload',getUserInfo.uploadHeadPortrait)
    app.post('/search',search.searchBlog)
    app.post('/blogThumbsUp',evaluateBlog.blogThumbsUp)
}

exports.route = route;
