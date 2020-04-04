<template>
    <div class="play">
      <NormalPlay :currentSong="getCurrentSong"
                  :lyric="lyric"></NormalPlay>
      <MiniPlay :currentSong="getCurrentSong"></MiniPlay>
      <ListPlay></ListPlay>
      <audio :src="this.songUrl"
             ref="audio"
             @timeupdate="timeupdate" @ended="end"></audio>
    </div>
</template>

<script>
import NormalPlay from './../components/Play/NormalPlay/NormalPly'
import MiniPlay from './../components/Play/MiniPlay/MiniPlay'
import ListPlay from './../components/Play/ListPlay/ListPlay'
import { getLyric, getSongUrl } from './../api/networkClass'
import { mapGetters, mapActions } from 'vuex'
import { formatLyric, getRandomIntInclusive } from '../tools/tools'
import modelType from './../store/model-type'

export default {
  name: 'Play',
  data () {
    return {
      songUrl: '',
      lyric: {}
    }
  },
  components: {
    NormalPlay,
    MiniPlay,
    ListPlay
  },
  methods: {
    ...mapActions([
      'setAudio',
      'setDuration',
      'setCurrentTime',
      'setCurrentIndex',
      'setFavoriteList',
      'setListedMusic'
    ]),
    showList: function () {
      this.$refs.listPlay.isShow = true
    },
    timeupdate: function () {
      this.setCurrentTime(this.getAudio.currentTime)
    },
    end: function () {
      if (this.getModelType === modelType.loop) {
        this.setCurrentIndex(this.getCurrentIndex + 1)
      } else if (this.getModelType === modelType.one) {
        this.getAudio.play()
      } else if (this.getModelType === modelType.random) {
        let index
        for (; ;) {
          let random = getRandomIntInclusive(0, this.getSongs.length - 1)
          if (this.getCurrentIndex !== random) {
            index = random
            break
          }
        }
        console.log(index)
        this.setCurrentIndex(index)
      }
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentSong',
      'getIsPlaying',
      'getAudio',
      'getModelType',
      'getCurrentIndex',
      'getSongs',
      'getFavoriteList',
      'getListedMusic'
    ])
  },
  mounted: function () {
    this.setAudio(this.$refs.audio)
  },
  created: function () {
    let playList = JSON.parse(localStorage.getItem('playHistory'))
    if (playList) {
      playList.forEach(value => {
        this.getSongs.unshift(value)
      })
    }
    let favoriteList = JSON.parse(localStorage.getItem('favoriteList'))
    if (favoriteList) {
      favoriteList.forEach(value => {
        this.setFavoriteList(value)
      })
    }
    let listedList = JSON.parse(localStorage.getItem('listedList'))
    if (listedList) {
      listedList.forEach(value => {
        this.setListedMusic(value)
      })
    }
  },
  watch: {
    getCurrentSong: function (newValue, oldValue) {
      // 获取歌曲播放地址
      getSongUrl(newValue.id)
        .then((res) => {
          this.songUrl = res.data[0].url
          let that = this
          this.getAudio.onloadedmetadata = function () {
            that.setDuration(this.duration)
          }
        })
        .catch(e => console.log(e))

      // 获取歌词信息
      getLyric(newValue.id)
        .then((res) => {
          let lyric
          try {
            lyric = res.lrc.lyric
          } catch (e) {
          }
          if (lyric) {
            this.lyric = formatLyric(lyric)
          } else {
            this.lyric = {
              0: '没有歌词'
            }
          }
        })
        .catch(e => console.log(e))

      if (this.getIsPlaying) {
        this.getAudio.ondurationchange = function () {
          this.play()
        }
        // 保存最近音乐
        this.setListedMusic(newValue)
      } else {
        this.getAudio.ondurationchange = null
      }
    },
    getIsPlaying: function (newValue, oldValue) {
      if (newValue) {
        this.getAudio.play()
        // 保存最近音乐
        this.setListedMusic(this.getCurrentSong)
      } else {
        this.getAudio.pause()
      }
    },
    getSongs: function (newValue, oldValue) {
      let parseArray = JSON.stringify(newValue)
      localStorage.setItem('playHistory', parseArray)
    },
    getFavoriteList: function (newValue, oldValue) {
      let parseArray = JSON.stringify(newValue)
      localStorage.setItem('favoriteList', parseArray)
    },
    getListedMusic: function (newValue, oldValue) {
      let parseArray = JSON.stringify(newValue)
      localStorage.setItem('listedList', parseArray)
    }
  }
}
</script>

<style scoped lang="scss">
  .play {
    width: 100%;
    height: 100%;
    background: red;
  }
</style>
