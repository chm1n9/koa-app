const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const router = new Router()

router.prefix('/api/v1')

module.exports = (dir = 'controller') => {
  addControllers(router, dir)
  return router.routes()
}

function addControllers(router, dir) {
  const root = path.join(__dirname, dir)
  let stack = fs.readdirSync(root)
  let dirs = []
  while (stack.length) {
    let d = stack.pop()
    if (d.endsWith('.js')) {
      dirs.push(d)
    } else if (fs.statSync(root + '/' + d).isDirectory()) {
      Array.prototype.push.apply(stack, fs.readdirSync(root + '/' + d).map(u => d + '/' + u))
    }
  }
  console.log(dirs)
  dirs.forEach(f => {
    console.log(`process controller: ${f}...`)
    let mapping = require(path.join(__dirname, dir, f))
    addMapping(router, mapping, f)
  })
}

function addMapping(router, mapping, dir) {
  for (let url in mapping) {
    const u = url.split(' ')
    const method = u[0].toLowerCase()
    const _url = u[1] || ''
    const path = '/' + dir.replace(/\/?[^\/]*.js$|.js$/, '') + _url
    try {
      router[method](path, mapping[url])
      console.log(`register URL mapping: *** ${u[0]}: ${path} ***`)
    } catch (error) {
      console.log(`register URL mapping *** ${u[0]}: ${path} *** error`)
      console.error(error)
    }
  }
}