const graphql = require('graphql')
const _ = require('lodash')


// dummy data
const books = [
  {id: '1', name: 'Book One', genre: 'Genre One'},
  {id: '2', name: 'Book Two', genre: 'Genre Two'},
  {id: '3', name: 'Book Three', genre: 'Genre Three'}
]

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

const bookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    genre: {type: GraphQLString}
  })
})

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: bookType,
      args: {id: {type: GraphQLString}},
      resolve(parent, args) {
        // code to get data
        return _.find(books, {id: args.id})
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: rootQuery
})