// 引入 express 框架 -> 需 npm 安装
var express = require('express');
//var cors = require('cors');
var router=require('./src/router/router');
var history = require('connect-history-api-fallback');
const {token} = require('./src/controller/Tools/token')

/**
 * 初始化框架,并将初始化后的函数给予 '当前页面'全局变量 app
 * 也就是说, app 是 express 
 */
var app = express();
app.use(history())
app.use(express.static(__dirname+'/static'))
app.use('/public', express.static('public'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*') //允许所有不同源的地址访问
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization') //Content-Type必须要设置，Authorization是用户登录注册时存入的token值，可根据需求来设置，还有其他的都需要用逗号隔开
	res.header('Access-Control-Allow-Credentials', true) // 这个必须要设置，否则解决跨域无效，注意true是字符串
	next()
})

app.use((req,res,next)=>{
    let User={}
	let meta={} 
	console.log(req.url);
	//如果携带了authorization参数，检查token是否正确
    if(req.headers.authorization){
        let tokenData = token.decrypt(req.headers.authorization)
        console.log(tokenData);
        if(tokenData.token){
				next()
        }else{
            meta['status'] = 200
            meta['msg'] = 'token不正确' 
            User['meta']=meta
            res.send(User)
        }
    }else{
		const urlName = req.url.split('/')[1]
		console.log("请求的接口为",urlName);
		//如果请求的接口为登录接口 放行
		if(urlName !== 'userLogin' && urlName !== 'userRegister'){
			meta['status'] = 200
			meta['msg'] = '处于未登录状态!' 
			User['meta']=meta
			res.send(User)
			res.end()
		}else{
			next()
		}
		
    }

	
})

router.route(app)

//app.use('/admin',router)
// 设置 public 为静态文件的存放文件夹

var server = app.listen(8090, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Node.JS 服务器已启动，访问地址： http://%s:%s", host, port)

})

module.exports = app;