import gql from 'graphql-tag'

export const REGISTER = gql`
mutation register(
  $email: String!,
  $password: String!,
  $firstname: String!,
  $lastname: String!
) {
  addUser(
    email: $email,
    password: $password,
    firstname: $firstname,
    lastname: $lastname
  ) {
    _id
    email
    firstname
    lastname
    token
  }
}
`
