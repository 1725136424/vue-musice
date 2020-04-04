<template>
  <div class="singer">
    <ScrollView ref="scroll">
      <ul class="big-group">
        <li v-for="(value, index) in keys"
            :key="value" ref="group">
          <p class="title" ref="title">{{ value }}</p>
          <ul class="small-group">
            <li v-for="(item) in values[index]"
                :key="item.id"
                @click="skipDetail(item.id)">
              <img v-lazy="item.picUrl" alt="">
              <p>{{ item.name }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </ScrollView>
    <ul class="nav">
      <li v-for="(value, index) in keys"
          :key="value"
          @click="scrollUI(index)"
          :class="{'active': clickedIndex === index}">
        {{ value }}
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import ScrollView from './../components/Scroll/ScrollView'
import { getAllArtist } from '../api/networkClass'

export default {
  name: 'Singer',
  data () {
    return {
      keys: [],
      values: [],
      groupOffsetTop: [],
      clickedIndex: 0
    }
  },
  components: {
    ScrollView
  },
  methods: {
    scrollUI: function (index) {
      this.clickedIndex = index
      let currentTitle = this.$refs.title[this.clickedIndex]
      currentTitle.style.top = 0 + 'px'
      let scrollY = this.groupOffsetTop[index]
      this.$refs.scroll.scrollTo(0, -scrollY)
    },
    skipDetail: function (id) {
      this.$router.push(`/singer/detail/${id}/singer`)
    }
  },
  created () {
    getAllArtist()
      .then(res => {
        this.keys = res.key
        this.values = res.value
      })
      .catch(e => console.log(e))
  },
  watch: {
    values: function () {
      this.$nextTick(() => {
        this.$refs.group.forEach(value => {
          this.groupOffsetTop.push(value.offsetTop)
        })
        let currentTitle = this.$refs.title[this.clickedIndex]
        let titleHeight = currentTitle.offsetHeight
        this.$refs.scroll.scrolling((y) => {
          // 滚动和导航栏同步
          let offsetY = y
          if (offsetY >= 0) {
            this.clickedIndex = 0
            // 定位导航栏
            let currentTitle = this.$refs.title[this.clickedIndex]
            currentTitle.style.top = 0 + 'px'
          } else if (offsetY <= (this.$refs.scroll.myScroll.maxScrollY)) {
            this.clickedIndex = this.groupOffsetTop.length - 1
            let currentOffsetTop = this.groupOffsetTop[this.groupOffsetTop.length - 1]
            let currentTitle = this.$refs.title[this.groupOffsetTop.length - 1]
            currentTitle.style.top = -offsetY - currentOffsetTop + 'px'
          } else {
            for (let i = 0; i < this.groupOffsetTop.length; i++) {
              let currentScrollTop = -this.groupOffsetTop[i]
              let nextScrollTop
              if (i === this.groupOffsetTop.length - 1) {
                nextScrollTop = this.$refs.scroll.myScroll.maxScrollY
              } else {
                nextScrollTop = -this.groupOffsetTop[i + 1]
              }
              if (offsetY >= nextScrollTop && offsetY <= currentScrollTop) {
                this.clickedIndex = i
              }
              // 定位标题
              let currentTitle = this.$refs.title[this.clickedIndex]
              if (i === this.clickedIndex) {
                // 定位导航栏
                let currentOffsetTop = this.groupOffsetTop[this.clickedIndex]
                let currentOffsetHeight = this.groupOffsetTop[this.clickedIndex + 1]
                if (offsetY <= -currentOffsetHeight + titleHeight) {
                  currentTitle.style.top = currentOffsetHeight - titleHeight - currentOffsetTop + 'px'
                } else {
                  currentTitle.style.top = -offsetY - currentOffsetTop + 'px'
                }
              }
            }
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "./../assets/css/mixin";
  @import "./../assets/css/variable";
  .singer {
    position: fixed;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 0;
    .big-group {
      width: 100%;
      @include set_sub_bgColor();
      .title {
        position: relative;
        left: 0;
        top: 0;
        padding: 0 20px;
        box-sizing: border-box;
        width: 100%;
        line-height: 60px;
        @include set_fontSize($font_medium_s);
        @include set_bgColor();
        color: #ffffff;
      }
      .small-group {
        width: 100%;
        li {
          padding: 0 20px;
          box-sizing: border-box;
          width: 100%;
          height: 130px;
          display: flex;
          justify-content: start;
          align-items: center;
          img {
            border-radius: 50%;
            width: 80px;
            height: 80px;
            margin-right: 20px;
          }
          p {
            @include set_fontSize($font_medium_s);
            @include set_font_color()
          }
        }
      }
    }
    .nav {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      li {
        text-align: center;
        @include set_fontSize($font_small);
        @include set_font_color();
        margin: 5px 0;
        &.active {
          color: red;
        }
      }
    }
  }
</style>
