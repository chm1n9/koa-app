const superagent = require('superagent'),
  cheerio = require('cheerio')
const {
  connect,
  close
} = require('./mongo');

connect()
const parseHtml  = require('./parseHtml.js')
const building = require('./model/building')
const room = require('./model/room')
const buildingCache = {}


// http://wh.ziroom.com/z/nl/z3.html?p=2

const root_url = 'http://wh.ziroom.com/z/nl/z3.html?p='
let count = 0

getZiru()

// getRoomInfo('http://wh.ziroom.com/z/vr/60931451.html', 'no')

async function getZiru() {
  console.time('get ziru')
  for (let i = 1, l = 3; i < l; i++) {
    await getPage(i)
  }
  console.timeEnd('get ziru')
}


function getPage(pageNum) {
  return superagentGet(root_url + pageNum, async function (resolve, res) {

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
    const _info = parseHtml($)
    const [config, steward] = await Promise.all([getRoomConfig(configParams), getRoomSteward(stewardParams)])
    const info = {
      id: 'zr-' + id,
      thumbUrl,
      url,
      ..._info,
      ...config,
      ...steward
    }

    const buildingDate = await createBuilding(info.building)
    setTimeout(function () {
      info.building = buildingDate
      room.create(info)
      resolve(info)
    }, 1000)
  })
}

function createBuilding(b) {
  return new Promise(function (resolve, reject) {
    if (buildingCache[b.name]) {
      resolve(buildingCache[b.name])
    } else {
      building.create(b).then(v => {
        b.id = v._id
        resolve(b)
      })
    }
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