export default {
  getIsNormalPlay (state) {
    return state.isNormalPlay
  },
  getIsMiniPlay (state) {
    return state.isMiniPlay
  },
  getIsListPlay (state) {
    return state.isListPlay
  },
  getIsPlaying (state) {
    return state.isPlaying
  },
  getModelType (state) {
    return state.model
  },
  getSongs (state) {
    return state.songs
  },
  getCurrentSong (state) {
    if (state.songs.length !== 0) {
      state.currentSong = state.songs[state.currentSongIndex]
    }
    return state.currentSong
  },
  getCurrentIndex (state) {
    return state.currentSongIndex
  },
  getAudio (state) {
    return state.audio
  },
  getCurrentTime (state) {
    return state.currentTime
  },
  getDuration (state) {
    return state.duration
  },
  getFavoriteList (state) {
    return state.favoriteList
  },
  getListedMusic (state) {
    return state.listedMusic
  }
}
