import {
  SET_IS_PLAY,
  SET_IS_MINI_PLAY,
  SET_IS_LIST_PLAY,
  SET_SONGS,
  SET_IS_PLAYING,
  SET_MODEL_TYPE,
  SET_AUDIO,
  SET_DURATION,
  SET_CURRENT_TIME,
  SET_CURRENT_INDEX,
  SET_FAVORITE_LIST, SET_LISTED_MUSIC
} from './mutations-type'

export default {
  [SET_IS_PLAY] (state, flag) {
    state.isNormalPlay = flag
  },
  [SET_IS_MINI_PLAY] (state, flag) {
    state.isMiniPlay = flag
  },
  [SET_IS_LIST_PLAY] (state, flag) {
    state.isListPlay = flag
  },
  [SET_IS_PLAYING] (state, flag) {
    state.isPlaying = flag
  },
  [SET_MODEL_TYPE] (state, value) {
    state.model = value
  },
  [SET_SONGS] (state, list) {
    let spliceIds = []
    for (let i = 0; i < state.songs.length; i++) {
      for (let j = 0; j < list.length; j++) {
        if (state.songs[i].id === list[j].id) {
          spliceIds.push(i)
        }
      }
    }
    for (let i = spliceIds.length - 1; i >= 0; i--) {
      state.songs.splice(spliceIds[i], 1)
    }
    state.songs = list.concat(state.songs)
  },
  [SET_AUDIO] (state, audio) {
    state.audio = audio
  },
  [SET_CURRENT_TIME] (state, time) {
    state.currentTime = time
  },
  [SET_DURATION] (state, time) {
    state.duration = time
  },
  [SET_CURRENT_INDEX] (state, index) {
    if (index < 0) {
      index = state.songs.length - 1
    } else if (index > state.songs.length - 1) {
      index = 0
    }
    state.currentSongIndex = index
  },
  [SET_FAVORITE_LIST] (state, song) {
    let flag = false
    state.favoriteList.forEach((value, index) => {
      if (value.id === song.id) {
        flag = true
        state.favoriteList.splice(index, 1)
      }
    })
    if (!flag) {
      state.favoriteList.push(song)
    }
  },
  [SET_LISTED_MUSIC] (state, song) {
    let flag = -1
    let isExits = state.listedMusic.find((value, index) => {
      flag = index
      return value.id === song.id
    })
    if (!isExits && (flag === state.listedMusic.length - 1)) {
      state.listedMusic.unshift(song)
    } else {
      if (flag !== 0) {
        state.listedMusic.splice(flag, 1)
        state.listedMusic.unshift(isExits)
      }
    }
  }
}
