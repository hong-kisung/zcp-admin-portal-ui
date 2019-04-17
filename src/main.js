// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// Packages
import Vue from 'vue';
import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate';
import ko from 'vee-validate/dist/locale/ko.js';

import App from './App';
import router from './router';
import axios from 'axios';

axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

const config = {
  locale: 'ko',
  dictionary: {
    ko
  }
}

const base = axios.create({
})

Vue.prototype.$http = base;

import { setupComponents } from './config/setup-components';
setupComponents(Vue);

Vue.use(Vuetify);
Vue.use(VeeValidate, config);
Vue.config.productionTip = false;

import { setupFilters } from './config/setup-filters';
setupFilters(Vue);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
