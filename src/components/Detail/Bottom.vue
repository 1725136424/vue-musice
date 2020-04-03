<template>
    <div class="bottom">
      <div class="bottom-top" @click="playAll">
        <div class="icon"></div>
        <span>播放全部</span>
      </div>
      <ul class="bottom-center">
        <li v-for="value in music" :key="value.id" @click="showPlay(value.id)">
          <div class="right">
            <p class="name">{{ value.name }}</p>
            <p class="artist">{{ value.name }} - {{ value.ar[0].name }}</p>
            <p></p>
          </div>
        </li>
      </ul>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Bottom',
  props: {
    music: {
      type: Array,
      default: () => [],
      require: true
    }
  },
  methods: {
    ...mapActions([
      'setIsNormalPlay',
      'setIsMiniPlay',
      'setSongs'
    ]),
    showPlay: function (id) {
      // 获取网络数据
      this.setSongs([id])
      this.setIsNormalPlay(true)
    },
    playAll: function () {
      // 播放全部
      let ids = []
      this.music.forEach(value => {
        ids.push(value.id)
      })
      this.setIsNormalPlay(true)
      this.setSongs(ids)
    }
  },
  computed: {
    ...mapGetters([
      'getIsMiniPlay'
    ])
  }
}
</script>

<style scoped lang="scss">
  @import "./../../assets/css/variable";
  @import "./../../assets/css/mixin";
  .bottom {
    padding-bottom: 500px;
    position: relative;
    top: 500px;
    left: 0;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    width: 100%;
    @include set_sub_bgColor();
    .bottom-top {
      @include set_font_color();
      @include set_fontSize($font_medium_s);
      box-sizing: border-box;
      padding-left: 20px;
      width: 100%;
      height: 120px;
      border-bottom: 1px solid #cccccc;
      display: flex;
      align-items: center;
      justify-content: start;
      font-weight: bold;
      .icon {
        width: 60px;
        height: 60px;
        @include set_headerImg('./../../assets/images/small_play');
        margin-right: 20px;
      }
    }
    .bottom-center {
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      li {
        border-bottom: 1px solid #cccccc;
        @include set_font_color();
        width: 100%;
        height: 120px;
        display: flex;
        justify-content: start;
        align-items: center;
        .right {
          margin-right: 20px;
          flex: 1;
          .name {
            @include set_fontSize($font_medium_s);
          }
          .artist {
            opacity: 0.6;
            @include set_fontSize($font_small)
          }
        }
      }
    }
  }
</style>
