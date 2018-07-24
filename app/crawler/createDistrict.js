const { open, close } = require('../utils/mongo')
open()
const district = require('../model/district')

const d = require('../data/bk.json')

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
      const children = []
      for (let i = 0, l = l2s.length; i < l; i++) {
        const l2 = await district.create({
          id: id * 100 + i + 1,
          name: l2s[i],
          level: 2,
          parentId: l1._id
        })
        children.push(l2._id)
      }
      await district.update(l1._id, {
        children
      })
    }
  } catch (error) {
    console.error(error)
    close()
  } finally {
    close()
  }

})()