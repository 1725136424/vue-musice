<template>
  <div class="banner">
    <swiper id="swiper" ref="mySwiper" :options="swiperOptions" v-if="banners.length > 0">
      <swiper-slide class="swiper-slide" v-for="value in banners" :key="value.bannerId">
        <a :href="value.url">
          <img :src="value.pic"  alt="">
        </a>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'Banner',
  data () {
    return {
      swiperOptions: {
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: true
        },
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  props: {
    // 检测类型 + 其他验证
    banners: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  }
}
</script>

<style scoped lang="scss">
  .swiper-slide {
    img {
      width: 100%;
      height: 300px;
    }
  }
</style>

<style lang="scss">
  @import "./../../assets/css/mixin";
  .swiper-pagination-bullet {
    width: 18px;
    height: 18px;
    background: #ffffff;
  }
  .swiper-pagination-bullet-active {
    @include set_bgColor
  }
</style>
