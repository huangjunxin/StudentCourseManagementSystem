const router = require('koa-router')()
const controllers = require('../controllers')

router.prefix('/student')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a student response!'
})

router.get('/getStudentInfo', controllers.getStudentInfo)

module.exports = router
