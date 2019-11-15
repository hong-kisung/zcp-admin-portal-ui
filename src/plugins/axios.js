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
		console.log(error.response)
		if(error.response && error.response.status === 401) {
			if(error.response.data.redirect_url) {
				//login error
				store.commit('clearUserInfo')
				
				const url = new URL(location.href)
				document.cookie = 'SESSION='
				window.location.href = error.response.data.redirect_url
				
			} else {
				//api authority error
				store._vm.$zadmin.alert('권한이 없습니다')
				return Promise.reject(error)
			}
		} else if (error.response.data && error.response.data.message) {
			return Promise.reject(error)
			
		} else if (error.response.statusText) {
			return Promise.reject(error)
			
		} else {
			return Promise.reject(error)
		}
	}
)

export default axios
