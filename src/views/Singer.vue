<template>
  <div class="singer">
    <ScrollView>
    </ScrollView>
  </div>
</template>

<script>
import ScrollView from './../components/Scroll/ScrollView'
export default {
  name: 'Singer',
  components: {
    ScrollView
  }
}
</script>

<style scoped lang="scss">
  .singer {
    position: fixed;
    top: 184px;
    left: 0;
    right: 0;
    bottom: 0;
    background: red;
  }
</style>
