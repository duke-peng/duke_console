// 用户
var express = require('express');
var connection = require('../database/test')
var QueryData = require('../tool/query')
var AddData = require('../tool/add')

var message = require('../tool/message')
let Messages = new message()
var router = express.Router();


// function format(params) {
//  let obj = {}
//  let code = ''
//  params.forEach((element) => {
//   console.log(element)
//    code = element.toLowerCase()
//   obj[code] = element
//  })
//  return obj
// }


/* GET users listing. */
router.get('/', function (req, res, next) {
 async function queryUser(params) {
  let user = new QueryData('user')
  let list = await user.list('user')
  console.log(list)
  res.send(Messages.state(list));
 }

 queryUser()

});

// 分页查询用户数据
router.get('/page', function (req, res, next) {

 async function queryUser(params) {
  let user = new QueryData('user')
  let list = await user.page({ pageNo: 1, pageSize: 5 })
  let count = await user.count()

  res.send(Messages.page(list, count[0]));
 }

 queryUser()

});

router.get('/multiple', function (req, res, next) {

 async function queryUser(params) {
  let user = new QueryData('user')
  let list = await user.multiple()

  res.send(Messages.state(list));
 }

 queryUser()

});


// 新增用户
router.post('/addUser', function (req, res, next) {
 let addUser = new AddData('user')
 let obj = req.body
 
 let params = {
  NAME: obj.name,
  SEX: obj.sex,
  TYPE: obj.type,
  EMAIL: obj.email,
  // TIME: obj.time,
  PHONE: obj.phone,
  MAKE: obj.make,
  USERNAME: obj.userName,
  PASSWORD: obj.password
 }
 params.TIME = new Data().getTime()
 let name = [], value = [];
 Object.keys(params).forEach(element => {
  name.push(element)
  value.push(`"${params[element]}"`)
 });

 addUser.add(params)

 res.send(Messages.state());

});

// 登录 

router.post('/login', (req,res,next) => {
 let data = req.body
 console.log(data)
 let sql = `SELECT 
 NAME name,
 SEX sex,
 TYPE type,
 EMAIL email,
 TIME time,
 PHONE phone,
 MAKE make,
 USERNAME userName
 FROM user WHERE USERNAME = '${data.userName}' AND PASSWORD = '${data.password}'`
 connection.query(sql, (err, result) => {
  if (err) {
   res.send(Messages.error());
  } else {
   if (result.length!==0) {
    res.send(Messages.state(result));
   } else {
    res.send(Messages.error('530', '用户名或密码错误'));
   }
  }
 })

})
// router.get('/login', (res, req, next) => {
//  let data = req.body
//  console.log(data)
//  res.send(Messages.state());
// })

module.exports = router;
