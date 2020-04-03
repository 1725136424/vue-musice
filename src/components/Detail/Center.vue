<template>
    <div class="center">
      <img :src="picUrl" alt="">
      <div class="mask" ref="mask"></div>
    </div>
</template>

<script>
export default {
  name: 'Center',
  props: {
    picUrl: {
      type: String,
      default: '',
      require: true
    }
  },
  methods: {
    changeMask (rate) {
      if (rate >= 0.6) return
      this.$refs.mask.style.opacity = rate
    }
  }
}
</script>

<style scoped lang="scss">
  .center {
    width: 100%;
    height: 400px;
    position: relative;
    img {
      width: 100%;
    }
    .mask {
      position: absolute;
      width: 100%;
      height: 800px;
      left: 0;
      top: 0;
      background: rgb(0, 0, 0);
      opacity: 0;
    }
  }
</style>
