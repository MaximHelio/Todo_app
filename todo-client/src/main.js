//일종의 settings.py

import Vue from 'vue'
import App from './App.vue'
import store from './store'
import UUID from 'vue-uuid'
import router from './router'

import axios from 'axios'
Vue.prototype.axios = axios

Vue.use(UUID) //등록
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
