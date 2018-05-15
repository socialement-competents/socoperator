import { ActionTree } from 'vuex'
import TYPES from '@/app/store/types'
import { User } from '../../typings/types'
import { apolloClient } from '../../main'
import { GET_CONVERSATIONS } from '../../conversations/queries'

const actions: ActionTree<any, any> = {
  setLogin ({ state, commit }, flag: boolean): void {
    commit(TYPES.SET_LOGIN_STATUS, flag)
  },
  async getAllConversations ({ state, commit }, user: User ) {
    commit(TYPES.REQUEST_CONVERSATIONS)
    const conversations = await apolloClient.query({ query: GET_CONVERSATIONS })
    commit(TYPES.RECEIVED_CONVERSATIONS, conversations)
  }
}

export default actions
