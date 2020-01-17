var express = require('express');
var router = express.Router();
var connection = require('../../database/test')
var messages = require('../../tool/message')
let Messages = new messages()
var proxy = require('http-proxy-middleware');

let superagent = require('superagent')

// 查询热点列表
// router.get('/queryhot', function (req, respon, next) {

//  function getInfo() {
//   // 利用superagent 模块发送请求，注意请求头的设置和POST请求体数据（请求参数）
//   var params = { "operationName": "", "query": "", "variables": { "tags": [], "category": "5562b415e4b00c57d9b94ac8", "first": 20, "after": "", "order": "POPULAR" }, "extensions": { "query": { "id": "653b587c5c7c8a00ddf67fc66f989d42" } } }
//   superagent.post('https://web-api.juejin.im/query').send(params).set('X-Agent', 'Juejin/Web').end((err, res) => {
//    if (err) {
//     return console.log(err)
//    }
//    // 保存所有文章信息
//    const array1 = JSON.parse(res.text).data.articleFeed.items.edges
//    const num = JSON.parse(res.text).data.articleFeed.items.pageInfo.endCursor
  
//    // 筛选出点赞数大于 50 的文章
//    result = array1.filter(item => {
//     return item.node.likeCount > 50
//    })
//    params.variables.after = mmu || num.toString() 

//    superagent.post('https://web-api.juejin.im/query').send(params).set('X-Agent', 'Juejin/Web').end((err, res) => {
//     if (err) {
//      return console.log(err)
//     }
//     const array2 = JSON.parse(res.text).data.articleFeed.items.edges
//     mmu = JSON.parse(res.text).data.articleFeed.items.pageInfo.endCursor
//     const result2 = array2.filter(item => {
//      return item.node.likeCount > 50
//     })
//     result2.forEach(item => {
//      result.push(item)
//     })

//     respon.send(Messages.state({ result }));;
    
//    })
   
//   })
  
//  }
 
//  getInfo()

// })




router.get('/queryhot', function (req, respon, next) {

 function getInfo(req) {
  let after = req.query.after || ''
  console.log(req.query,'-------')
  // 利用superagent 模块发送请求，注意请求头的设置和POST请求体数据（请求参数）
  var params = { "operationName": "", "query": "", "variables": { "tags": [], "category": "5562b415e4b00c57d9b94ac8", "first": 20, after, "order": "POPULAR" }, "extensions": { "query": { "id": "653b587c5c7c8a00ddf67fc66f989d42" } } }
  superagent.post('https://web-api.juejin.im/query').send(params).set('X-Agent', 'Juejin/Web').end((err, res) => {
   if (err) {
    return console.log(err)
   }
   // 保存所有文章信息
   const edges = JSON.parse(res.text).data.articleFeed.items.edges||''
   const endCursor = JSON.parse(res.text).data.articleFeed.items.pageInfo.endCursor || ''
   let result = edges.filter(item => {
    return item.node.likeCount > 10
   })
   respon.send(Messages.state({ edges: result, endCursor}));;
  })
 }
 getInfo(req)

})





module.exports = router;