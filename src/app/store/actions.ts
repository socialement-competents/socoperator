import { ActionTree } from 'vuex'

import TYPES from '@/app/store/types'
import { User, Conversation } from '../../typings/types'
import { LoginPayload, LoginData } from '../../typings/customTypes'
import { apolloClient } from '../../main'
import { GET_CONVERSATIONS } from '../../conversations/queries'
import { LOGIN } from '../../users/queries'

const actions: ActionTree<any, any> = {
  async getAllConversations ({ state, commit }, user: User) {
    commit(TYPES.REQUEST_CONVERSATIONS)
    const result = await apolloClient.query<Conversation>({ query: GET_CONVERSATIONS })
    commit(TYPES.RECEIVED_CONVERSATIONS, result.data)
  },
  async logIn ({ state, commit }, { email, password }: LoginPayload) {
    commit(TYPES.REQUEST_LOGIN)
    const response = await apolloClient.query<LoginData>({
      query: LOGIN,
      variables: {
        email,
        password
      }
    })
    window.localStorage.setItem('token', response.data.token)
    commit(TYPES.RECEIVED_LOGIN, response.data)
  }
}

export default actions
