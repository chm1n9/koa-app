module.exports = {
  'GET' : function(ctx, next) {
    console.log('get user')
    ctx.body = 'user'
  }
}