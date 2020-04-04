<template>
    <div class="header">
      <Header>
        <div class="header-left" slot="left"></div>
        <div class="header-center" slot="center">
          知播渔音乐
        </div>
        <div class="header-right" @click="skipPersonal" slot="right"></div>
      </Header>
    </div>
</template>

<script>
import Header from './Header'
export default {
  name: 'MainHeader',
  components: {
    Header
  },
  methods: {
    skipPersonal () {
      this.$router.push('/personal')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./../assets/css/variable";
  @import "./../assets/css/mixin";
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
</style>
