import { ActionTree } from 'vuex'

import TYPES from '@/app/store/types'
import { User, Conversation } from '../../typings/types'
import {
  LoginPayload,
  LoginData,
  RegisterPayload,
  GetAllConversationsData,
  RegisterData
} from '../../typings/customTypes'
import { apolloClient } from '../../main'
import router from '@/app/router'
import { GET_CONVERSATIONS } from '../../conversations/queries'
import { LOGIN } from '../../users/queries'
import { REGISTER } from '../../users/mutations'

const actions: ActionTree<any, any> = {
  async getAllConversations ({ commit }, user: User) {
    commit(TYPES.REQUEST_CONVERSATIONS)
    const result = await apolloClient.query < GetAllConversationsData > ({ query: GET_CONVERSATIONS })
    if (!result || !result.data || !result.data.conversations) {
      throw new Error('Error fetching the conversations')
    }
    commit(TYPES.RECEIVED_CONVERSATIONS, result.data.conversations)
  },
  async register ({ commit }, { email, password, firstname, lastname }: RegisterPayload) {
    const response = await apolloClient.mutate < RegisterData > ({
      mutation: REGISTER,
      variables: {
        email,
        password,
        firstname,
        lastname
      }
    })
    if (!response || !response.data || !response.data.addUser || !response.data.addUser._id) {
      throw new Error('Error registering')
    }
    window.localStorage.setItem('token', response.data.addUser.token)
    commit(TYPES.RECEIVED_LOGIN, response.data.addUser)
    router.push({
      path: '/'
    })
  },
  async logIn ({ commit }, { email, password }: LoginPayload) {
    commit(TYPES.REQUEST_LOGIN)
    const response = await apolloClient.query < LoginData > ({
      query: LOGIN,
      variables: {
        email,
        password
      }
    })
    try {
      console.log(response)
      if (!response.data || !response.data.logIn || !response.data.logIn.token) {
        console.log('Invalid username or password')
        throw new Error(JSON.stringify(response))
      }
      window.localStorage.setItem('token', response.data.logIn.token)
      commit(TYPES.RECEIVED_LOGIN, response.data.logIn)
      router.push({
        path: '/'
      })
      return
    } catch (e) {
      console.error('Login failed:', e)
      commit(TYPES.LOGIN_ERROR)
    }
  },
  logOut ({ commit }) {
    try {
      window.localStorage.removeItem('token')
    } catch (e) {}
    router.push({
      path: '/login'
    })
    commit(TYPES.LOG_OUT)
  }
}

export default actions
