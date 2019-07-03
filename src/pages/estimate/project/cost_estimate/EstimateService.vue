<template>
<div>
  <b-row>
    <b-col sm="6" class="text-left">
      <h6 class="font-weight-bold mt-3">{{ title }}</h6>
    </b-col>
    <b-col sm="6" class="text-right">
      <b-button size="sm" variant="secondary" class="m-1" v-if="editable && !estimate.disabled" @click="openEnvironmentDialog">Product 추가</b-button>
      <b-button size="sm" variant="secondary" class="m-1" v-if="editable && !estimate.disabled" @click="deleteProduct" v-bind:disabled="selected.length == 0">Product 삭제</b-button>
      <b-button size="sm" variant="secondary" class="m-1" v-if="editable && !estimate.disabled" @click="openAppsDialog">Classification 추가</b-button>
    </b-col>
  </b-row>
  <div class="table-responsive-sm">
    <table class="table b-table table-bordered table-sm">
      <thead>
		  <tr>
			<th class="text-center">Product</th>
			<th class="text-center" v-show="estimateType == 'cloudZService'">Service</th>
			<th class="text-center">Classification</th>
			<th class="text-center">Classification<br>Type</th>
			<th class="text-center" v-show="estimateType == 'cloudZService'">Machine<br>Type</th>
			<th class="text-center" v-show="estimateType == 'cloudZService'">Hardware<br>Type</th>
			<th class="text-center">Storage<br>Type</th>
			<th class="text-center">Storage<br>Performance</th>
			<th class="text-center">Storage<br>Size(GB)</th>
			<th class="text-center">Number</th>
			<th class="text-center" v-show="estimateType == 'cloudZService'">Cores</th>
			<th class="text-center" v-show="estimateType == 'cloudZService'">Memory(GB)</th>
			<th class="text-center">Monthly(₩)</th>
			<th class="text-center">Yearly(₩)</th>
			<th class="text-center" v-if="editable">Actions</th>
		  </tr>
      </thead>
      <tbody>
	  	<template v-for="(product, productIndex) in estimate.products">
	  	  <template v-if="product.services.length == 0">
			  <tr>
				<td class="font-weight-bold text-left">
			      <div class="custom-control custom-checkbox custom-control-inline">
			        <input type="checkbox" class="custom-control-input" v-show="editable" :id="getCheckboxId(product.productName)" :value="product" v-model="selected" unchecked>
			        <label class="custom-control-label" :for="getCheckboxId(product.productName)">{{ product.productName }}</label>
			      </div>
				</td>
				<td class="font-weight-bold text-right" v-bind:colspan="estimateType == 'cloudZService' ? 10:6">{{ product.productName }} Summary</td>
				<td class="font-weight-bold text-right">{{ product.sumMonthly | formatNumber }}</td>
				<td class="font-weight-bold text-right">{{ product.sumYearly | formatNumber }}</td>
				<td class="font-weight-bold" v-if="editable">
				</td>
			  </tr>
	  	  </template>
	  	  <template v-else>
		  	  <template v-for="(service, serviceIndex) in product.services">
		  		<template v-for="(classification, index) in service.classifications">
				  	<tr>
					  <td class="font-weight-bold text-left" v-if="serviceIndex == 0 && index == 0" v-bind:rowspan="getRowspan(1, product.services)">
				        <div class="custom-control custom-checkbox custom-control-inline">
				          <input type="checkbox" class="custom-control-input" v-show="editable" :id="getCheckboxId(product.productName)" :value="product" v-model="selected" unchecked>
				          <label class="custom-control-label" :for="getCheckboxId(product.productName)">{{ product.productName }}</label>
				        </div>
					  </td>
					  <td class="font-weight-bold text-left" v-if="index == 0" v-show="estimateType == 'cloudZService'" v-bind:rowspan="service.classifications.length">{{ service.serviceName }}</td>
					  <td class="font-weight-bold text-left" :class="classification.updated ? 'text-danger':''">{{ classification.classificationName + (classification.addonApplicationName != '' ? ' - ' + classification.addonApplicationName : '') }}</td>
					  <td class="text-left">{{ classification.classificationType }}</td>
					  <td class="text-center" v-show="estimateType == 'cloudZService'">{{ classification.iksVmName }}</td>
					  <td class="text-center" v-show="estimateType == 'cloudZService'">{{ classification.hardwareType }}</td>
					  <td class="text-center">{{ classification.storageType }}</td>
					  <td class="text-center">{{ !classification.enduranceIops || classification.enduranceIops == 0 ? '' : classification.enduranceIops + ' IOPS' }}</td>
					  <td class="text-center">{{ classification.iksFileStorageDisk | formatNumber }}</td>
					  <td class="text-center">{{ classification.number | formatNumber }}</td>
					  <td class="text-center" v-show="estimateType == 'cloudZService'">{{ classification.cores | formatNumber }}</td>
					  <td class="text-center" v-show="estimateType == 'cloudZService'">{{ classification.memory | formatNumber }}</td>
					  <td class="text-right" :class="classification.updated ? 'text-danger':''">{{ classification.pricePerMonthly | formatNumber | toKRW }}</td>
					  <td class="text-right" :class="classification.updated ? 'text-danger':''">{{ classification.pricePerYearly | formatNumber | toKRW }}</td>
					  <td class="text-center" v-if="editable">
					    <b-link href="#" class="card-header-action" v-on:click="editAppsItem(productIndex, serviceIndex, index, classification)">
					      <i class="fa fa-pencil fa-sm"></i>
		                </b-link>
		                <b-link href="#" class="card-header-action" v-on:click="deleteAppsItem(productIndex, serviceIndex, index, classification)">
					      <i class="fa fa-times fa-sm"></i>
		                </b-link>
		                <b-link href="#" class="card-header-action" v-on:click="moveUpAppsItem(productIndex, serviceIndex, index, classification)">
					      <i class="fa fa-arrow-up fa-sm"></i>
		                </b-link>
		                <b-link href="#" class="card-header-action" v-on:click="moveDownAppsItem(productIndex, serviceIndex, index, classification)">
					      <i class="fa fa-arrow-down fa-sm"></i>
		                </b-link>
					  </td>
				    </tr>
			    </template>
			  </template>
			  <tr>
				<td class="font-weight-bold text-right" v-bind:colspan="estimateType == 'cloudZService' ? 11:6">{{ product.productName }} Summary</td>
				<td class="font-weight-bold text-right">{{ product.sumMonthly | formatNumber }}</td>
				<td class="font-weight-bold text-right">{{ product.sumYearly | formatNumber }}</td>
				<td class="font-weight-bold" v-if="editable">
				</td>
			  </tr>
		  </template>
	  	</template>
	  	
	  	<tr>
		  <td class="font-weight-bold text-right" v-bind:colspan="estimateType == 'cloudZService' ?  12:7">Summary</td>
		  <td class="font-weight-bold text-right">{{ estimate.sumMonthly | formatNumber }}</td>
		  <td class="font-weight-bold text-right">{{ estimate.sumYearly | formatNumber }}</td>
		  <td class="font-weight-bold" v-if="editable">
		  </td>
	    </tr>
      </tbody>
    </table>
  </div>
 	<estimate-environment-dialog v-bind:editedItem="editedItem"
 								 v-bind:estimate="estimate"
 								 v-bind:environmentDialog="environmentDialog"
 								 v-on:fire-dialog-saved="saveEnvironmentDialog"
 								 v-on:fire-dialog-closed="closeEnvironmentDialog"
 	/>
 	<estimate-item-dialog 		 v-bind:editedItem="editedAppsItem"
 								 v-bind:estimate="estimate"
 								 v-bind:appsDialog="appsDialog"
 								 v-bind:isNewAppsItem="isNewAppsItem"
 								 v-bind:estimateType="estimateType"
 								 v-on:fire-dialog-saved="saveAppsDialog"
 								 v-on:fire-dialog-closed="closeAppsDialog"
 	/>
</div>
</template>

<script>
import estimateEnvironmentDialog from './EnvironmentDialog'
import estimateItemDialog from './EstimateItemDialog'

export default {
  	components: {
    	estimateEnvironmentDialog, estimateItemDialog
  	},
	data: () => ({
	  	selected: [],
  		environmentDialog: false,
  		appsDialog: false,
  		isNewAppsItem: false,

	  	editedIndex: -1,
	  	editedItem: {products: []},
	  	defaultItem: {products: []},

      	defaultAppsItem: {},
      	editedAppsItem: {},
      	
      	editedApps: {
      		productIndex: -1,
      		serviceIndex: -1,
      		index: -1
      	},
      	defaultApps: {
      		productIndex: -1,
      		serviceIndex: -1,
      		index: -1
      	}
	}),
	props: [
		'title',
		'estimateEnvironment',
		'estimateType',
		'estimate',
		'editable',
		'referenceUpdateStatus'
	],
	computed: {
		productReferences: function() {
			return this.$store.state.estimate.productReferences
		},
		projectVolumes: function() {
			return this.$store.state.estimate.projectVolume
		},
		iksGeneral: function() {
			return this.$store.state.estimate.general
		},
		vmVersion: function() {
			return this.$store.state.estimate.vm
		},
		storageVersion: function() {
			return this.$store.state.estimate.storage
		},
		productMspCostVersion: function() {
			return this.$store.state.estimate.productMspCost
		}
	},
	watch: {
		referenceUpdateStatus: function() {
			if(!this.referenceUpdateStatus) {
				return;
			}
			
			// update estimate_items
			for(let product of this.estimate.products) {
				for(let service of product.services) {
					for(let classification of service.classifications) {
						this.updateReference(classification)
						this.calculate(classification, true)
					}
				}
			}
			
			this.$emit('fire-update-reference-finished')
		}
	},
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
		},
		getCheckboxId(productName) {
			return this.estimateEnvironment + '-' + this.estimateType + '-' + productName
		},
		getRowspan(colIndex, items, item) {
			let rowCount = 0;
			if(colIndex == 0) {
				for(let product of items) {
					for(let service of product.services) {
						rowCount += service.classifications.length
					}
				}
				rowCount += products.length + 1
			} else if(colIndex == 1) {
				for(let service of items) {
					rowCount += service.classifications.length
				}
				rowCount += 1
			}
			return rowCount
		},
		deleteProduct() {
			if(confirm('삭제하시겠습니까?')) {
				for(let i = 0; i < this.selected.length; i++) {
					const index = this.estimate.products.indexOf(this.selected[i])
					this.estimate.products.splice(index, 1)
				}
				
				this.selected = []
				this.$emit('fire-estimate-changed')
			}
			
		},
		openEnvironmentDialog() {
			this.selected = []
			this.environmentDialog = true
		},
		closeEnvironmentDialog() {
			this.environmentDialog = false
			setTimeout(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
			}, 300)
		},
		saveEnvironmentDialog() {
			for(let productInfo of this.editedItem.products) {
				let product = {}
				product.productId = productInfo.productId
				product.productName = productInfo.productName
				product.services = new Array()
				this.estimate.products.push(product)
				
				this.createFromProductTemplate(this.estimate.products.length -1, product)
			}
			this.closeEnvironmentDialog()
		},
		createFromProductTemplate(productIndex, product) {
			let productTemplate
			for(let reference of this.productReferences) {
				productTemplate = undefined
				if(product.productId == reference.productId) {
					productTemplate = reference
					break
				}
			}
			
			if(productTemplate) {
				this.createProduct(productTemplate, productIndex, product)
				this.$emit('fire-estimate-changed')
			} else {
				console.log('product template not found')
			}
		},
		createProduct(productTemplate, productIndex, product) {
			let templates
			if(this.estimateType == 'cloudZService') {
				templates = productTemplate.templates.cloudZService
			} else if(this.estimateType == 'storageService') {
				templates = productTemplate.templates.storageService
			}
			
			for(let template of templates) {
				let service = {}
				service.serviceName = template.serviceName
				service.classifications = new Array()
				service.classifications = this.createClassification(product, service.serviceName, template.classifications)
				this.estimate.products[productIndex].services.push(service)
			}
		},
		createClassification(product, serviceName, classifications) {
			let estimateItems = new Array()
			for(let classification of classifications) {
				let estimateItem = {}
				estimateItem.productId = product.productId
				estimateItem.productName = product.productName
				estimateItem.serviceName = serviceName
				estimateItem.classificationName = classification.classificationName
				estimateItem.classificationType = classification.classificationType
				estimateItem.addonApplicationName = ""
				
				if(estimateItem.classificationType == 'IP_Allocation') {
					estimateItem.pricePerMonthly = this.iksGeneral.ipAllocation
					estimateItem.pricePerYearly = estimateItem.pricePerMonthly * 12
				}
				
				estimateItems.push(estimateItem)
			}
			return estimateItems
		},
		
		openAppsDialog() {
			if(this.editedApps.index == -1) {
				if(this.estimate.products.length == 0) {
					alert("Classification을 추가할 Product가 없습니다. Product를 추가하세요")
					return
				}
			}
			this.editedApps = Object.assign({}, this.defaultApps)
			this.editedAppsItem = Object.assign({}, this.defaultAppsItem)
			this.appsDialog = true
			this.isNewAppsItem = true
		},
		editAppsItem(productIndex, serviceIndex, appIndex, appItem) {
			this.editedApps.productIndex = productIndex
			this.editedApps.serviceIndex = serviceIndex
			this.editedApps.index = appIndex
			
			this.editedAppsItem = Object.assign({}, appItem)
			this.appsDialog = true
			this.isNewAppsItem = false
		},
		deleteAppsItem(productIndex, serviceIndex, appIndex, appItem) {
			if(confirm('삭제하시겠습니까?')) {
				this.estimate.products[productIndex].services[serviceIndex].classifications.splice(appIndex, 1)
				
				if(this.estimate.products[productIndex].services[serviceIndex].classifications.length == 0) {
					this.estimate.products[productIndex].services.splice(serviceIndex, 1)
				}
				
				if(this.estimate.products[productIndex].services.length == 0) {
					this.estimate.products.splice(productIndex, 1)
				}
				
				this.$emit('fire-estimate-changed')
			}
		},
		moveUpAppsItem(productIndex, serviceIndex, appIndex, appItem) {
			if(appIndex == 0) return
			
			const removed = this.estimate.products[productIndex].services[serviceIndex].classifications.splice(appIndex, 1)
			this.estimate.products[productIndex].services[serviceIndex].classifications.splice(appIndex -1 , 0, removed[0])
		},
		moveDownAppsItem(productIndex, serviceIndex, appIndex, appItem) {
			if(appIndex == this.estimate.products[productIndex].services[serviceIndex].classifications.length -1) return
			
			const removed = this.estimate.products[productIndex].services[serviceIndex].classifications.splice(appIndex, 1)
			this.estimate.products[productIndex].services[serviceIndex].classifications.splice(appIndex +1, 0, removed[0])
		},
		closeAppsDialog () {
			this.appsDialog = false
			this.isNewAppsItem = false
			setTimeout(() => {
				this.editedApps = Object.assign({}, this.defaultApps)
				this.editedAppsItem = Object.assign({}, this.defaultAppsItem)
			}, 300)
		},
		saveAppsDialog () {
			this.calculate(this.editedAppsItem)
			
			if (this.editedApps.index > -1) {
				// edit
				this.$set(this.estimate.products[this.editedApps.productIndex].services[this.editedApps.serviceIndex].classifications, this.editedApps.index, this.editedAppsItem)
			
			} else {
				// new
				let productIndex = this.findProductIndex(this.estimate.products, this.editedAppsItem.productName)
				if(productIndex == -1) {
					let product = {}
					product.productId = this.editedAppsItem.productId
					product.productName = this.editedAppsItem.productName
					product.services = new Array()
					this.estimate.products.push(product)
					productIndex = this.estimate.products.length -1
				}
				
				let serviceIndex = this.findServiceIndex(this.estimate.products[productIndex].services, this.editedAppsItem.serviceName)
				if(serviceIndex == -1) {
					let service = {}
					service.serviceName = this.editedAppsItem.serviceName
					service.classifications = new Array()
					this.estimate.products[productIndex].services.push(service)
					serviceIndex = this.estimate.products[productIndex].services.length -1
				}
				
				this.estimate.products[productIndex].services[serviceIndex].classifications.push(this.editedAppsItem)
			}
			
			this.closeAppsDialog()
			this.$emit('fire-estimate-changed')
		},
		findProductIndex(products, productName) {
			for(let i = 0; i < products.length; i++) {
				if(products[i].productName == productName) {
					return i
				}
			}
			return -1
		},
		findServiceIndex(services, serviceName) {
			for(let i = 0; i < services.length; i++) {
				if(services[i].serviceName == serviceName) {
					return i
				}
			}
			return -1
		},
		updateReference(estimateItem) {
			if(estimateItem.classificationType == 'VM') {
				//상세spec 데이터가 없는 것
				if(estimateItem.iksVmId <= 0) {
					return
				}
				
				//최신버전인 것
				const vmData = this.vmVersion.vms.find(vm => vm.name === estimateItem.iksVmName)
				if(vmData && vmData.id == estimateItem.iksVmId) {
					return
				}
				
				//버전업 대상인데 name매칭 결과가 있으면 update, 아니면 id/name 삭제
				estimateItem.iksVmId = vmData ? vmData.id : 0
				estimateItem.iksVmName = vmData? vmData.name : ''
				estimateItem.updated = true
				
			} else if(estimateItem.classificationType == 'File_Storage' || estimateItem.classificationType == 'Block_Storage') {
				if(estimateItem.iksFileStorageId <= 0) {
					return
				}
				
				const storageData = this.storageVersion.fileStorages.find(storage => storage.disk === estimateItem.iksFileStorageDisk)
				if(storageData && storageData.id == estimateItem.iksFileStorageId) {
					return
				}
				
				estimateItem.iksFileStorageId = storageData ? storageData.id : 0
				estimateItem.iksFileStorageDisk = storageData ? storageData.disk : 0
				estimateItem.updated = true

			} else if(estimateItem.classificationType == 'IP_Allocation') {
				if(estimateItem.pricePerMonthly == this.iksGeneral.ipAllocation) {
					return
				}
				
				estimateItem.updated = true
			}
		},
		calculate(estimateItem) {
			if(estimateItem.classificationType == 'VM') {
				const vmData = this.vmVersion.vms.find(vm => vm.id === estimateItem.iksVmId)
				if(vmData) {
					if(estimateItem.number && estimateItem.number > 0) {
						estimateItem.cores = vmData.core * estimateItem.number
						estimateItem.memory = vmData.memory * estimateItem.number
					} else {
						estimateItem.cores = 0
						estimateItem.memory = 0
					}
					
					if(estimateItem.hardwareType && estimateItem.hardwareType != "") {
						let pricePerMonth = 0
						if(estimateItem.hardwareType == 'shared') {
							pricePerMonth = vmData.sharedGraduatedTierPricePerMonth
						} else if(estimateItem.hardwareType == 'dedicated') {
							pricePerMonth = vmData.dedicatedGraduatedTierPricePerMonth
						}
						
						estimateItem.pricePerMonthly = Math.ceil(pricePerMonth * (1 - this.iksGeneral.ibmDcRate/100)) * estimateItem.number
					} else {
						estimateItem.pricePerMonthly = 0
					}
				} else {
					estimateItem.pricePerMonthly = 0
				}
				
			} else if(estimateItem.classificationType == 'File_Storage' || estimateItem.classificationType == 'Block_Storage') {
				const storageData = this.storageVersion.fileStorages.find(storage => storage.id === estimateItem.iksFileStorageId)
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
					
					estimateItem.pricePerMonthly = Math.ceil(pricePerHour * 730 * this.iksGeneral.exchangeRate * (1 - this.iksGeneral.ibmDcRate/100)) * estimateItem.number
				} else {
					estimateItem.pricePerMonthly = 0
				}
				
			} else if(estimateItem.classificationType == 'Object_Storage') {
				estimateItem.pricePerMonthly = this.storageVersion.objectStoragePricePerMonth * estimateItem.number
				 
			} else if(estimateItem.classificationType == 'IP_Allocation') {
				estimateItem.pricePerMonthly = this.iksGeneral.ipAllocation
				
			} else if(estimateItem.classificationType == 'Labor_Cost') {
				//nothing
			}
			
			if(estimateItem.pricePerMonthly || estimateItem.pricePerMonthly == 0) {
				estimateItem.pricePerYearly = estimateItem.pricePerMonthly * 12
			}
		}
	}
}
</script>

<style>
</style>
