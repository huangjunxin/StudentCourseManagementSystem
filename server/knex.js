// 数据库配置
var mysql = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'hidongdongdong',
    database: 'school'
  }
})

module.exports = mysql
