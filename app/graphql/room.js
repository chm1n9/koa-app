import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  isOutputType
} from 'graphql'

import Room from '../model/room.js'

const StewardType = new GraphQLObjectType({
  name: 'steward',
  fields: {
    addTimes: { type: GraphQLInt },
    headCorn: { type: GraphQLString },
    isBadEval: { type: GraphQLInt },
    isNewBind: { type: GraphQLInt },
    keeperId: { type: GraphQLString },
    keeperName: { type: GraphQLString },
    keeperPhone: { type: GraphQLString },
    keeperPresent: { type: GraphQLString }
  }
})
const ConfigType = new GraphQLObjectType({
  name: 'config',
  fields: {
    airCondition: { type: GraphQLInt },
    bed: { type: GraphQLInt },
    calorifier: { type: GraphQLInt },
    chest: { type: GraphQLInt },
    desk: { type: GraphQLInt },
    lock: { type: GraphQLInt },
    microwave: { type: GraphQLInt },
    washing: { type: GraphQLInt },
    wifi: { type: GraphQLInt }
  }
})

const BuildingType = new GraphQLObjectType({
  name: 'building',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    district1: { type: GraphQLString },
    district2: { type: GraphQLString },
    // localtion: {
    //   lat: Number, lng: Number
    // },
    floorTotal: { type: GraphQLInt },
    // traffics: [{
    //   line: String,
    //   station: String,
    //   distance: Number
    // }],
    trafficDesc: { type: GraphQLString },
    around: { type: GraphQLString }
  }
})

export const RoomType = new GraphQLObjectType({
  name: 'room',
  fields: {
    createTime: { type: GraphQLString },
    updateTime: { type: GraphQLString },
    id: { type: GraphQLString },
    source: { type: GraphQLString },
    url: { type: GraphQLString },
    roomName: { type: GraphQLString },
    detailImgs: { type: new GraphQLList(GraphQLString) },
    price: { type: GraphQLInt },
    thumbUrl: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    room: { type: new GraphQLList(GraphQLString) },
    area: { type: GraphQLInt },
    orientation: { type: GraphQLInt },
    bedroom: { type: GraphQLInt },
    sittingroom: { type: GraphQLInt },
    floorNum: { type: GraphQLInt },
    building: { type: BuildingType },
    config: { type: ConfigType },
    steward: { type: StewardType }
  }
})

export const rooms = {
  type: new GraphQLList(RoomType),
  args: {
    name: { name: 'name', type: GraphQLString },

  },
  async resolve(root, params, options) {
    return Room.find({ roomName: new RegExp(params.name, 'i') }, null, { limit: 10 })
      .exec()
  }
}
export const room = {
  type: RoomType,
  args: {
    id: { name: 'id', type: new GraphQLNonNull(GraphQLID) }
  },
  async resolve(root, params, options) {
    return Room.findOne({ id: params.id })
      .exec()
  }
}
