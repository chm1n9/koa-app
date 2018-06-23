const db = require('./mongo')
const DistrictModel = require('./model/district')

const d = require('./data/district.json')
/*
  id: Number,
  name: String,
  level: {
    type: Number,
    min: 1,
    max: 2
  },
  parent_id: Number
*/
;(async function run() {
  let index = 1
  for (let key in d) {
    const id = index++;
    await createDistrict({
      id,
      name: key,
      level: 1,
    })
    const l2 = d[key]
    for (let i = 0, l = l2.length; i < l; i++) {
      await createDistrict({
        id: id * 100 + i + 1,
        name: l2[i],
        level: 2,
        parent_id: id
      })
    }
  }
})();

function createDistrict(data) {
  const districtEntity = new DistrictModel(data);
  return new Promise(function (resolve, reject) {
    //将district写入到数据库中
    districtEntity.save(function (error, doc) {
      if (error) {
        console.log("error :" + error);
        reject(error)
      } else {
        console.log("success :" + data.name);
        resolve(doc);
      }
    });
  })
}