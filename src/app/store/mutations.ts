import TYPES from './types'
import { MutationTree } from 'vuex'
import { Conversation, User } from '../../typings/types'

const mutations: MutationTree<any> = {
  [TYPES.REQUEST_CONVERSATIONS] (state): void {
  },
  [TYPES.RECEIVED_CONVERSATIONS] (state, conversations: Conversation): void {
    state.conversations = conversations
  },
  [TYPES.RECEIVED_LOGIN] (state, user: User): void {
    state.isLoggedIn = true
    state.user = user
  },
  [TYPES.REQUEST_LOGIN] (state): void {
    state.loginError = false
  },
  [TYPES.LOGIN_ERROR] (state): void {
    state.loginError = true
  },
  [TYPES.LOG_OUT] (state): void {
    state.isLoggedIn = false
  }
}

export default mutations
