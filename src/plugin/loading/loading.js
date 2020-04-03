import Loading from './Loading.vue'
export default {
  install (Vue, options) {
    const LoadingConstructor = Vue.extend(Loading)
    const LoadingInstance = new LoadingConstructor()
    const div = document.createElement('div')
    document.documentElement.appendChild(div)
    LoadingInstance.$mount(div)
  }
}
