<template>
  <div class="conversation-list">
    <v-container grid-list-md text-xs-center class="">
      <v-layout row justify-center class="hidden-xs-only">
        <v-flex xs10>
          <v-text-field
            v-model="nameFilter"
            label="Rechercher une conversation"
            prepend-icon="search"
            color="#545B58"
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row justify-center>
        <v-flex xs10>
          <v-list three-line class="list">
            <v-subheader>Today</v-subheader>
            <template v-for="conv in filteredConvs">
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
            <div v-if="filteredConvs.length === 0">
              Aucune conversation trouvée
            </div>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { Conversation } from '../typings/types'

@Component({
  props: ['selectedId'],
  computed: mapGetters(['conversations'])
})
export default class ConversationList extends Vue {
  conversations: any
  nameFilter: string = ''
  filteredConvs: Array<Conversation> = []
  selectedId: string | null | undefined

  @Watch('nameFilter')
  nameFilterChanged () {
    this.filterConvs()
  }

  @Watch('conversations')
  async updateConv () {
    this.filterConvs()
  }

  filterConvs () {
    if (this.nameFilter.length < 2) {
      this.filteredConvs = this.conversations
    }

    // Normalise une string (ÈêéÊÈâÏù => eeeeeeaiu)
    const norm = (str: string) => str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()

    const normFilter = norm(this.nameFilter)

    this.filteredConvs = this.conversations.filter((c: Conversation) =>
      c.user &&
      ((c.user.firstname && norm(c.user.firstname).includes(normFilter)) ||
      (c.user.lastname && norm(c.user.lastname).includes(normFilter))))
  }
}
</script>

<style scoped lang="scss">
.conversation-list {
  background-color: #F6FAF9;
  height: 101%;
  z-index: 1;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.5);
  overflow: scroll;

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
