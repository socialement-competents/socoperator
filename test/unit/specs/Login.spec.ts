import Vue from 'vue'
import Vuetify from 'vuetify'
import Login from '@/components/Login'

Vue.use(Vuetify)

describe('Login.vue', () => {
  it('renders correct contents', () => {
    const Constructor = Vue.extend(Login)
    const vm = new Constructor().$mount()
    const selector = vm.$el.querySelector('.login-page h1')
    if (!selector) {
      throw new Error(`The element wasn't found`)
    }
    expect(selector.textContent)
    .toEqual('Socoperator')
  })
})
