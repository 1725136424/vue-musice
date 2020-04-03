<template>
  <transition :css="false"
              @enter="enter"
              @leave="leave">
    <div class="normalPlay" v-show="getIsNormalPlay">
      <Header :desc="{'name': currentSong.name,
      'artist': currentSong.artist}"></Header>
      <Center ref="center" :picUrl="currentSong.picUrl" :lyric="lyric"></Center>
      <Bottom></Bottom>
      <div class="mask">
        <img :src="currentSong.picUrl">
      </div>
      <div class="background"></div>
    </div>
  </transition>
</template>
<script>
import Header from '../../../components/Play/NormalPlay/Header'
import Center from '../../../components/Play/NormalPlay/Center'
import Bottom from '../../../components/Play/NormalPlay/Bottom'
import { mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'NormalPly',
  components: {
    Header,
    Center,
    Bottom
  },
  data () {
    return {
      name: 888
    }
  },
  methods: {
    enter (el, done) {
      Velocity(el, 'transition.shrinkIn', 500, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.shrinkOut', 500, function () {
        done()
      })
    }
  },
  computed: {
    ...mapGetters([
      'getIsNormalPlay'
    ])
  },
  watch: {
    getIsNormalPlay: function (newValue, oldValue) {
      if (newValue) {
        this.$refs.center.refreshIScroll()
      }
    }
  },
  props: {
    currentSong: {
      type: Object,
      value: () => {},
      require: true
    },
    lyric: {
      type: Object,
      value: () => {},
      require: true
    }
  }
}
</script>

<style scoped lang="scss">
  .normalPlay {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  img {
    height: 100%;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    filter: blur(10px);
  }
  }
  .background {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.2);
  }
  }
</style>
