import requireGraphQLFile from 'require-graphql-file'
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from './resolvers/room_resolver'

const typeDefs = [
  requireGraphQLFile('./schemas/pageInfo'),
  requireGraphQLFile('./schemas/building'),
  requireGraphQLFile('./schemas/room'),
  requireGraphQLFile('./schemas/district'),
  requireGraphQLFile('./schemas/station'),
  requireGraphQLFile('./schemas/Query'),

]

export default makeExecutableSchema({ typeDefs, resolvers })
