import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import {appFire,dbFire} from '@/config/firebaseConfig.js'

Vue.config.productionTip = false

new Vue({
  appFire,
  dbFire,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
