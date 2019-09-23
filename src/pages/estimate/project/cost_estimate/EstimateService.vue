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
			<th class="text-center" v-show="estimateType == 'CloudZService'">Service</th>
			<th class="text-center">Classification</th>
			<th class="text-center">Classification Type</th>
			<th class="text-center" v-show="estimateType == 'CloudZService'">Machine Type</th>
			<th class="text-center" v-show="estimateType == 'CloudZService'">Hardware Type</th>
			<th class="text-center">Number</th>
			<th class="text-center" v-show="estimateType == 'CloudZService'">Cores</th>
			<th class="text-center" v-show="estimateType == 'CloudZService'">Memory(GB)</th>
			<th class="text-center">Storage Type</th>
			<th class="text-center">Storage IOPS</th>
			<th class="text-center">Storage Size(GB)</th>
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
				<td class="font-weight-bold text-right" v-bind:colspan="estimateType == 'CloudZService' ? 10:6">{{ product.productName }} Summary</td>
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
					  <td class="font-weight-bold text-left" v-if="index == 0" v-show="estimateType == 'CloudZService'" v-bind:rowspan="service.classifications.length">{{ service.serviceName }}</td>
					  <td class="font-weight-bold text-left" :class="classification.updated ? 'text-danger':''">{{ classification.classificationName + (classification.addonApplicationName != '' ? ' - ' + classification.addonApplicationName : '') }}</td>
					  <td class="text-left">{{ classification.classificationType }}</td>
					  <td class="text-center" v-show="estimateType == 'CloudZService'">{{ classification.iksVmName }}</td>
					  <td class="text-center" v-show="estimateType == 'CloudZService'">{{ classification.hardwareType }}</td>
					  <td class="text-center">{{ classification.classificationType == 'Object_Storage' ? '' : classification.number | formatNumber }}</td>
					  <td class="text-center" v-show="estimateType == 'CloudZService'">{{ classification.cores | formatNumber }}</td>
					  <td class="text-center" v-show="estimateType == 'CloudZService'">{{ classification.memory | formatNumber }}</td>
					  <td class="text-center">{{ classification.storageType }}</td>
					  <td class="text-center">{{ !classification.enduranceIops || classification.enduranceIops == 0 ? '' : classification.enduranceIops + ' IOPS' }}</td>
					  <td class="text-center">{{ classification.iksFileStorageDisk | formatNumber }}</td>
					  <td class="text-right" :class="classification.updated ? 'text-danger':''">{{ classification.pricePerMonthly | formatNumber | toKRW }}</td>
					  <td class="text-right" :class="classification.updated ? 'text-danger':''">{{ classification.pricePerYearly | formatNumber | toKRW }}</td>
					  <td class="text-center" v-if="editable">
					    <b-link href="#" class="card-header-action" v-on:click="editAppsItem(productIndex, serviceIndex, index, classification)">
					      <i class="fa fa-pencil fa-sm"></i>
		                </b-link>
		                <b-link href="#" class="card-header-action" v-on:click="deleteAppsItem(productIndex, serviceIndex, index, classification)">
					      <i class="fa fa-times fa-sm"></i>
		                </b-link>
		                <b-link href="#" class="card-header-action" v-on:click="moveUp(service.classifications, index)">
					      <i class="fa fa-arrow-up fa-sm"></i>
		                </b-link>
		                <b-link href="#" class="card-header-action" v-on:click="moveDown(service.classifications, index)">
					      <i class="fa fa-arrow-down fa-sm"></i>
		                </b-link>
					  </td>
				    </tr>
			    </template>
			  </template>
			  <tr>
				<td class="font-weight-bold text-right" v-bind:colspan="estimateType == 'CloudZService' ? 11:6">{{ product.productName }} Summary</td>
				<td class="font-weight-bold text-right">{{ product.sumMonthly | formatNumber }}</td>
				<td class="font-weight-bold text-right">{{ product.sumYearly | formatNumber }}</td>
				<td class="font-weight-bold" v-if="editable">
				</td>
			  </tr>
		  </template>
	  	</template>
	  	
	  	<tr>
		  <td class="font-weight-bold text-right" v-bind:colspan="estimateType == 'CloudZService' ?  12:7">Summary</td>
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
import swapArray from '@/mixins/swap-array'

export default {
	mixins: [swapArray],
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
		'environmentIndex',
		'editable'
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
		},
		estimate: function() {
			if(this.estimateType == 'CloudZService') {
				return this.$store.state.estimate.projectCostEstimate.environments[this.environmentIndex].cloudZService
			} else if(this.estimateType == 'StorageService') {
				return this.$store.state.estimate.projectCostEstimate.environments[this.environmentIndex].storageService
			}
		}
	},
	watch: {
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
				this.$store.commit('estimate/deleteCostEstimateProduct', {estimateType: this.estimateType, environmentIndex: this.environmentIndex, selectedProduct: this.selected})
				this.selected = []
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
			this.$store.commit('estimate/addCostEstimateProduct', {estimateType: this.estimateType, environmentIndex: this.environmentIndex, products: this.editedItem.products})
			this.closeEnvironmentDialog()
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
				let data = {
					estimateType: this.estimateType, environmentIndex: this.environmentIndex, 
					productIndex: productIndex,
					serviceIndex: serviceIndex,
					classificationIndex: appIndex
				}
				this.$store.commit('estimate/deleteCostEstimateItem', data)
			}
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
			if (this.editedApps.index > -1) {
				// edit
				let data = {
					estimateType: this.estimateType, environmentIndex: this.environmentIndex, 
					productIndex: this.editedApps.productIndex,
					serviceIndex: this.editedApps.serviceIndex,
					classificationIndex: this.editedApps.index,
					estimateItem: this.editedAppsItem
				}
				this.$store.commit('estimate/modifyCostEstimateItem', data)
			
			} else {
				// new
				let data = {
					estimateType: this.estimateType, environmentIndex: this.environmentIndex, 
					productId: this.editedAppsItem.productId,
					productName: this.editedAppsItem.productName,
					serviceName: this.editedAppsItem.serviceName,
					estimateItem: this.editedAppsItem
				}
				this.$store.commit('estimate/addCostEstimateItem', data)
			}
			
			this.closeAppsDialog()
		}
	}
}
</script>

<style>
</style>
