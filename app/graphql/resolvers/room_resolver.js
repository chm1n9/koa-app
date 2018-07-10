import Room from '../../model/room.js'

const fetchRooms = (root, { name, limit }, options) => {
  const rooms = Room.find({ roomName: new RegExp(name, 'i') }).exec()
  return rooms
  console.log(rooms.length)
  const l = limit || 10
  return {
    count: rooms.countDocuments(),
    list: rooms
      .skip(l * 0)
      .limit(l)
      .sort({ 'price': -1 })
      
  }
}
// .limit(10)
// .sort({ 'price': 1 })
// .exec()
const fetchRoomById = (root, { id }, options) => Room.findOne({ id }).exec()

const resolver = {
  Query: {
    rooms: fetchRooms,
    room: fetchRoomById,
  },
  Rooms: {
    count: function(root, params, options) {
      return root.count
    },
    list: (root, params, options) => {
      console.log(Object.prototype.toString.call(root.list))
      return root
      const l = limit || 10
      return root
        // .skip(l * page)
        .limit(limit)
        .sort({ 'price': -1 })
        .exec()
    },
  }
}
export default resolver