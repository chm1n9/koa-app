const mongoose = require('mongoose')
const dbHost = 'mongodb://127.0.0.1:27017/',
  dbName = 'test'

// const options = {
//   server: {
//     auto_reconnect: true,
//     poolSize: 10
//   }
// }

exports.connect = function() {
  mongoose.connect(dbHost + dbName)

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.on('disconnected', console.error.bind(console, 'disconnected!'))
  db.once('open', function (callback) {
    console.log('connet success!')
  })
}
exports.close = function() {
  mongoose.disconnect()
}