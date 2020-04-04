<template>
  <div class="loading" v-show="isShow">
    <div class="circle"></div>
    <p>{{ tip }}</p>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      tip: '正在加载中....',
      isShow: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./../../assets/css/mixin";
  @import "./../../assets/css/variable";
  .loading {
    z-index: 100000;
    position: fixed;
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 25px;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    text-align: center;
    .circle {
      margin-top: 45px;
      display: inline-block;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 5px solid #ffffff;
      border-left-color: skyblue;
      animation: rotate 1.5s linear 0s infinite;
    }
    p {
      text-align: center;
      color: #ffffff;
      @include set_fontSize($font_medium);
      padding-bottom: 10px;
      position: relative;
      top: -10px;
    }
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
