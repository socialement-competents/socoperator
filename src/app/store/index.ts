import Vue from 'vue'
import Vuex from 'vuex'
import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import getters from '@/app/store/getters'

Vue.use(Vuex)

interface State {
  isLoggedIn: boolean
}

const state: State = {
  isLoggedIn: !!window.localStorage.getItem('token')
}

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
