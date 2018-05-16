<template>
  <div class="main">
    <NavigationBar :user="user"></NavigationBar>
    <NavigationDrawer></NavigationDrawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { User } from 'src/typings/types'
import NavigationBar from '@/components/NavigationBar'
import NavigationDrawer from '@/components/NavigationDrawer'

@Component({
  components: {
    'NavigationBar': NavigationBar,
    'NavigationDrawer': NavigationDrawer
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
}

</style>
