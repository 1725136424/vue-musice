<template>
  <ul class="bottom">
    <li  v-for="value in item" :key="value.id" @click="showNormalPlayer(value.id)">
      <div class="left">
        <img v-lazy="value.picUrl" alt="">
      </div>
      <div class="right">
        <p class="name">{{ value.name }}</p>
        <p class="artist">{{ value.artist }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SongItem',
  methods: {
    ...mapActions([
      'setIsNormalPlay',
      'setSongs'
    ]),
    showNormalPlayer: function (id) {
      this.setIsNormalPlay(true)
      this.setSongs([id])
    }
  },
  props: {
    item: {
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
  .bottom {
    width: 100%;
    li {
      border-bottom: 1px solid #cccccc;
      padding-left: 35px;
      box-sizing: border-box;
      width: 100%;
      height: 200px;
      display: flex;
      justify-content: start;
      align-items: center;
      .left {
        width: 150px;
        img {
          width: 100%;
          border-radius: 20px;
        }
      }
      .right {
        flex: 1;
        margin-left: 20px;
        .name {
          line-height: 50px;
          @include set_fontSize($font_medium_s)
        }
        .artist {
          line-height: 50px;
          opacity: 0.7;
          @include set_fontSize($font_small);
          i {
            font-style: normal;
          }
        }
      }
    }
  }
</style>
