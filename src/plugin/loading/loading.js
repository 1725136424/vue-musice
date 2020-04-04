import Loading from './Loading.vue'
export default {
  install (Vue, options) {
    let LoadingConstructor = Vue.extend(Loading)
    let LoadingInstance = new LoadingConstructor()
    let div = document.createElement('div')
    document.documentElement.appendChild(div)
    LoadingInstance.$mount(div)
    if (options && options.tip !== null && options.tip !== '') {
      LoadingInstance.tip = options.tip
    }
    Vue.showLoading = function (tip) {
      if (tip !== null && tip !== '' && tip !== undefined) {
        LoadingInstance.tip = tip
      }
      LoadingInstance.isShow = true
    }
    Vue.hiddenLoading = function (tip) {
      if (tip !== null && tip !== '' && tip !== undefined) {
        LoadingInstance.tip = tip
      }
      LoadingInstance.isShow = false
    }
  }
}
