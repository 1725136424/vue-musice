<template>
  <div class="header" @click="toggleTheme">
    <div class="header-left" @click.stop="back"></div>
    <div class="header-center">
      <span @click.stop="like(1)" :class="{'active' : active === 1}">我喜欢的</span>
      <span @click.stop="listed(2)" :class="{'active' : active === 2}">最近听的</span>
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
      index: 0,
      active: 1
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
    },
    back: function () {
      this.$router.go(-1)
    },
    like: function (id) {
      this.$emit('selectedUI', id)
      this.active = id
    },
    listed: function (id) {
      this.$emit('selectedUI', id)
      this.active = id
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./../../assets/css/variable";
  @import "./../../assets/css/mixin";
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
      @include set_headerImg('./../../assets/images/back')
    }
    .header-right {
      @include set_headerImg('./../../assets/images/more')
    }
    .header-center {
      flex: 1;
      text-align: center;
      span {
        padding: 20px;
        border: 1px solid rgba(255, 255, 255, 0.7);
        @include set_fontSize($font_small);
        color: #ffffff;
        &:nth-of-type(1) {
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
        }
        &:nth-of-type(2) {
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
        }
        &.active {
          background: rgba(0, 0, 0, 0.3);
        }
      }
    }
  }
</style>
