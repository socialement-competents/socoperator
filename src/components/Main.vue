<template>
  <div class="main">
    <NavigationDrawer></NavigationDrawer>
    <NavigationBar :user="user"></NavigationBar>
    <MainContent class="correct-height"></MainContent>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { User } from 'src/typings/types'
import NavigationBar from '@/components/NavigationBar'
import NavigationDrawer from '@/components/NavigationDrawer'
import MainContent from '@/components/MainContent'

@Component({
  components: {
    'NavigationBar': NavigationBar,
    'NavigationDrawer': NavigationDrawer,
    'MainContent': MainContent
  }
})
export default class Main extends Vue {
  user: User

  constructor () {
    super()

    this.user = {
      firstname: 'Soco',
      lastname: 'man',
      image: 'https://i.ytimg.com/vi/n4FnINNtr74/hqdefault.jpg'
    }
    this.getConversations()
  }
  async getConversations () {
    await this.$store.dispatch('getAllConversations')
  }
}
</script>

<style scoped lang="scss">

.main {
  height: 100vh;
  overflow: hidden;

  .correct-height {
    height: 60vh;
  }
}

</style>
