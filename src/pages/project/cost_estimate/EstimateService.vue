<template>
<mdb-container fluid>
  <mdb-row>
    <mdb-col sm="6" class="text-left">
      <h6 class="font-weight-bold mt-3">{{ title }}</h6>
    </mdb-col>
    <mdb-col sm="6" class="text-right">
      <mdb-btn size="sm" outline="secondary" v-if="editable" @click="openEnvironmentDialog">Product 추가</mdb-btn>
      <mdb-btn size="sm" outline="secondary" v-if="editable" @click="deleteProduct" v-bind:disabled="selected.length == 0">Product 삭제</mdb-btn>
      <mdb-btn size="sm" outline="secondary" v-if="editable" @click="openAppsDialog">Classification 추가</mdb-btn>
    </mdb-col>
  </mdb-row>
  <mdb-row>
    <mdb-tbl sm bordered hover responsive>
      <mdb-tbl-head>
		  <tr>
			<th class="text-center">Product</th>
			<th class="text-center" v-show="estimateType == 'cloudZService'">Service</th>
			<th class="text-center">Classification</th>
			<th class="text-center" v-show="estimateType == 'cloudZService'">Machine<br>Type</th>
			<th class="text-center" v-show="estimateType == 'cloudZService'">Hardware<br>Type</th>
			<th class="text-center">Storage<br>Type</th>
			<th class="text-center">Storage<br>Performance</th>
			<th class="text-center">Storage<br>Size</th>
			<th class="text-center">Number</th>
			<th class="text-center" v-show="estimateType == 'cloudZService'">Cores</th>
			<th class="text-center" v-show="estimateType == 'cloudZService'">Memory</th>
			<th class="text-center">Monthly (원)</th>
			<th class="text-center">Yearly (원)</th>
			<th class="text-center" v-if="editable">Actions</th>
		  </tr>
      </mdb-tbl-head>
      <mdb-tbl-body>
	  	<template v-for="(product, productIndex) in estimate.products">
	  	  <template v-if="product.services.length == 0">
			  <tr>
				<td class="font-weight-bold text-left">
			      <div class="custom-control custom-checkbox custom-control-inline">
			        <input type="checkbox" class="custom-control-input" v-show="editable" :id="product.productName" :value="product" v-model="selected" unchecked>
			        <label class="custom-control-label" :for="product.productName">{{ product.productName }}</label>
			      </div>
				</td>
				<td class="grey font-weight-bold text-right" v-bind:colspan="estimateType == 'cloudZService' ? 9:5">{{ product.productName }} Summary</td>
				<td class="grey font-weight-bold text-right">{{ product.sumMonthly | formatNumber }}</td>
				<td class="grey font-weight-bold text-right">{{ product.sumYearly | formatNumber }}</td>
				<td class="grey font-weight-bold" v-if="editable">
				</td>
			  </tr>
	  	  </template>
	  	  <template v-else>
		  	  <template v-for="(service, serviceIndex) in product.services">
		  		<template v-for="(classification, index) in service.classifications">
				  	<tr>
					  <td class="font-weight-bold text-left" v-if="serviceIndex == 0 && index == 0" v-bind:rowspan="getRowspan(1, product.services)">
				        <div class="custom-control custom-checkbox custom-control-inline">
				          <input type="checkbox" class="custom-control-input" v-show="editable" :id="estimate.environmentName + product.productName" :value="product" v-model="selected" unchecked>
				          <label class="custom-control-label" :for="estimate.environmentName + product.productName">{{ product.productName }}</label>
				        </div>
					  </td>
					  <td class="font-weight-bold text-center" v-if="index == 0" v-show="estimateType == 'cloudZService'" v-bind:rowspan="service.classifications.length">{{ service.serviceName }}</td>
					  <td class="font-weight-bold text-left" :class="classification.updated ? 'red--text text--darken-4':''">{{ classification.classificationName + (classification.addonApplicationName != '' ? ' - ' + classification.addonApplicationName : '') }}</td>
					  <td class="text-center" v-show="estimateType == 'cloudZService'">{{ classification.iksVmName }}</td>
					  <td class="text-center" v-show="estimateType == 'cloudZService'">{{ classification.hardwareType }}</td>
					  <td class="text-center">{{ classification.storageType }}</td>
					  <td class="text-center">{{ !classification.enduranceIops || classification.enduranceIops == 0 ? '' : classification.enduranceIops + ' IOPS' }}</td>
					  <td class="text-center">{{ classification.iksFileStorageDisk | formatNumber }}</td>
					  <td class="text-center">{{ classification.number | formatNumber }}</td>
					  <td class="text-center" v-show="estimateType == 'cloudZService'">{{ classification.cores | formatNumber }}</td>
					  <td class="text-center" v-show="estimateType == 'cloudZService'">{{ classification.memory | formatNumber }}</td>
					  <td class="text-right" :class="classification.updated ? 'red--text text--darken-4':''">{{ classification.pricePerMonthly | formatNumber }}</td>
					  <td class="text-right" :class="classification.updated ? 'red--text text--darken-4':''">{{ classification.pricePerYearly | formatNumber }}</td>
					  <td class="text-center" v-if="editable">
					    <a class="rotate-btn" @click="editAppsItem(estimate.environmentName, productIndex, serviceIndex, index, classification)">
					      <mdb-icon icon="pencil-alt" class="fa-md grey-text"></mdb-icon>
		                </a>
		                &nbsp;
					    <a class="rotate-btn" @click="deleteAppsItem(estimate.environmentName, productIndex, serviceIndex, index, classification)">
					      <mdb-icon icon="times" class="fa-md grey-text"></mdb-icon>
		                </a>
					  </td>
				    </tr>
			    </template>
			  </template>
			  <tr class="grey">
				<td class="font-weight-bold text-right" v-bind:colspan="estimateType == 'cloudZService' ? 10:5">{{ product.productName }} Summary</td>
				<td class="font-weight-bold text-right">{{ product.sumMonthly | formatNumber }}</td>
				<td class="font-weight-bold text-right">{{ product.sumYearly | formatNumber }}</td>
				<td class="font-weight-bold" v-if="editable">
				</td>
			  </tr>
		  </template>
	  	</template>
	  	
	  	<tr class="blue-grey">
		  <td class="font-weight-bold text-right" v-bind:colspan="estimateType == 'cloudZService' ?  11:6">Summary</td>
		  <td class="font-weight-bold text-right">{{ estimate.sumMonthly | formatNumber }}</td>
		  <td class="font-weight-bold text-right">{{ estimate.sumYearly | formatNumber }}</td>
		  <td class="font-weight-bold" v-if="editable">
		  </td>
	    </tr>
      </mdb-tbl-body>
    </mdb-tbl>
  </mdb-row>
 	<estimate-environment-dialog v-bind:editedItem="editedItem"
 								 v-bind:estimate="estimate"
 								 v-bind:projectVolumes="projectVolumes"
 								 v-bind:environmentDialog="environmentDialog"
 								 v-on:fire-dialog-saved="saveEnvironmentDialog"
 								 v-on:fire-dialog-closed="closeEnvironmentDialog"
 	/>
 	<estimate-item-dialog 		 v-bind:editedItem="editedAppsItem"
 								 v-bind:estimate="estimate"
 								 v-bind:iksGeneral="iksGeneral"
 								 v-bind:vmVersion="vmVersion"
 								 v-bind:storageVersion="storageVersion"
 								 v-bind:productMspCostVersion="productMspCostVersion"
 								 v-bind:productReferences="productReferences"
 								 v-bind:appsDialog="appsDialog"
 								 v-bind:isNewAppsItem="isNewAppsItem"
 								 v-bind:estimateType="estimateType"
 								 v-on:fire-dialog-saved="saveAppsDialog"
 								 v-on:fire-dialog-closed="closeAppsDialog"
 	/>
</mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter, mdbIcon, mdbBtn } from 'mdbvue'
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter } from 'mdbvue' 
import { mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue' 
import { mdbInput } from 'mdbvue'
import estimateEnvironmentDialog from './EnvironmentDialog'
import estimateItemDialog from './EstimateItemDialog'

export default {
  	components: {
    	mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter,
    	mdbIcon, mdbBtn,
    	mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter,
    	mdbInput,
    	mdbTbl, mdbTblHead, mdbTblBody,
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
		'estimateType',
		'estimate',
		'iksGeneral',
		'vmVersion',
		'storageVersion',
		'productMspCostVersion',
		'productReferences',
		'projectVolumes',
		'editable',
		'referenceUpdateStatus'
	],
	computed: {
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
						this.updateReference(classification);
						this.calculate(classification, true);
					}
				}
			}
			
			this.$emit('fire-update-reference-finished');
		}
	},
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
		},
		getRowspan(colIndex, items, item) {
			var rowCount = 0;
			if(colIndex == 0) {
				var products = items;
				for(var i = 0; i < products.length; i++) {
					for(var j = 0; j < products[i].services.length; j++) {
						rowCount += products[i].services[j].classifications.length;
					}
				}
				rowCount += products.length + 1;
			} else if(colIndex == 1) {
				var services = items;
				for(var j = 0; j < services.length; j++) {
					rowCount += services[j].classifications.length;
				}
				rowCount += 1;
			}
			return rowCount;
		},
		deleteProduct() {
			if(confirm('삭제하시겠습니까?')) {
				for(var i = 0; i < this.selected.length; i++) {
					const index = this.estimate.products.indexOf(this.selected[i]);
					this.estimate.products.splice(index, 1);
				}
				
				this.selected = [];
				this.$emit('fire-estimate-changed');
			}
			
		},
		openEnvironmentDialog() {
			this.selected = [];
			this.environmentDialog = true;
		},
		closeEnvironmentDialog() {
			this.environmentDialog = false;
			setTimeout(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
			}, 300);
		},
		saveEnvironmentDialog() {
			for(var i = 0; i < this.editedItem.products.length; i++) {
				var product = {};
				product.productId = this.editedItem.products[i].id;
				product.productName = this.editedItem.products[i].name;
				product.services = new Array();
				this.estimate.products.push(product);
				
				this.createFromProductTemplate(this.estimate, this.estimate.products.length -1, product);
			}
			//this.estimate.environments.push(environment);
			this.closeEnvironmentDialog();
		},
		createFromProductTemplate(environment, productIndex, product) {
			var productTemplate;
			for(var i = 0; i < this.productReferences.length; i++) {
				productTemplate = undefined;
				if(product.productId == this.productReferences[i].productId) {
					productTemplate = this.productReferences[i];
					break;
				}
			}
			
			if(productTemplate) {
				this.createProduct(productTemplate, environment, productIndex, product);
				this.$emit('fire-estimate-changed');
			} else {
				console.log('product template not found');
			}
		},
		createProduct(productTemplate, environment, productIndex, product) {
			var templates;
			if(this.estimateType == 'cloudZService') {
				templates = productTemplate.templates.cloudZService;
			} else if(this.estimateType == 'storageService') {
				templates = productTemplate.templates.storageService;
			}
			
			for(var i = 0; i < templates.length; i++) {
				var service = {};
				service.serviceName = templates[i].serviceName;
				service.classifications = new Array();
				service.classifications = this.createClassification(environment, product, service.serviceName, templates[i].classifications);
				environment.products[productIndex].services.push(service);
			}
		},
		createClassification(environment, product, serviceName, classifications) {
			var estimateItems = new Array();
			for(var i = 0; i < classifications.length; i++) {
				var estimateItem = {};
				estimateItem.environmentId = environment.environmentId;
				estimateItem.environmentName = environment.environmentName;
				estimateItem.productId = product.productId;
				estimateItem.productName = product.productName;
				estimateItem.serviceName = serviceName;
				estimateItem.classificationName = classifications[i].classificationName;
				estimateItem.classificationType = classifications[i].classificationType;
				estimateItem.addonApplicationName = "";
				
				if(estimateItem.classificationType == 'IP_Allocation') {
					estimateItem.pricePerMonthly = this.iksGeneral.ipAllocation;
					estimateItem.pricePerYearly = estimateItem.pricePerMonthly * 12;
				}
				
				estimateItems.push(estimateItem);
			}
			return estimateItems;
		},
		
		openAppsDialog() {
			if(this.editedApps.index == -1) {
				if(this.estimate.products.length == 0) {
					alert("Classification을 추가할 Product가 없습니다. Product를 추가하세요");
					return;
				}
			}
			this.editedApps = Object.assign({}, this.defaultApps);
			this.editedAppsItem = Object.assign({}, this.defaultAppsItem);
			this.appsDialog = true;
			this.isNewAppsItem = true;
		},
		editAppsItem(environmentName, productIndex, serviceIndex, appIndex, appItem) {
			this.editedApps.productIndex = productIndex;
			this.editedApps.serviceIndex = serviceIndex;
			this.editedApps.index = appIndex;
			
			this.editedAppsItem = Object.assign({}, appItem);
			this.appsDialog = true;
			this.isNewAppsItem = false;
		},
		deleteAppsItem(environmentName, productIndex, serviceIndex, appIndex, appItem) {
			if(confirm('삭제하시겠습니까?')) {
				this.estimate.products[productIndex].services[serviceIndex].classifications.splice(appIndex, 1);
				
				if(this.estimate.products[productIndex].services[serviceIndex].classifications.length == 0) {
					this.estimate.products[productIndex].services.splice(serviceIndex, 1);
				}
				
				if(this.estimate.products[productIndex].services.length == 0) {
					this.estimate.products.splice(productIndex, 1);
				}
				
				this.$emit('fire-estimate-changed');
			}
		},
		closeAppsDialog () {
			this.appsDialog = false;
			this.isNewAppsItem = false;
			setTimeout(() => {
				this.editedApps = Object.assign({}, this.defaultApps);
				this.editedAppsItem = Object.assign({}, this.defaultAppsItem);
			}, 300);
		},
		saveAppsDialog () {
			this.calculate(this.editedAppsItem);
			
			if (this.editedApps.index > -1) {
				// edit
				this.$set(this.estimate.products[this.editedApps.productIndex].services[this.editedApps.serviceIndex].classifications, this.editedApps.index, this.editedAppsItem);
			
			} else {
				// new
				var productIndex = this.findProductIndex(this.estimate.products, this.editedAppsItem.productName);
				if(productIndex == -1) {
					var product = {};
					product.productId = this.editedAppsItem.productId;
					product.productName = this.editedAppsItem.productName;
					product.services = new Array();
					this.estimate.products.push(product);
					productIndex = this.estimate.products.length -1;
				}
				
				var serviceIndex = this.findServiceIndex(this.estimate.products[productIndex].services, this.editedAppsItem.serviceName);
				if(serviceIndex == -1) {
					var service = {};
					service.serviceName = this.editedAppsItem.serviceName;
					service.classifications = new Array();
					this.estimate.products[productIndex].services.push(service);
					serviceIndex = this.estimate.products[productIndex].services.length -1;
				}
				
				this.estimate.products[productIndex].services[serviceIndex].classifications.push(this.editedAppsItem);
			}
			
			this.closeAppsDialog();
			this.$emit('fire-estimate-changed');
		},
		findProductIndex(products, productName) {
			for(var i = 0; i < products.length; i++) {
				if(products[i].productName == productName) {
					return i;
				}
			}
			return -1;
		},
		findServiceIndex(services, serviceName) {
			for(var i = 0; i < services.length; i++) {
				if(services[i].serviceName == serviceName) {
					return i;
				}
			}
			return -1;
		},
		updateReference(estimateItem) {
			if(estimateItem.classificationType == 'VM') {
				if(estimateItem.iksVmId <= 0) {
					return;
				}
				
				var vmData;
				for(const vm of this.vmVersion.vms) {
					if(vm.name == estimateItem.iksVmName) {
						vmData = vm;
						break;
					}
				}
				
				estimateItem.iksVmId = vmData ? vmData.id : 0;
				estimateItem.iksVmName = vmData? vmData.name : '';
				estimateItem.updated = true;
				
				if(!vmData) {
					console.log('matched vm is not found');
				}
				
			} else if(estimateItem.classificationType == 'File_Storage' || estimateItem.classificationType == 'Block_Storage') {
				if(estimateItem.iksFileStorageId <= 0) {
					return;
				}
				
				var storageData;
				for(const fileStorage of this.storageVersion.fileStorages) {
					if(fileStorage.disk == estimateItem.iksFileStorageDisk) {
						storageData = fileStorage;
						break;
					}
				}
				
				estimateItem.iksFileStorageId = storageData ? storageData.id : 0;
				estimateItem.iksFileStorageDisk = storageData ? storageData.disk : 0;
				estimateItem.updated = true;

				if(!storageData) {
					console.log('matched file storage is not found');
				}
			}
		},
		calculate(estimateItem) {
			if(estimateItem.classificationType == 'VM') {
				var vmData;
				for(const vm of this.vmVersion.vms) {
					if(vm.id == estimateItem.iksVmId) {
						vmData = vm;
						break;
					}
				}
				
				if(vmData) {
					if(estimateItem.number && estimateItem.number > 0) {
						estimateItem.cores = vmData.core * estimateItem.number;
						estimateItem.memory = vmData.memory * estimateItem.number;
					} else {
						estimateItem.cores = 0;
						estimateItem.memory = 0;
					}
					
					if(estimateItem.hardwareType && estimateItem.hardwareType != "") {
						var pricePerHour = 0;
						if(estimateItem.hardwareType == 'shared') {
							pricePerHour = vmData.sharedPricePerHour;
						} else if(estimateItem.hardwareType == 'dedicated') {
							pricePerHour = vmData.dedicatedPricePerHour;
						}
						
						estimateItem.pricePerMonthly = Math.ceil(pricePerHour * 24 * 31 * (1 - this.iksGeneral.ibmDcRate/100)) * estimateItem.number;
					} else {
						estimateItem.pricePerMonthly = 0;
					}
				} else {
					estimateItem.pricePerMonthly = 0;
				}
				
			} else if(estimateItem.classificationType == 'File_Storage' || estimateItem.classificationType == 'Block_Storage') {
				var storageData;
				for(const fileStorage of this.storageVersion.fileStorages) {
					if(fileStorage.id == estimateItem.iksFileStorageId) {
						storageData = fileStorage;
						break;
					}
				}
				
				if(storageData && estimateItem.enduranceIops && estimateItem.enduranceIops != "" && estimateItem.number && estimateItem.number > 0) {
					var pricePerHour = 0;
					if(estimateItem.enduranceIops == 0.25) {
						pricePerHour = storageData.iops1PricePerHour;
					} else if(estimateItem.enduranceIops == 2) {
						pricePerHour = storageData.iops2PricePerHour;
					} else if(estimateItem.enduranceIops == 4) {
						pricePerHour = storageData.iops3PricePerHour;
					} else if(estimateItem.enduranceIops = 10) {
						pricePerHour = storageData.iops4PricePerHour;
					}
					
					estimateItem.pricePerMonthly = Math.ceil(pricePerHour * 24 * 31 * (1 - this.iksGeneral.ibmDcRate/100) * this.iksGeneral.exchangeRate) * estimateItem.number;
				} else {
					estimateItem.pricePerMonthly = 0;
				}

			} else if(this.editedItem.classificationType == 'IP_Allocation') {
				estimateItem.pricePerMonthly = this.iksGeneral.ipAllocation;
				
			} else if(estimateItem.classificationType == 'Labor_Cost') {
				//nothing
			}
			
			if(estimateItem.pricePerMonthly || estimateItem.pricePerMonthly == 0) {
				if(estimateItem.pricePerMonthly * 12 != estimateItem.pricePerYearly) {
					estimateItem.updated = true;
				}
				estimateItem.pricePerYearly = estimateItem.pricePerMonthly * 12;
			}
		}
	}
}
</script>

<style>
</style>
