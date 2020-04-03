<template>
  <transition appear>
    <div class="detail">
      <Header :title="title"></Header>
      <Center :picUrl="picUrl" ref="pic"></Center>
      <div class="bottom-wrapper">
        <ScrollView ref="scrollView">
          <Bottom :music="musicDetail"></Bottom>
        </ScrollView>
      </div>
    </div>
  </transition>
</template>

<script>
import { getMusicDetail } from '../api/networkClass'
import Header from './../components/Detail/Header'
import Center from './../components/Detail/Center'
import Bottom from './../components/Detail/Bottom'
import ScrollView from './../components/Scroll/ScrollView'
export default {
  name: 'Detail',
  created () {
    const id = this.$route.params.id
    const type = this.$route.params.type
    const url = this.urlPath[type]
    getMusicDetail(url, { id: id })
      .then(res => {
        if (type === 'album') {
          this.musicDetail = res.songs
          this.title = res.album.name
          this.picUrl = res.album.blurPicUrl
        } else if (type === 'playlist') {
          this.musicDetail = res.playlist.tracks
          this.title = res.playlist.name
          this.picUrl = res.playlist.coverImgUrl
        } else if ((type === 'singer')) {
          this.musicDetail = res.hotSongs
          this.title = res.artist.name
          this.picUrl = res.artist.picUrl
        }
      })
      .catch(e => console.log(e))
  },
  components: {
    Header,
    Center,
    Bottom,
    ScrollView
  },
  data () {
    return {
      musicDetail: [],
      title: '',
      picUrl: '',
      urlPath: {
        playlist: 'playlist/detail',
        album: 'album',
        singer: 'artists'
      }
    }
  },
  mounted () {
    const height = this.$refs.pic.$el.offsetHeight
    this.$refs.scrollView.scrolling((y) => {
      if (y > 0) {
        const scale = Math.abs(1 + (y / height))
        this.$refs.pic.$el.style.transform = `scale(${scale})`
      } else {
        const rate = y / -600
        this.$refs.pic.changeMask(rate)
      }
    })
  }
}
</script>

<style scoped lang="scss">
  .detail {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #ffffff;
  }
</style>
