var connection = require('../database/test')
class AddInfo {
 constructor(name) {
  this.sqlHeader = `INSERT INTO ${name}`
 }
 add(params) {
  let name = [], value = [];
  Object.keys(params).forEach(element => {
   name.push(element)
   value.push(`"${params[element]}"`)
  });

  let sql = `${this.sqlHeader}(${name}) VALUES(${value})`
  console.log(sql)

  let aa = new Promise((res, err) => {
   connection.query(sql, function (err, result) {
    if (err) {
     console.log('[SELECT ERROR] - ', err);
     err(`[SELECT ERROR] - , ${err}`)
     return
    }
    res(result)
    console.log('-----', result)
   });
  })
  return aa
 }
 addinfo(params) {
  let name = [], value = [];
  Object.keys(params).forEach(element => {
   name.push(element)
   value.push(`${params[element]}`)
  });
  console.log(value)
  let sql = `${this.sqlHeader}(${name}) VALUES(?,?,?,?,?,?,?,?,?)`
  console.log(sql)

  return new Promise((res, error) => {
   connection.query(sql, value, function (err, result) {
    if (err) {
     console.log('[SELECT ERROR] - ', err);
     err(`[SELECT ERROR] - , ${err}`)
     return
    }
    res(result)
    console.log('-----', result)
   });
  })


 }
}

module.exports = AddInfo