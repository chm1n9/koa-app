const {
  connect,
  close
} = require('./mongo')
connect()
const district = require('./model/district')

const d = require('./data/district.json')

;
(async function run() {
  let index = 1
  try {
    for (let key in d) {
      const id = index++;
      const l1 = await district.create({
        id,
        name: key,
        level: 1,
        parentId: null,
      })
      const l2s = d[key]
      for (let i = 0, l = l2s.length; i < l; i++) {
        await district.create({
          id: id * 100 + i + 1,
          name: l2s[i],
          level: 2,
          parentId: l1._id
        })
      }
    }
  } catch (error) {
    console.error(error)
    close()
  } finally {
    close()
  }

})()