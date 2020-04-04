<template>
  <div class="header">
    <NormalHeader>
      <div class="header-left" @click.stop="back" slot="left"></div>
      <div class="header-center" slot="center">
        <span @click.stop="like(1)" :class="{'active' : active === 1}">我喜欢的</span>
        <span @click.stop="listed(2)" :class="{'active' : active === 2}">最近听的</span>
      </div>
      <div class="header-right" slot="right"></div>
    </NormalHeader>
  </div>
</template>

<script>
import NormalHeader from './../Header'
export default {
  name: 'Header',
  data: function () {
    return {
      active: 1
    }
  },
  methods: {
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
  },
  components: {
    NormalHeader
  }
}
</script>

<style scoped lang="scss">
  @import "./../../assets/css/variable";
  @import "./../../assets/css/mixin";
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
</style>
