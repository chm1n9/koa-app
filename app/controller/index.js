module.exports = {
  'GET' : async function(ctx, next) {
    console.log('index')
    ctx.response.type = 'application/json'
    ctx.response.status = 200
    ctx.body = JSON.stringify({a: "Hello World"})
  }
}