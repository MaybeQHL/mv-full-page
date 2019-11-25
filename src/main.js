import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'animate.css'
import directives from './utils/directives'
Vue.use(directives)

import MvFullPage from '@/components/VFullPage/index.js'

Vue.use(MvFullPage)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
