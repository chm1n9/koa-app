import Room from '../../model/room.js'

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

const resolver = {
  Query: {
    rooms: fetchRooms,
    room: fetchRoomById,
  }
}
export default resolver