import { Conversation, User } from '@/typings/types'

export type RegisterPayload = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export type RegisterData = {
  addUser: {
    _id: string;
    token: string;
    email: string;
    firstname: string;
    lastname: string;
  }
}

export type LoginPayload = {
  email: string;
  password: string;
}

export type LoginData = {
  logIn: {
    _id: string;
    token: string;
    email: string;
    firstname: string;
    lastname: string;
  }
}

export type GetAllConversationsData = {
  conversations: Array<Conversation>
}

export interface State {
  isLoggedIn: boolean;
  conversations: Conversation[];
  loginError: boolean;
  user: User | undefined;
}
