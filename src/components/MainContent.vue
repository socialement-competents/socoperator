<template>
  <v-container grid-list-md text-xs-center fluid class="no-padding">
    <v-layout row wrap>
      <v-flex xs4 class="no-padding" style="z-index: 1;">
        <ConversationList
          @selectedConv="onSelectedConv"
          :convs="convs"
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
import Component from 'vue-class-component'
import ConversationList from '@/components/ConversationList'
import MessageList from '@/components/MessageList'
import { Conversation, Message } from '../typings/types'

const mockConversations = [
  {
    _id: 'abcdef',
    user: {
      image: 'https://i.ytimg.com/vi/iHBDbvH0k9k/hqdefault.jpg',
      firstname: 'Miguel',
      lastname: 'Miguel'
    },
    messages: [
      {
        _id: 'a',
        content: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      }
    ]
  },
  {
    _id: 'abcdefg',
    user: {
      image: 'https://i.ytimg.com/vi/KbgVJr_pfUc/sddefault.jpg?v=578d9345',
      firstname: 'Soco',
      lastname: 'Man'
    },
    messages: [
      {
        _id: 'b',
        content: "to Alex, Wish I could come, but I'm out of town this weekend."
      }
    ]
  },
  {
    _id: 'abcdefh',
    user: {
      image: 'https://i.ytimg.com/vi/o6TzaN2HUCI/hqdefault.jpg',
      firstname: 'René',
      lastname: 'La Taupe'
    },
    messages: [
      {
        _id: 'c',
        content: 'Do you have Paris recommendations? Have you ever been?'
      }
    ]
  },
  {
    _id: 'abcdefi',
    user: {
      image: 'https://i.ytimg.com/vi/DOC8QUKbzwo/hqdefault.jpg',
      firstname: 'Socialement',
      lastname: 'Compétent'
    },
    messages: [
      {
        _id: 'd',
        content: 'Have any ideas about what we should get Heidi for her birthday?'
      }
    ]
  },
  {
    _id: 'abcdefj',
    user: {
      image: 'https://redcdn.net/hpimg4/pics/845563hqdefault.jpg',
      firstname: 'Michel',
      lastname: 'Polnareff'
    },
    messages: [
      {
        _id: 'e',
        content: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.'
      }
    ]
  }
]

@Component({
  components: {
    'ConversationList': ConversationList,
    'MessageList': MessageList
  }
})
export default class MainContent extends Vue {
  convs: Array<Conversation>
  selectedId: string | undefined
  selectedMessages: Array<Message | null | undefined> | undefined | null = []

  constructor () {
    super()

    this.convs = mockConversations
    this.selectedId = this.convs[0]._id || undefined
    this.selectedMessages = this.convs[0].messages
  }

  async onSelectedConv (id: string) {
    const conv: Conversation | undefined = {...this.convs.find(c => c._id === id)}

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
