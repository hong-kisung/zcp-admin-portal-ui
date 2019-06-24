import axios from '@/util/axios'

export default {
	//general
	getGeneral: function (store, payload) {
		axios.get('/api/estimate/general').then(response => {
			store.commit('setGeneral', response.data)
		}).catch(error => {
			console.log('failed get general')
		})
	},
	saveGeneral: function (store, payload) {
		axios.put('/api/estimate/general', payload.generalInfo).then(response => {
			store.dispatch('getGeneral')
			store.dispatch('getGeneralHistory')
		})
	},
	getGeneralHistory: function(store, payload) {
		axios.get('api/estimate/general/history').then(response => {
			store.commit('setGeneralHistory', response.data)
		}).catch(error => {
			console.log('failed get getGeneralHistory')
		})
	},
	getGeneralHistoryDetail: function(store, payload) {
		store.commit('setGeneral', {})
		axios.get('api/estimate/general/history/' + payload.versionId).then(response => {
			store.commit('setGeneral', response.data)
		}).catch(error => {
			console.log('failed get getGeneralHistoryDetail')
		})
	},

	//vm
	getVm: function (store, payload) {
		axios.get('/api/estimate/iks_costs/vm').then(response => {
			store.commit('setVm', response.data)
		}).catch(error => {
			console.log('failed get getVm')
		})
	},
	saveVm: function (store, payload) {
		axios.put('/api/estimate/iks_costs/vm', payload.vmInfo).then(response => {
			store.dispatch('getVm')
			store.dispatch('getVmHistory')
		})
	},
	getVmHistory: function(store, payload) {
		axios.get('api/estimate/iks_costs/vm/history').then(response => {
			store.commit('setVmHistory', response.data)
		}).catch(error => {
			console.log('failed get getVmHistory')
		})
	},
	getVmHistoryDetail: function(store, payload) {
		store.commit('setVmHistoryDetail', {vms: []})
		axios.get('api/estimate/iks_costs/vm/history/' + payload.versionId).then(response => {
			store.commit('setVmHistoryDetail', response.data)
		}).catch(error => {
			console.log('failed get getVmHistoryDetail')
		})
	},

	//storage
	getStorage: function (store, payload) {
		axios.get('/api/estimate/iks_costs/storage').then(response => {
			store.commit('setStorage', response.data)
		}).catch(error => {
			console.log('failed get getStorage')
		})
	},
	saveStorage: function (store, payload) {
		axios.put('/api/estimate/iks_costs/storage', payload.storageInfo).then(response => {
			store.dispatch('getStorage')
			store.dispatch('getStorageHistory')
		})
	},
	getStorageHistory: function(store, payload) {
		axios.get('api/estimate/iks_costs/storage/history').then(response => {
			store.commit('setStorageHistory', response.data)
		}).catch(error => {
			console.log('failed get getStorageHistory')
		})
	},
	getStorageHistoryDetail: function(store, payload) {
		store.commit('setStorageHistoryDetail', {fileStorages: []})
		axios.get('api/estimate/iks_costs/storage/history/' + payload.versionId).then(response => {
			store.commit('setStorageHistoryDetail', response.data)
		}).catch(error => {
			console.log('failed get getStorageHistoryDetail')
		})
	},
	
	//product msp cost
	getProductMspCost: function (store, payload) {
		axios.get('/api/estimate/platform/msp').then(response => {
			store.commit('setProductMspCost', response.data)
		}).catch(error => {
			console.log('failed get getProductMspCost')
		})
	},
	saveProductMspCost: function (store, payload) {
		axios.put('/api/estimate/platform/msp', payload.productMspCostInfo).then(response => {
			store.dispatch('getProductMspCost')
			store.dispatch('getProductMspCostHistory')
		})
	},
	getProductMspCostHistory: function (store, payload) {
		axios.get('api/estimate/platform/msp/history').then(response => {
			store.commit('setProductMspCostHistory', response.data)
		}).catch(error => {
			console.log('failed get getProductMspCostHistory')
		})
	},
	getProductMspCostHistoryDetail: function (store, payload) {
		store.commit('setProductMspCostHistoryDetail', {fileStorages: []})
		axios.get('api/estimate/platform/msp/history/' + payload.versionId).then(response => {
			store.commit('setProductMspCostHistoryDetail', response.data)
		}).catch(error => {
			console.log('failed get getProductMspCostHistoryDetail')
		})
	}
}