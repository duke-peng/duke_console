// 返回的信息封装

class message {
 constructor() { }
 state(data) {
  return JSON.stringify({
   code: '0000',
   data,
   msg: '操作成功'
  })
 }
 // 分页
 page(data, count) {
  return JSON.stringify({
   code: '0000',
   data,
   // pageNo: params.pageNo,
   // pageSize: params.pageSize,
   ...count
  })
 }
 defaultOK(msg) {
  return JSON.stringify({
   code: '0000',
   msg: msg
  })
 }
 defaultError(msg) {
  return JSON.stringify({
   code: '2222',
   msg: msg
  })
 }
 error(code,msg) {
  return JSON.stringify({
   code: code||'2222',
   msg: msg||'系统错误'
  })
 }

}

module.exports = message