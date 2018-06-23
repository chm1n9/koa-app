const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const districtSchema = new Schema({
  createTime: Date,
  updateTime: Date,
  id: {
    type: Number,
    unique: true
  },
  name: String,
  level: {
    type: Number,
    enum: [1, 2]
  },
  parent_id: Number
})

districtSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createTime = this.updateTime = Date.now()
  } else {
    this.updateTime = Date.now()
  }
  next()
})

class District {
  constructor() {
    this.district = mongoose.model("district", districtSchema);
  }
  find(dataArr = {}) {
    const self = this;
    return new Promise(function (resolve, reject) {
      self.district.find(dataArr, function (error, docs) {
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
      self.district.findOne(dataArr, function (error, docs) {
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
      const district = new self.district(dataArr);
      district.save(function (error, data, numberAffected) {
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
      self.district.remove(dataArr, function (error, data) {
        if (error) {
          console.log('error: ', error);
          reject(error);
        } else {
          console.log('deleted: ' + JSON.stringify(data).slice(0, 80))
          resolve(data);
        }
      });
    })
  }
}

const district = new District()
module.exports = district