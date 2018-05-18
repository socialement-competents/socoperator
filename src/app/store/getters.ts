import { GetterTree } from 'vuex'
import { Conversation, User } from '../../typings/types'

const getters: GetterTree<any, any> = {
  isLoggedIn (state): boolean {
    return state.isLoggedIn
  },
  conversations (state): Conversation[] {
    return state.conversations
  },
  user (state): User {
    return state.user
  },
  loginError (state): string | undefined {
    return state.loginError
  },
  error: ({ error }) => error,
  web3: ({ web3 }) => web3,
  w3i: ({ web3 }) => web3 && web3.web3Instance && web3.web3Instance(),
  contract: ({ contractInstanceGetter }) => contractInstanceGetter && contractInstanceGetter()
}

export default getters
