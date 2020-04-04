<template>
  <div id="app">
    <div v-show="!this.getIsNormalPlay">
      <MainHeader></MainHeader>
      <Tabber></Tabber>
      <keep-alive include="Singer,Search">
        <router-view></router-view>
      </keep-alive>
    </div>
    <Play></Play>
  </div>
</template>
<script>
import MainHeader from './components/MainHeader'
import Tabber from './components/Tabber'
import Play from './views/Play'
import { mapGetters } from 'vuex'
export default {
  components: {
    MainHeader,
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
