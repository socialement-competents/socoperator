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
  [TYPES.REGISTER_WEB3_INSTANCE]: (state, { coinbase, networkId, balance, injectedWeb3, web3 }) => {
    state.web3 = {
      ...state.web3,
      coinbase,
      networkId,
      balance: parseInt(balance, 10),
      isInjected: injectedWeb3,
      web3Instance: web3
    }
  },

  [TYPES.POLL_WEB3_INSTANCE]: (state, { coinbase, balance }) => {
    state.web3 = {
      ...state.web3,
      coinbase,
      balance: parseInt(balance, 10)
    }
  },

  [TYPES.SET_ERROR]: (state, payload) => {
    state.error = payload
  },

  [TYPES.SET_CONTRACT_INSTANCE]: (state, contract) => {
    state.contractInstanceGetter = () => contract
  }
}

export default mutations
