const db = require('./mongo')
const RoomModel = require('./model/room')

var RoomEntity = new RoomModel({
  roomname: '这房子不错',
  subtitle: '副标题真是为难人',
  price: 19000,
  imgurl: '没有 url',
  tags: ['好', '很好', '非常好'],
  detail: {
    area: 100,
    orientation: '北',
    houseType1: 4,
    houseType2: 1,
    layer1: 5,
    layer2: 35,
    traffic: '交通不便，自己开车'
  }
});

//将Room1写入到数据库中
RoomEntity.save(function (error, doc) {
  if (error) {
    console.log("error :" + error);
  } else {
    console.log(doc);
  }
});