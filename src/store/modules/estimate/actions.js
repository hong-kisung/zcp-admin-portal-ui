import axios from '@/plugins/axios'

export default {
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
	},
	getEnvironmentTypes : function (store, payload) {
		axios.get('/api/estimate/code/project_environment').then(response => {
			store.commit('setEnvironmentTypes', response.data)
		})
	},
	getProjectStatus : function (store, payload) {
		axios.get('/api/estimate/code/project_status').then(response => {
			store.commit('setProjectStatusTypes', response.data)
		})
	},
	getCspTypes : function (store, payload) {
		axios.get('/api/estimate/code/csp_type').then(response => {
			store.commit('setCspTypes', response.data)
		})
	},
	
	//general
	getGeneral: function (store, payload) {
		axios.get('/api/estimate/general').then(response => {
			store.commit('setGeneral', response.data)
		}).catch(error => {
			console.log('failed get general')
		})
	},
	saveGeneral: function (store, payload) {
		payload.generalInfo.created = store.rootGetters.getUserId
		axios.put('/api/estimate/general', payload.generalInfo).then(response => {
			this._vm.$zadmin.alert('저장되었습니다.')
			store.dispatch('getGeneral')
			store.dispatch('getGeneralHistory')
		})
	},
	getGeneralHistory: function(store, payload) {
		axios.get('/api/estimate/general/history').then(response => {
			store.commit('setGeneralHistory', response.data)
		}).catch(error => {
			console.log('failed get getGeneralHistory')
		})
	},
	getGeneralHistoryDetail: function(store, payload) {
		store.commit('setGeneralHistoryDetail', {})
		axios.get('/api/estimate/general/history/' + payload.versionId).then(response => {
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
		payload.vmInfo.created = store.rootGetters.getUserId
		axios.put('/api/estimate/iks_costs/vm', payload.vmInfo).then(response => {
			this._vm.$zadmin.alert('저장되었습니다.')
			store.dispatch('getVm')
			store.dispatch('getVmHistory')
		})
	},
	getVmHistory: function(store, payload) {
		axios.get('/api/estimate/iks_costs/vm/history').then(response => {
			store.commit('setVmHistory', response.data)
		}).catch(error => {
			console.log('failed get getVmHistory')
		})
	},
	getVmHistoryDetail: function(store, payload) {
		store.commit('setVmHistoryDetail', {vms: []})
		axios.get('/api/estimate/iks_costs/vm/history/' + payload.versionId).then(response => {
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
		payload.storageInfo.created = store.rootGetters.getUserId
		axios.put('/api/estimate/iks_costs/storage', payload.storageInfo).then(response => {
			this._vm.$zadmin.alert('저장되었습니다.')
			store.dispatch('getStorage')
			store.dispatch('getStorageHistory')
		})
	},
	getStorageHistory: function(store, payload) {
		axios.get('/api/estimate/iks_costs/storage/history').then(response => {
			store.commit('setStorageHistory', response.data)
		}).catch(error => {
			console.log('failed get getStorageHistory')
		})
	},
	getStorageHistoryDetail: function(store, payload) {
		store.commit('setStorageHistoryDetail', {fileStorages: []})
		axios.get('/api/estimate/iks_costs/storage/history/' + payload.versionId).then(response => {
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
		payload.productMspCostInfo.created = store.rootGetters.getUserId
		axios.put('/api/estimate/platform/msp', payload.productMspCostInfo).then(response => {
			this._vm.$zadmin.alert('저장되었습니다.')
			store.dispatch('getProductMspCost')
			store.dispatch('getProductMspCostHistory')
		})
	},
	getProductMspCostHistory: function (store, payload) {
		axios.get('/api/estimate/platform/msp/history').then(response => {
			store.commit('setProductMspCostHistory', response.data)
		}).catch(error => {
			console.log('failed get getProductMspCostHistory')
		})
	},
	getProductMspCostHistoryDetail: function (store, payload) {
		store.commit('setProductMspCostHistoryDetail', {fileStorages: []})
		axios.get('/api/estimate/platform/msp/history/' + payload.versionId).then(response => {
			store.commit('setProductMspCostHistoryDetail', response.data)
		}).catch(error => {
			console.log('failed get getProductMspCostHistoryDetail')
		})
	},
	
	//product cost estimate template
	getCostEstimateTemplate: function (store, payload) {
		axios.get('/api/estimate/platform/product/'+ payload.productId + '/template').then(response => {
			store.commit('setCostEstimateTemplate', response.data)
		})
	},
	saveCostEstimateTemplate: function (store, payload) {
		axios.put('/api/estimate/platform/product/'+ payload.productId +'/template', payload.costEstimateTemplate).then(response => {
			this._vm.$zadmin.alert('저장되었습니다.')
			store.dispatch('getCostEstimateTemplate', {productId: payload.productId})
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
	addProject: function (store, payload) {
		payload.project.created = store.rootGetters.getUserId
		axios.post('/api/estimate/project', payload.project).then(response => {
			this._vm.$zadmin.alert('저장되었습니다.')
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
			this._vm.$zadmin.alert('저장되었습니다.')
			store.dispatch('getProjectVolume', {projectId: payload.projectId})
		})
	},
	getProjectCostEstimate: function (store, payload) {
		axios.get('/api/estimate/project/' + payload.projectId + '/estimate').then(response => {
			let estimate = response.data
			//store.commit('setProjectCostEstimate', response.data)
			
			store.commit('setProjectCostEstimateHistoryDetailStatus', false)
			
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
						estimate.summary.environments.find(env => env.environmentId === target.environmentId).environmentName +=  " (Removed)"
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
			 			
			 			let envSum = {}
			 			envSum.environmentId = item.id
			 			envSum.environmentName = item.name
			 			envSum.products = new Array()
			 			estimate.summary.environments.push(envSum)
					}	 		
				}
				
				store.commit('setProjectCostEstimate', estimate)
				store.commit('summaryCostEstimate', {})
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
					product.services = response.data.services
				});
			}
			
			store.commit('setProductReferences', productReferences)
		}).catch(error => {
			console.log(error)
			console.log('failed get getProductReferences')
		})
	},
	saveProjectCostEstimate: function (store, payload) {
		payload.estimate.created = store.rootGetters.getUserId
		axios.put('/api/estimate/project/' + payload.projectId + '/estimate', payload.estimate).then(response => {
			this._vm.$zadmin.alert('저장되었습니다.')
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
			this._vm.$zadmin.alert('삭제되었습니다.')
			history.go(-1);
		})
	},
	getCustomers: function (store, payload) {
		axios.get('/api/estimate/project/customer').then(response => {
			store.commit('setCustomers', response.data)
		}).catch(error => {
			console.log('failed get getCustomers')
		})
	},
	downloadExcel: function (store, payload) {
		axios.get('/api/estimate/project/' + payload.projectId + '/estimate/history/' + payload.estimateId + '/download?type=excel', {responseType: 'blob'}).then(response => {
			const url = window.URL.createObjectURL(new Blob([response.data]))
			const link = document.createElement('a')
			link.href = url
			link.setAttribute('download', payload.projectName + '_원가견적_v' + payload.version + '.xlsx')
			document.body.appendChild(link)
			link.click()
		}).catch(error => {
			this._vm.$zadmin.alert('엑셀 파일을 다운로드 하는 동안 에러가 발생했습니다.')
			console.log(error)
		})
	}

}