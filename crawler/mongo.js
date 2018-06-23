const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/rooms'
module.exports = mongoose.connect(url)
