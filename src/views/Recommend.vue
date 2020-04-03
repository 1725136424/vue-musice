<template>
  <div class="recommend">
    <ScrollView>
      <Banner :banners="banner"></Banner>
      <Playlist :playlists="playlist" :title="'推荐歌单'" @getDetails="getDetail" :type="'playlist'"></Playlist>
      <Playlist :playlists="album" :title="'最新专辑'" @getDetails="getDetail" :type="'album'"></Playlist>
      <NewSong :newSongs="newSong"></NewSong>
    </ScrollView>
    <router-view></router-view>
  </div>
</template>

<script>
import Banner from '../components/Recommend/Banner'
import { getBanner, getPlaylist, getAlbum, getNewSong } from '../api/networkClass'
import Playlist from './../components/Recommend/Playlist'
import NewSong from './../components/Recommend/NewSong'
import ScrollView from './../components/Scroll/ScrollView'

export default {
  name: 'Recommend',
  created: function () {
    getBanner()
      .then(res => {
        this.banner = res.banners
      })
      .catch(e => console.log(e))
    getPlaylist()
      .then(res => {
        this.playlist = res.result
      })
      .catch(e => console.log(e))
    getAlbum()
      .then(res => {
        this.album = res.albums.splice(0, 6)
      })
      .catch(e => console.log(e))
    getNewSong()
      .then(res => {
        res.result.forEach(value => {
          let obj = {}
          obj.id = value.id
          obj.name = value.name
          obj.picUrl = value.picUrl
          let artist = ''
          value.song.artists.forEach((item, index) => {
            if (index === 0) {
              artist = item.name
            } else {
              artist += '-' + item.name
            }
          })
          obj.artist = artist
          this.newSong.push(obj)
        })
      })
      .catch(e => console.log(e))
  },
  data () {
    return {
      banner: [],
      playlist: [],
      album: [],
      newSong: []
    }
  },
  components: {
    Banner,
    Playlist,
    NewSong,
    ScrollView
  },
  methods: {
    getDetail (id, type) {
      this.$router.push('/recommend/detail/' + id + '/' + type)
    }
  }
}
</script>

<style scoped lang="scss">
  .recommend {
    position: absolute;
    left: 0;
    top: 184px;
    right: 0;
    bottom: 0;
  }
  .v-enter{
    transform: translateX(100%);
    opacity: 0.5;
  }
  .v-enter-to{
    transform: translateX(0%);
    opacity: 1;
  }
  .v-enter-active{
    transition: all 1s;
  }
  .v-leave {
    transform: translateX(0%);
    opacity: 1;
  }
  .v-leave-to {
    transform: translateX(100%);
    opacity: 0.5;
  }
  .v-leave-active {
    transition: all 1s;
  }
</style>
