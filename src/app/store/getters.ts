import { GetterTree } from 'vuex'
import { Conversation } from '../../typings/types'

const getters: GetterTree<any, any> = {
  isLogin (state): boolean {
    return state.login
  },
  conversations (state): Conversation[] {
    return state.conversations
  }
}

export default getters
