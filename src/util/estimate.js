export function getEstimateByEstimateType(estimate, environmentIndex, estimateType) {
	if(estimateType == 'CloudZService') {
		return estimate.environments[environmentIndex].cloudZService
	} else if(estimateType == 'StorageService') {
		return estimate.environments[environmentIndex].storageService
	}
}

export function updateReference(estimateItem, showUpdated, state) {
	if(estimateItem.classificationType == 'VM') {
		//상세spec 데이터가 없는 것
		if(!estimateItem.iksVmName || estimateItem.iksVmName == '') {
			return
		}
		
		//최신버전인 것
		const vmData = state.vm.vms.find(vm => vm.name === estimateItem.iksVmName)
		if(vmData && vmData.id == estimateItem.iksVmId) {
			return
		}
		
		//버전업 대상인데 name매칭 결과가 있으면 update, 아니면 id/name 삭제
		estimateItem.iksVmId = vmData ? vmData.id : 0
		estimateItem.iksVmName = vmData? vmData.name : ''
		if(showUpdated) estimateItem.updated = true
		
	} else if(estimateItem.classificationType == 'File_Storage' || estimateItem.classificationType == 'Block_Storage') {
		if(!estimateItem.iksFileStorageDisk || estimateItem.iksFileStorageDisk == 0) {
			return
		}
		
		const storageData = state.storage.fileStorages.find(storage => storage.disk === estimateItem.iksFileStorageDisk)
		if(storageData && storageData.id == estimateItem.iksFileStorageId) {
			return
		}
		
		estimateItem.iksFileStorageId = storageData ? storageData.id : 0
		estimateItem.iksFileStorageDisk = storageData ? storageData.disk : 0
		if(showUpdated) estimateItem.updated = true

	} else if(estimateItem.classificationType == 'Object_Storage') {
		if(estimateItem.pricePerMonthly == state.storage.objectStoragePricePerMonth) {
			return
		}
		
		if(showUpdated) estimateItem.updated = true

	} else if(estimateItem.classificationType == 'IP_Allocation') {
		if(estimateItem.pricePerMonthly == state.general.ipAllocation) {
			return
		}
		
		if(showUpdated) estimateItem.updated = true
	}
}

export function calculatePrice(estimateItem, state) {
	if(estimateItem.classificationType == 'VM') {
		const vmData = state.vm.vms.find(vm => vm.id === estimateItem.iksVmId)
		if(vmData) {
			if(estimateItem.number && estimateItem.number > 0) {
				estimateItem.cores = vmData.core * estimateItem.number
				estimateItem.memory = vmData.memory * estimateItem.number
			} else {
				estimateItem.cores = 0
				estimateItem.memory = 0
			}
			
			if(estimateItem.hardwareType && estimateItem.hardwareType != '') {
				let pricePerMonth = 0
				if(estimateItem.hardwareType == 'shared') {
					pricePerMonth = vmData.sharedGraduatedTierPricePerMonth
				} else if(estimateItem.hardwareType == 'dedicated') {
					pricePerMonth = vmData.dedicatedGraduatedTierPricePerMonth
				}
				
				estimateItem.pricePerMonthly = Math.ceil(pricePerMonth * (1 - state.general.ibmDcRate/100)) * estimateItem.number
			} else {
				estimateItem.pricePerMonthly = 0
			}
		} else {
			estimateItem.pricePerMonthly = 0
		}
		
	} else if(estimateItem.classificationType == 'File_Storage' || estimateItem.classificationType == 'Block_Storage') {
		const storageData = state.storage.fileStorages.find(storage => storage.id === estimateItem.iksFileStorageId)
		if(storageData && estimateItem.enduranceIops && estimateItem.enduranceIops != "" && estimateItem.number && estimateItem.number > 0) {
			let pricePerHour = 0
			if(estimateItem.enduranceIops == 0.25) {
				pricePerHour = storageData.iops1PricePerHour
			} else if(estimateItem.enduranceIops == 2) {
				pricePerHour = storageData.iops2PricePerHour
			} else if(estimateItem.enduranceIops == 4) {
				pricePerHour = storageData.iops3PricePerHour
			} else if(estimateItem.enduranceIops = 10) {
				pricePerHour = storageData.iops4PricePerHour
			}
			
			estimateItem.pricePerMonthly = Math.ceil(pricePerHour * 730 * state.general.exchangeRate * (1 - state.general.ibmDcRate/100)) * estimateItem.number
		} else {
			estimateItem.pricePerMonthly = 0
		}
		
	} else if(estimateItem.classificationType == 'Object_Storage') {
		estimateItem.number = 1
		estimateItem.pricePerMonthly = state.storage.objectStoragePricePerMonth * estimateItem.number
		 
	} else if(estimateItem.classificationType == 'IP_Allocation') {
		estimateItem.pricePerMonthly = state.general.ipAllocation
		
	} else if(estimateItem.classificationType == 'Labor_Cost') {
		//nothing
	}
	
	if(estimateItem.pricePerMonthly || estimateItem.pricePerMonthly == 0) {
		estimateItem.pricePerYearly = estimateItem.pricePerMonthly * 12
	}
}

export function calculateTotal(estimate) {
	let sumMonthly = 0;
	let sumYearly = 0;
	
	for(let environment of estimate.environments) {
		calculateEnvironment(environment);
		
		sumMonthly += environment.sumMonthly;
		sumYearly += environment.sumYearly;
	}
	estimate.sumMonthly = sumMonthly;
	estimate.sumYearly = sumYearly;
	
	//summary
	estimate.summary.sumLaborCost = 0
	estimate.summary.sumCloudCost = 0
	estimate.summary.sumTotalCost = 0
	for(const environment of estimate.summary.environments) {
		for(const product of environment.products) {
			product.laborCost = 0
			product.cloudCost = 0
			product.totalCost = 0
		}
	}
	
	for(const environment of estimate.environments) {
		for(const product of environment.cloudZService.products) {
			summary(estimate, environment, product, 'CloudZService')
		}
		for(const product of environment.storageService.products) {
			summary(estimate, environment, product, 'StorageService')
		}
	}
}

function summary(estimate, environment, product, estimateType) {
	const environmentIndex = estimate.summary.environments.findIndex(item => item.environmentType === environment.environmentType) 
	const productIndex = estimate.summary.environments[environmentIndex].products.findIndex(item => item.productId == product.productId && item.estimateType == estimateType)

	for(const service of product.services) {
		for(const classification of service.classifications) {
			if(classification.pricePerMonthly) {
				if(classification.classificationType == 'Labor_Cost') {
					estimate.summary.environments[environmentIndex].products[productIndex].laborCost += classification.pricePerMonthly
					estimate.summary.sumLaborCost += classification.pricePerMonthly
				} else {
					estimate.summary.environments[environmentIndex].products[productIndex].cloudCost += classification.pricePerMonthly
					estimate.summary.sumCloudCost += classification.pricePerMonthly
				}
				
				estimate.summary.environments[environmentIndex].products[productIndex].totalCost += classification.pricePerMonthly
				estimate.summary.sumTotalCost += classification.pricePerMonthly
			}
		}
	}
}

function calculateEnvironment(environment) {
	calculateEstimateType(environment.cloudZService);
	calculateEstimateType(environment.storageService);
	
	environment.sumMonthly = environment.cloudZService.sumMonthly + environment.storageService.sumMonthly;
	environment.sumYearly = environment.cloudZService.sumYearly + environment.storageService.sumYearly;
}

function calculateEstimateType(estimateType) {
	let sumMonthly = 0;
	let sumYearly = 0;
	
	for(let product of estimateType.products) {
		for(let service of product.services) {
			calculateService(service);
		}
		
		calculateProduct(product);
		
		sumMonthly += product.sumMonthly;
		sumYearly += product.sumYearly;
	}
	
	estimateType.sumMonthly = sumMonthly;
	estimateType.sumYearly = sumYearly;
}

function calculateProduct(product) {
	let sumMonthly = 0;
	let sumYearly = 0;
	
	for(let service of product.services) {
		sumMonthly += service.sumMonthly;
		sumYearly += service.sumYearly;
	}
	
	product.sumMonthly = sumMonthly;
	product.sumYearly = sumYearly;
}

function calculateService(service) {
	let sumMonthly = 0;
	let sumYearly = 0;
	
	for(let classification of service.classifications) {
		sumMonthly += (classification.pricePerMonthly == undefined ? 0 : classification.pricePerMonthly);
		sumYearly += (classification.pricePerYearly == undefined ? 0 : classification.pricePerYearly);
	}
	
	service.sumMonthly = sumMonthly;
	service.sumYearly = sumYearly;
}

export function addEstimateItemFromProductTemplate(state, productIndex, product, estimate, estimateType) {
	let productTemplate
	for(let reference of state.productReferences) {
		productTemplate = undefined
		if(product.productId == reference.productId) {
			productTemplate = reference
			break
		}
	}
	
	if(productTemplate) {
		addService(state, productTemplate, productIndex, product, estimate, estimateType)
	}
}

export function newProduct(productInfo) {
	let product = {}
	product.productId = productInfo.productId
	product.productName = productInfo.productName
	product.services = new Array()
	return product
}

export function newSummaryProduct(productInfo, estimateType) {
	let product = {}
	product.estimateType = estimateType
	product.productId = productInfo.productId
	product.productName = productInfo.productName
	product.cloudCost = 0
	product.laborCost = 0
	product.totalCost = 0
	product.pricePerGb = 0
	return product
}

export function newService() {
	
}

export function newClassification() {
	
}

function addService(state, productTemplate, productIndex, product, estimate, estimateType) {
	let templates
	if(estimateType == 'CloudZService') {
		templates = productTemplate.templates.cloudZService
	} else if(estimateType == 'StorageService') {
		templates = productTemplate.templates.storageService
	}
	
	for(let template of templates) {
		let service = {}
		service.serviceName = template.serviceName
		service.classifications = new Array()
		service.classifications = addClassification(state, product, service.serviceName, template.classifications)
		estimate.products[productIndex].services.push(service)
	}
}

function addClassification(state, product, serviceName, classifications) {
	let estimateItems = new Array()
	for(let classification of classifications) {
		let estimateItem = {}
		estimateItem.productId = product.productId
		estimateItem.productName = product.productName
		estimateItem.serviceName = serviceName
		estimateItem.classificationName = classification.classificationName
		estimateItem.classificationType = classification.classificationType
		estimateItem.iksVmName = classification.iksVmName
		estimateItem.hardwareType = classification.hardwareType
		estimateItem.number = classification.number
		estimateItem.storageType = classification.storageType
		estimateItem.enduranceIops = classification.enduranceIops
		estimateItem.iksFileStorageDisk = classification.iksFileStorageDisk
		
		estimateItem.addonApplicationName = ""
		
		updateReference(estimateItem, false, state)
		calculatePrice(estimateItem, state)
		estimateItems.push(estimateItem)
	}
	return estimateItems
}


