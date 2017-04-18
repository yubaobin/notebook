<template>
  <div id="app">
    <div class="icon" @click="change"></div>
    <p>Welcome: {{ getWelcome }}</p>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  methods: {
    change () {
      this.$store.dispatch('changeWelcome', { 'welcome': !this.getWelcome })
    }
  },
  computed: {
    ...mapGetters([
      'getWelcome'
    ])
  }
}
</script>

<style scoped>
.icon {
  background-image: url('~@/assets/logo.png');
  width: 100px;
  height: 100px;
  background-size: 100% 100%;
}
</style>
