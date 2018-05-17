<template>
  <v-navigation-drawer app clipped flat width="240" class="drawer" v-if="isLoggedIn">
    <v-btn color="socogreen" class="socobutton">test</v-btn>
    <div class="list">
      <router-link
        class="list-button"
        v-for="button in buttons"
        :key="button.title"
        :to="button.link"
        @click.stop="select"
      >
        <!-- @click.stop="select(button)" -->
        <div class="vertical-selected" v-if="selectedButton === button.title"></div>
        <div class="content">
          <v-icon class="socobutton-icon">{{ button.icon }}</v-icon>
          <span>{{ button.title }}</span>
        </div>
      </router-link>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetters } from 'vuex'
import { mainRouteName, availableRouteName, profileRouteName } from '../app/constants'

type Button = {
  title: string;
  link: string;
  routeName: string;
  icon: string;
}

@Component({
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
})
export default class NavigationDrawer extends Vue {
  buttons: Array<Button>
  selectedButton: string = 'Mes conversations'

  constructor () {
    super()

    this.buttons = [
      { title: 'Mes conversations', link: '/', routeName: mainRouteName, icon: 'add' },
      { title: 'Conversations dispo', link: '/available', routeName: availableRouteName, icon: 'add' },
      { title: 'Mon profil', link: '/profile', routeName: profileRouteName, icon: 'add' }
    ]
  }

  select (button: Button) {
    this.selectedButton = button.title
    // this.$router.push({ name: button.routeName })
  }
}
</script>

<style scoped lang="scss">

.drawer {
  box-shadow: 2px 0 12px 4px rgba(202, 202, 202, 0.5);

  .socobutton {
    margin: 24px;
    width: calc(100% - 48px);
    height: 50px;
    box-shadow: 0 7px 13px 0 rgba(2, 250, 168, 0.5);
    border-radius: 8px;
    color: #fff;
  }

  .list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .list-button {
      width: 100%;
      height: 50px;
      display: flex;
      flex-direction: row;
      align-items: center;
      outline: none;
      margin: 20px 0 0 0;
      text-decoration: none;

      .vertical-selected {
        position: absolute;
        height: 50px;
        width: 4px;
        background-color: #02FAA8;  
        box-shadow: 2px 0 10px -1px rgba(2, 250, 168, 1);
      }

      .content {
        color: #545B58;
        font-weight: 600;
        display: flex;
        flex-direction: row;
        align-items: center;

        .socobutton-icon {
          margin: 0 20px;
        }
      }
    }
  }
}



</style>
