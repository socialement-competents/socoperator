<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Inbox</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
        <v-list two-line>
          <template v-for="(conversation, index) in conversations.conversations">
            <v-subheader v-if="conversation.header" :key="conversation.header">{{ conversation.header }}</v-subheader>
            <v-divider v-else-if="conversation.divider" :inset="true" :key="index"></v-divider>
            <v-list-tile v-else :key="conversation._id" avatar @click="">
              <v-list-tile-avatar>
                <img :src="conversation.avatar">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{conversation.user.firstname}} {{conversation.user.lastname}}</v-list-tile-title>
                <v-list-tile-sub-title v-if="conversation.messages[0]">{{conversation.messages[0].content || ''}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters } from 'vuex'

@Component({
  computed: mapGetters(['conversations'])
})
export default class HelloWorld extends Vue {
  constructor () {
    super()
    this.getConversations()
  }
  getConversations () {
    this.$store.dispatch('getAllConversations')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
