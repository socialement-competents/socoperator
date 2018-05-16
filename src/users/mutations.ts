import gql from 'graphql-tag'

export const REGISTER = gql`
mutation register(
  $username: String!,
  $password: String!,
  $firstname: String!,
  $lastname: String!
) {
  addUser(
    username: $username,
    password: $password,
    firstname: $firstname,
    lastname: $lastname
  ) {
    id
    email
    firstname
    lastname
    token
  }
}
`
