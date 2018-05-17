<template>
  <v-container grid-list-md text-xs-center fluid class="no-padding">
    <v-layout row wrap style="height: 100%;">
      <v-flex xs4 class="no-padding" style="z-index: 1; height: 100%;">
        <ConversationList
          @selectedConv="onSelectedConv"
          :selectedId="selectedId"
        ></ConversationList>
      </v-flex>
      <v-flex xs8 class="no-padding">
        <MessageList
          v-if="selectedConv"
          :messages="selectedConv.messages"
          :interlocutor="selectedConv.user"
        ></MessageList>
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
import { Conversation } from '../typings/types'

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
  selectedConv: Conversation | undefined | null = {}

  @Watch('conversations')
  conversationsChanged (val: Array<Conversation>, old: any): void {
    if (!val.length) {
      return
    }
    this.selectedId = val[0]._id || ''
    this.selectedConv = val[0]
  }

  async onSelectedConv (id: string) {
    if (!this.conversations) {
      return
    }
    const conv: Conversation | undefined = this.conversations.find(c => c._id === id)

    if (!conv) {
      return
    }

    this.selectedId = id
    this.selectedConv = conv
  }
}
</script>

<style scoped lang="scss">
.no-padding {
  padding: 0 !important;
}
</style>
