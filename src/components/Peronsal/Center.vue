<template>
    <div class="center">
      <div class="center-top" @click="playAll">
        <span>
          <i></i>
          播放全部
        </span>
      </div>
      <div class="center-bottom">
        <ScrollView>
          <Item :item="currentSong"></Item>
        </ScrollView>
      </div>
    </div>
</template>

<script>
import Item from './../../components/Recommend/SongItem'
import ScrollView from './../../components/Scroll/ScrollView'
import { mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Center',
  components: {
    Item,
    ScrollView
  },
  methods: {
    ...mapMutations([
      'SET_SONGS'
    ]),
    ...mapActions([
      'setIsNormalPlay'
    ]),
    playAll: function () {
      if (this.currentSong.length !== 0) {
        this.setIsNormalPlay(true)
        this.SET_SONGS(this.currentSong)
      }
    }
  },
  computed: {
    ...mapGetters([
      'getIsNormalPlay'
    ])
  },
  props: {
    currentSong: {
      type: Array,
      default: () => [],
      require: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "./../../assets/css/variable";
@import "./../../assets/css/mixin";
  .center {
    position: fixed;
    left: 0;
    top: 100px;
    bottom: 0;
    right: 0;
    .center-top {
      width: 100%;
      height: 100px;
      text-align: center;
      line-height: 100px;
      span {
        border: 1px solid;
        @include set_border_color();
        border-radius: 20px;
        padding: 15px 30px;
        @include set_fontSize($font_small);
        @include set_font_color();
        i {
          position: relative;
          top: 10px;
          width: 40px;
          height: 40px;
          display: inline-block;
          @include set_headerImg('./../../assets/images/small_play');
          margin-right: 10px;
        }
      }
    }
    .center-bottom {
      position: fixed;
      top: 200px;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
</style>
