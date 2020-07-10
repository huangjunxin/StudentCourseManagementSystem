// 获取课程资料
const mysql = require('../knex')
const path = require('path')

module.exports = async (ctx, next) => {
  // 获取前端传入的参数
  const { courseName } = ctx.request.query
  console.log(courseName)

  try {
    let getCourseInfo = []

    getCourseInfo = await mysql('course')
      .where('cname', 'like', `${courseName}%`)

    const newCourseInfo = []
    // 若检出有结果，则分别对每个学生进行课程的搜索
    if (getCourseInfo.length > 0) {
      for (let course of getCourseInfo) {
        const courseID = course.cno
        const getGradeAvg = await mysql.raw(`
          SELECT AVG(grade) grade_avg
          FROM course JOIN sc ON course.cno=sc.cno
          WHERE sc.cno=${courseID}
          GROUP BY sc.cno
        `)
        course = {
          ...course,
          gradeAvg: getGradeAvg[0][0].grade_avg
        }
        newCourseInfo.push(course)
      }
    }
    ctx.state = {
      code: 0,
      data: newCourseInfo
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
