import Vue from 'vue'
import Vuex from 'vuex'
import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import getters from '@/app/store/getters'
import { State } from '@/typings/customTypes'

Vue.use(Vuex)

const state: State = {
  isLoggedIn: (window &&
    window.localStorage &&
    !!window.localStorage.getItem('token')) ||
    false,
  conversations: [],
  loginError: false,
  user: undefined
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
