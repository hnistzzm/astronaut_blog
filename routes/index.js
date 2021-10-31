var Login = require('../src/controller/User/login')
var getMenuList = require('../src/controller/Home/getAside')
var userManage = require('../src/controller/User/userManage')
var blogManage = require('../src/controller/Blog/blogManage')
var route = function(app){
  app.post('/login',Login),
  app.post('/getMenuList',getMenuList),
  app.post('/getUserList',userManage.getUserList),
  app.post('/editUserInfo',userManage.editUserInfo),
  app.post('/changeUserState',userManage.changeUserState),
  app.delete('/deleteUser/:id',userManage.deleteUser),
  app.post('/getBlogList',blogManage.getBlogList)
}
exports.route = route;
