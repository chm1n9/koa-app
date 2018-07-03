const mongoose = require('mongoose');
const {
  Schema
} = mongoose;
const Log = require('../logs/index.js')

const BuildingSchema = new Schema({
  createTime: Date,
  updateTime: Date,

  name: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
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
});

BuildingSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createTime = this.updateTime = Date.now()
  } else {
    this.updateTime = Date.now()
  }
  next()
})


class Building {
  constructor() {
    this.building = mongoose.model("building", BuildingSchema);
  }
  find(dataArr = {}) {
    const self = this;
    return new Promise(function (resolve, reject) {
      self.building.find(dataArr, function (error, docs) {
        if (error) {
          Log.error('[ db ] error: ' + error);
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
      self.building.findOne(dataArr, function (error, docs) {
        if (error) {
          Log.error('[ db ] error: ' + error);
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
      const building = new self.building(dataArr);
      building.save(function (error, data, numberAffected) {
        if (error) {
          Log.error('[ db ] building create error: ' + error);
          reject(error);
        } else {
          Log.info('[ db ] building created: ' + data.name)
          resolve(data);
        }
      });
    })
  }
  delete(dataArr) {
    const self = this;
    return new Promise(function (resolve, reject) {
      self.building.remove(dataArr, function (error, data) {
        if (error) {
          Log.error('[ db ] error: ' + error);
          reject(error);
        } else {
          Log.info('[ db ] deleted: ' + JSON.stringify(data))
          resolve(data);
        }
      });
    })
  }
}

const building = new Building()
module.exports = building