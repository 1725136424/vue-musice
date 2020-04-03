import modelType from './model-type'
export default {
  isNormalPlay: false,
  isMiniPlay: false,
  isListPlay: false,
  isPlaying: false,
  model: modelType.loop,
  songs: [],
  currentSongIndex: 0,
  currentSong: {
    id: '',
    name: '',
    artist: '',
    picUrl: ''
  },
  audio: {},
  currentTime: 0,
  duration: 0,
  favoriteList: [],
  listedMusic: []
}
