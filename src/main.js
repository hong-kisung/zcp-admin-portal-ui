// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './polyfill'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import component from './components'
import filter from './filter'
import router from './router'
import store from './store'
import axios from './plugins/axios'

//custom plugins
import ZAdmin from './plugins/z-admin/index.js'

// todo
// cssVars()

Vue.use(BootstrapVue)
Vue.use(ZAdmin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
