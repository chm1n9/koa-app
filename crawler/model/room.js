const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const RoomSchema = new Schema({
  create_date: {
    type: Date,
    default: Date.now
  },
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
  room_name: String,
  detail_imgs: [String],
  price: Number,
  thumb_url: String,
  tags: [String],
  district: [String],
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

module.exports = mongoose.model('room', RoomSchema);