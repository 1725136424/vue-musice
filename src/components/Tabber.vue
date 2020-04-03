<template>
  <ul class="tab">
    <router-link tag="li" to="/recommend">
      <span>推荐</span>
    </router-link>
    <router-link tag="li" to="/singer">
      <span>歌手</span>
    </router-link>
    <router-link tag="li" to="/rank">
      <span>排行</span>
    </router-link>
    <router-link tag="li" to="search">
      <span>搜索</span>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: 'Tabber'
}
</script>

<style scoped lang="scss">
  @import "./../assets/css/variable";
  @import "./../assets/css/mixin";
  .tab {
    width: 100%;
    height: 84px;
    background: #ffffff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    @include set_sub_bgColor();
    @include set_font_color();
    li {
      span {
        @include set_fontSize($font_small);
        padding: 20px 10px;
      }
      &.router-link-active {
        span {
          border-bottom: 4px solid red;
          @include set_border_color();
          @include set-active_font_color();
        }
      }
    }
  }
</style>
