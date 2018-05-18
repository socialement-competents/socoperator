import gql from 'graphql-tag'

export const GET_CONVERSATIONS = gql`
query {
  conversations {
    _id
    user {
      _id
      email
      firstname
      lastname
    }
    operator {
      _id
      email
      firstname
      lastname
    }
    messages {
      _id
      isRead
      user {
        _id
        email
        firstname
        lastname
      }
      content
    }
  }
}`
