import store from '@/app/store'
import { apolloClient } from '@/main'
import { User, Conversation } from '@/typings/types'

describe('store', () => {
  it('gets all conversations', () => {
    apolloClient.query = jest.fn((user: User) => {
      const conv: Conversation = {
        messages: [],
        operator: user
      }
      return {
        data: [conv]
      }
    })
    const user: User = {
      _id: 'azerty',
      email: 'ok@ok.ok',
      firstname: 'ok'
    }
    store.dispatch('getAllConversations', user)
    console.log(store.getters.conversations)
    expect(store.getters.conversations).toBeTruthy()
    // expect(store.getters.conversations.length).toBe(1)
  })

  // it('logs users out', () => {
  //   store.dispatch('setLogin', true)
  //   expect(store.getters.isLogin).toBeTruthy()
  //   store.dispatch('setLogin', false)
  //   expect(store.getters.isLogin).toBeFalsy()
  // })
})
