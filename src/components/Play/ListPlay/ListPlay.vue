<template>
  <transition @enter="enter"
              @leave="leave"
              :css="false">
    <div class="listPlay" v-show="this.getIsListPlay">
      <Header></Header>
      <Center ref="center" :songs="getSongs"></Center>
      <Bottom @hiddenList="hiddenList" ></Bottom>
    </div>
  </transition>
</template>

<script>
import Header from '../../../components/Play/ListPlay/Header'
import Center from '../../../components/Play/ListPlay/Center'
import Bottom from '../../../components/Play/ListPlay/Bottom'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'ListPlay',
  components: {
    Header,
    Center,
    Bottom
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    hiddenList: function () {
      this.setIsListPlay(false)
    },
    enter: function (el, done) {
      Velocity(el, 'transition.swoopIn', {
        duration: 500,
        complete: done
      })
    },
    leave: function (el, done) {
      Velocity(el, 'transition.swoopOut', {
        duration: 500,
        complete: done
      })
    },
    ...mapActions([
      'setIsListPlay'
    ])
  },
  computed: {
    ...mapGetters([
      'getIsListPlay',
      'getSongs'
    ])
  },
  watch: {
    getIsListPlay: function (newValue, oldValue) {
      if (newValue) {
        this.$refs.center.refreshIScroll()
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .listPlay {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 667;
  }
</style>
