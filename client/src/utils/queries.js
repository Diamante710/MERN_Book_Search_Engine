import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      password
      savedBooks {
        _id
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