import gql from 'graphql-tag'

export const SUBSCRIBE_TO_NEW_MESSAGES = gql`
  subscription message ($id: String!) {
    messageAdded(id: $id) {
      _id
      content
      user {
        _id
        firstname
        lastname
        image
      }
    }
  }
`
