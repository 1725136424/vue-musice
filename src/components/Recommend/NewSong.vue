<template>
  <div class="newSong">
    <div class="top">
      <p>最新音乐</p>
    </div>
    <Item :item="newSongs"></Item>
  </div>
</template>

<script>
import Item from './SongItem'
export default {
  name: 'NewSong',
  components: {
    Item
  },
  props: {
    newSongs: {
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
  .newSong {
    width: 100%;
    @include set_font_color();
    @include set_sub_bgColor();
    .top {
      border-bottom: 1px solid #cccccc;
      width: 100%;
      height: 84px;
      padding-left: 20px;
      box-sizing: border-box;
      p {
        @include set_fontSize($font_medium);
        font-weight: bold;
        line-height: 84px;
      }
    }
  }
</style>
