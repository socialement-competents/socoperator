<template>
  <div class="main">
    <MainContent class="correct-height"></MainContent>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import MainContent from '@/components/MainContent'

@Component({
  components: {
    'MainContent': MainContent
  }
})
export default class Main extends Vue {
  constructor () {
    super()
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
