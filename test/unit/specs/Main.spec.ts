import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Main from '@/components/Main'
import { shallowMount, createLocalVue } from '@vue/test-utils'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(Vuetify)

describe('Main.vue', () => {
  let store: Object
  let getAllConvs
  beforeEach(() => {
    getAllConvs = jest.fn()
    store = new Vuex.Store({
      state: {},
      actions: {
        getAllConversations: getAllConvs
      },
      getters: {}
    })
  })
  it('dispatches getAllConversations', () => {
    shallowMount(Main, { store, localVue })
    expect(getAllConvs).toBeCalled()
  })
})
