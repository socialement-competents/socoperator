// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'unfetch'

import App from '@/App.vue'
import router from './app/router'
import store from './app/store'

Vue.config.productionTip = false

const httpLink = createHttpLink({
  uri: process.env.SERVER_URL || 'http://localhost:3000/graphql',
  fetch: fetch
})

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

Vue.use(Vuetify, {
  theme: {
    socoblue: '#29047A',
    socogreen: '#02FAA8',
    socolightblue: '#06D6F2',
    socodarkgray: '#545B58'
  }
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  provide: apolloProvider.provide(),
  router,
  store,
  template: '<App/>',
  components: { App }
})
