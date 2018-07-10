const rooms = require('../../service/rooms')

module.exports = {
  'GET': async function(ctx, next) {
    console.log('get rooms')
    const result = await rooms.find()
    ctx.response.type = 'application/json'
    ctx.response.status = 200
    ctx.body = JSON.stringify(result)
  }
}