import Vue from 'vue'
import App from './App.vue'
import ProgressiveImage from './components/index.js'
import './css/normalize.css'
// Vue.component(ProgressiveImage.name, ProgressiveImage)
Vue.use(ProgressiveImage)
new Vue({
  el: '#app',
  render: h => h(App)
})
