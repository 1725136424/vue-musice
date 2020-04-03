import axios from 'axios'

// axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.baseURL = 'http://music.it666.com:3666/'

axios.defaults.timeout = 3000

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
        .then(res => {
          console.log(res)
        })
        .catch(e => console.log(e))
    })
  }
}
