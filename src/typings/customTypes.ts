import { Conversation } from '@/typings/types'

export type LoginPayload = {
  email: string;
  password: string;
}

export type LoginData = {
  token: string;
  email: string;
  _id: string;
}

export interface State {
  isLoggedIn: boolean;
  conversations: Conversation[];
}
