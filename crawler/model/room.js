const mongoose = require('mongoose');
const {
  Schema
} = mongoose
const {
  ObjectId
} = Schema.Types

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
  // room: [String],
  area: Number,
  orientation: String,
  bedroom: Number,
  sittingroom: Number,
  floorNum: Number,

  building: {
    id: {
      type: ObjectId,
      ref: 'building'
    },
    name: String,
    district1: String,
    district2: String,
    localtion: {
      lat: Number,
      lng: Number
    },
    floorTotal: Number,
    traffics: [{
      line: String,
      station: String,
      distance: Number
    }],
    trafficDesc: String,
    around: String
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
    this.roomModel = mongoose.model("room", RoomSchema);
  }
  find(dataArr = {}) {
    const self = this;
    return new Promise(function (resolve, reject) {
      self.roomModel.find(dataArr, function (error, docs) {
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
      self.roomModel.findOne(dataArr, function (error, docs) {
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
      const room = new self.roomModel(dataArr);
      room.save(function (error, data) {
        if (error) {
          console.log('error: ', error);
          reject(error);
        } else {
          console.log('room created: ' + data.roomName)
          resolve(data);
        }
      });
    })
  }
  delete(dataArr) {
    const self = this;
    return new Promise(function (resolve, reject) {
      self.roomModel.remove(dataArr, function (error, data) {
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