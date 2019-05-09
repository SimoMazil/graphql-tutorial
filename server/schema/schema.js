const graphql = require('graphql')
const _ = require('lodash')

const Book = require('../models/book')
const Author = require('../models/author')

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
        return Author.findById(parent.authorId)
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
        return Book.find({authorId: parent.id})
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
        return Book.findById(args.id)
      }
    },
    author: {
      type: authorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return Author.findById(args.id)
      }
    },
    books: {
      type: new GraphQLList(bookType),
      resolve(parent, args) {
        return Book.find({})
      }
    },
    authors: {
      type: new GraphQLList(authorType),
      resolve(parent, args) {
        return Author.find({});
      }
    }
  }
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: authorType,
      args: {
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
      },
      resolve(parent, args) {
        const author = new Author({
          name: args.name,
          age: args.age
        })
        return author.save()
      }
    },
    addBook: {
      type: bookType,
      args: {
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        authorId: {type: GraphQLID},
      },
      resolve(parent, args) {
        const book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        })
        return book.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation
})