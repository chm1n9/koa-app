require('babel-core/register')({
  'presets': [
    'stage-3',
    ["latest-node", { "target": "current" }]
  ]
})
require('babel-polyfill')


const Koa = require('koa')
const app = new Koa()
const serve = require('koa-static2')
const router2controller = require('./app/router2controller')
const config = require('./config/config.local')
const bodyParser = require('koa-bodyparser')
const { open, close } = require('./app/utils/mongo')
open()
// app.use(async ctx => {
//   ctx.body = 'Hello World';
// })
app.use(serve('static', __dirname + '/public'))
app.use(bodyParser())
app.use(router2controller())



app.listen(config.port)
