import network from './network'

export const getBanner = () => network.get('/banner', { type: 2 })
export const getPlaylist = () => network.get('/personalized', { limit: 6 })
export const getAlbum = () => network.get('/album/newest')
export const getNewSong = () => network.get('/personalized/newsong')
export const getMusicDetail = (url, data) => network.get(url, data)
export const getSongs = (id) => network.get('/song/detail', { ids: id })
export const getSongUrl = (id) => network.get('/song/url', { id: id })
export const getLyric = (id) => network.get('/lyric', { id: id })
// 获取热门歌手
export const getHotArtist = () => {
  return new Promise((resolve, reject) => {
    network.get('/top/artists', { offset: 0, limit: 5 })
      .then(res => {
        resolve(res.artists)
      })
      .catch(e => reject(e))
  })
}

// 根据分类获取歌手
export const getSingleCategoryArtist = (cat, letter) => network.get('artist/list', { cat: cat, initial: letter, offset: 0, limit: 5 })

// 获取单个字母的分类组歌手
export const getGroupByLetterArtist = (letter) => {
  return new Promise((resolve, reject) => {
    let categorySinger = [1001, 1002, 1003, 2001, 2002, 2003]
    let callback = []
    categorySinger.forEach(value => {
      callback.push(getSingleCategoryArtist(value, letter))
    })
    network.all(callback)
      .then(res => {
        let artist = []
        res.forEach(value => {
          artist.push(...value.artists)
        })
        resolve(artist)
      })
      .catch(e => {
        reject(e)
      })
  })
}

// 获取全部字母的歌手
export const getAllArtist = () => {
  return new Promise((resolve, reject) => {
    let letter = ['热']
    let letterArray = [getHotArtist()]
    for (let i = 65; i <= 90; i++) {
      let char = String.fromCharCode(i)
      letterArray.push(getGroupByLetterArtist(char))
      letter.push(char)
    }
    network.all(letterArray)
      .then(res => {
        let obj = {}
        obj.key = letter
        obj.value = res
        resolve(obj)
      })
      .catch(e => {
        reject(e)
      })
  })
}
