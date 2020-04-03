<template>
  <div class="bottom" @click="hiddenList">
    关闭
  </div>
</template>

<script>
export default {
  name: 'Bottom',
  methods: {
    hiddenList: function () {
      this.$emit('hiddenList')
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./../../../assets/css/variable";
  @import "./../../../assets/css/mixin";
  .bottom {
    width: 100%;
    height: 100px;
    @include set_bgColor();
    text-align: center;
    line-height: 100px;
    color: #ffffff;
    @include set_fontSize($font_medium_s);
  }
</style>
