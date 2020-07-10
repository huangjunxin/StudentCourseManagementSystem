const router = require('koa-router')()
const controllers = require('../controllers')

router.prefix('/course')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a course response!'
})

router.get('/getCourseInfo', controllers.getCourseInfo)

module.exports = router
