<template>
  <v-app>
    <NavigationDrawer></NavigationDrawer>
    <NavigationBar></NavigationBar>
    <v-content>
      <transition name="pageChange" mode="out-in">
        <router-view/>
      </transition>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import NavigationDrawer from '@/components/NavigationDrawer'
import NavigationBar from '@/components/NavigationBar'

@Component({
  components: {
    'NavigationBar': NavigationBar,
    'NavigationDrawer': NavigationDrawer
  }
})
export default class App extends Vue {
  msg: string = 'Welcome to Your Vue.js App'
  name: string = 'app'
}
</script>

<style>
#app {
  font-family: 'Raleway', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.pageChange-enter-active {
  animation: scaleUp .7s ease both;
}
.pageChange-leave-active {
  animation: fade .7s ease both;
}
@keyframes scaleUp {
	from { opacity: 0; transform: scale(.8); }
}
@keyframes fade {
  to { opacity: 0; }
}
</style>
