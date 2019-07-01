import Vue from 'vue'
import Vuex from 'vuex'

import * as modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
	//global
	state: {
		asideToggleStatus: false,
		okMessage: {
			show: false,
			title: '',
			content: ''
		}
	},
	getters: {
		asideToggleStatus: state => () => state.asideToggleStatus
	},
	mutations: {
		setAsideToggleStatus: function(state, payload) {
			state.asideToggleStatus = payload.status
		},
		showOkMessage: function(state, payload) {
			state.okMessage = payload
		}
	},
	actions: {
		
	},
	modules: modules.default
})

Vue.prototype.$store = store

export default store