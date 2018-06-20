const superagent = require('superagent'),
  cheerio = require('cheerio')

// http://wh.ziroom.com/z/nl/z3.html?p=2

const root_url = 'http://wh.ziroom.com/z/nl/z3.html'
let count = 0

getZiru()

async function getZiru() {
  console.time('get ziru')
  for (let i = 1, l = 3; i < l; i++) {
    await getPage(i)
  }
  console.timeEnd('get ziru')
}


function getPage(pageNum) {
  return new Promise(function (resolve, reject) {
    superagent.get(`${root_url}?p=${pageNum}`).end(async function (err, res) {
      if (err) {
        console.log(err)
        return
      }

      const $ = cheerio.load(res.text)
      $roomList = $('#houseList li')

      for (let i = 0, l = $roomList.length; i < l; i++) {
        await getRoomInfo($($roomList[i]))
        count++
      }
      resolve()
    })
  })

}

function getRoomInfo($room) {
  const url = $room.find('.img.pr>a').attr('href')
  const imgUrl = $room.find('.img.pr>a>img').attr('src').slice(2)

  return new Promise(function (resolve, reject) {
    superagent.get('http:' + url).end((err, res) => {
      if (err) {
        console.log(err)
        return
      }
      const $ = cheerio.load(res.text)
      const roomName = $('.room_name h2').text().trim()
      const subTitle = $('.room_name span.ellipsis').text().trim().replace(/[\s|\n]+/g, ' ')
      const price = Number($('#room_price').text().replace(/[^\d]/g, ''))
      const tags = $('.room_tags span').map(function () {
        return $(this).text()
      })
      const details = $('.detail_room li')
      const area = Number($(details[0]).text().replace(/\n|\s/g, '').slice(3, 5))
      const orientation = $(details[1]).text().replace(/\n|\s/g, '').slice(3)
      const houseType = $(details[2]).text().match(/(\d+)[^\d]+(\d+)/)
      const layer = $(details[3]).text().match(/(\d+)[^\d]+(\d+)/)
      const traffic = $(details[4]).children('#lineList').text().trim().replace(/(\n|\s)+/g, ',')
      const detail = {
        area,
        orientation,
        houseType1: houseType[1],
        houseType2: houseType[2],
        layer1: layer[1],
        layer2: layer[2],
        traffic
      }
      const info = {
        roomName,
        subTitle,
        price,
        imgUrl,
        tags,
        detail
      }
      setTimeout(function () {
        console.log(info)
        resolve()
      }, 1000)

    })
  })
}