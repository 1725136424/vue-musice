import network from './network'

export const getBanner = () => network.get('/banner', { type: 2 })
export const getPlaylist = () => network.get('/personalized', { limit: 6 })
export const getAlbum = () => network.get('/album/newest')
export const getNewSong = () => network.get('/personalized/newsong')
export const getMusicDetail = (url, data) => network.get(url, data)
export const getSongs = (id) => network.get('/song/detail', { ids: id })
export const getSongUrl = (id) => network.get('/song/url', { id: id })
export const getLyric = (id) => network.get('/lyric', { id: id })
/*
// 获取热门歌手
export const getHotArtist = () => network.get('/top/artists', { offset: 0, limit: 5 })

let categorySinger = [5001, 1001, 1002, 1003, 2001, 2002, 2003]
// 获取歌手
export const getNormalArtist = () => {
  network.get('/artist/list?cat=' + value, { offset: 0, limit: 5 })
}

getNormalArtist()
*/
