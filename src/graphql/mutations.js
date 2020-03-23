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


export const CREATE_PRODUCT = gql`
  mutation(
    $name: String!
    $creator: ID!
    $model: String!
    $description: String!
    $brand: String!
    $category: String!
    $subCategory: String!
    $colors:[String]!
    $images:[String!]!
    $price: Float!
  ){
  createProduct(
    name: $name
    creator: $creator
    model: $model
    description: $description
    brand: $brand
    category: $category
    subCategory: $subCategory
    colors: $colors
    images: $images
    price: $price
  ){
  _id
  name
  model
  description
  brand
  images
  price
  colors
  creationDate
  creator {
    _id
      username
      email
      picture
  }
  feedbacks {
    _id
    author{
      _id
      username
      picture
    }
     feedback
     creationDate
  }
  }
}`



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