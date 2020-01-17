var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var routesPath = require('./routes/index');
var app = express();
var proxy = require('http-proxy-middleware');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//  设置跨域代理
// var options = {
//  target: 'https://web-api.juejin.im', // 目标服务器 host
//          changeOrigin: true,               // 默认false，是否需要改变原始主机头为目标URL
//           ws: true,                         // 是否代理websockets
//           pathRewrite: {
//               '^/app/juejin': '',     // 重写请求，比如我们源访问的是api/old-path，那么请求会被解析为/api/new-path
//              // '^/api/remove/path': '/path'           // 同上
//          },
//     };
// app.use('/app/juejin', proxy(options));

Object.keys(routesPath).forEach(element => {
 app.use(element, routesPath[element]);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
 next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
 // set locals, only providing error in development
 res.locals.message = err.message;
 res.locals.error = req.app.get('env') === 'development' ? err : {};

 // render the error page
 res.status(err.status || 500);
 res.render('error');
});

module.exports = app;
