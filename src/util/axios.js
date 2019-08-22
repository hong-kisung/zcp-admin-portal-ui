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
			window.location.href = url.origin
		} else if (error.response.data && error.response.data.message) {
			store.commit('showOkMessage', {title: error.response.data.error, content: error.response.data.message}, {root:true})
			return Promise.reject(error)
		} else if (error.response.statusText) {
			store.commit('showOkMessage', {title: 'Error', content: error.response.statusText}, {root:true})
			return Promise.reject(error)
		} else {
			console.log(error)
		}
	}
)

export default axios
