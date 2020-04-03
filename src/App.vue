<template>
  <div id="app">
    <div v-show="!this.getIsNormalPlay">
      <Header></Header>
      <Tabber></Tabber>
      <router-view></router-view>
    </div>
    <Play></Play>
  </div>
</template>
<script>
import Header from './components/Header'
import Tabber from './components/Tabber'
import Play from './views/Play'
import { mapGetters } from 'vuex'
export default {
  components: {
    Header,
    Tabber,
    Play
  },
  computed: {
    ...mapGetters([
      'getIsNormalPlay'
    ])
  }
}
</script>
<style scoped lang="scss">
</style>
