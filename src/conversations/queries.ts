import gql from 'graphql-tag'

export const GET_CONVERSATIONS = gql`
query{
  conversations{
    _id
    user{
      _id
    }
    operator{
      _id
    }
    messages{
      content
    }
  }
}`
