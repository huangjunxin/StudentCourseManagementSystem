const mysql = require('../knex')
const path = require('path')

module.exports = async (ctx, next) => {
  // 获取前端传入的参数
  const { studentName, studentGender } = ctx.request.query

  try {
    let getStudentInfo = []

    // 若性别有被选中时，则同时筛选性别
    if (studentGender && studentGender.length > 0) {
      getStudentInfo = await mysql('student')
        .where({
          ssex: studentGender
        })
        .where('sname', 'like', `${studentName}%`)
    } else { // 否则不作筛选
      getStudentInfo = await mysql('student')
        .where('sname', 'like', `${studentName}%`)
    }

    const newStudentInfo = []
    // 若检出有结果，则分别对每个学生进行课程的搜索
    if (getStudentInfo.length > 0) {
      for (let student of getStudentInfo) {
        const studentID = student.sno
        const getStudentCourse = await mysql.raw(`
          SELECT cname
          FROM course JOIN sc ON course.cno=sc.cno
          WHERE sc.sno=${studentID} 
        `)
        const courses = []
        for (const course of getStudentCourse[0]) {
          courses.push(course.cname)
        }
        student = {
          ...student,
          courses
        }
        newStudentInfo.push(student)
      }
    }
    ctx.state = {
      code: 0,
      data: newStudentInfo
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
