<template>
  <v-container grid-list-md text-xs-center fluid class="no-padding">
    <v-layout row wrap>
      <v-flex xs4 class="conversation-list shadow">
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
                <template v-for="(message, index) in messages">
                  <v-subheader v-if="message.header" :key="index">{{ message.header }}</v-subheader>
                  <v-list-tile v-else :key="message.title" avatar @click="select(message)" class="card-conversation" v-bind:class="{'active': message.active}">
                    <v-list-tile-avatar>
                      <img :src="message.avatar" class="image">
                    </v-list-tile-avatar>
                    <v-list-tile-content class="hidden-xs-only">
                      <v-list-tile-title v-html="message.title"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="message.subtitle"></v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs8 class="message-container">
        <div class="header-container"></div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
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

  select (message: any) {
    this.messages.forEach((button: any) => {
      button.active = false
    })
    message.active = true
  }
}
</script>

<style scoped lang="scss">

.no-padding {
  padding: 0 !important;
}

.shadow {
  box-shadow: 0 0 10px -6px rgba(0, 0, 0, 0.5);
}

.conversation-list {
  background-color: #F6FAF9;
  margin: 0 !important;
  height: 100vh;
  padding: 0 !important;

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

.message-container {
  background-color: #ECEFEE;
  padding: 0 !important;

  .header-container {
    height: 100px;
    widows: 100%;
    background-color: #fff;
  }
}

</style>
