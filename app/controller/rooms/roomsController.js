const rooms = require('./../../service/rooms')



module.exports = {
  'GET' : function(ctx, next) {
    ctx.body = 'room-list'
  }
}