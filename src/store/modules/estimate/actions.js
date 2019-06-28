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
		store.commit('setGeneralHistoryDetail', {})
		axios.get('api/estimate/general/history/' + payload.versionId).then(response => {
			store.commit('setGeneralHistoryDetail', response.data)
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
	getProducts: function (store, payload) {
		axios.get('/api/estimate/platform/product').then(response => {
			store.commit('setProducts', response.data)
		}).catch(error => {
			console.log('failed get getProducts')
		})
	},
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
	},
	
	//project
	getProjects: function (store, payload) {
		axios.get('/api/estimate/project').then(response => {
			store.commit('setProjects', response.data)
		}).catch(error => {
			console.log('failed get getProjects')
		})
	},
	getProject: function (store, payload) {
		axios.get('/api/estimate/project/'+ payload.projectId).then(response => {
			store.commit('setProject', response.data)
		}).catch(error => {
			console.log('failed get getProject')
		})
	},
	addProject: function (store, payload) {
		axios.post('/api/estimate/project', payload.project).then(response => {
			store.dispatch('getProjects')
		})
	},
	saveProject: function (store, payload) {
		axios.put('/api/estimate/project/'+ payload.project.id, payload.project).then(response => {
			store.dispatch('getProjects')
		})
	},
	getProjectVolume: function (store, payload) {
		axios.get('/api/estimate/project/' + payload.projectId + '/volume').then(response => {
			store.commit('setProjectVolume', response.data)
		}).catch(error => {
			console.log('failed get getProjectVolume')
		})
	},
	saveProjectVolume: function (store, payload) {
		axios.put('/api/estimate/project/' + payload.projectId + '/volume', payload.volumes).then(response => {
			store.dispatch('getProjectVolume', {projectId: payload.projectId})
		})
	},
	getProjectCostEstimate: function (store, payload) {
		axios.get('/api/estimate/project/' + payload.projectId + '/estimate').then(response => {
			let estimate = response.data
			store.commit('setProjectCostEstimate', response.data)
			
			store.dispatch('getGeneral')
			store.dispatch('getVm')
			store.dispatch('getStorage')
			store.dispatch('getProductMspCost')
			
			//editable이 아닐 경우 처리하지 말것
			axios.get('/api/estimate/project/' + payload.projectId + '/environment').then(response => {
				for(let target of estimate.environments) {
					let envData = response.data.find(environment => environment.id === target.environmentId);
					if(!envData) {
						target.environmentName += " (Removed)";
						target.environmentDisabled = true;
						target.cloudZService.disabled = true;
						target.cloudZService.products.length = 0;
						target.storageService.disabled = true;
						target.storageService.products.length = 0;
					}
				}
				
				for(let item of response.data) {
					let envData = estimate.environments.find(env => env.environmentId === item.id);
					if(!envData) {
			 			envData = {};
			 			envData.environmentId = item.id;
			 			envData.environmentName = item.name;
			 			envData.cloudZService = {};
			 			envData.cloudZService.products = new Array();
			 			envData.storageService = {};
			 			envData.storageService.products = new Array();
			 			estimate.environments.push(envData);
					}	 		
				}
				
				store.commit('setProjectCostEstimate', estimate)
			})
		}).catch(error => {
			console.log('failed get getProjectCostEstimate')
		})
	},
	getProductReferences: function (store, payload) {
		axios.get('/api/estimate/platform/product').then(response => {
			let productReferences = new Array();
			for(let productInfo of response.data) {
				let product = {}
				product.productId = productInfo.id
				product.productName = productInfo.name
				productReferences.push(product)
				
				axios.get('/api/estimate/platform/product/' + product.productId + '/template').then(response => {
					product.templates = response.data
				});
				axios.get('/api/estimate/platform/product/' + product.productId + '/service').then(response => {
					product.services = response.data
				});
			}
			
			store.commit('setProductReferences', productReferences)
		}).catch(error => {
			console.log(error)
			console.log('failed get getProductReferences')
		})
	},
	saveProjectCostEstimate: function (store, payload) {
		axios.put('/api/estimate/project/' + payload.projectId + '/estimate', payload.estimate).then(response => {
			store.dispatch('getProjectCostEstimate', {projectId: payload.projectId})
			store.dispatch('getProjectCostEstimateHistory', {projectId: payload.projectId})
		})
	},
	getProjectCostEstimateHistory: function (store, payload) {
		axios.get('/api/estimate/project/' + payload.projectId + '/estimate/history').then(response => {
			store.commit('setProjectCostEstimateHistory', response.data)
		}).catch(error => {
			console.log('failed get getProjectCostEstimateHistory')
		})
	},
	getProjectCostEstimateHistoryDetail: function (store, payload) {
		axios.get('/api/estimate/project/' + payload.projectId + '/estimate/history/' + payload.estimateId).then(response => {
			let estimate = response.data
			store.commit('setProjectCostEstimate', response.data)
		}).catch(error => {
			console.log('failed get getProjectCostEstimateHistoryDetail')
		})
	},
	removeProjectCostEstimateHistoryDetail: function (store, payload) {
		axios.delete('/api/estimate/project/' + payload.projectId + '/estimate/history/' + payload.estimateId).then(response => {
			alert("삭제되었습니다.");
			history.go(-1);
		})
	},
	
	//common code
	getHardwareTypes: function (store, payload) {
		axios.get('/api/estimate/code/hardware_type').then(response => {
			store.commit('setHardwareTypes', response.data)
		})
	},
	getFileStorageTypes: function (store, payload) {
		axios.get('/api/estimate/code/file_storage_type').then(response => {
			store.commit('setFileStorageTypes', response.data)
		})
	},
	getEnduranceIops: function (store, payload) {
		axios.get('/api/estimate/code/endurance_iops').then(response => {
			store.commit('setEnduranceIops', response.data)
		})
	},
	getClassificationTypes: function (store, payload) {
		axios.get('/api/estimate/code/classification_type').then(response => {
			store.commit('setClassificationTypes', response.data)
		})
	}

}