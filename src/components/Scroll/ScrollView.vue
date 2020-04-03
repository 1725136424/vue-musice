<template>
  <div id="wrapper" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'
export default {
  name: 'ScrollView',
  data () {
    return {
      isDrag: false
    }
  },
  mounted () {
    this.myScroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: false,
      probeType: 3,
      scrollY: true,
      scrollX: false,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true
    })

    // 监听子节点变化
    const Observe = new MutationObserver((mutations, observe) => {
      this.myScroll.refresh()
    })
    const observeOptions = {
      childList: true, // 观察目标子节点的变化，是否有添加或者删除
      subtree: true, // 观察后代节点，默认为 false
      attributes: true,
      attributeFilter: ['height', 'offsetHeight']
    }
    Observe.observe(this.$refs.wrapper, observeOptions)

    this.myScroll.on('scroll', () => {
      this.isDrag = true
    })

    this.myScroll.on('scrollEnd', () => {
      this.isDrag = false
    })
  },
  methods: {
    scrolling: function (fn) {
      this.myScroll.on('scroll', function () {
        fn(this.y)
      })
    },
    refresh () {
      setTimeout(() => this.myScroll.refresh(), 50)
    },
    scrollTo (x, y, time) {
      this.myScroll.scrollTo(x, y, time)
    }
  }
}
</script>

<style scoped lang="scss">
  #wrapper {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
</style>
