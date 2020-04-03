import {
  SET_IS_PLAY,
  SET_IS_MINI_PLAY,
  SET_IS_LIST_PLAY,
  SET_IS_PLAYING,
  SET_MODEL_TYPE,
  SET_SONGS,
  SET_AUDIO,
  SET_DURATION,
  SET_CURRENT_TIME,
  SET_CURRENT_INDEX, SET_FAVORITE_LIST, SET_LISTED_MUSIC
} from './mutations-type'
import { getSongs } from '../api/networkClass'

export default {
  setIsNormalPlay ({ commit }, flag) {
    commit(SET_IS_PLAY, flag)
    commit(SET_IS_MINI_PLAY, !flag)
  },
  setIsMiniPlay ({ commit }, flag) {
    if (flag === 'all') {
      commit(SET_IS_MINI_PLAY, false)
      commit(SET_IS_LIST_PLAY, false)
    } else {
      commit(SET_IS_MINI_PLAY, flag)
      commit(SET_IS_PLAY, !flag)
    }
  },
  setIsListPlay ({ commit }, flag) {
    commit(SET_IS_LIST_PLAY, flag)
  },
  setIsPlaying ({ commit }, flag) {
    commit(SET_IS_PLAYING, flag)
  },
  setModelType ({ commit }, value) {
    commit(SET_MODEL_TYPE, value)
  },
  async setSongs ({ commit }, id) {
    const res = await getSongs(id.join(','))
    // 处理获取的数据
    const songsArray = res.songs
    let objArray = []
    songsArray.forEach(value => {
      let obj = {}
      obj.name = value.name
      let artist = ''
      value.ar.forEach((v, i) => {
        if (i === 0) {
          artist += v.name
        } else {
          artist += '-' + v.name
        }
      })
      obj.artist = artist
      obj.picUrl = value.al.picUrl
      obj.id = value.id
      objArray.push(obj)
    })
    commit(SET_SONGS, objArray)
  },
  setAudio ({ commit }, audio) {
    commit(SET_AUDIO, audio)
  },
  setCurrentTime ({ commit }, time) {
    commit(SET_CURRENT_TIME, time)
  },
  setDuration ({ commit }, value) {
    commit(SET_DURATION, value)
  },
  setCurrentIndex ({ commit }, index) {
    commit(SET_CURRENT_INDEX, index)
  },
  setFavoriteList ({ commit }, song) {
    commit(SET_FAVORITE_LIST, song)
  },
  setListedMusic ({ commit }, song) {
    commit(SET_LISTED_MUSIC, song)
  }
}
