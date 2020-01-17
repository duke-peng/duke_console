//主页
var express = require('express');
var router = express.Router();
var fs = require('fs')

var path = require('path');
// 时间模块
var datetime = require('silly-datetime');
// 文件上传模块
var formidable = require('formidable');

/* GET home page. */
router.get('/', function (req, response, next) {
 fs.readFile('public/platform.html', function (err, data) {
  if (err) {
   console.log(err);
   // HTTP 状态码: 404 : NOT FOUND
   // Content Type: text/plain
   response.writeHead(404, { 'Content-Type': 'text/html' });
  } else {
   // HTTP 状态码: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, { 'Content-Type': 'text/html' });
   // 响应文件内容
   response.write(data.toString());
  }
  //  发送响应数据
  response.end();
 })
});


router.get('/answer', function (req, response, next) {
 fs.readFile('public/answerApp.html', function (err, data) {
  if (err) {
   console.log(err);
   // HTTP 状态码: 404 : NOT FOUND
   // Content Type: text/plain
   response.writeHead(404, { 'Content-Type': 'text/html' });
  } else {
   // HTTP 状态码: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, { 'Content-Type': 'text/html' });
   // 响应文件内容
   response.write(data.toString());
  }
  //  发送响应数据
  response.end();
 })
});

// 上传
router.post('/updata', function (req, res, next) {
 var form = new formidable.IncomingForm();
 form.uploadDir = "./public/uploads";
 form.parse(req, function (err, fields, files) {

  // console.log(fields);
  // console.log(files);

  // 改文件名
  // 时间 + 随机数 + 后缀(文件名)

  // 引入的时间模块  silly-datetime 可自行下载
  var time = datetime.format(new Date(), 'YYYYMMDDHHmmss');
  // 生产5位的随机数
  var num = parseInt(Math.random() * 100000);
  // 获取上传文件的文件名
  var extname = path.extname(files.file.name);
  console.log(extname,'.........')
  // 获取旧名字
  // __dirname 代表当前项目 的根目录
  // 拼凑完整路径
  // var oldname = `${__dirname}'\'${files.file.path}`;
  var oldname = files.file.path
  // 拼接新名
  // var newname = __dirname + '/uploads/' + time + num + extname;
  var newname = "./public/uploads/" + time + '_' + num + '_' + files.file.name
  // 执行改名
  console.log(oldname, newname, '-------------------')
  fs.rename(oldname, newname, function (err) {
   res.writeHead(200, { "Content-Type": "text/html;charset = utf-8" });
   res.end('ok');
  });
 });

});

router.get('/mmun', function (req, response, next) {
 fs.readFile('public/uploads/uploads202001031454067073.txt', function (err, data) { 
  if (err) {
   console.log(err);
   // HTTP 状态码: 404 : NOT FOUND
   // Content Type: text/plain
   response.writeHead(404, { 'Content-Type': 'text/html' });
  } else {
   // HTTP 状态码: 200 : OK
   // Content Type: text/plain
   // response.writeHead(200, { 'Content-Type': 'text/html' });
   // 响应文件内容
   // response.write(data);
  }
  //  发送响应数据
  response.set({
   'Content-Type': 'application/octet-stream', //告诉浏览器这是一个二进制文件
   'Content-Disposition': 'attachment; filename=' + "fileName.png", //告诉浏览器这是一个需要下载的文件

  });

  response.end(data);
 
 })
})


module.exports = router;