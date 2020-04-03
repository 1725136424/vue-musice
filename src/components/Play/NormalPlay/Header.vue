<template>
  <div class="header">
    <div class="left" @click="hiddenPlay">
    </div>
    <div class="right">
      <p class="title">{{ desc.name }}</p>
      <p class="artist">{{ desc.artist }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Header',
  methods: {
    ...mapActions([
      'setIsNormalPlay',
      'setIsMiniPlay'
    ]),
    hiddenPlay: function () {
      this.setIsMiniPlay(true)
    }
  },
  props: {
    desc: {
      type: Object,
      value: () => {},
      require: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../../assets/css/variable";
  @import "../../../assets/css/mixin";
  .header {
    position: relative;
    z-index: 666;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: start;
    align-items: center;
    .left {
      width: 84px;
      height: 84px;
      @include set_headerImg('./../../../assets/images/down');
    }
    .right {
      flex: 1;
      text-align: center;
      color: #ffffff;
      .title {
        width: 90%;
        @include set_fontSize($font_medium_s)
      }
      .artist {
        opacity: 0.7;
        width: 90%;
        @include set_fontSize($font_small)
      }
    }
  }
</style>
