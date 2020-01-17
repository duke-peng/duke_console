// 数据库连接地址

var mysql = require('mysql')

var connenction = mysql.createConnection({
 host: 'localhost',
 // host: '47.98.141.231',

 user: 'root',
 password: '123456',
 database: 'shuati'
})
connenction.connect()

module.exports = connenction
