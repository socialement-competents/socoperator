<template>
  <v-toolbar app flat clipped-left color="#F1F4F3" height="80px" v-if="isLoggedIn">
    <a class="title" href="">
      <img src="../assets/soco-logo.png" alt="" height="56px">
      <span class="socodarkgray--text hidden-xs-only">socoperator</span>
    </a>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="user" class="item-profile">
      <span>{{ user.firstname | capitalize }} {{ user.lastname | capitalize }}</span>
      <v-menu auto class="arrow-down-button">
        <v-icon slot="activator">keyboard_arrow_down</v-icon>
        <v-list>
          <v-list-tile @click="console.log()">
            <v-list-tile-title>Options</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="console.log()">
            <v-list-tile-title>Supprimer mes données personnelles</v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click.stop="logOut">
            <v-list-tile-title>Se désoconnecter</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <div class="profile-image" v-bind:class="{'placeholder': false}">
        <img
          :src="user.image || 'https://i.ytimg.com/vi/n4FnINNtr74/hqdefault.jpg'"
          alt="avatar"
          class="image"
        />
        <!-- <v-icon v-else class="image">face</v-icon> -->
      </div>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapActions, mapGetters } from 'vuex'

@Component({
  methods: {
    ...mapActions(['logOut'])
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'user'])
  },
  filters: {
    capitalize: (value: string) => value && value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
  }
})
export default class NavigationBar extends Vue {
  async created () {
    await this.fetchUser()
  }
  async updated () {
    await this.fetchUser()
  }
  async fetchUser () {
    await this.$store.dispatch('fetchUser')
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

    button {
      outline: none;
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
      .image {
        object-fit: cover;
        height: 48px;
        width: 48px;
        border-radius: 180px;
      }
    }

    .placeholder {
      background-color: #d0d0d0;
      padding: 5px;
      .image {
        height: 38px;
        width: 38px;
        border-radius: 0;
      }
    }
  }
}

</style>
