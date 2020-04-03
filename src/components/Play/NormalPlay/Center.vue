<template>
  <div class="center">
    <swiper :options="swiperOption" class="wrapper">
      <swiper-slide class="first">
        <div class="pic" ref="pic" :class="{'active': getIsPlaying}">
          <img alt="" :src="picUrl">
        </div>
        <div class="desc">{{ getFirstLyric }}</div>
      </swiper-slide>
      <swiper-slide class="second">
        <div class="lyric-wrapper">
          <ScrollView ref="scroll">
            <ul>
              <li ref="lyric-li" v-for="(value, key) in lyric"
                  :key="key"
                  :class="{'active': current === key}">
                {{ value }}
              </li>
            </ul>
          </ScrollView>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { mapGetters } from 'vuex'
import ScrollView from '../../Scroll/ScrollView'
export default {
  name: 'Center',
  components: {
    Swiper,
    SwiperSlide,
    ScrollView
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true, // 允许点击小圆点跳转
          bulletClass: 'lyric-bullet', // 需设置.my-bullet样式
          bulletActiveClass: 'lyric-bullet-active'
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      },
      timer: null,
      width: 5,
      height: 5,
      scaleTarget: 1.7,
      current: '0',
      lyricUIHeight: 0,
      lyricHeight: 0
    }
  },
  methods: {
    refreshIScroll () {
      this.$refs.scroll.refresh()
    }
  },
  computed: {
    ...mapGetters([
      'getIsPlaying',
      'getCurrentTime',
      'getIsNormalPlay'
    ]),
    getFirstLyric () {
      let first
      for (let key in this.lyric) {
        first = this.lyric[key]
        break
      }
      return first
    }
  },
  watch: {
    getCurrentTime: function (newValue, oldValue) {
      let parseTime = Math.floor(newValue) + ''
      if (this.current !== parseTime) {
        for (let key in this.lyric) {
          if (parseInt(key + '') <= parseInt(parseTime)) {
            if (key === parseTime) {
              this.current = parseTime
              break
            }
          }
        }
      }
      if (!this.$refs.scroll.isDrag) {
        let top = document.querySelector('li.active').offsetTop
        if (top >= this.lyricUIHeight / 2 - this.lyricHeight) {
          let offset = this.lyricUIHeight / 2 - this.lyricHeight - top
          this.$refs.scroll.scrollTo(0, (offset), 200)
        } else {
          this.$refs.scroll.scrollTo(0, 0, 200)
        }
      }
    },
    getIsNormalPlay: function (newValue, oldValue) {
      if (newValue) {
        setTimeout(() => {
          this.lyricHeight = parseFloat(getComputedStyle(this.$refs['lyric-li'][0]).height)
          this.lyricUIHeight = parseFloat(getComputedStyle(this.$refs.scroll.$el).height)
        }, 500)
      }
    }
  },
  props: {
    picUrl: {
      type: String,
      default: '',
      require: true
    },
    lyric: {
      type: Object,
      value: () => {},
      require: true
    }
  },
  mounted () {
    // 处理宽高比超过一定限度后图片太大，导致布局变形
    const pageWidth = document.documentElement.offsetWidth
    const pageHeight = document.documentElement.offsetHeight
    const rate = pageHeight / pageWidth
    if (rate < this.scaleTarget) {
      const offsetRate = 1 - (this.scaleTarget - rate)
      this.width *= offsetRate
      this.height *= offsetRate
    }
    this.$refs.pic.style.width = this.width + 'rem'
    this.$refs.pic.style.height = this.height + 'rem'
  }
}
</script>

<style scoped lang="scss">
  @import "../../../assets/css/variable";
  @import "../../../assets/css/mixin";
  .center {
    position: absolute;
    top: 1.5rem;
    bottom: 3rem;
    left: 0;
    right: 0;
    .wrapper {
      width: 100%;
      height: 100%;
      .first {
        width: 100%;
        height: 100%;
        .pic {
          margin: 40px auto;
          border-radius: 50%;
          border: 20px solid #ffffff;
          overflow: hidden;
          animation: rotate 4s linear 0s infinite;
          animation-play-state: paused;
          &.active {
            animation-play-state: running;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
        .desc {
          padding-top: 30px;
          text-align: center;
          @include no_wrap();
          @include set_fontSize($font_small);
          color: rgba(255, 255, 255, 0.7);
        }
      }
      .second {
        .lyric-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 100px;
          right: 0;
          ul {
            padding-bottom: 420px;
            li {
              line-height: 70px;
              text-align: center;
              @include set_fontSize($font_medium_s);
              color: rgba(255, 255, 255, 0.5);
              &.active {
                color: #ffffff;
              }
            }
          }

        }
      }
    }
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    } to {
      transform: rotate(360deg);
    }
  }
</style>

<style lang="scss">
  @import "../../../assets/css/mixin";
  @import "../../../assets/css/variable";
  .lyric-bullet {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: #ffffff;
    border-radius: 50%;
    margin-right: 20px;
  }
  .lyric-bullet-active {
    width: 50px;
    @include set_bgColor();
    border-radius: 10px;
  }
</style>
