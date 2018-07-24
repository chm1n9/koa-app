const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const DistrictSchema = new Schema({
  createTime: {
    type: Date,
    default: Date.now()
  },
  updateTime: {
    type: Date,
    default: Date.now()
  },
  id: {
    type: Number,
    unique: true
  },
  name: String,
  level: {
    type: Number,
    enum: [2, 3]
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
    this.updateTime = Date.now()
  }
  next()
})

module.exports = mongoose.model("district", DistrictSchema)