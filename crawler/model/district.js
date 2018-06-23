const mongoose = require('mongoose');
const {
  Schema
} = mongoose;

const DistrictSchema = new Schema({
  id: Number,
  name: String,
  level: {
    type: Number,
    enum: [1, 2]
  },
  parent_id: Number
});

module.exports = mongoose.model('district', DistrictSchema);