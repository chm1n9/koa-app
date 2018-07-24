const { open, close } = require('../utils/mongo')
// open()
const district = require('../model/district')
const cheerio = require('cheerio')

import { default as get } from './superagentGet'
// const d = require('../data/bk.json')

const root_url = 'https://wh.zu.ke.com'

const typeMap = {
  district: {
    target: 'area'
  },
  station: {
    target: 'station'
  }
}

get('https://api.zu.ke.com/v1/config/filters?city_id=420100', (data) => {
  console.log(data)
})


// getL2(typeMap.district.target)
// function getL2(target) {
//   return get(root_url + '/zufang', async function (resolve, res) {

//     const $ = cheerio.load(res.text)
//     const $l2List = $('[data-target="'+target+'"] li.filter__item--level2 a')
//     let l2List = []
//     for (let i = 1, l = $l2List.length; i < l; i++) {
//       l2List.push({
//         text: $($l2List[i]).text(),
//         url: $($l2List[i]).attr('href')
//       })
//     }

//     getL3(target, l2List[0].url)

//     resolve()
//   })
// }


// function getL3(target, uri) {
//   return get(root_url + uri, async function (resolve, res) {
//     const $ = cheerio.load(res.text)
//     const $l3List = $('[data-target="'+target+'"] li.filter__item--level3 a')
//     let l3List = []
//     for (let i = 1, l = $l3List.length; i < l; i++) {
//       l3List.push({
//         text: $($l3List[i]).text(),
//         url: $($l3List[i]).attr('href')
//       })
//     }
//     console.log(l3List)


//     resolve()
//   })
// }


/**
  ; (async function run() {
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

  */