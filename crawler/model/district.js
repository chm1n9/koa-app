const mongoose = require('mongoose');
const {
  Schema
} = mongoose;
const {
  ObjectId
} = Schema.Types
const Log = require('/logs/index.js')

const DistrictSchema = new Schema({
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
  parentId: {
    type: ObjectId,
    ref: 'district'
  },
  children: [{
    type: ObjectId,
    ref: 'district'
  }]
})

DistrictSchema.pre('save', function (next) {
  if (this.isNew) {
    this.createTime = this.updateTime = Date.now()
  } else {
    this.updateTime = null
  }
  next()
})

class District {
  constructor() {
    this.districtModel = mongoose.model("district", DistrictSchema);
  }
  find(dataArr = {}) {
    const self = this;
    return new Promise(function (resolve, reject) {
      self.districtModel.find(dataArr)
        .exec(function (error, docs) {
          if (error) {
            Log.error('[ db ] error: ' + error);
            reject(error);
          } else {
            resolve(docs);
          }
        })
    })
  }
  getId(l1Name, l2Name) {
    const self = this;
    return new Promise(function (resolve, reject) {
      self.districtModel.findOne({
        name: l1Name,
        level: 1
      })
        .populate('children')
        // .where('children')
        // .elemMatch({name: l2Name})
        .exec(function (error, docs) {
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
      self.districtModel.findOne(dataArr, function (error, docs) {
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
      const district = new self.districtModel(dataArr);
      district.save(function (error, data, numberAffected) {
        if (error) {
          Log.error('[ db ] error: ' + error);
          reject(error);
        } else {
          Log.info('[ db ] district created: ' + JSON.stringify(data))
          resolve(data);
        }
      });
    })
  }
  update(id, update) {
    const self = this;
    return new Promise(function (resolve, reject) {
      self.districtModel.findByIdAndUpdate(id, {
        $set: {
          ...update,
          updateTime: Date.now()
        }
      }, function (error, data) {
        if (error) {
          Log.error('[ db ] error: ' + error);
          reject(error);
        } else {
          resolve(data);
        }
      });
    })
  }
  delete(dataArr) {
    const self = this;
    return new Promise(function (resolve, reject) {
      self.districtModel.remove(dataArr, function (error, data) {
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

const district = new District()
module.exports = district