import gql from "graphql-tag"


export const GET_CURRENT_USER = gql`
  query  {
    getCurrentUser {
      _id
      username
      email
      picture
      accountType
      joinDate
    }
  }
`

export const GET_CATEGORIES = gql`
query{
  getCategoriesWithSubCategories {
    category
    subCategories
  }
}
`

export const GET_CATEGORIES_PREVIEW = gql`
query{
  getCategoriesWIthProductsPreview{
    category
    products {
      _id
      images
    }

  }
}
`

export const GET_SUBCATEGORIES_PREVIEW = gql`
query($category: String!){
  getSubCategoriesWIthProductsPreview(category: $category){
    subCategory
    products {
      _id
      images
    }

  }
}
`
export const GET_SUBCATEGORY_ALL_PRODUCTS = gql`

query($subCategory: String! , $limit: Int!){
  getSubCategoryAllProducts(subCategory: $subCategory , limit: $limit){
    _id
    name
    model
    brand
    images
    price
  }
}
`

export const GET_USER_ALL_CREATED_PRODUCTS = gql`
 query($_id: ID!){
  getUserAllCreatedProducts(_id:$_id){
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
 }
`

export const GET_PRODUCT = gql`
query($_id: ID!){
  getProduct(_id:$_id){
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
}
`

export const GET_AUTHOR = gql`
  query {
    getAuthor {
      name
      email
      phone
      age
      country
    }
  }
`

export const SEARCH_PRODUCTS = gql`
 query($query: String , $limit: Int!){
  searchProducts( query: $query , limit: $limit){
    _id
    name
    brand
    category
    subCategory
    images
    model
    description
  }
}`
