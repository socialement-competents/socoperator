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
    state.loginError = undefined
  },
  [TYPES.LOGIN_ERROR] (state, message: string): void {
    state.loginError = message
  },
  [TYPES.LOG_OUT] (state): void {
    state.isLoggedIn = false
  },
  [TYPES.SELECT_CONVERSATION] (state, conversation): void {
    state.conversation = conversation
  }
}

export default mutations
