import gql from 'graphql-tag'

export const GET_USERS = gql`
query{
  users{
    id
    email
    firstname
    lastname
  }
}`

export const GET_USER_BY_ID = gql`
query getUserById($id: String!) {
  userById(id: $id) {
    id,
    email,
    firstname,
    lastname,
    bio,
    image
  }
}
`
