const superagent = require('superagent'),
  cheerio = require('cheerio')
const {
  connect,
  close
} = require('./mongo');

connect()

const district = require('./model/district')

const getDistrictId = (async () => {
  return await district.find({id: 1})
})();

getDistrictId.then(v=>console.log(v))

// http://wh.ziroom.com/z/nl/z3.html?p=2

const root_url = 'http://wh.ziroom.com/z/nl/z3.html'
let count = 0

// getZiru()

// getRoomInfo('http://wh.ziroom.com/z/vr/60931451.html', 'no')

async function getZiru() {
  console.time('get ziru')
  for (let i = 1, l = 3; i < l; i++) {
    await getPage(i)
  }
  console.timeEnd('get ziru')
}


function getPage(pageNum) {
  return superagentGet(url, async function (resolve, res) {

    const $ = cheerio.load(res.text)
    $roomList = $('#houseList li')

    for (let i = 0, l = $roomList.length; i < l; i++) {
      const $room = $($roomList[i])
      const url = 'http:' + $room.find('.img.pr>a').attr('href')
      const thumbUrl = $room.find('.img.pr>a>img').attr('src').slice(2)
      await getRoomInfo(url, thumbUrl)
      count++
    }
    resolve()
  })
}

function getRoomInfo(url, thumbUrl) {
  return superagentGet(url, async function (resolve, res) {
    const id = url.match(/\d*(?=\.html$)/)[0]
    // $('#resblock_id').val()+'&room_id='+$('#room_id').val()+'&house_id='+$('#house_id').val()+'&ly_name='+$('#ly_name').val()+'&ly_phone='+$('#ly_phone').val()
    const $ = cheerio.load(res.text)

    const stewardParams = {
      room_id: $('#room_id').val(),
      house_id: $('#house_id').val(),
      resblock_id: $('#resblock_id').val(),
      ly_name: $('#ly_name').val(),
      ly_phone: $('#ly_phone').val()
    }
    const configParams = {
      house_id: stewardParams.house_id,
      id: stewardParams.room_id
    }
    const otherInfos = await Promise.all([getRoomConfig(configParams), getRoomSteward(stewardParams)])
    const _info = parseHtml($)
    const info = {
      id: 'zr-' + id,
      thumbUrl,
      url,
      ..._info,
      ...otherInfos[0],
      ...otherInfos[1]
    }
    setTimeout(function () {
      console.log(info)
      resolve()
    }, 500)
  })
}

function stringify(params) {
  return Object.entries(params)
    .map((p) => (p[0] + '=' + p[1]))
    .join('&')
}

function getRoomSteward(params) {
  // http://wh.ziroom.com/detail/steward?resblock_id=3711062640768&room_id=60931451&house_id=60149831&ly_name=&ly_phone=
  return superagentGet(`http://wh.ziroom.com/detail/steward?${stringify(params)}`, function (resolve, res) {
    resolve({
      steward: res.body.data || {}
    })
  })
}

function getRoomConfig(params) {
  // http://wh.ziroom.com/detail/config?house_id=60149831&id=60931451
  return superagentGet(`http://wh.ziroom.com/detail/config?${stringify(params)}`, function (resolve, res) {
    resolve({
      config: res.body.data || {}
    })
  })
}

function parseHtml($) {
  // 江南明珠园7居室-03卧
  const roomName = $('.room_name h2').text().trim()
  const detailImgs = Array.from($('.lof-navigator li img')
    .map(function (i, el) {
      return $(this).attr('src');
    }))
  // [武昌 积玉桥]
  const _subTitle = $('.room_name span.ellipsis').text().trim()
    .replace(/[\s|\n]+/g, ' '),
    [, local1, local2] = _subTitle.match(/\[([^\s]*)\s*([^\]]*)\]/)

  const $_mapsearchText = $('#mapsearchText'),
    localtion = {
      // 纬度
      lat: $_mapsearchText.data('lat'),
      // 经度
      lng: $_mapsearchText.data('lng')
    }


  const price = Number($('#room_price').text().replace(/[^\d]/g, ''))
  // 离地铁近，  风格4.0 米苏
  const tags = Array.from($('.room_tags span')
    .map(function () {
      return $(this).text()
    }))
  const tel = $('.tel')

  const details = $('.detail_room li')
  const area = Number($(details[0])
    .text()
    .replace(/\n|\s/g, '')
    .match(/\d+\.?\d*/))
  const orientation = $(details[1]).text().replace(/\n|\s/g, '').slice(3)
  const houseType = $(details[2]).text().match(/(\d+)[^\d]+(\d+)/)
  const layer = $(details[3]).text().match(/(\d+)[^\d]+(\d+)/)
  const t = $(details[4]).children('#lineList').text().trim()
  const _traffics = $(details[4]).children('#lineList').text().trim().replace(/(\n|\s)+/g, ',')

  const detail = {
    area,
    orientation,
    bedroom: houseType[1],
    sittingroom: houseType[2],
    floorNum: layer[1],
    floorTotal: layer[2],
    traffics: getTraffics(_traffics)
  }
  return {
    roomName,
    detailImgs,
    district1: local1,
    district2: local2,
    localtion,
    price,
    tags,
    detail
  }
}

function getTraffics(trafficsString) {
  const arr = trafficsString.split(',')
  return arr.map(t => {
    const [, line, station, distance] = t.match(/距([^线]*线)([^\d]*)(\d*)/)
    return {
      line,
      station,
      distance: Number(distance)
    }
  })
}

function superagentGet(url, callback) {
  return new Promise(function (resolve, reject) {
    superagent
      .get(url)
      .end((err, res) => {
        if (err) {
          console.log(err)
          return reject({})
        }
        callback(resolve, res)
      })
  })
}