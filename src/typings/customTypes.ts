import { Conversation, User } from '@/typings/types'

export type RegisterData = {
  addUser: {
    _id: string;
    token: string;
    email: string;
    firstname: string;
    lastname: string;
  }
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

export type UserByIdData = {
  userById: {
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
  loginError: string | undefined;
  user: User | undefined;
  web3: {
    isInjected: boolean;
    web3Instance: any | undefined;
    networkId: any | undefined;
    coinbase: any | undefined;
    balance: any | undefined;
    error: any | undefined;
  };
  contractInstanceGetter: any | undefined;
  error: string | undefined;
}
