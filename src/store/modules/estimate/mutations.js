import * as estimateUtil from '@/util/estimate'

export default {
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
	},
	setProjectStatusTypes: function (state, data) {
		state.projectStatusTypes = data
	},
	setCspTypes: function (state, data) {
		state.cspTypes = data
	},

	//
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
	setProjectListCondition: function(state, data) {
		state.projectListCondition = data
	},
	setProjects: function(state, data) {
		state.projects = data
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
	
	updateCostEstimateReference: function(state, isUpdate) {
		if(isUpdate) {
			for(let estimate of state.projectCostEstimate.environments) {
				for(let product of estimate.cloudZService.products) {
					for(let service of product.services) {
						for(let classification of service.classifications) {
							estimateUtil.updateReference(classification, true, state)
							estimateUtil.calculatePrice(classification, state)
						}
					}
				}
				for(let product of estimate.storageService.products) {
					for(let service of product.services) {
						for(let classification of service.classifications) {
							estimateUtil.updateReference(classification, true, state)
							estimateUtil.calculatePrice(classification, state)
						}
					}
				}
			}
			
			estimateUtil.calculateTotal(state.projectCostEstimate)
			
			state.projectCostEstimate.generalId = state.general.id
			state.projectCostEstimate.generalVersion = state.general.version
			state.projectCostEstimate.iksVmVersionId = state.vm.id
			state.projectCostEstimate.iksVmVersionVersion = state.vm.version
			state.projectCostEstimate.iksStorageVersionId = state.storage.id
			state.projectCostEstimate.iksStorageVersionVersion = state.storage.version
			state.projectCostEstimate.mspCostVersionId = state.productMspCost.id
			state.projectCostEstimate.mspCostVersionVersion = state.productMspCost.version

			this._vm.$zadmin.alert("견적서 Update가 완료되었습니다.");
		}
	},
	summaryCostEstimate: function(state, data) {
		estimateUtil.calculateTotal(state.projectCostEstimate)
	},
	addCostEstimateProduct: function(state, data) {
		let estimate = estimateUtil.getEstimateByEstimateType(state.projectCostEstimate, data.environmentIndex, data.estimateType)
		
		for(let productInfo of data.products) {
			let product = estimateUtil.newProduct(productInfo)
			estimate.products.push(product)
			estimateUtil.addEstimateItemFromProductTemplate(state, estimate.products.length -1, product, estimate, data.estimateType)
			
			//summary
			let sumProduct = estimateUtil.newSummaryProduct(productInfo, data.estimateType)
			state.projectCostEstimate.summary.environments[data.environmentIndex].products.push(sumProduct)
		}
		
		estimateUtil.calculateTotal(state.projectCostEstimate)
	},
	deleteCostEstimateProduct: function(state, data) {
		let estimate = estimateUtil.getEstimateByEstimateType(state.projectCostEstimate, data.environmentIndex, data.estimateType)

		for(let i = 0; i < data.selectedProduct.length; i++) {
			const summaryIndex = state.projectCostEstimate.summary.environments[data.environmentIndex].products.findIndex(item => item.productId === data.selectedProduct[i].productId && item.estimateType === data.estimateType)
			state.projectCostEstimate.summary.environments[data.environmentIndex].products.splice(summaryIndex, 1)

			const index = estimate.products.indexOf(data.selectedProduct[i])
			estimate.products.splice(index, 1)
		}
		
		estimateUtil.calculateTotal(state.projectCostEstimate)
	},
	addCostEstimateItem: function(state, data) {
		estimateUtil.calculatePrice(data.estimateItem, state)
		
		let estimate = estimateUtil.getEstimateByEstimateType(state.projectCostEstimate, data.environmentIndex, data.estimateType)
		let productIndex = estimate.products.findIndex(product => product.productName === data.productName)
		if(productIndex == -1) {
			let product = estimateUtil.newProduct(data)
			estimate.products.push(product)
			productIndex = estimate.products.length -1
			
			//summary
			let sumProduct = estimateUtil.newSummaryProduct(data, data.estimateType)
			state.projectCostEstimate.summary.environments[data.environmentIndex].products.push(sumProduct)
		}
		
		let serviceIndex = estimate.products[productIndex].services.findIndex(service => service.serviceName === data.serviceName)
		if(serviceIndex == -1) {
			let service = {}
			service.serviceName = data.serviceName
			service.classifications = new Array()
			estimate.products[productIndex].services.push(service)
			serviceIndex = estimate.products[productIndex].services.length -1
		}
		
		estimate.products[productIndex].services[serviceIndex].classifications.push(data.estimateItem)
		
		estimateUtil.calculateTotal(state.projectCostEstimate)
	},
	modifyCostEstimateItem: function(state, data) {
		estimateUtil.calculatePrice(data.estimateItem, state)

		let estimate = estimateUtil.getEstimateByEstimateType(state.projectCostEstimate, data.environmentIndex, data.estimateType)
		this._vm.$set(estimate.products[data.productIndex].services[data.serviceIndex].classifications, data.classificationIndex, data.estimateItem)
		
		estimateUtil.calculateTotal(state.projectCostEstimate)
	},
	deleteCostEstimateItem: function(state, data) {
		let estimate = estimateUtil.getEstimateByEstimateType(state.projectCostEstimate, data.environmentIndex, data.estimateType)

		estimate.products[data.productIndex].services[data.serviceIndex].classifications.splice(data.classificationIndex, 1)
		
		if(estimate.products[data.productIndex].services[data.serviceIndex].classifications.length == 0) {
			estimate.products[data.productIndex].services.splice(data.serviceIndex, 1)
		}
		
		if(estimate.products[data.productIndex].services.length == 0) {
			estimate.products.splice(data.productIndex, 1)
		}

		estimateUtil.calculateTotal(state.projectCostEstimate)
	}
}

