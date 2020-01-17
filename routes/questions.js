// 问题

var express = require('express');
var connection = require('../database/test')
var QueryData = require('../tool/query')
var AddData = require('../tool/add')
var removeData = require('../tool/remove')
var editData = require('../tool/edit')
var message = require('../tool/message')
let Messages = new message()
var router = express.Router();
var url = require('url')
// 查询问题列表
router.get('/list', function (req, res, next) {
 async function queryQuestions(params) {
  let ques = new QueryData('tiku')
  // let list = await ques.list('tiku')
  let reqdata = req.query

  // 查询类型 
  let type = reqdata.type ? `WHERE type = ${reqdata.type}` : ''
  // 查询属性
  let bigType = reqdata.bigType ? `WHERE bigType = ${reqdata.bigType}` : ''
  let sql = `tiku ${type || bigType}`
  // 类型和属性一起查询
  if (type && bigType) {
   sql = `tiku ${type} AND bigType = ${reqdata.bigType}`
  }
 // 获取总数
  let count = `SELECT COUNT(*)total FROM ${sql} `
  let pices =  await new Promise((rev) => {
   connection.query(count, function (err, pice) {
    
    rev(pice)
   })
 }) 
  console.log(pices)
   // 分页查询
  if (reqdata.pageSize && reqdata.pageNo) {
   sql = `${sql} LIMIT ${reqdata.pageSize} OFFSET ${(reqdata.pageNo-1)*reqdata.pageSize}`
  }
  console.log(sql)
  connection.query('SELECT * FROM '+sql, function (err, result) {
    console.log(result)
   res.send(Messages.page(result,...pices));    
    })
 }
 queryQuestions()
})

// 获取答案列表

router.get('/result', function (req, res, next) {
 async function queryQuestions(params) {
  let ques = new QueryData('tiku')
  let list = await ques.list('tiku')
  res.send(Messages.state());
 }
 queryQuestions()
})


//增加 
router.post('/add', function (req, res, next) {
 async function queryQuestions() {

  let parame = Object.assign({}, req.body, { "disabled": 1}) 
 
  console.log('parame----------', parame)
  // ques.addinfo(parame)

  // let sql = `INSERT INTO tiku (title,type,select,anserName,anser,disabled) VALUES (?,?,?,?,?,?)`
  let sql = 'INSERT INTO tiku(title,type,selectAll,anserName,anser,disabled,make) VALUES(?,?,?,?,?,?,?)'
  let arr = [parame.title, parame.type, parame.selectAll, parame.anserName, parame.anser, 1, parame.make]
  console.log(sql,'-------')
   connection.query(sql,arr, function (err, result) {
    if (err) {
     console.log('[SELECT ERROR] - ', err);
     return
    }
    res.send(Messages.defaultOK('新增成功'));
    console.log('-----', result)
   });

 }
 queryQuestions()
})

//修改 
router.post('/edit', function (req, res, next) {
 async function queryQuestions(params) {
  let ques = new editData('tiku')

  if (req.body.id == undefined) {
   res.send(Messages.defaultError('修改失败'));
   return
  }
  let state = await ques.edit(req.body)
  if (state) {
   res.send(Messages.defaultOK('修改成功'));
  } else {
   res.send(Messages.defaultError('修改失败'));
  }

 }
 queryQuestions()
})

// console.log('url参数对象 :', req.params);
// console.log('get请求参数对象 :', req.query);
// console.log('post请求参数对象 :', req.body);

//逻辑删除 
router.get('/delete', function (req, res, next) {
 async function queryQuestions(params) {
  let ques = new removeData('tiku')
  let state = await ques.info(req.query.id)
  if (state) {
   res.send(Messages.defaultOK('删除成功'));
  } else {
   res.send(Messages.defaultError('删除失败'));
  }
 }
 queryQuestions()
})


//物理删除 
router.get('/remove', function (req, res, next) {
 async function queryQuestions(params) {
  let ques = new removeData('tiku')
  let state = await ques.info(req.query.id)
  if (state) {
   res.send(Messages.defaultOK('删除成功'));
  } else {
   res.send(Messages.defaultError('删除失败'));
  }
 }
 queryQuestions()
})


//分类条件查询

router.get('/type', function (req, res, next) {
 let form = req.query
 // let type = req.body
 let sql = ` SELECT * FROM ${form.type} WHERE `
 console.log(type)
 // connection.query()
 res.send(Messages.defaultOK('删除成功'));
})

module.exports = router;