var connection = require('../database/test')

class remove {
 constructor(name) {
  this.name = name
  this.sqlHeader = `DELETE FROM ${name}`
  // DELETE FROM students WHERE id = 1;

 }
 info(id) {
  let sql = `${this.sqlHeader} WHERE id=${id}`
  console.log(sql)
  return new Promise((res, error) => {
   connection.query(sql, function (err, result) {
    if (err) {
     error(false)
     console.log('[SELECT ERROR] - ', err.message);
    } else {
     res(true)
     console.log('[result] - ', result);
    }

   })
  })

 }
}

module.exports = remove