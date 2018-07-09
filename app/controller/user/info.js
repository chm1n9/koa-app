module.exports = {
  'GET /info' : function(ctx, next) {
    console.log('get info')
    ctx.body = 'user-info'
  }
}