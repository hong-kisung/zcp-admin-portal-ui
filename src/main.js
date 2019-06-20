// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// Packages
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbvue/build/css/mdb.css';

axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

const base = axios.create({
})

Vue.prototype.$http = base;
base.interceptors.response.use((response) => {
	return response
	
}, (error) => {
	if(error.response && error.response.status === 401) {
	      const url = new URL(location.href)
	      document.cookie = 'SESSION='
	      window.location.href = url.href;
	}
});


import { setupComponents } from './config/setup-components';
setupComponents(Vue);

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
