import gql from 'graphql-tag'

export const GET_USERS = gql`
query{
  users{
    email
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
