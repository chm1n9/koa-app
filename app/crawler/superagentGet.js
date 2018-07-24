import superagent from 'superagent'

function superagentGet(url, callback) {
  return new Promise(function (resolve, reject) {
    superagent
      .get(url)
      .end((err, res) => {
        if (err) {
          console.error('superagent get error : ' + err)
          console.log('ERROR URL: ' + url + '.')
          return reject({ body: {} })
        }
        callback(resolve, res)
      })
  })
}
export default superagentGet