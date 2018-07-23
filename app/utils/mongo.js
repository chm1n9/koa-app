const mongoose = require('mongoose')
const dbHost = 'mongodb://127.0.0.1:27017/',
  dbName = 'local'

// const options = {
//   server: {
//     auto_reconnect: true,
//     poolSize: 10
//   }
// }

export function open() {
  mongoose.connect(dbHost + dbName, { useNewUrlParser: true })

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.on('disconnected', console.error.bind(console, 'disconnected!'))
  db.once('open', function(callback) {
    console.log('connet success!')
  })
}
export function close() {
  mongoose.disconnect()
}