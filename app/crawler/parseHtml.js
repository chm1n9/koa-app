
module.exports = function parseHtml($) {
  // 江南明珠园7居室-03卧
  const roomName = $('.room_name h2').text().trim()
  const buildingName = roomName.match(/([^\d]*)(?=\d)/)[0]
  const detailImgs = Array.from($('.lof-navigator li img')
    .map(function (i, el) {
      return $(this).attr('src');
    }))
  // [武昌 积玉桥]
  const _subTitle = $('.room_name span.ellipsis').text().trim()
    .replace(/[\s|\n]+/g, ' '),
    [, local1, local2] = _subTitle.match(/([^\s]*)\s*([^\]]*)/)

  const $_mapsearchText = $('#mapsearchText'),
    localtion = {
      // 纬度
      lat: $_mapsearchText.data('lat'),
      // 经度
      lng: $_mapsearchText.data('lng')
    }
  const _about = $('.aboutRoom p').map(function(_){
    return $(this).text().split('：')[1]
  }),
    around = _about[0],
    trafficDesc = _about[1]

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

  return {
    roomName,
    detailImgs,
    price,
    tags,
    area,
    orientation,
    bedroom: houseType[1],
    sittingroom: houseType[2],
    floorNum: layer[1],
    building: {
      name: buildingName,
      district1: local1,
      district2: local2,
      localtion,
      floorTotal: layer[2],
      traffics: getTraffics(_traffics),
      trafficDesc,
      around
    }
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