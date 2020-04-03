<template>
    <div class="header" @click="toggleTheme">
      <div class="header-left"></div>
      <div class="header-center">
        知播渔音乐
      </div>
      <div class="header-right" @click.stop="skipPersonal"></div>
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
    },
    skipPersonal () {
      this.$router.push('/personal')
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
    .header-left, .header-right {
      width: 84px;
      height: 84px;
    }
    .header-left {
      @include set_headerImg('./../assets/images/logo')
    }
    .header-right {
      @include set_headerImg('./../assets/images/account')
    }
    .header-center {
      flex: 1;
      margin: 0 30px;
      height: 100%;
      text-align: center;
      line-height: 100px;
      @include set_fontSize($font_medium_s);
      color: #ffffff;
      font-weight: bold;
    }
  }
</style>
