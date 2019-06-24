export default {
	setGeneral: function (state, data) {
		state.general = data || {}
	},
	setGeneralHistory: function(state, data) {
		state.generalHistory = data
	},
	setGeneralHistoryDetail: function(state, data) {
		state.generalHistoryDetail = data
	},
	setVm: function (state, data) {
		state.vm = data || {}
	},
	setVmHistory: function(state, data) {
		state.vmHistory = data
	},
	setVmHistoryDetail: function(state, data) {
		state.vmHistoryDetail = data
	},
	setStorage: function (state, data) {
		state.storage = data || {}
	},
	setStorageHistory: function(state, data) {
		state.storageHistory = data
	},
	setStorageHistoryDetail: function(state, data) {
		state.storageHistoryDetail = data
	},
	
	setProductMspCost: function(state, data) {
		state.productMspCost = data
	},
	setProductMspCostHistory: function(state, data) {
		state.productMspCostHistory = data
	},
	setProductMspCostHistoryDetail: function(state, data) {
		state.productMspCostHistoryDetail = data
	}
}