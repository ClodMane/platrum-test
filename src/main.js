import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vClickOutside from 'v-click-outside'
import VMask from 'v-mask';

Vue.config.productionTip = false
Vue.use(vClickOutside)
Vue.use(VMask)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
