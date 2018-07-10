import Room from '../../model/room.js'

const fetchRooms = (root, { name, limit = 10, offset = 0 }, options) =>
  Room.find({ roomName: new RegExp(name, 'i') })
    .skip(limit * offset)
    .limit(limit)
    .sort({ 'price': 1 })
    .exec()

const fetchRoomById = (root, { id }, options) => Room.findOne({ id }).exec()

const resolver = {
  Query: {
    rooms: fetchRooms,
    room: fetchRoomById,
  }
}
export default resolver