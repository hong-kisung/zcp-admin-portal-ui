import Vue from 'vue'
import axios from 'axios'

axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.xsrfCookieName = 'csrftoken';

Vue.prototype.$http = axios

axios.interceptors.response.use(
	(response) => {
		return response
	
	}, 
	(error) => {
		if(error.response && error.response.status === 401) {
			const url = new URL(location.href)
			document.cookie = 'SESSION='
				window.location.href = url.href;
		}
	}
)

export default axios
