<template>
  <div class="playlist">
    <div class="top">
      {{ title }}
    </div>
    <ul class="bottom">
      <li v-for="value in playlists" :key="value.id" @click="skip(value.id)">
        <img v-lazy="value.picUrl" alt="">
        <p>{{ value.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Playlist',
  props: {
    playlists: {
      type: Array,
      default: () => [],
      require: true
    },
    title: {
      type: String,
      default: '',
      require: true
    },
    type: {
      type: String,
      default: '',
      require: true
    }
  },
  methods: {
    skip: function (id) {
      this.$emit('getDetails', id, this.type)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./../../assets/css/mixin";
  @import "./../../assets/css/variable";
  .playlist {
    width: 100%;
    @include set_font_color();
    @include set_sub_bgColor();
    .top {
      border-bottom: 1px solid #cccccc;
      width: 100%;
      height: 84px;
      line-height: 84px;
      padding-left: 20px;
      box-sizing: border-box;
      @include set_fontSize($font_medium);
      font-weight: bold;
    }
    .bottom {
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      li {
        padding: 20px 0;
        overflow: hidden;
        width: 200px;
        img {
          border-radius: 20px;
          width: 200px;
          height: 200px;
        }
        p {
          margin-top: 10px;
          @include set_font_color();
          @include set_fontSize($font_small);
          @include clamp(2);
        }
      }
    }
  }
</style>
