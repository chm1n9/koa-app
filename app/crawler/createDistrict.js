const { open, close } = require('../utils/mongo')
open()
import DistrictModel from '../model/district'
import StationModel from '../model/station'
import axios from 'axios'

DistrictModel.deleteMany({}, function (err) {
  if (err) console.log('delete error: ' + err)
  else console.log('delete succeed')
})
StationModel.deleteMany({}, function (err) {
  if (err) console.log('delete error: ' + err)
  else console.log('delete succeed')
})

axios.get('https://api.zu.ke.com/v1/config/filters?city_id=420100')
  .then(async (res) => {
    const { d, li } = res.data.data
    await districtHandler(d.options)
    await stationHandler(li.options)
    close()
  })

async function districtHandler(data) {
  console.log('创建商圈开始')
  await dataHandler(DistrictModel, data)
  console.log('创建商圈结束')

}
async function stationHandler(data) {
  console.log('创建地铁开始')
  await dataHandler(StationModel, data)
  console.log('创建地铁结束')
}

async function dataHandler(Model, d) {
  const saveModel = saveModelFac(Model)
  try {
    for (let i = 1, l = d.length; i < l; i++) {
      const l2Data = d[i]
      const l2Model = {
        id: i,
        name: l2Data.name,
        level: 2,
        parentId: null,
        children: []
      }
      const level2Doc = await saveModel(l2Model)
      const level2DocId = level2Doc._id
      const level2ChildrenId = []
      const children = l2Data.children
      for (let k = 1, l2 = children.length; k < l2; k++) {
        const l3Model = {
          id: i * 100 + k,
          name: children[k].name,
          level: 3,
          parentId: level2DocId,
          children: null
        }
        const level3Doc = await saveModel(l3Model)
        level2ChildrenId.push(level3Doc._id)
      }
      await new Promise(function (resolve, reject) {
        Model.findByIdAndUpdate(level2DocId, {
          $set: {
            children: level2ChildrenId,
            updateTime: Date.now()
          }
        }, function (error, data) {
          if (error) {
            console.error('[ db ] error: ' + error)
            resolve(error)
          } else {
            resolve(data)
          }
        })
      })

    }

  } catch (error) {
    console.error(error)
  }
}

function saveModelFac(Model) {
  return function (data) {
    const Entity = new Model(data)
    return new Promise(function (resolve, reject) {
      Entity.save(function (error, doc) {
        if (error) {
          console.log("error :" + error)
          reject()
        } else {
          console.log('saved: ' + doc.name)
          resolve(doc._id)
        }
      })
    })
  }
}
