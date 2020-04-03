<template>
  <div class="header" @click="toggleTheme">
    <div class="left" @click.stop="back"></div>
    <div class="center">
      <p>{{ title }}</p>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      index: 0,
      themes: ['theme1', 'theme2', 'theme3']
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
    back () {
      this.$router.back()
    }
  },
  props: {
    title: {
      type: String,
      default: '',
      require: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./../../assets/css/variable";
  @import "./../../assets/css/mixin";
  .header {
    position: relative;
    z-index: 666;
    width: 100%;
    height: 100px;
    @include set_bgColor();
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left, .right {
      width: 84px;
      height: 84px;
      background: black;
    }
    .left {
      @include set_headerImg("./../../assets/images/back");
    }
    .right {
      @include set_headerImg("./../../assets/images/more");
    }
    .center {
      margin: 0 30px;
      width: 500px;
      p {
        text-align: center;
        @include set_fontSize($font_medium_s);
        color: #ffffff;
        @include no_wrap();
      }
    }
  }
</style>
