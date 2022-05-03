import { gql } from '@apollo/client';

// used module 21 as reference here
// GET_ME
export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      bookCount
      saveBook {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;