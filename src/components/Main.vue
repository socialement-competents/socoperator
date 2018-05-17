<template>
  <div class="main">
    <MainContent></MainContent>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import MainContent from '@/components/MainContent'

@Component({
  components: {
    MainContent
  }
})
export default class Main extends Vue {
  async created () {
    await this.$store.dispatch('getAllConversations')
  }

  async updated () {
    await this.$store.dispatch('getAllConversations')
  }
}
</script>

<style scoped lang="scss">

.main {
  height: 100%;
  overflow: hidden;
}

</style>
