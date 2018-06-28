const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const BuildingSchema = new Schema({
  createTime: Date,
  updateTime: Date,
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  district1: Number,
  district2: Number,
  localtion: {
    lat: Number,
    lng: Number
  },
  floorTotal: Number,
  traffic: [{
    line: String,
    station: String,
    distance: Number
  }],
  steward: {
    addTimes: Number,
    headCorn: String,
    isBadEval: Number,
    isNewBind: Number,
    keeperId: String,
    keeperName: String,
    keeperPhone: String,
    keeperPresent: String,
  }
});

RoomSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createTime = this.updateTime = Date.now()
  } else {
    this.updateTime = Date.now()
  }
  next()
})


class Room {
  constructor() {
    this.room = mongoose.model("room", roomSchema);
  }
  find(dataArr = {}) {
    const self = this;
    return new Promise(function (resolve, reject) {
      self.room.find(dataArr, function (error, docs) {
        if (error) {
          console.log('error: ', error);
          reject(error);
        } else {
          resolve(docs);
        }
      })
    })
  }
  findOne(dataArr = {}) {
    const self = this;
    return new Promise(function (resolve, reject) {
      self.room.findOne(dataArr, function (error, docs) {
        if (error) {
          console.log('error: ', error);
          reject(error);
        } else {
          resolve(docs);
        }
      })
    })
  }
  create(dataArr) {
    const self = this;
    return new Promise(function (resolve, reject) {
      const room = new self.room(dataArr);
      room.save(function (error, data, numberAffected) {
        if (error) {
          console.log('error: ', error);
          reject(error);
        } else {
          console.log('created: ' + JSON.stringify(data))
          resolve(data);
        }
      });
    })
  }
  delete(dataArr) {
    const self = this;
    return new Promise(function (resolve, reject) {
      self.room.remove(dataArr, function (error, data) {
        if (error) {
          console.log('error: ', error);
          reject(error);
        } else {
          console.log('deleted: ' + JSON.stringify(data))
          resolve(data);
        }
      });
    })
  }
}

const room = new Room()
module.exports = room