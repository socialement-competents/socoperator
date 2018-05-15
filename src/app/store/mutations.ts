import TYPES from './types'
import { MutationTree } from 'vuex'
import { Conversation } from '../../typings/types'

const mutations: MutationTree<any> = {
  [TYPES.SET_LOGIN_STATUS] (state, flag): void {
    state.login = flag
  },
  [TYPES.START_LOADING] (state, flag): void {
    state.isLoading = true
  },
  [TYPES.STOP_LOADING] (state, flag): void {
    state.isLoading = false
  },
  [TYPES.REQUEST_CONVERSATIONS] (state): void {
    state.isLoading = true
  },
  [TYPES.RECEIVED_CONVERSATIONS] (state, conversations: Conversation): void {
    state.conversations = conversations
  }
}

export default mutations
