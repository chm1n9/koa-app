const room = require('../model/room')

module.exports = {
  find
}

async function find(params) {
  return room.find(params)
}