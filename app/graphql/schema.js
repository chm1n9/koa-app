import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql';
// 引入 type 
import {room, rooms} from './room'


// 建立 schema
export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Queries',
    fields: {
      rooms,
      room
    }
  })
})