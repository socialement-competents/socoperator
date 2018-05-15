import Vue from 'vue'
import Vuetify from 'vuetify'
import Main from '@/components/Main'
import { mount } from '@vue/test-utils'

Vue.use(Vuetify)

describe('Main.vue', () => {
  it('should do nothing', () => {
    mount(Main)
  })
})
