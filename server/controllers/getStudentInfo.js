const mysql = require('../knex')
const path = require('path')

module.exports = async (ctx) => {
  try {
    const getStudentInfo = await mysql('student')
    ctx.state = {
      code: 0,
      data: getStudentInfo
    }
  } catch (e) {
    ctx.state = {
      code: -1,
      data: {
        msg: path.basename(__filename) + '数据库查询失败' + e.sqlMessage
      }
    }
  }
}
