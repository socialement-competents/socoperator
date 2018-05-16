<template>
  <v-container grid-list-md text-xs-center fluid class="no-padding">
    <v-layout row wrap>
      <v-flex xs4 class="no-padding" style="z-index: 1;">
        <ConversationList :messages="messages"></ConversationList>
      </v-flex>
      <v-flex xs8 class="no-padding">
        <MessageList></MessageList>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ConversationList from '@/components/ConversationList'
import MessageList from '@/components/MessageList'

@Component({
  components: {
    'ConversationList': ConversationList,
    'MessageList': MessageList
  }
})
export default class MainContent extends Vue {
  messages: Array<Object>

  constructor () {
    super()

    this.messages = [
      { header: 'Today' },
      { avatar: 'https://i.ytimg.com/vi/iHBDbvH0k9k/hqdefault.jpg', title: 'Brunch this weekend?', subtitle: "<b>Ali Connors</b> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?", active: false },
      { avatar: 'https://i.ytimg.com/vi/KbgVJr_pfUc/sddefault.jpg?v=578d9345', title: 'Summer BBQ', subtitle: "<b>to Alex, Scott, Jennifer</b> &mdash; Wish I could come, but I'm out of town this weekend.", active: true },
      { avatar: 'https://i.ytimg.com/vi/o6TzaN2HUCI/hqdefault.jpg', title: 'Oui oui', subtitle: '<b>Sandra Adams</b> &mdash; Do you have Paris recommendations? Have you ever been?', active: false },
      { avatar: 'https://i.ytimg.com/vi/DOC8QUKbzwo/hqdefault.jpg', title: 'Birthday gift', subtitle: '<b>Trevor Hansen</b> &mdash; Have any ideas about what we should get Heidi for her birthday?', active: false },
      { avatar: 'https://redcdn.net/hpimg4/pics/845563hqdefault.jpg', title: 'Recipe to try', subtitle: '<b>Britta Holt</b> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.', active: false }
    ]
  }
}
</script>

<style scoped lang="scss">

.no-padding {
  padding: 0 !important;
}

</style>
