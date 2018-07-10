import Building from './building_schema'
const Room = `
  type Steward {
    addTimes: Int
    headCorn: String
    isBadEval: Int
    isNewBind: Int
    keeperId: String
    keeperName: String
    keeperPhone: String
    keeperPresent: String
  }

  type Config {
    airCondition: Int
    bed: Int
    calorifier: Int
    chest: Int
    desk: Int
    lock: Int
    microwave: Int
    washing: Int
    wifi: Int
  }

  type Room {
    createTime: String
    updateTime: String
    id: ID
    source: String
    url: String
    roomName: String
    detailImgs: [String]
    price: Int
    thumbUrl: String
    tags: [String]
    room: [String]
    area: Int
    orientation: Int
    bedroom: Int
    sittingroom: Int
    floorNum: Int
    building: Building
    config: Config
    steward: Steward
  }
  type Rooms {
    list: [Room]
    count: Int
  }
  type Query {
    room(id: String!): Room
    rooms(name: String): Rooms
  }
`

export default [Building, Room]