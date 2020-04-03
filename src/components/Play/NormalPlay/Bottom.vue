<template>
    <div class="bottom">
      <div class="top">
        <div class="left">
          {{ getCurrentTime * 1000 | formatDuration}}
        </div>
        <div class="center">
          <div class="progress-bar"
               ref="progress-bar" @click.stop="clickBar">
            <div class="progress-line" ref="progress-line">
              <div class="progress-dot"
                   ref="progress-dot" @touchstart.stop="clickDot"></div>
            </div>
          </div>
        </div>
        <div class="right">
          {{ getDuration * 1000 | formatDuration }}
        </div>
      </div>
      <ul class="bottom-sta">
          <li @click="changeModel" ref="model" :class="{'loop': this.getModelType === modelType.loop, 'one': this.getModelType === modelType.one, 'random': this.getModelType === modelType.random}"></li>
          <li @click="prev"></li>
          <li @click.stop="play" :class="{'active' : getIsPlaying}"></li>
          <li @click="next"></li>
          <li @click="like" :class="{'active' : isFavoriteSong()}"></li>
      </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import modelType from './../../../store/model-type'
export default {
  name: 'Bottom',
  data () {
    return {
      modelType: modelType,
      isDrag: false
    }
  },
  computed: {
    ...mapGetters([
      'getIsNormalPlay',
      'getIsPlaying',
      'getModelType',
      'getCurrentTime',
      'getDuration',
      'getAudio',
      'getCurrentIndex',
      'getCurrentSong',
      'getFavoriteList'
    ])
  },
  watch: {
    getIsNormalPlay: function (newValue, oldValue) {
      if (newValue) {
        let rate = (this.getCurrentTime) / (this.getDuration)
        this.initProgress(rate)
      }
    },
    getCurrentTime: function (newValue, oldValue) {
      if (!this.isDrag) {
        let rate = newValue / (this.getDuration)
        this.initProgress(rate)
      }
    }
  },
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModelType',
      'setCurrentTime',
      'setCurrentIndex',
      'setFavoriteList'
    ]),
    play: function () {
      this.setIsPlaying(!this.getIsPlaying)
    },
    changeModel: function () {
      // 改变播放模式
      if (this.getModelType === modelType.loop) {
        this.setModelType(modelType.one)
      } else if (this.getModelType === modelType.one) {
        this.setModelType(modelType.random)
      } else if (this.getModelType === modelType.random) {
        this.setModelType(modelType.loop)
      }
    },
    initProgress: function (rate) {
      if (rate <= 0) {
        rate = 0
      } else if (rate >= 1) {
        rate = 1
      }
      let totalWidth = this.$refs['progress-bar'].offsetWidth
      const dotWidth = this.$refs['progress-dot'].offsetWidth
      let width = totalWidth * rate
      this.$refs['progress-line'].style.width = width + 'px'
      this.$refs['progress-dot'].style.left = (width - dotWidth / 2) + 'px'
    },
    clickBar: function (e) {
      let pageX = e.pageX
      let targetLeft = this.$refs['progress-bar'].offsetLeft
      let targetWidth = parseFloat(getComputedStyle(this.$refs['progress-bar']).width)
      let offset = pageX - targetLeft
      let rate = offset / targetWidth
      this.getAudio.currentTime = this.getDuration * rate
    },
    clickDot: function () {
      let that = this
      let targetLeft = this.$refs['progress-bar'].offsetLeft
      let targetWidth = parseFloat(getComputedStyle(this.$refs['progress-bar']).width)
      document.documentElement.ontouchmove = function (e) {
        that.isDrag = true
        let offset = e.targetTouches[0].pageX - targetLeft
        let rate = offset / targetWidth
        that.initProgress(rate)
      }
      document.documentElement.ontouchend = function (e) {
        let offset = e.changedTouches[0].pageX - targetLeft
        let rate = offset / targetWidth
        that.getAudio.currentTime = that.getDuration * rate
        document.documentElement.ontouchend = null
        document.documentElement.ontouchmove = null
        that.isDrag = false
      }
    },
    prev: function () {
      this.setCurrentIndex(this.getCurrentIndex - 1)
    },
    next: function () {
      this.setCurrentIndex(this.getCurrentIndex + 1)
    },
    like: function () {
      this.setFavoriteList(this.getCurrentSong)
    },
    isFavoriteSong () {
      let flag = false
      let favoriteList = this.getFavoriteList
      favoriteList.forEach(value => {
        if (this.getCurrentSong.id === value.id) {
          flag = true
        }
      })
      return flag
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../../assets/css/variable";
  @import "../../../assets/css/mixin";
  .bottom {
    padding: 0 20px;
    box-sizing: border-box;
    margin-top: 30px;
    position: fixed;
    z-index: 666;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 200px;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left, .right {
        text-align: center;
        width: 80px;
        @include set_fontSize($font_small);
        color: rgba(255, 255, 255, 0.7);
      }
      .center {
        flex: 1;
        margin: 0 20px;
        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(0, 0, 0, .2);
          position: relative;
          .progress-line {
            width: 0;
            height: 100%;
            background: rgba(255, 255, 255, 0.8);
            position: relative;
            .progress-dot {
              background: rgba(255, 255, 255, 0.8);
              width: 20px;
              height: 20px;
              position: absolute;
              top: 50%;
              left: -10px;
              transform: translateY(-50%);
              border-radius: 50%;
            }
          }
        }
      }
    }
    .bottom-sta {
      padding-top: 40px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        width: 60px;
        height: 60px;
        &.loop {
          @include set_headerImg('./../../../assets/images/loop')
        }
        &.one {
          @include set_headerImg('./../../../assets/images/one')
        }
        &.random {
          @include set_headerImg('./../../../assets/images/shuffle')
        }
        &:nth-of-type(2) {
          @include set_headerImg('./../../../assets/images/prev')
        }
        &:nth-of-type(3) {
          width: 80px;
          height: 80px;
          @include set_headerImg('./../../../assets/images/play');
          &.active {
            @include set_headerImg('./../../../assets/images/pause');
          }
        }
        &:nth-of-type(4) {
          @include set_headerImg('./../../../assets/images/next')
        }
        &:nth-of-type(5) {
          @include set_headerImg('./../../../assets/images/un_favorite');
          &.active {
            @include set_headerImg('./../../../assets/images/favorite')
          }
        }
      }
    }
  }
</style>
