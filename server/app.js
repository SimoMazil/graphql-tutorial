const express = require("express")
const graphqlHTTP = require("express-graphql")
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

// Allow cross-origin requests
app.use(cors())

const url = 'mongodb://localhost:27017/graphqlDB'
mongoose.connect(url, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log("Connected to DB")
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log("Hello World!")
})