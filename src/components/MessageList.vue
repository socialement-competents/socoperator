<template>
  <div class="message-container">
    <div class="header-container">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap class="header-layout">
          <v-flex xs9 class="header-title">
            <h1>Title</h1>
          </v-flex>
          <v-flex xs3 class="header-date">
            <span class="date">Lundi 1 janvier 2018</span>
            <span>15h30</span>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Message } from '../typings/types'

@Component({
  props: ['message']
})
export default class MessageList extends Vue {
  message: Message | undefined

  get msgOrDefault (): Object {
    if (this.message) {
      return this.message
    }

    return {
      avatar: 'https://i.ytimg.com/vi/iHBDbvH0k9k/hqdefault.jpg',
      title: 'Brunch this weekend?',
      subtitle: "<b>Ali Connors</b> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
      active: false
    }
  }
}
</script>

<style scoped lang="scss">

.message-container {
  background-color: #ECEFEE;
  padding: 0 !important;

  .header-container {
    widows: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 2px 12px 4px rgba(202, 202, 202, 0.5);

    .header-layout {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .header-title {
        text-align: left;
      }

      .header-date {
        text-align: right;
        display: flex;
        flex-direction: column;
        font-size: 14px;
        font-weight: 200;
      }
    }

  }
}

</style>
