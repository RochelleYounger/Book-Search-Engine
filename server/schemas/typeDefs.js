const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    hello: String
    # me: User
  }

  type Mutation {
    # login
    addUser(username:String!, email:String!, password:String!): Auth
    # saveBook
    # removeBook
  }
`

module.exports = typeDefs;