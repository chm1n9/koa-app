const Koa = require('koa')
const app = new Koa()
const serve = require('koa-static2')
const router2controller = require('./app/router2controller')
const config = require('./config/config.local')


// app.use(async ctx => {
//   ctx.body = 'Hello World';
// })
app.use(serve('static', __dirname + '/public'))
app.use(router2controller());




// app.callback = () => {
//   console.log(`Server started and listen on port ${config.port}`)
// }
app.listen(config.port)
