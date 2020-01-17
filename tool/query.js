//查询的封装

var connection = require('../database/test')
class query {
 constructor(list) {
  this.name = list
  this.sqlHeader = `SELECT 
  NAME name,
  SEX sex,
  PASSWORD password,
  TYPE type,
  EMAIL email,
  TIME time,
  PHONE phone,
  MAKE make,
  USERNAME username
  FROM ${list}`


 }
 // 查询表内所有的数据
 list() {
  let aa = new Promise((res, err) => {
   connection.query(this.sqlHeader, function (err, result) {
    if (err) {
     console.log('[SELECT ERROR] - ', err.message);
     err(`[SELECT ERROR] - , ${err.message}`)
     return
    }
    res(result)
   });
  })
  return aa
 }
 // 分页查询表内的数据
 page(params) {
  let sql = `${this.sqlHeader} LIMIT ${params.pageSize || 10} OFFSET ${params.pageNo - 1 || 0}`
  let aa = new Promise((res, err) => {
   connection.query(sql, function (err, result) {
    if (err) {
     console.log('[SELECT ERROR] - ', err.message);
     err(`[SELECT ERROR] - , ${err.message}`)
     return
    }
    res(result)

   });
  })
  return aa
 }
 // 聚合查询
 count() {
  let sql = `SELECT COUNT(*) count FROM ${this.name}`
  let cc = new Promise((res, err) => {
   connection.query(sql, function (err, result) {
    if (err) {
     console.log('[SELECT ERROR] - ', err.message);
     err(`[SELECT ERROR] - , ${err.message}`)
     return
    }
    res(result)

   });

  })
  return cc
 }
 // 多表查询 
 multiple() {
  let sql = `SELECT s.id sid,c.id cid FROM user s, tiku c`;
  let bb = new Promise((res, err) => {
   connection.query(sql, function (err, result) {
    if (err) {
     console.log('[SELECT ERROR] - ', err.message);
     err(`[SELECT ERROR] - , ${err.message}`)
     return
    }
    res(result)

   });
  })
  return bb
 }
}
module.exports = query