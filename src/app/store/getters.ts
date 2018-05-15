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
  }
}

export default getters
