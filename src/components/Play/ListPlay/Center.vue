<template>
    <div class="center">
      <ScrollView ref="scroll">
        <ul>
          <li class="item"
              v-for="(value, index) in songs"
              :key="value.id" @click="changeIndex(index)">
            <div class="left">
              <div class="play" @click="play"
                   :class="{'active': getIsPlaying}" v-if="getCurrentIndex === index"></div>
              <div class="desc">{{ value.name }}</div>
            </div>
            <div class="right">
              <div class="favorite" @click.stop="like(value)" :class="{'active' : isFavoriteSong(value)}"></div>
              <div class="close" @click.stop="del(index)"></div>
            </div>
          </li>
        </ul>
      </ScrollView>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ScrollView from './../../../components/Scroll/ScrollView'
export default {
  name: 'Center',
  components: {
    ScrollView
  },
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setCurrentIndex',
      'setFavoriteList'
    ]),
    refreshIScroll: function () {
      this.$refs.scroll.refresh()
    },
    play: function () {
      this.setIsPlaying(!this.getIsPlaying)
    },
    changeIndex: function (index) {
      this.setCurrentIndex(index)
    },
    del: function (index) {
      if (index < this.getCurrentIndex) {
        this.setCurrentIndex(this.getCurrentIndex - 1)
      }
      this.getSongs.splice(index, 1)
    },
    like: function (currentSong) {
      this.setFavoriteList(currentSong)
    },
    isFavoriteSong (currentSong) {
      let flag = false
      this.getFavoriteList.forEach(value => {
        if (currentSong.id === value.id) {
          flag = true
        }
      })
      return flag
    }
  },
  computed: {
    ...mapGetters([
      'getIsPlaying',
      'getCurrentIndex',
      'getSongs',
      'getFavoriteList',
      'getCurrentSong'
    ])
  },
  props: {
    songs: {
      type: Array,
      default: () => [],
      require: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./../../../assets/css/variable";
  @import "./../../../assets/css/mixin";
  .center {
    @include set_sub_bgColor();
    position: relative;
    width: 100%;
    height: 700px;
    background: red;
      li {
        padding: 0 20px;
        box-sizing: border-box;
        width: 100%;
        height: 100px;
        border-bottom: 1px solid #cccccc;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include set_font_color();
        .left {
          display: flex;
          align-items: center;
          .play {
            width: 54px;
            height: 54px;
            @include set_headerImg('./../../../assets/images/small_play');
            margin-right: 20px;
            &.active {
              @include set_headerImg('./../../../assets/images/small_pause');
            }
          }
          .desc {
            @include set_font_color();
            @include set_fontSize($font_small);
          }
        }
        .right {
          display: flex;
          align-items: center;
          .favorite {
            width: 54px;
            height: 54px;
            @include set_headerImg('./../../../assets/images/small_un_favorite');
            margin-right: 20px;
            &.active {
              @include set_headerImg('./../../../assets/images/small_favorite');
            }
          }
          .close {
            width: 45px;
            height: 45px;
            @include set_headerImg('./../../../assets/images/small_close');
          }
        }
    }
  }
</style>
