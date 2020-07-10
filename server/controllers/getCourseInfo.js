// 获取课程资料
const mysql = require('../knex')
const path = require('path')

module.exports = async (ctx, next) => {
  // 获取前端传入的参数
  const { courseName } = ctx.request.query

  try {
    let getCourseInfo = []

    getCourseInfo = await mysql('course')
      .where('cname', 'like', `${courseName}%`)
    const courseInfo = getCourseInfo[0]

    ctx.state = {
      code: 0,
      data: courseInfo
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
