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

export const GET_PRODUCTS_CATEGORIES = gql`
query{
  getProductsCategories
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

query($subCategory: String!){
  getSubCategoryAllProducts(subCategory: $subCategory){
    _id
    name
    model
    brand
    images
    price
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
