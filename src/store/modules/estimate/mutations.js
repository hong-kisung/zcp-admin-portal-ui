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
	
	//product
	setProducts: function(state, data) {
		state.products = data
	},
	setProductMspCost: function(state, data) {
		state.productMspCost = data
	},
	setProductMspCostHistory: function(state, data) {
		state.productMspCostHistory = data
	},
	setProductMspCostHistoryDetail: function(state, data) {
		state.productMspCostHistoryDetail = data
	},
	
	//product cost estimate template
	setCostEstimateTemplate: function(state, data) {
		state.costEstimateTemplate = data
	},
	
	//project
	setProjects: function(state, data) {
		state.projects = data
	},
	setProject: function (state, data) {
		state.project = data
	},
	setProjectVolume: function (state, data) {
		state.projectVolume = data
	},
	setProjectCostEstimate: function (state, data) {
		state.projectCostEstimate = data
	},
	setProductReferences: function (state, data) {
		state.productReferences = data
	},
	setProjectCostEstimateHistory: function (state, data) {
		state.projectCostEstimateHistory = data
	},
	setProjectCostEstimateHistoryDetailStatus: function (state, data) {
		state.projectCostEstimateHistoryDetailStatus = data
	},
	setProjectCostEstimateHistoryDetail: function (state, data) {
		state.projectCostEstimateHistoryDetail = data
	},
	setCustomers: function(state, data) {
		state.customers = data
	},
	
	//common code
	setHardwareTypes: function (state, data) {
		state.hardwareTypes = data
	},
	setFileStorageTypes: function (state, data) {
		state.fileStorageTypes = data
	},
	setEnduranceIops: function (state, data) {
		state.enduranceIops = data
	},
	setClassificationTypes: function (state, data) {
		state.classificationTypes = data
	},
	setEnvironmentTypes: function (state, data) {
		state.environmentTypes = data
	}
}