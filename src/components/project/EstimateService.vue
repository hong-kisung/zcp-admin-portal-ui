<template>
<div>
        <v-card>
          <v-card-title class="font-weight-bold">{{ title }}</v-card-title>
		  <v-card-text>
			  <v-data-table
				:headers="headers"
				:items="estimate.environments"
				item-key="environmentName"
				class="elevation-1"
				v-model="selected"
				select-all
				hide-actions
			  >
				<template v-slot:headers="props">
				  <tr>
					<th :class="headerClass" rowspan="2" v-if="editable"></th>
					<th :class="headerClass" rowspan="2">Environment</th>
					<th :class="headerClass" rowspan="2">Product</th>
					<th :class="headerClass" rowspan="2" v-show="estimateType == 'cloudZService'">Service</th>
					<th :class="headerClass" rowspan="2">Classification</th>
					<th :class="headerClass" rowspan="2" v-show="estimateType == 'cloudZService'">Machine<br>Type</th>
					<th :class="headerClass" rowspan="2" v-show="estimateType == 'cloudZService'">Hardware<br>Type</th>
					<th :class="headerClass" rowspan="2">Storage<br>Type</th>
					<th :class="headerClass" rowspan="2">Storage<br>Performance</th>
					<th :class="headerClass" rowspan="2">Storage<br>Size</th>
					<th :class="headerClass" rowspan="2">Number</th>
					<th :class="headerClass" rowspan="2" v-show="estimateType == 'cloudZService'">Cores</th>
					<th :class="headerClass" rowspan="2" v-show="estimateType == 'cloudZService'">Memory</th>
					<th :class="headerClass" colspan="2">원가</th>
					<th :class="headerClass" rowspan="2" v-if="editable">Actions</th>
				  </tr>
				  <tr>
					<th :class="headerClass">Monthly (원)</th>
					<th :class="headerClass">Yearly (원)</th>
				  </tr>
				</template>
				<template v-slot:items="props">
				  <template v-if="props.item.products.length == 0">
				  	<tr>
		          	  <td v-if="editable">
		            	<v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
		          	  </td>
				      <td class="font-weight-bold text-xs-left">{{ props.item.environmentName }}</td>
					  <td class="text-xs-left"></td>
					  <td class="text-xs-left"></td>
					  <td class="text-xs-left"></td>
					  <td class="text-xs-left" v-show="estimateType == 'cloudZService'"></td>
					  <td class="text-xs-center"></td>
					  <td class="text-xs-center" v-show="estimateType == 'cloudZService'"></td>
					  <td class="text-xs-center" v-show="estimateType == 'cloudZService'"></td>
					  <td class="text-xs-center"></td>
					  <td class="text-xs-center"></td>
					  <td class="text-xs-center"></td>
					  <td class="text-xs-center"></td>
					  <td class="text-xs-center" v-show="estimateType == 'cloudZService'"></td>
					  <td class="text-xs-right" v-show="estimateType == 'cloudZService'"></td>
					  <td class="text-xs-right"></td>
					  <td class="justify-center layout px-0" v-if="editable"></td>
				    </tr>
				  </template>
				  <template v-else>
				  
				  	<template v-for="(product, productIndex) in props.item.products">
				  		<template v-for="(service, serviceIndex) in product.services">
				  			<template v-for="(classification, index) in service.classifications">
				  	<tr>
		          	  <td v-if="editable && productIndex == 0 && serviceIndex == 0 && index == 0" v-bind:rowspan="getRowspan(0, props.item.products)">
		            	<v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
		          	  </td>
				      <td class="font-weight-bold text-xs-center" v-if="productIndex == 0 && serviceIndex == 0 && index == 0" v-bind:rowspan="getRowspan(0, props.item.products)">{{ props.item.environmentName }}</td>
					  <td class="font-weight-bold text-xs-center" v-if="serviceIndex == 0 && index == 0" v-bind:rowspan="getRowspan(1, product.services)">{{ product.productName }}</td>
					  <td class="font-weight-bold text-xs-center" v-if="index == 0" v-show="estimateType == 'cloudZService'" v-bind:rowspan="service.classifications.length">{{ service.serviceName }}</td>
					  <td class="font-weight-bold text-xs-left" :class="classification.updated ? 'red--text text--darken-4':''">{{ classification.classificationName + (classification.addonApplicationName != '' ? ' - ' + classification.addonApplicationName : '') }}</td>
					  <td class="text-xs-center" v-show="estimateType == 'cloudZService'">{{ classification.iksVmName }}</td>
					  <td class="text-xs-center" v-show="estimateType == 'cloudZService'">{{ classification.hardwareType }}</td>
					  <td class="text-xs-center">{{ classification.storageType }}</td>
					  <td class="text-xs-center">{{ !classification.enduranceIops || classification.enduranceIops == 0 ? '' : classification.enduranceIops + ' IOPS' }}</td>
					  <td class="text-xs-center">{{ classification.iksFileStorageDisk | formatNumber }}</td>
					  <td class="text-xs-center">{{ classification.number | formatNumber }}</td>
					  <td class="text-xs-center" v-show="estimateType == 'cloudZService'">{{ classification.cores | formatNumber }}</td>
					  <td class="text-xs-center" v-show="estimateType == 'cloudZService'">{{ classification.memory | formatNumber }}</td>
					  <td class="text-xs-right" :class="classification.updated ? 'red--text text--darken-4':''">{{ classification.pricePerMonthly | formatNumber }}</td>
					  <td class="text-xs-right" :class="classification.updated ? 'red--text text--darken-4':''">{{ classification.pricePerYearly | formatNumber }}</td>
					  <td class="justify-center layout px-0" v-if="editable">
						<v-icon small class="mr-2" @click="editAppsItem(props.item.environmentName, productIndex, serviceIndex, index, classification)">edit</v-icon>
						<v-icon small @click="deleteAppsItem(props.item.environmentName, productIndex, serviceIndex, index, classification)">delete</v-icon>
					  </td>
				    </tr>
				    		</template>
				    	</template>
				    	
				  	<tr>
					  <td class="red lighten-5 font-weight-bold text-xs-right" v-bind:colspan="estimateType == 'cloudZService' ? 10:5">{{ product.productName }} Summary</td>
					  <td class="red lighten-5 font-weight-bold text-xs-right">{{ product.sumMonthly | formatNumber }}</td>
					  <td class="red lighten-5 font-weight-bold text-xs-right">{{ product.sumYearly | formatNumber }}</td>
					  <td class="red lighten-5 font-weight-bold" v-if="editable">
					  </td>
				    </tr>
				  	</template>
				  	
				  	<tr>
					  <td class="blue lighten-5 font-weight-bold text-xs-right" v-bind:colspan="estimateType == 'cloudZService' ? 11:6">{{ props.item.environmentName }} Summary</td>
					  <td class="blue lighten-5 font-weight-bold text-xs-right">{{ props.item.sumMonthly | formatNumber }}</td>
					  <td class="blue lighten-5 font-weight-bold text-xs-right">{{ props.item.sumYearly | formatNumber }}</td>
					  <td class="blue lighten-5 font-weight-bold" v-if="editable">
					  </td>
				    </tr>
				  </template>

				</template>
				<template v-slot:footer>
				  	<tr>
					  <td class="yellow lighten-5 font-weight-bold text-xs-right" v-bind:colspan="estimateType == 'cloudZService' ?  (editable ? 13:12) : (editable ? 8:7)">Summary</td>
					  <td class="yellow lighten-5 font-weight-bold text-xs-right">{{ estimate.sumMonthly | formatNumber }}</td>
					  <td class="yellow lighten-5 font-weight-bold text-xs-right">{{ estimate.sumYearly | formatNumber }}</td>
					  <td class="yellow lighten-5 font-weight-bold" v-if="editable">
					  </td>
				    </tr>
				</template>
				<template v-slot:no-data>
      			  <td class="text-xs-center" colspan="13">
        			No data available
      			  </td>
    			</template>
			  </v-data-table>
	      </v-card-text>
 	      <v-card-actions>
		    <v-btn small left color="primary" v-if="editable" @click="openEnvironmentDialog">Environment 추가</v-btn>
		    <v-btn small left color="primary" v-if="editable" @click="deleteEnvironment" v-bind:disabled="selected.length == 0">Environment 삭제</v-btn>
		    <v-btn small left color="primary" v-if="editable" @click="openAppsDialog">Classification 추가</v-btn>
	      </v-card-actions>
        </v-card>
        
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
</div>
</template>

<script>
export default {
	data: () => ({
	  	headers: [],
		headerClass: "grey lighten-1 body-2 text-weight-bold",
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
      		environmentIndex: -1,
      		productIndex: -1,
      		serviceIndex: -1,
      		index: -1
      	},
      	defaultApps: {
      		environmentIndex: -1,
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
			if(this.estimate.environments) {
				for(let env of this.estimate.environments) {
					for(let product of env.products) {
						for(let service of product.services) {
							for(let classification of service.classifications) {
								this.updateReference(classification);
								this.calculate(classification, true);
							}
						}
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

		deleteEnvironment() {
			if(confirm('삭제하시겠습니까?')) {
				for(var i = 0; i < this.selected.length; i++) {
					const index = this.estimate.environments.indexOf(this.selected[i]);
					this.estimate.environments.splice(index, 1);
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
			var environment = {};
			environment.environmentId = this.editedItem.environmentId;
			environment.environmentName = this.editedItem.environmentName;
			environment.products = new Array();
			for(var i = 0; i < this.editedItem.products.length; i++) {
				var product = {};
				product.productId = this.editedItem.products[i].id;
				product.productName = this.editedItem.products[i].name;
				product.services = new Array();
				environment.products.push(product);
				
				this.createFromProductTemplate(environment, i, product);
			}
			this.estimate.environments.push(environment);
			this.closeEnvironmentDialog();
		},
		createFromProductTemplate(environment, productIndex, product) {
			var productTemplate;
			for(var i = 0; i < this.productReferences.length; i++) {
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
			
			var environment;
			for(var i = 0; i < this.estimate.environments.length; i++) {
				if(this.estimate.environments[i].environmentName == environment.environmentName) {
					environment = this.estimate.environments[i];
					break;
				}
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
				if(this.estimate.environments.length == 0) {
					alert("Classification을 추가할 Environment가 없습니다. Envorinment를 추가하세요");
					return;
				}
			}
			this.editedApps = Object.assign({}, this.defaultApps);
			this.editedAppsItem = Object.assign({}, this.defaultAppsItem);
			this.appsDialog = true;
			this.isNewAppsItem = true;
		},
		editAppsItem(environmentName, productIndex, serviceIndex, appIndex, appItem) {
			this.editedApps.environmentIndex = this.findEnvironmentIndex(environmentName);
			this.editedApps.productIndex = productIndex;
			this.editedApps.serviceIndex = serviceIndex;
			this.editedApps.index = appIndex;
			
			this.editedAppsItem = Object.assign({}, appItem);
			this.appsDialog = true;
			this.isNewAppsItem = false;
		},
		deleteAppsItem(environmentName, productIndex, serviceIndex, appIndex, appItem) {
			const environmentIndex = this.findEnvironmentIndex(environmentName);
			
			if(confirm('삭제하시겠습니까?')) {
				this.estimate.environments[environmentIndex].products[productIndex].services[serviceIndex].classifications.splice(appIndex, 1);
				
				if(this.estimate.environments[environmentIndex].products[productIndex].services[serviceIndex].classifications.length == 0) {
					this.estimate.environments[environmentIndex].products[productIndex].services.splice(serviceIndex, 1);
				}
				
				if(this.estimate.environments[environmentIndex].products[productIndex].services.length == 0) {
					this.estimate.environments[environmentIndex].products.splice(productIndex, 1);
				}
				
				if(this.estimate.environments[environmentIndex].products.length == 0) {
					this.estimate.environments.splice(environmentIndex, 1);
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
				this.$set(this.estimate.environments[this.editedApps.environmentIndex].products[this.editedApps.productIndex].services[this.editedApps.serviceIndex].classifications, this.editedApps.index, this.editedAppsItem);
			
			} else {
				// new
				var environmentIndex = this.findEnvironmentIndex(this.editedAppsItem.environmentName);
				
				var productIndex = this.findProductIndex(this.estimate.environments[environmentIndex].products, this.editedAppsItem.productName);
				if(productIndex == -1) {
					var product = {};
					product.productId = this.editedAppsItem.productId;
					product.productName = this.editedAppsItem.productName;
					product.services = new Array();
					this.estimate.environments[environmentIndex].products.push(product);
					productIndex = this.estimate.environments[environmentIndex].products.length -1;
				}
				
				var serviceIndex = this.findServiceIndex(this.estimate.environments[environmentIndex].products[productIndex].services, this.editedAppsItem.serviceName);
				if(serviceIndex == -1) {
					var service = {};
					service.serviceName = this.editedAppsItem.serviceName;
					service.classifications = new Array();
					this.estimate.environments[environmentIndex].products[productIndex].services.push(service);
					serviceIndex = this.estimate.environments[environmentIndex].products[productIndex].services.length -1;
				}
				
				this.estimate.environments[environmentIndex].products[productIndex].services[serviceIndex].classifications.push(this.editedAppsItem);
			}
			
			this.closeAppsDialog();
			this.$emit('fire-estimate-changed');
		},
		findEnvironmentIndex(environmentName) {
			var environments = this.estimate.environments;
			for(var i = 0; i < environments.length; i++) {
				if(environments[i].environmentName == environmentName) {
					return i;
				}
			}
			return -1;
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
