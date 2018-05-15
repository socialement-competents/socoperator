// import Vuex from 'vuex'
// import Vuetify from 'vuetify'
// import Login from '@/components/Login'
// import { mount, createLocalVue } from '@vue/test-utils'

// const localVue = createLocalVue()

// localVue.use(Vuex)
// localVue.use(Vuetify)

// describe('Login.vue', () => {
//   let store: Object
//   beforeEach(() => {
//     store = new Vuex.Store({
//       state: {},
//       getters: {
//         isLoggedIn: () => false
//       }
//     })
//   })
//   it('renders correct contents', () => {
//     const wrapper = mount(Login, { store, localVue })
//     const { vm } = wrapper
//     const selector = vm.$el.querySelector('.login-page h1')
//     if (!selector) {
//       throw new Error(`The element wasn't found`)
//     }
//     expect(selector.textContent)
//     .toEqual('Socoperator')
//   })
// })
