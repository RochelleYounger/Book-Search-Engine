import { gql } from '@apollo/client';

/****TIP: for future reference you, just copy the queries and mutations you've been testing in apollo sandbox, they're basically the same***/

// LOGIN_USER
export const LOGIN_USER = gql`
  mutation login(  $email: String!  $password: String! ) {
    login( email: $email password: $password ) {
    user {
      _id
      username
      email
    }
    token
  }
}
`

// ADD_USER
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    user {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
    token
  }
}
`
// SAVE_BOOK
export const SAVE_BOOK = gql`
  mutation saveBook($bookInput: BookInput!){saveBook(bookInput: $bookInput) {
  _id
  username
  email
  savedBooks {
    bookId
    title
    description
    authors
    image
    link
  }
}}
`

// REMOVE_BOOK
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {removeBook(bookId: $bookId) {
  _id
  username
  email
  savedBooks {
    bookId
    title
    description
    authors
    image
    link
  }
}}
`