import Vue from 'vue'
import Vuex from 'vuex'
import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import getters from '@/app/store/getters'
import { Conversation } from '../../typings/types';

Vue.use(Vuex)

interface State {
  isLoggedIn: boolean
  conversations: Conversation[]
}

const state: State = {
  isLoggedIn: (window &&
    window.localStorage &&
    !!window.localStorage.getItem('token')) ||
    false,
  conversations: []
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
