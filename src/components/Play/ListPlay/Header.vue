<template>
  <div class="header">
    <div class="left">
      <div class="model" @click.stop="changeModel"
           :class="{'loop': this.getModelType === modelType.loop,
           'one': this.getModelType === modelType.one,
           'random': this.getModelType === modelType.random}"></div>
      <p v-show="this.getModelType === modelType.loop">列表播放</p>
      <p v-show="this.getModelType === modelType.one">单曲播放</p>
      <p v-show="this.getModelType === modelType.random">随机播放</p>
    </div>
    <div class="right">
      <div class="del" @click.stop="clear"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import modelType from './../../../store/model-type'
export default {
  name: 'Header',
  data () {
    return {
      modelType: modelType
    }
  },
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModelType',
      'setIsMiniPlay'
    ]),
    changeModel: function () {
      // 改变播放模式
      if (this.getModelType === modelType.loop) {
        this.setModelType(modelType.one)
      } else if (this.getModelType === modelType.one) {
        this.setModelType(modelType.random)
      } else if (this.getModelType === modelType.random) {
        this.setModelType(modelType.loop)
      }
    },
    clear: function () {
      this.getSongs.splice(0, this.getSongs.length)
    }
  },
  computed: {
    ...mapGetters([
      'getModelType',
      'getSongs'
    ])
  },
  watch: {
    getSongs: function (newValue, oldValue) {
      if (newValue.length === 0) {
        window.history.back()
        this.setIsMiniPlay('all')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./../../../assets/css/variable";
  @import "./../../../assets/css/mixin";
  .header {
    border-bottom: 1px solid #cccccc;
    padding: 0 20px;
    box-sizing: border-box;
    @include set_sub_bgColor();
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .model {
        width: 60px;
        height: 60px;
        &.loop {
          @include set_headerImg('./../../../assets/images/small_loop');
        }
        &.one {
          @include set_headerImg('./../../../assets/images/small_one');
        }
        &.random {
          @include set_headerImg('./../../../assets/images/small_shuffle');
        }
        margin-right: 20px;
      }
      p {
        @include set_font_color();
        @include set_fontSize($font_small)
      }
    }
    .right {
      .del {
        width: 80px;
        height: 80px;
        @include set_headerImg('./../../../assets/images/small_del');
      }
    }
  }
</style>
