import Vue from 'vue'
import App from './App.vue'
import ProgressiveImage from './components/progressive-image'
import './css/normalize.css'
Vue.component(ProgressiveImage.name, ProgressiveImage)

new Vue({
  el: '#app',
  render: h => h(App)
})
