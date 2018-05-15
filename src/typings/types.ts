/* tslint:disable */

export interface Query {
  users?: (User | null)[] | null;
  userById?: User | null;
  conversations?: (Conversation | null)[] | null;
  conversationById?: Conversation | null;
  messages?: (Message | null)[] | null;
  messageById?: Message | null;
}
/** User type */
export interface User {
  _id?: string | null /** The id */;
  email?: string | null /** The email */;
  firstname?: string | null /** The firstname */;
  lastname?: string | null /** The lastname */;
}
/** Conversation type */
export interface Conversation {
  _id?: string | null /** The id */;
  isHandled?: boolean | null /** is the conversation handled by operator */;
  user?: User | null /** The user who started the conversation */;
  operator?: User | null /** The operator */;
  messages?: (Message | null)[] | null /** Messages of conversations */;
}
/** Message type */
export interface Message {
  _id?: string | null /** The id */;
  isRead?: boolean | null /** is the message read */;
  user?: User | null /** The user who sent the message */;
  content?: string | null /** The message content */;
}

export interface Mutation {
  addUser?: User | null;
  addConversation?: Conversation | null;
  addMessage?: Message | null;
}

export interface Subscription {
  messageAdded?: Message | null;
}
export interface UsersQueryArgs {
  limit?: number | null /** limit items in the results */;
}
export interface UserByIdQueryArgs {
  id?: string | null /** find by id */;
}
export interface ConversationsQueryArgs {
  limit?: number | null /** limit items in the results */;
}
export interface ConversationByIdQueryArgs {
  id?: string | null /** find by id */;
}
export interface MessagesQueryArgs {
  limit?: number | null /** limit items in the results */;
}
export interface MessageByIdQueryArgs {
  id?: string | null /** find by id */;
}
export interface AddUserMutationArgs {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}
export interface AddConversationMutationArgs {
  userId: string;
  operatorId?: string | null;
}
export interface AddMessageMutationArgs {
  conversationId: string;
  userId: string;
  content: string;
}
export interface MessageAddedSubscriptionArgs {
  id?: string | null /** conversation id */;
}
