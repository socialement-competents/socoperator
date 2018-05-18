import gql from 'graphql-tag'

export const ADD_MESSAGE = gql`
mutation addMessage(
  $conversationId: String!,
  $userId: String!,
  $content: String!
) {
  addMessage(
    conversationId: $conversationId,
    userId: $userId,
    content: $content
  ) {
    _id
  }
}
`
