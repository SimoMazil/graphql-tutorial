const graphql = require('graphql')
const _ = require('lodash')


// dummy data
const books = [
  {id: '1', name: 'Book One', genre: 'Genre One', authorId: '1'},
  {id: '2', name: 'Book Two', genre: 'Genre Two', authorId: '2'},
  {id: '3', name: 'Book Three', genre: 'Genre Three', authorId: '3'}
]

const authors = [
  {id: '1', name: 'Author One', age: 20},
  {id: '2', name: 'Author Two', age: 30},
  {id: '3', name: 'Author Three', age: 40}
]

const { 
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = graphql

const bookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: authorType,
      resolve(parent, args) {
        return _.find(authors, {id: parent.authorId})
      }
    }
  })
})

const authorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(bookType),
      resolve(parent, args) {
        return _.filter(books, {authorId: parent.id})
      }
    }
  })
})

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: bookType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        // code to get data
        return _.find(books, {id: args.id})
      }
    },
    author: {
      type: authorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        // code to get data
        return _.find(authors, {id: args.id})
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: rootQuery
})