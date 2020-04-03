<template>
  <transition @enter="enter"
              @leave="leave"
              :css="false"
              appear>
    <div class="personal">
      <Header @selectedUI="selected"></Header>
      <Center :currentSong="currentSong"></Center>
    </div>
  </transition>
</template>

<script>
import Header from './../components/Peronsal/Header'
import Center from './../components/Peronsal/Center'
import { mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'Personal',
  data () {
    return {
      currentSong: []
    }
  },
  components: {
    Header,
    Center
  },
  methods: {
    selected: function (id) {
      if (id === 1) {
        this.currentSong = this.getFavoriteList
      } else if (id === 2) {
        this.currentSong = this.getListedMusic
      }
    },
    enter: function (el, done) {
      Velocity(el, 'transition.bounceDownIn', 500, function () {
        done()
      })
    },
    leave: function (el, done) {
      Velocity(el, 'transition.bounceUpOut', 500, function () {
        done()
      })
    }
  },
  computed: {
    ...mapGetters([
      'getFavoriteList',
      'getListedMusic'
    ])
  },
  created () {
    this.currentSong = this.getFavoriteList
  }
}
</script>

<style scoped lang="scss">
  @import "./../assets/css/variable";
  @import "./../assets/css/mixin";
  .personal {
    z-index: 9999;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    @include set_sub_bgColor()
  }
</style>
