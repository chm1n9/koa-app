import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './schemas/room_schema'
import resolvers from './resolvers/room_resolver'

export default makeExecutableSchema({ typeDefs, resolvers })