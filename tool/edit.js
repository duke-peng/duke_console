var connection = require('../database/test')
// UPDATE students SET name = '大牛', score = 66 WHERE id = 1;
class editData {
 constructor(name) {
  this.sqlHeader = `UPDATE ${name} SET`
 }
 edit(parame) {
  let str = []
  let id = ''
  let value = []
  Object.keys(parame).forEach((element) => {
   if (element !== "id") {
    // str += `,${element} = ?`
    str.push(`${element} = ?`)
    value.push(parame[element])
   } else {
    id = parame[element]
   }
   str.join(",")
  })
  let sql = `${this.sqlHeader} ${str} WHERE id = ${id}`
  return new Promise((res, error) => {
   connection.query(sql, value, function (err, result) {
    if (err) {
     console.log('[SELECT ERROR] - ', err);
     error(false)
     return
    }
    res(true)
    console.log('-----', result)
   });

  })





 }







}

module.exports = editData
