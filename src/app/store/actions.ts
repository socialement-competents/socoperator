import { ActionTree } from 'vuex'
import axios from 'axios'

import TYPES from '../../app/store/types'
import {
  User,
  LogInQueryArgs,
  AddUserMutationArgs,
  Conversation
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
import { SUBSCRIBE_TO_NEW_MESSAGES } from '../../conversations/subscriptions'
import { LOGIN, GET_USER_BY_ID } from '../../users/queries'
import { REGISTER } from '../../users/mutations'
import { ADD_MESSAGE } from '../../messages/mutations'

import getWeb3 from '../../eth/getWeb3'
import pollWeb3 from '../../eth/pollWeb3'
import getContract from '../../eth/getContract'

let pollInterval: any | undefined

const mockConvUsers = async (convs: Array<Conversation>) => {
  if (!convs) {
    return []
  }

  const uinamesUrl = `https://uinames.com/api/?region=france&amount=${convs.length}`

  try {
    const response = await axios.get(uinamesUrl)

    const updatedConvs: Array<Conversation> = convs.map((conv, i) => ({
      ...convs[i],
      user: {
        ...convs[i].user,
        firstname: response.data[i].name,
        lastname: response.data[i].surname,
        image: `https://randomuser.me/api/portraits/med/${response.data[i].gender === 'female' ? 'women' : 'men'}/${i}.jpg`
      }
    }))
    return updatedConvs
  } catch (e) {
    console.error(e)

    return convs.map((conv) => ({
      ...conv,
      user: {
        firstname: 'Soco',
        lastname: 'Man',
        image: `https://randomuser.me/api/portraits/med/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}`
      }
    }))
  }
}

const actions: ActionTree<any, any> = {
  registerWeb3: async ({ commit }) => {
    try {
      const web3 = await getWeb3()
      commit(TYPES.REGISTER_WEB3_INSTANCE, web3)
      clearInterval(pollInterval)
      pollInterval = pollWeb3(undefined)
    } catch (e) {
      console.log('error registering web3: is Metamask installed and running ?', e)
      commit(TYPES.SET_ERROR, `Couldn't connect to Metamask. Is Metamask running and are you logged with a wallet ?`)
    }
  },

  pollWeb3: ({ commit }, payload) => {
    commit(TYPES.POLL_WEB3_INSTANCE, payload)
  },

  getContractInstance: async ({ commit }) => {
    try {
      const contract = await getContract()
      commit(TYPES.SET_CONTRACT_INSTANCE, { ...contract })
    } catch (e) {
      console.log('error getting the contract:', e)
      commit(TYPES.SET_ERROR, `Couldn't get the Lottery smart-contract`)
    }
  },

  async getAllConversations ({ commit }, user: User) {
    commit(TYPES.REQUEST_CONVERSATIONS)
    try {
      const result = await apolloClient.query < GetAllConversationsData > ({ query: GET_CONVERSATIONS })
      if (!result || !result.data || !result.data.conversations) {
        throw new Error('Error fetching the conversations')
      }

      const mockedConversations = await mockConvUsers(result.data.conversations)
      commit(TYPES.RECEIVED_CONVERSATIONS, mockedConversations)
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
      window.localStorage.setItem('userId', response.data.addUser._id)
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
  },
  async addMessage ({ commit }, { conversationId, content, userId }) {
    try {
      commit(TYPES.REQUEST_ADD_MESSAGE)
      const response = await apolloClient.mutate({
        mutation: ADD_MESSAGE,
        variables: {
          conversationId,
          content,
          userId
        }
      })
      if (!response || !response.data || !response.data.addMessage || !response.data.addMessage._id) {
        throw new Error('Error sending message')
      }
      commit(TYPES.RECEIVED_ADD_MESSAGE, response.data.addMessage)
    } catch (e) {
      console.error(e)
      commit(TYPES.ADD_MESSAGE_ERROR, e)
    }
  },
  selectConversation ({ commit, getters }, conversation: Conversation | undefined) {
    commit(TYPES.SELECT_CONVERSATION, conversation)
    if (!conversation) {
      return
    }
    const observer = apolloClient.subscribe({
      query: SUBSCRIBE_TO_NEW_MESSAGES,
      variables: {
        id: conversation._id
      }
    })
    observer.subscribe({
      next (result) {
        console.log('received a new message:', result)
        if (result.data.messageAdded) {
          const subscribedConv = {
            ...getters.conversation,
            messages: [
              ...getters.conversation.messages || [],
              result.data.messageAdded
            ]
          }
          commit(TYPES.SELECT_CONVERSATION, subscribedConv)
        }
      },
      error (error) {
        console.error(error)
      }
    })
  }
}

export default actions
