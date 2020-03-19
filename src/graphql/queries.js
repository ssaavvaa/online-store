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
