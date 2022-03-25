import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`;

export const ALL_DATA = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
    allBooks {
      title
      published
      author
      id
    }
  }
`;
