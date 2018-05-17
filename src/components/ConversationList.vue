<template>
  <div class="conversation-list">
    <v-container grid-list-md text-xs-center class="">
      <v-layout row justify-center class="hidden-xs-only">
        <v-flex xs10>
          <v-text-field
            id="testing"
            name="input-1"
            label="Label Text"
            prepend-icon="search"
            color="#545B58"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-flex xs10>
          <v-list three-line class="list">
            <v-subheader>Today</v-subheader>
            <template v-for="conv in updatedConvs">
              <v-list-tile
                :key="conv._id"
                avatar
                @click="$emit('selectedConv', conv._id)"
                class="card-conversation"
                :class="{ active: conv._id === selectedId }"
              >
                <v-list-tile-avatar>
                  <img :src="conv.user.image" class="image">
                </v-list-tile-avatar>
                <v-list-tile-content class="hidden-xs-only">
                  <v-list-tile-title v-if="conv.user">
                    {{ conv.user.firstname }}&nbsp;{{ conv.user.lastname }}
                  </v-list-tile-title>
                  <v-list-tile-sub-title v-if="conv.messages && conv.messages.length">
                    {{ conv.messages[conv.messages.length - 1].content }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { mapGetters } from 'vuex'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { Conversation, User } from '../typings/types'

@Component({
  props: ['selectedId'],
  computed: mapGetters(['conversations'])
})
export default class ConversationList extends Vue {
  updatedConvs: Array<Conversation> = []
  selectedId: string | null | undefined

  @Watch('conversations')
  async updateConv (val: Array<Conversation>) {
    if (!val) {
      this.updatedConvs = []
      return
    }

    let updatedConvs: Array<Conversation> = []

    for (let i = 0; i < val.length; i++) {
      let generatedUser: User
      let gender: string
      try {
        const uinamesUrl = 'https://uinames.com/api/?region=france'
        const response = await axios.get(uinamesUrl)
        generatedUser = {
          firstname: response.data.name,
          lastname: response.data.surname
        }
        gender = response.data.gender === 'female' ? 'women' : 'men'
      } catch (e) {
        console.error(e)
        generatedUser = {
          firstname: 'soco',
          lastname: 'man'
        }
        gender = Math.random() > 0.5 ? 'men' : 'women'
      }
      const id = Math.floor((Math.random() * 100))
      const url = `https://randomuser.me/api/portraits/med/${gender}/${id}.jpg`
      generatedUser.image = url
      updatedConvs = [
        ...updatedConvs,
        {
          ...val[i],
          user: {
            ...val[i].user,
            ...generatedUser
          }
        }
      ]
    }
    this.updatedConvs = updatedConvs
  }
}
</script>

<style scoped lang="scss">
.conversation-list {
  background-color: #F6FAF9;
  height: 100vh;
  z-index: 1;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);

  .list {
    background-color: transparent;

    .card-conversation {
      box-shadow: 0 0 11px -6px rgba(185, 185, 185, 0.5);
      margin: 10px 0;
      background-color: #fff;

      .image {
        object-fit: cover;
      }
    }
    .active {
      background-color: #02FAA8;

      * {
        color: #fff;
      }
    }
  }
}

</style>
