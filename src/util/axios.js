import Vue from 'vue'
import axios from 'axios'
import store from '@/store'

axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

Vue.prototype.$http = axios

axios.interceptors.request.use(
	(config) => {
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

axios.interceptors.response.use(
	(response) => {
		return response
	}, 
	(error) => {
		if(error.response && error.response.status === 401) {
			store.commit('clearUserInfo')
			
			const url = new URL(location.href)
			document.cookie = 'SESSION='
			window.location.href = url.orign
		} else {
			return Promise.reject(error)
		}
	}
)

export default axios
