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
		},
		menu: []
	},
	getters: {
		getUser: state => {
			return state.user
		},
		getUserId: state => {
			return state.user.userId
		},
		getUserName: state => {
			return state.user.userName
		},
		getMenu: state => {
			return state.menu
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
		},
		setMenu: function(state, payload) {
			state.menu = payload
		}
	},
	actions: {
		getUserInfo: function (store, payload) {
			axios.get('/api/gateway/user').then(response => {
				store.commit('setUserInfo', response.data)
			}).catch(error => {
				console.log('failed getUserInfo')
			})
		  	store.dispatch('getMenu')
		},
		getMenu: function(store, payload) {
			//사용자별 접근 가능한 메뉴 데이터 조회
			axios.get('/api/gateway/user/menu').then(response => {
				store.commit('setMenu', response.data)
			}).catch(error => {
				console.log('failed getMenu')
			})
		}
	},
	modules: modules.default
})

Vue.prototype.$store = store

export default store