<template>
    <div class="header" @click="toggleTheme">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="center">
        <slot name="center"></slot>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Header',
  data: function () {
    return {
      themes: ['theme1', 'theme2', 'theme3'],
      index: 0
    }
  },
  methods: {
    toggleTheme: function () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./../assets/css/variable";
  @import "./../assets/css/mixin";
  .header {
    width: 100%;
    height: 100px;
    @include set_bgColor();
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left, .right {
      width: 84px;
      height: 84px;
      *{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
