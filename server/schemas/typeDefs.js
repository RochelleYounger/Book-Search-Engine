const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # type User {
  #   # _id
  #   # username
  #   # email
  #   # bookCount
  #   # saved books
  # }

  # type Book {
  #   # bookId
  #   # authors
  #   # description
  #   # title
  #   # image
  #   # link
  # }

  # type Auth {
  #   # token
  #   # user
  # }

  type Query {
    hello: String
    # me:
  }

  # type Mutation {
  # #   # login
  # #   # addUser
  # #   # saveBook
  # #   # removeBook
  # }
`

module.exports = typeDefs;