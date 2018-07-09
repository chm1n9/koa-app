const rooms = require('../../service/rooms')
import { graphqlKoa } from 'graphql-server-koa'
import schema from '../../graphql/schema'

module.exports = {
  'GET': async function(ctx, next) {
    console.log('get rooms')
    const result = await rooms.find()
    ctx.response.type = 'application/json'
    ctx.response.status = 200
    ctx.body = JSON.stringify(result)
    // const result = await graphqlKoa({ schema: schema })(ctx, next)
    // console.log(result)
  }
}