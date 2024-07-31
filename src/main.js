import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vClickOutside from 'v-click-outside'

Vue.config.productionTip = false
Vue.use(vClickOutside)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
