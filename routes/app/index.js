
var express = require('express');
var router = express.Router();
var connection = require('../../database/test')
var messages = require('../../tool/message')
let Messages = new messages()
var hot = require('./hot.js');

// 随机查询10到题目
router.get('/random', function (req, response, next) { 
 let sql ='SELECT * FROM tiku ORDER BY RAND() LIMIT 10'
 connection.query(sql,  function (err, result) {
  if (err) {
   console.log('[SELECT ERROR] - ', err.message);
   err(`[SELECT ERROR] - , ${err.message}`)
   return
  }
  response.send(Messages.state(result));
 })
})


// 查询题目类型
router.get('/queryBigType', function (req, response, next) {
 let bigType = req.query.key
 let sql = ''
 console.log(bigType,'-----')
 if (bigType!==undefined) {
  sql = `SELECT * FROM tiku WHERE bigType = '${bigType}'`
  connection.query(sql, function (err, result) {
   if (err) {
    console.log('[SELECT ERROR] - ', err.message);
    err(`[SELECT ERROR] - , ${err.message}`)
    return
   }

   // let couns = `SELECT COUNT(*)total FROM tiku WHERE bigType = '${ bigType }'`
   // connection.query(couns, function (err, pice) { 
   //  response.send(Messages.page(result, ...pice));
   // })  
   response.send(Messages.state(result));
  })
 } else {
  response.send(Messages.defaultError('查询错误'));
  return false
 }
 
})

module.exports = [router,hot];