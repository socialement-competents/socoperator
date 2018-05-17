<template>
  <div class="message-container">
    <div class="header-container">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap class="header-layout">
          <v-flex xs9 class="header-title">
            <h1 v-if="interlocutor">
              {{ interlocutor.firstname }} {{ interlocutor.lastname }}
            </h1>
          </v-flex>
          <v-flex xs3 class="header-date">
            <span class="date">Lundi 1 janvier 2018</span>
            <span>15h30</span>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <v-container grid-list-xs text-xs-center class="conv-container">
      <v-layout row wrap>
        <v-flex xs12>
          <article>
            <div v-for="msg in messages" :key="msg._id">
              <p v-if="msg._id === user._id" class="from-me last">{{ msg.content }}</p>
              <p v-else class="to-me last">{{ msg.content }}</p>
            </div>
          </article>
        </v-flex>
      </v-layout>
    </v-container>
    <div class="footer-container">
      <v-container grid-list-lg text-xs-center>
        <v-layout row wrap>
          <v-flex xs12>
            <div class="text-area-container">
              <textarea rows="2" placeholder="Ecrivez quelque chose..."></textarea>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Message, User } from '../typings/types'
import { mapGetters } from 'vuex'

@Component({
  props: ['messages', 'interlocutor'],
  computed: {
    ...mapGetters(['user'])
  }
})
export default class MessageList extends Vue {
  messages: Array<Message> | undefined
  interlocutor: User | undefined
}
</script>

<style scoped lang="scss">
.message-container {
  background-color: #fff;
  padding: 0 !important;
  height: 100vh;
  position: relative;

  .header-container {
    width: 100%;
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

  article {
    padding:20px;
    justify-self: center;
    align-self: center;
    text-align: left;

    div {
      display: flex;
      flex-direction: column;

      p {
        font-size: 16px;
        line-height: 1.4;
        margin: 1px 0;
        padding: 8px 17px 6px 13px;
        max-width: 75%;
        position: relative;
        border-radius: 18px;

        &:after {
          position: absolute;
          content: "";
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          z-index: -1;
        }

        &.from-me {
          color: white;
          align-self: flex-end;
          background-color: #02FAA8;

          &.last {
            &:after {
              background: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='15.515px' height='17.5px' viewBox='32.485 17.5 15.515 17.5' enable-background='new 32.485 17.5 15.515 17.5'><path fill='#02FAA8' d='M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z'/></svg>") right bottom no-repeat;
              right: -6px;
              z-index: 0;
            }
          }
        }

        &.to-me {
          color: black;
          align-self: flex-start;
          background-color: #E5E5EA;

          &.last {
            &:after {
              background: url("data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='15.515px' height='17.5px' viewBox='32.484 17.5 15.515 17.5' enable-background='new 32.484 17.5 15.515 17.5'><path fill='#E5E5EA' d='M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z'/></svg>") left bottom no-repeat;
              left: -6px;
              z-index: 0;
            }
          }
        }
      }
    }    
  }

  .footer-container {
    width: 100%;
    background-color: #e6e9e8;
    bottom: calc(0px + 76px);
    position: absolute;

    .text-area-container {
      background-color: #fff;
      border-radius: 10px;
      padding: 10px;

      textarea {
        resize: none;
        width: 100%;
        outline: none;
      }
    }
  }
}
</style>
