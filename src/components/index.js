import Com from './progressive-image.vue'
const pImage = {
  install: function(Vue, options) {
    //TODO, 注册全局的 handleScroll queue 来处理 需要监听的元素
    Vue.component(Com.name, Com)
  }
}
export default pImage