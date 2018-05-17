import { ActionTree } from 'vuex'

import TYPES from '../../app/store/types'
import {
  User,
  LogInQueryArgs,
  AddUserMutationArgs
} from '../../typings/types'
import {
  LoginData,
  GetAllConversationsData,
  RegisterData,
  UserByIdData
} from '../../typings/customTypes'
import { apolloClient } from '../../main'
import router from '../../app/router'
import { GET_CONVERSATIONS } from '../../conversations/queries'
import { LOGIN, GET_USER_BY_ID } from '../../users/queries'
import { REGISTER } from '../../users/mutations'

const actions: ActionTree<any, any> = {
  async getAllConversations ({ commit }, user: User) {
    commit(TYPES.REQUEST_CONVERSATIONS)
    try {
      const result = await apolloClient.query < GetAllConversationsData > ({ query: GET_CONVERSATIONS })
      if (!result || !result.data || !result.data.conversations) {
        throw new Error('Error fetching the conversations')
      }
      commit(TYPES.RECEIVED_CONVERSATIONS, result.data.conversations)
    } catch (e) {
      console.error(e)
    }
  },
  async register ({ commit }, { email, password, firstname, lastname }: AddUserMutationArgs) {
    try {
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
      window.localStorage.setItem('userId', response.data.logIn._id)
      commit(TYPES.RECEIVED_LOGIN, response.data.addUser)
      router.push({
        path: '/'
      })
    } catch (e) {
      console.error(e)
      commit(TYPES.LOGIN_ERROR, e.message)
    }
  },
  async fetchUser ({ commit, state, dispatch }) {
    if (state.user) {
      return
    }

    const userId = window.localStorage.getItem('userId')

    if (!userId || !window.localStorage.getItem('token')) {
      dispatch('logOut')
    }

    const response = await apolloClient.query < UserByIdData > ({
      query: GET_USER_BY_ID,
      variables: {
        id: userId
      }
    })

    commit(TYPES.RECEIVED_LOGIN, response.data.userById)
  },
  async logIn ({ commit }, { email, password }: LogInQueryArgs) {
    if (!email) {
      commit(TYPES.LOGIN_ERROR, 'Le champ Email est obligatoire.')
      return
    }
    if (!password) {
      commit(TYPES.LOGIN_ERROR, 'Le champ Mot de passe est obligatoire.')
      return
    }
    // eslint-disable-next-line
    if (!email.match(/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i)) {
      commit(TYPES.LOGIN_ERROR, `L'email n'a pas l'air valide.`)
      return
    }
    commit(TYPES.REQUEST_LOGIN)
    const response = await apolloClient.query < LoginData > ({
      query: LOGIN,
      variables: {
        email,
        password
      }
    })
    try {
      if (!response.data || !response.data.logIn || !response.data.logIn.token) {
        console.error('Invalid username or password')
        throw new Error(JSON.stringify(response))
      }
      window.localStorage.setItem('token', response.data.logIn.token)
      window.localStorage.setItem('userId', response.data.logIn._id)
      commit(TYPES.RECEIVED_LOGIN, response.data.logIn)
      router.push({
        path: '/'
      })
      return
    } catch (e) {
      console.error('Login failed:', e)
      commit(TYPES.LOGIN_ERROR, 'Erreur de soconnexion !\nLogin ou mot de passe invalide.')
    }
  },
  logOut ({ commit }) {
    try {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('userId')
    } finally {
      router.push({
        path: '/login'
      })
      commit(TYPES.LOG_OUT)
    }
  }
}

export default actions
