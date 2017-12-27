const path = require('path')
const Koa = require('koa2')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const multer = require('koa-multer')
const statics = require('koa-static')
const app = new Koa()
const router = new Router()

// upload config
const uploadConfig = multer.diskStorage({
  // url
  destination: (req, file, cb) => {
    cb(null, 'upload')
  },
  filename: (req, file, cb) => {
    const fileFormat = file.originalname.split('.')
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})

const upload = multer({storage: uploadConfig})

app.use(bodyParser())

// router begin
router.all('/upfile', upload.single('file'), (ctx, next) => {
  ctx.body = `<h1>${ctx.request}</h1>`
  console.log(ctx.request)
})

router.get('/hello', ctx => {
  ctx.body = '<h1>hello, world!</h1>'
})

// router.get('/', ctx =>{
//   ctx.body = '<h1>hello, world</h1>'
// })

app.use(statics(path.resolve(__dirname, 'static')))

app.use(router.routes())

app.listen(3000, () => {
  console.log('猛禽系统已经启动')
})
