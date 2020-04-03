export const formatLyric = (lyric) => {
  let lyrics = lyric.split('\n')
  let timeReg = /\[\d+:\d+\.\d+\]/
  let minuteReg = /\[\d+:/
  let secondReg = /:\d+\./
  let numberReg = /\d+/
  let lyricObj = {}
  lyrics.forEach((value, index) => {
    // 提取时间字符串
    let time = value.match(timeReg)
    if (!time) return
    time = time[0]
    // 提取分钟
    let minutes = parseInt(time.match(minuteReg)[0].match(numberReg)[0])
    // 提取秒钟
    let seconds = parseInt(time.match(secondReg)[0].match(numberReg)[0])
    let totalTime = minutes * 60 + seconds
    // 提取歌词
    let formatLyric = value.replace(time, '').trim()
    if (formatLyric) {
      lyricObj[totalTime] = formatLyric
    }
  })
  return lyricObj
}

/* 函数防抖 */
export const debounce = (fn, delay) => {
  let timeId = null
  return function (event) {
    let self = this
    let arg = arguments
    timeId && clearInterval(timeId)
    timeId = setTimeout(function () {
      fn.apply(self, arg)
    }, delay || 1000)
  }
}

/* 函数节流 */
export const throttle = (fn, delay) => {
  let timeId = null
  let flag = true
  return function (event) {
    if (!flag) return
    flag = false
    let self = this
    let arg = arguments
    timeId && clearInterval(timeId)
    timeId = setTimeout(function () {
      fn.apply(self, arg)
      flag = true
    }, delay || 1000)
  }
}

/* 日期格式格式化 */
export const formatDate = (format, date) => {
  let obj = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let key in obj) {
    let currentReg = new RegExp(key)
    let matchStr = format.match(currentReg)
    if (!matchStr) continue
    else matchStr = matchStr[0]
    let strLength = matchStr.length
    if (matchStr.includes('y')) {
      // 年份处理
      format = format.replace(matchStr, (obj[key] + '').substr(4 - strLength))
    } else {
      // 其他处理
      if (strLength === 1) {
        format = format.replace(matchStr, obj[key])
      } else {
        let length = (obj[key] + '').length
        format = format.replace(matchStr, ('00' + obj[key]).substr(length))
      }
    }
  }
  return format
}

/* 获取url参数 */
export const getQueryVariable = (variable) => {
  let query = window.location.search.substring(1)
  let vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=')
    if (pair[0] === variable) {
      return pair[1]
    }
  }
  return (false)
}

/* 格式化次数 */
export const formatNum = (num) => {
  let res = 0
  if (num / 100000000 > 1) {
    let temp = num / 100000000 + ''
    if (temp.indexOf('.') === -1) {
      res = num / 100000000 + '亿'
    } else {
      res = (num / 100000000).toFixed(1) + '亿'
    }
  } else if (num / 10000 > 1) {
    let temp = num / 10000 + ''
    if (temp.indexOf('.') === -1) {
      res = num / 10000 + '万'
    } else {
      res = (num / 10000).toFixed(1) + '万'
    }
  } else {
    res = num
  }
  return res
}

/* 保存历史数据 */
export const saveHistory = (db, data, dataName) => {
  if (data) {
    // 保存历史数据
    let history = db.getItem(dataName)
    if (!history) {
      // 第一次
      history = []
    } else {
      // 第二次
      history = JSON.parse(history)
    }
    for (let i = 0; i < history.length; i++) {
      if (JSON.stringify(history[i]) === JSON.stringify(data)) {
        history.splice(i, 1)
        break
      }
    }
    history.push(data)
    db.setItem(dataName, JSON.stringify(history))
  }
}

/* 获取历史数据 */
export const getHistory = (db, dataName) => {
  return JSON.parse(db.getItem(dataName))
}

/* 删除历史数据 */
export const clearHistory = (db, dataName) => {
  db.removeItem(dataName)
}

/* 得到一个两数之间的随机整数，包括两个数在内 */
export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min // 含最大值，含最小值
}
