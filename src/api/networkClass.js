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
        console.log(res)
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

export const getAllRank = () => {
  return new Promise((resolve, reject) => {
    let rank = {
      authority: [
        { name: '云音乐飙升榜', id: 3 },
        { name: '云音乐新歌榜', id: 0 },
        { name: '网易原创歌曲榜', id: 2 },
        { name: '云音乐热歌榜', id: 1 }
      ],
      recommend: [
        { name: '云音乐说唱榜', id: 23 },
        { name: '云音乐电音榜', id: 25 },
        { name: '云音乐欧美新歌榜', id: 32 },
        { name: '抖音排行榜', id: 26 },
        { name: '云音乐ACG音乐榜', id: 22 },
        { name: '云音乐古典音乐榜', id: 24 }
      ],
      global: [
        { name: '美国Billboard周榜', id: 6 },
        { name: 'UK排行榜周榜', id: 5 },
        { name: 'Beatport全球电子舞曲榜', id: 21 },
        { name: '日本Oricon周榜', id: 10 },
        { name: 'iTunes榜', id: 8 },
        { name: '英国Q杂志中文版周榜', id: 29 }
      ],
      more: [
        { name: 'KTV唛榜', id: 7 },
        { name: '法国 NRJ Vos Hits 周榜', id: 19 },
        { name: '新声榜', id: 27 },
        { name: '云音乐韩语榜', id: 28 },
        { name: '电竞音乐榜', id: 30 },
        { name: '云音乐欧美热歌榜', id: 32 }
      ],
      titles: {
        authority: '官方榜',
        recommend: '推荐榜',
        global: '全球榜',
        more: '更多榜单'
      }

    }
    network.get('/toplist/detail')
      .then(res => {
        res.list.forEach(value => {
          let flag = false
          for (let key in rank) {
            for (let i = 0; i < rank[key].length; i++) {
              if (rank[key][i].name === value.name) {
                rank[key][i].ranks = value
                flag = true
                break
              }
              if (flag) {
                break
              }
            }
          }
        })
        resolve(rank)
      })
      .catch(e => reject(e))
  })
}

/* export const getSingleRank = (id) => network.get('/top/list', { idx: id })

export const getGroupRank = (singleRank) => {
  return new Promise((resolve, reject) => {
    let networkArray = []
    singleRank.forEach(value => {
      networkArray.push(getSingleRank(value.id))
    })
    network.all(networkArray)
      .then(res => {
        let array = []
        res.forEach(value => {
          array.push(value.playlist)
        })
        resolve(array)
      })
      .catch(e => console.log(e))
  })
}

export const getAllRank = () => {
  return new Promise(function (resolve, reject) {
    let networkArray = []
    for (let key in rank) {
      networkArray.push(getGroupRank(rank[key]))
    }
    network.all(networkArray)
      .then(res => {
        console.log(res)
      })
      .catch(e => console.log(e))
  })
} */
