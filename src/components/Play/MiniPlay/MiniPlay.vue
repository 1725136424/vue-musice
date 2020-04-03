<template>
  <transition @enter="enter"
              @leave="leave"
              :css="false">
    <div class="miniWrapper"
         v-show="this.getIsMiniPlay">
      <div class="miniPlay">
        <div class="left">
          <img @click.stop="showNormalPlayer"
               :src="currentSong.picUrl"
               ref="pic" :class="{'active': getIsPlaying}">
          <div class="desc">
            <p class="name">{{ currentSong.name }}</p>
            <p class="artist">{{ currentSong.artist }}</p>
          </div>
        </div>
        <div class="right">
          <div class="play" @click="play" :class="{'active': getIsPlaying}"></div>
          <div class="menu" @click="showList"></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'MiniPlay',
  methods: {
    ...mapActions([
      'setIsNormalPlay',
      'setIsMiniPlay',
      'setIsListPlay',
      'setIsPlaying'
    ]),
    showList: function () {
      this.setIsListPlay(true)
    },
    showNormalPlayer: function () {
      this.setIsNormalPlay(true)
    },
    play: function () {
      this.setIsPlaying(!this.getIsPlaying)
    },
    enter: function (el, done) {
      Velocity(el, 'transition.bounceUpIn', 500, function () {
        done()
      })
    },
    leave: function (el, done) {
      Velocity(el, 'transition.bounceDownOut', 500, function () {
        done()
      })
    }
  },
  computed: {
    ...mapGetters([
      'getIsMiniPlay',
      'getIsPlaying'
    ])
  },
  props: {
    currentSong: {
      type: Object,
      value: () => {},
      require: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./../../../assets/css/variable";
  @import "./../../../assets/css/mixin";
  .miniWrapper {
    z-index: 666;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 120px;
    .miniPlay {
      width: 100%;
      height: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include set_bgColor();
      .left {
        display: flex;
        justify-content: start;
        align-items: center;
        img {
          margin-right: 20px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          animation: rotate 4s linear infinite;
          animation-play-state: paused;
          &.active {
            animation-play-state: running;
          }
        }
        .desc {
          color: rgba(255, 255, 255, .8);
          .name {
            @include set_fontSize($font_medium_s);
          }
          .artist {
            opacity: 0.7;
            @include set_fontSize($font_small);
          }
        }
      }
      .right {
        display: flex;
        justify-content: start;
        align-items: center;
        .play {
          width: 80px;
          height: 80px;
          @include set_headerImg('./../../../assets/images/play');
          &.active {
            @include set_headerImg('./../../../assets/images/pause');
          }
        }
        .menu {
          width: 120px;
          height: 120px;
          @include set_headerImg('./../../../assets/images/list')
        }
      }
    }
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
           transform: rotate(360deg);
         }
  }
</style>
