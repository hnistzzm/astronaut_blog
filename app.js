
var express = require('express');
var router = require('./routes/index')
var path = require('path');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
router.route(app)

var server = app.listen(9000, function() {
  var host = server.address().address
  var port = server.address().port
  console.log("Node.JS 服务器已启动，访问地址： http://%s:%s", host, port)

})

module.exports = app;
