import axios from 'axios'
import Vue from 'vue'

// axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.baseURL = 'http://music.it666.com:3666/'
axios.defaults.timeout = 3000

let count = 0
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  count++
  Vue.showLoading()
  return config
}, function (error) {
  Vue.showLoading('加载失败')
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  count--
  if (count === 0) {
    Vue.hiddenLoading()
  }
  // 对响应数据做点什么
  return response
}, function (error) {
  Vue.showLoading('加载失败')
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default {
  get (url, data) {
    return new Promise(function (resolve, reject) {
      axios.get(url, {
        params: data
      })
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })
  },
  post (url, data) {
    return new Promise(function (resolve, reject) {
      axios.post(url, data)
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })
  },
  all (array) {
    return new Promise(function (resolve, reject) {
      axios.all(array)
        .then(axios.spread((...list) => {
          resolve(list)
        }))
        .catch(e => reject(e))
    })
  }
}
