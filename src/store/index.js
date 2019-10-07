import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/plugins/axios'

import * as modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
	//global
	state: {
		user: {
			userId: '',
			userName: ''
		}
	},
	getters: {
		getUserId: state => {
			return state.user.userId
		},
		getUserName: state => {
			return state.user.userName
		}
	},
	mutations: {
		setUserInfo: function(state, payload) {
			state.user.userId = payload.preferred_username
			state.user.userName = payload.given_name
		},
		clearUserInfo: function(state, payload) {
			state.user = {
				userId: '',
				userName: ''
			}
		}
	},
	actions: {
		getUserInfo: function (store, payload) {
			axios.get('/api/gateway/user').then(response => {
				store.commit('setUserInfo', response.data)
			}).catch(error => {
				console.log('failed getUserInfo')
			})
		},
	},
	modules: modules.default
})

Vue.prototype.$store = store

export default store