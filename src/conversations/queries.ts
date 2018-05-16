import gql from 'graphql-tag'

export const GET_CONVERSATIONS = gql`
query {
  conversations {
    _id
    user {
      _id
      lastname
      firstname
    }
    operator {
      _id
      lastname
      firstname
    }
    messages {
      _id
      user
      content
    }
  }
}`
