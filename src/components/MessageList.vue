<template>
  <v-flex xs8 class="message-container">
    <div class="header-container"></div>
  </v-flex>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class MessageList extends Vue {
}
</script>

<style scoped lang="scss">

.message-container {
  background-color: #ECEFEE;
  padding: 0 !important;

  .header-container {
    height: 100px;
    widows: 100%;
    background-color: #fff;
  }
}

</style>
