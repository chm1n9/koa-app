const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const RoomSchema = new Schema({
  createTime: Date,
  updateTime: Date,
  id: {
    type: String,
    required: true,
    unique: true
  },
  source: {
    type: String,
    enum: ['zr']
  },
  url: String,
  roomName: String,
  detailImgs: [String],
  price: Number,
  thumbUrl: String,
  tags: [String],
  room: [String],
  district1: Number,
  district2: Number,
  localtion: {
    lat: Number,
    lng: Number
  },
  detail: {
    area: Number,
    orientation: String,
    bedroom: Number,
    sittingroom: Number,
    floorNum: Number,
    floorTotal: Number,
    traffic: [{
      line: String,
      station: String,
      distance: Number
    }]
  },
  config: {
    airCondition: {
      type: Number,
      enum: [0, 1]
    },
    bed: {
      type: Number,
      enum: [0, 1]
    },
    calorifier: {
      type: Number,
      enum: [0, 1]
    },
    chest: {
      type: Number,
      enum: [0, 1]
    },
    desk: {
      type: Number,
      enum: [0, 1]
    },
    lock: {
      type: Number,
      enum: [0, 1]
    },
    microwave: {
      type: Number,
      enum: [0, 1]
    },
    washing: {
      type: Number,
      enum: [0, 1]
    },
    wifi: {
      type: Number,
      enum: [0, 1]
    }
  },
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