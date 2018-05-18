<template>
  <v-container grid-list-md text-xs-center fluid class="no-padding">
    <v-layout row wrap style="height: 100%;">
      <v-flex xs4 class="no-padding" style="z-index: 1; height: 100%;">
        <ConversationList
          @selectedConv="onSelectedConv"
          :selectedId="selectedId"
          :conversations="filteredConversations"
        ></ConversationList>
      </v-flex>
      <v-flex xs8 class="no-padding">
        <MessageList
          v-if="selectedConv"
          :messages="selectedConv.messages"
          :interlocutor="selectedConv.user"
          :selectedId="selectedConv._id"
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
import { mainRouteName, availableRouteName } from '../app/constants'

@Component({
  components: {
    'ConversationList': ConversationList,
    'MessageList': MessageList
  },
  computed: mapGetters(['conversations', 'user'])
})
export default class MainContent extends Vue {
  user: any
  conversations: Array<Conversation> | undefined
  filteredConversations: Array<Conversation> = []
  selectedId: string | undefined = ''
  selectedConv: Conversation | undefined | null = {}

  @Watch('conversations')
  conversationsChanged (val: Array<Conversation>, old: any): void {
    if (!val.length) {
      return
    }

    this.filterConversationsByOperator()
  }

  filterConversationsByOperator () {
    let filteredConvs: Array<Conversation> = []

    if (!this.conversations) {
      this.filteredConversations = []
      return
    }

    if (this.$route.name === mainRouteName) {
      filteredConvs = this.conversations.filter(c =>
        c.operator && c.operator._id === this.user._id)
    }

    if (this.$route.name === availableRouteName) {
      filteredConvs = this.conversations.filter(c => !c.operator)
    }

    if (filteredConvs.length) {
      this.selectedId = filteredConvs[0]._id || ''
      this.selectedConv = filteredConvs[0]
    }

    this.filteredConversations = filteredConvs
  }

  @Watch('$route')
  routeChanged () {
    this.filterConversationsByOperator()
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
