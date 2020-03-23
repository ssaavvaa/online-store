import gql from "graphql-tag";

export const SIGN_UP_USER = gql`
  mutation(
    $username: String!
    $language: String!
    $email: String!
    $password: String!
  ) {
    signUpUser(
      username: $username
      language: $language
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
        email
        picture
        accountType
        joinDate
      }
    }
  }
`;



export const SIGN_IN_USER = gql`
  mutation(
    $language: String!
    $email: String!
    $password: String!
  ) {
    signInUser(
      language: $language
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        username
        email
        picture
        accountType
        joinDate
      }
    }
  }
`;