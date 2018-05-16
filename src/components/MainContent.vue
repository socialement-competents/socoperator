<template>
  <v-container grid-list-md text-xs-center fluid class="no-padding">
    <v-layout row wrap>
      <v-flex xs4 class="no-padding" style="z-index: 1;">
        <ConversationList
          v-if="conversations"
          @selectedConv="onSelectedConv"
          :convs="conversations"
          :selectedId="selectedId"
        ></ConversationList>
      </v-flex>
      <v-flex xs8 class="no-padding">
        <MessageList :messages="selectedMessages"></MessageList>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import ConversationList from '@/components/ConversationList'
import MessageList from '@/components/MessageList'
import { Conversation, Message } from '../typings/types'

@Component({
  components: {
    'ConversationList': ConversationList,
    'MessageList': MessageList
  },
  computed: mapGetters(['conversations'])
})
export default class MainContent extends Vue {
  conversations: Array<Conversation> | undefined
  selectedId: string | undefined = ''
  selectedMessages: Array<Message | null | undefined> | undefined | null = []

  @Watch('conversations')
  conversationsChanged (val: Array<Conversation>): void {
    console.log(val)
    if (!val.length) {
      return
    }
    this.selectedId = val[0]._id || ''
    this.selectedMessages = val[0].messages
  }

  async onSelectedConv (id: string) {
    if (!this.conversations) {
      return
    }
    const conv: Conversation | undefined = {...this.conversations.find(c => c._id === id)}

    if (!conv) {
      return
    }

    this.selectedId = id
    this.selectedMessages = conv.messages
  }
}
</script>

<style scoped lang="scss">
.no-padding {
  padding: 0 !important;
}
</style>
