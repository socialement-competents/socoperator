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
  }
}

export default getters
