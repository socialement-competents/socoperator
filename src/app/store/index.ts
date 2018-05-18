import Vue from 'vue'
import Vuex from 'vuex'
import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import getters from '@/app/store/getters'
import { State } from '../../typings/customTypes'

Vue.use(Vuex)

const state: State = {
  isLoggedIn: (window &&
    window.localStorage &&
    !!window.localStorage.getItem('token')) ||
    false,
  conversations: [],
  loginError: undefined,
  user: undefined,
  conversation: undefined,
  web3: {
    isInjected: false,
    web3Instance: undefined,
    networkId: undefined,
    coinbase: undefined,
    balance: undefined,
    error: undefined
  },
  contractInstanceGetter: undefined,
  error: undefined
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
