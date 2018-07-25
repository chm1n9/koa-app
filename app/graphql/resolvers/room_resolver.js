import Room from '../../model/room.js'
import District from '../../model/district.js'

const fetchRooms = async (root, args, options) => {
  const {
    name,
    minPrice = 500,
    maxPrice = 5000,
    limit = 10,
    offset = 0
  } = args

  const query = Room.find({})
  // .find({ 'building.traffics.line': '阳逻线', 'building.traffics.station': '后湖大道' })
  // .where('roomName', new RegExp(name, 'i'))
  // .where('price').gte(minPrice).lte(maxPrice)
  const count = await Room.find({}).countDocuments()
  const list = await Room.find({})
    .skip(limit * offset)
    .limit(limit)
    .sort({ 'price': 1 })
    .exec()
  return { list, count }
}

const fetchRoomById = (root, { id }, options) => Room.findOne({ id }).exec()

const fetchDistrict = async (root, { id }, options) => {
  if (id) {
    return District.findOne({ id }).exec()
  } else {
    return District.find({ level: 2 }).populate('children').exec()
  }
}
const fetchOptions = async (root, args, options) => {
  const district = await District.find({ level: 2 }).populate('children').exec()
  const station = await Station.find({ level: 2 }).populate('children').exec()
  return {
    district,
    station
  }
}
const resolver = {
  Query: {
    rooms: fetchRooms,
    room: fetchRoomById,
    district: fetchDistrict,
    options: fetchOptions
  }
}
export default resolver