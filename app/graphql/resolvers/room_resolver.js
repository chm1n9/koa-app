import Room from '../../model/room.js'

const fetchRooms = (root, args, options) => {
  const {
    name,
    minPrice = 500,
    maxPrice = 5000,
    limit = 10,
    offset = 0
  } = args

  const query = Room.find()
    .where('roomName', new RegExp(name, 'i'))
    .where('price').gte(minPrice).lte(maxPrice)
  return query
    .skip(limit * offset)
    .limit(limit)
    .sort({ 'price': 1 })
    .exec()
}

const fetchRoomById = (root, { id }, options) => Room.findOne({ id }).exec()

const resolver = {
  Query: {
    rooms: fetchRooms,
    room: fetchRoomById,
  }
}
export default resolver