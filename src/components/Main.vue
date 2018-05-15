<template>
  <v-toolbar flat color="#F1F4F3" height="80px">
    <a class="title" href="">
      <img src="../assets/soco-logo.svg" alt="" height="70%">
      <span class="socodarkgray--text hidden-xs-only">socoperator</span>
    </a>
    <v-spacer></v-spacer>
    <v-toolbar-items class="item-profile">
      <span>{{user.firstname}} {{user.lastname}}</span>
      <button class="arrow-down-button">
        <img src="../assets/down-arrow.svg" alt="">
      </button>
      <div class="profile-image" v-bind:class="{'placeholder': !user.image}">
        <img v-if="user.image" :src="user.image" alt="avatar">
        <img v-else src="../assets/avatar.svg" alt="avatar">
      </div>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { User } from 'src/typings/types'

@Component
export default class Main extends Vue {
  user: User

  constructor () {
    super()

    this.user = {
      firstname: 'Soco',
      lastname: 'man',
      image: 'https://i.ytimg.com/vi/n4FnINNtr74/hqdefault.jpg'
    }
  }
}
</script>

<style scoped lang="scss">

.toolbar {
  border-bottom: 2px solid #ECEFEE;

  .title {
    margin: 0 40px !important; 
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 100%;
    text-decoration: none;

    span {
      margin-left: 20px;
      font-weight: 600 !important;
    }
  }

  .arrow-down-button {
    height: auto;
    display: flex;
    align-items: center;
    margin: 0 14px;
    outline: none;

    img {
      height: 14px;
    }
  }

  .item-profile {
    display: flex;
    align-items: center;
    margin: 0 40px !important;
    .profile-image {
      border-radius: 180px;
      height: 60%;
      width: auto;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
      img {
        object-fit: cover;
        height: 48px;
        width: 48px;
        border-radius: 180px;
      }
    }

    .placeholder {
      background-color: #d0d0d0;
      padding: 5px;
      img {
        height: 100%;
        width: auto;
        border-radius: 0;
      }
    }
  }
}

</style>
