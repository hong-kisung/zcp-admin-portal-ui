import Vue from 'vue'
import Vuex from 'vuex'

import * as modules from './modules'

Vue.use(Vuex)

const store = new Vuex.Store({
	//global
	state: {
		
	},
	mutations: {
		
	},
	actions: {
		
	},
	modules: modules.default
})

Vue.prototype.$store = store

export default store