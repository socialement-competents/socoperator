// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { split } from 'apollo-link'
import fetch from 'unfetch'

import App from '@/App.vue'
import router from './app/router'
import store from './app/store'

Vue.config.productionTip = false

const httpLink = createHttpLink({
  uri: process.env.SERVER_URL || 'https://soco-back.herokuapp.com/graphql',
  fetch: fetch
})

const wsLink = new WebSocketLink({
  uri: process.env.SERVER_URL_SUB || 'ws://soco-back.herokuapp.com/subscriptions',
  options: {
    reconnect: true
  }
})

const link = split(
  // split based on operation type
  ({ query }: any) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

export const apolloClient = new ApolloClient({
  link: link,
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
