module.exports = {
  'GET' : function(ctx, next) {
    console.log('index')
    ctx.body = 'Hello World'
  }
}