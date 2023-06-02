import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      password
      savedBooks {
        bookId
        author
        image
        description
        title
        link
      }
    }
  }
`;