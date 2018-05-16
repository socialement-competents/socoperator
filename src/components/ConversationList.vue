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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: ['messages']
})
export default class ConversationList extends Vue {
  messages: Array<Object> | undefined

  select (message: any) {
    if (this.messages) {
      this.messages.forEach((button: any) => {
        button.active = false
      })
      message.active = true
    }
  }
}
</script>

<style scoped lang="scss">

.conversation-list {
  background-color: #F6FAF9;
  margin: 0 !important;
  height: 100vh;
  padding: 0 !important;
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
