<template>
  <div class="header">
    <NormalHeader>
      <div class="left" slot="left" @click.stop="back"></div>
      <div class="center" slot="center">
        <p>{{ title }}</p>
      </div>
      <div class="right" slot="right"></div>
    </NormalHeader>
  </div>
</template>

<script>
import NormalHeader from './../Header'
export default {
  name: 'Header',
  methods: {
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
  },
  components: {
    NormalHeader
  }
}
</script>

<style scoped lang="scss">
  @import "./../../assets/css/variable";
  @import "./../../assets/css/mixin";
  .header {
    position: relative;
    z-index: 666;
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
