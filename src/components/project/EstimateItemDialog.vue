<template>
       <v-dialog v-model="dialog" persistent max-width="700px">
		  <ValidationObserver ref="obs">
		    <v-card slot-scope="{ invalid, validated }">
			  <v-card-title>{{ formDialogTitle }}</v-card-title>
			  <v-card-text>
			    <v-layout wrap>
				<v-flex xs4>
		          <VSelectWithValidation
		            rules="required"
		            data-vv-name="clusterName"
		            v-model="editedItem.clusterName"
		            :items="clusterItems"
		            :disabled="disabledEnv"
		            label="Environment"
		            v-on:change="changeCluster"
		            chips
		          />
				</v-flex>
				<v-flex xs4>
		          <VSelectWithValidation
		            rules="required"
		            data-vv-name="productName"
		            v-model="editedItem.productName"
		            :items="productItems"
		            :disabled="disabledEnv"
		            label="Product"
		            v-on:change="changeProduct"
		            chips
		          />
				</v-flex>
				<v-flex xs4>
		          <VSelectWithValidation
		            rules="required"
		            data-vv-name="serviceName"
		            v-model="editedItem.serviceName"
		            :items="serviceItems"
		            :disabled="disabledEnv"
		            label="Service"
		            v-on:change="changeService"
		            chips
		          />
				</v-flex>
				<v-flex xs6>
		          <VSelectWithValidation
		            rules="required"
		            data-vv-name="classificationName"
		            v-model="editedItem.classificationName"
		            :items="classificationItems"
		            :disabled="disabledEnv"
		            label="Classification"
		            v-on:change="changeClassification"
		            chips
		          />
				</v-flex>
				<v-flex xs6>
		          <VSelectWithValidation
		            rules=""
		            data-vv-name="addonIdTemp"
		            v-model="editedItem.addonIdTemp"
		            :items="addonApplicationItems"
		            item-text="applicationName"
		            item-value="id"
		            :disabled="!showaddonApplication"
		            label="Addon Application"
		            return-object
		            v-on:change="changeApplication"
		            chips
		          />
				</v-flex>

				<v-flex xs12 sm6 md6 v-show="!showLaborCostInput">
		          <VSelectWithValidation
		            rules=""
		            data-vv-name="iksVmId"
		            v-model="editedItem.iksVmIdTemp"
		            :items="vmVersion.vms"
		            item-text="name"
		            item-value="id"
		            label="Machine Type"
		            return-object
		            v-on:change="changeMachineType"
		            chips
		          />
				</v-flex>
				<v-flex xs12 sm6 md6 v-show="!showLaborCostInput">
		          <VSelectWithValidation
		            rules=""
		            data-vv-name="hardwareType"
		            v-model="editedItem.hardwareType"
		            :items="hardwareTypeItems"
		            label="Hardware Type"
		            v-on:change="changeHardwareType"
		            chips
		          />
				</v-flex>
				<v-flex xs12 sm12 md12 v-show="!showLaborCostInput">
		          <VSelectWithValidation
		            rules=""
		            data-vv-name="storageType"
		            v-model="editedItem.storageType"
		            :items="fileStorageTypeItems"
		            label="Storage Type"
		            chips
		          />
				</v-flex>
				<v-flex xs12 sm6 md6 v-show="!showLaborCostInput">
		          <VSelectWithValidation
		            rules=""
		            data-vv-name="enduranceIops"
		            v-model="editedItem.enduranceIops"
		            :items="enduranceIopsItems"
		            label="Storage Performance"
		            chips
		          />
				</v-flex>
				<v-flex xs12 sm6 md6 v-show="!showLaborCostInput">
		          <VSelectWithValidation
		            rules=""
		            data-vv-name="storageSize"
		            v-model.number="editedItem.storageSizeTemp"
		            :items="storageVersion.fileStorages"
		            item-text="disk"
		            item-value="disk"
		            label="Storage Size"
		            v-on:change="changeStorageSize"
		            chips
		          />
				</v-flex>
				<v-flex xs12 sm12 md12 v-show="!showLaborCostInput">
				  <VTextFieldWithValidation rules="numeric" data-vv-name="number" v-model.number="editedItem.number" :disabled="showLaborCostInput" label="Number"/>
				</v-flex>
				<v-flex xs12 sm12 md12 v-show="showLaborCostInput">
		          <VSelectWithValidation
		            rules=""
		            data-vv-name="mspCost"
		            v-model="editedItem.mspCost"
		            :items="mspCostItems"
		            :label="editedItem.classificationName + ' (Monthly) 선택'"
		            v-on:change="changeMspCost"
		            chips
		          />
				</v-flex>
				<v-flex xs12 sm12 md12 v-show="showLaborCostInput">
				  <VTextFieldWithValidation rules="numeric" data-vv-name="number" v-model.number="editedItem.pricePerMonthly" :label="editedItem.classificationName + ' (Monthly) 직접 입력'"/>
				</v-flex>
				</v-layout>
			  </v-card-text>
			  <v-card-actions>
			    <v-spacer></v-spacer>
			    <v-btn color="blue darken-1" flat @click="closeAppsDialog">취소</v-btn>
			    <v-btn color="blue darken-1" flat @click="saveAppsDialog" v-bind:disabled="invalid">저장</v-btn>
			  </v-card-actions>
		    </v-card>
		  </ValidationObserver>
	 	</v-dialog>
</template>
<script>
export default {
	data: () => ({
		clusterItems: [],
		productItems: [],
		serviceItems: [],
		classificationItems: [],
		clusterItemIndex: -1,
		productItemIndex: -1,
		serviceItemIndex: -1,
		classificationItemIndex: -1,

		hardwareTypeItems: [],
		fileStorageTypeItems: [],
		enduranceIopsItems: [],
		classificationTypes: [],
		mspCostItems: [],
		addonApplicationItems: [],
		
		dialog: false,
		showLaborCostInput: false,
		showaddonApplication: false
	}),
	props: [
		'editedItem',
		'estimate',
		'iksGeneral',
		'vmVersion',
		'storageVersion',
		'productMspCostVersion',
		'productReferences',
		'appsDialog',
		'isNewAppsItem',
		'estimateType'
	],
	computed: {
		formDialogTitle () {
			return this.editedItem.id === undefined ? 'Classification 추가' : 'Classification 수정';
		},
		disabledEnv () {
			return this.isNewAppsItem ? false : true;
		}
	},
	watch: {
		appsDialog: function (){
			this.dialog = this.appsDialog;
			if(this.appsDialog) {
				this.clearData();

				var clusters = this.estimate.clusters;
				for(var i = 0; i < clusters.length; i++) {
					this.clusterItems.push(clusters[i].clusterName);
				}

				if(!this.isNewAppsItem) {
					this.changeCluster(this.editedItem.clusterName);
					this.changeProduct(this.editedItem.productName);
					this.changeService(this.editedItem.serviceName);
					this.changeClassification(this.editedItem.classificationName);
					
					this.editedItem.addonIdTemp = this.editedItem.addonId;
					this.editedItem.iksVmIdTemp = this.editedItem.iksVmId;
					this.editedItem.storageSizeTemp = this.editedItem.storageSize;
				}
			}
		}
	},
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			this.$http.get('/api/code/hardware_type').then(response => {
				this.hardwareTypeItems = response.data
			})
			this.$http.get('/api/code/file_storage_type').then(response => {
				this.fileStorageTypeItems = response.data
			})
			this.$http.get('/api/code/endurance_iops').then(response => {
				this.enduranceIopsItems = response.data
			})
			this.$http.get('/api/code/classification_type').then(response => {
				this.classificationTypes = response.data
			})
			
		},
		closeAppsDialog() {
			this.dialog = false;
			this.clearData();
			this.$refs.obs.reset();
			this.$emit('fire-dialog-closed');
		},
		saveAppsDialog() {
			this.$refs.obs.validate().then(valid => {
				if(valid) {
					this.calculate();
					this.dialog = false;
					this.clearData();
					this.$refs.obs.reset();
					this.$emit('fire-dialog-saved');
				}
			});
		},
		calculate() {
			if(this.editedItem.classificationType == 'VM') {
				var vmData;
				for(var i = 0; i < this.vmVersion.vms.length; i++){
					if(this.vmVersion.vms[i].id == this.editedItem.iksVmId) {
						vmData = this.vmVersion.vms[i];
						break;
					}
				}
				
				if(vmData == undefined || this.editedItem.number == undefined || this.editedItem.number == 0) {
					this.editedItem.cores = 0;
					this.editedItem.memory = 0;
					this.editedItem.pricePerMonthly = 0;
					this.editedItem.pricePerYearly = 0;
					return;
				} else {
					this.editedItem.cores = vmData.core * this.editedItem.number;
					this.editedItem.memory = vmData.memory * this.editedItem.number;
				}
				
				if(this.editedItem.hardwareType != undefined && this.editedItem.hardwareType != "") {
					var pricePerHour = 0;
					if(this.editedItem.hardwareType == 'shared') {
						pricePerHour = vmData.sharedPricePerHour;
					} else if(this.editedItem.hardwareType == 'dedicated') {
						pricePerHour = vmData.dedicatedPricePerHour;
					}
					
					this.editedItem.pricePerMonthly = pricePerHour * 24 * 31 * (1 - this.iksGeneral.ibmDcRate/100) * this.editedItem.number;
				}
				
			} else if(this.editedItem.classificationType == 'File_Storage') {
				var storageData;
				for(var i = 0; i < this.storageVersion.fileStorages.length; i++){
					if(this.storageVersion.fileStorages[i].disk == this.editedItem.storageSize) {
						storageData = this.storageVersion.fileStorages[i];
						break;
					}
				}
				
				if(storageData == undefined || this.editedItem.enduranceIops == undefined || this.editedItem.enduranceIops == "" || this.editedItem.number == undefined || this.editedItem.number == 0) {
					this.editedItem.pricePerMonthly = 0;
					this.editedItem.pricePerYearly = 0;
					return;
				} 
				
				var pricePerHour = 0;
				if(this.editedItem.enduranceIops == 0.25) {
					pricePerHour = storageData.iops1PricePerHour;
				} else if(this.editedItem.enduranceIops == 2) {
					pricePerHour = storageData.iops2PricePerHour;
				} else if(this.editedItem.enduranceIops == 4) {
					pricePerHour = storageData.iops3PricePerHour;
				} else if(this.editedItem.enduranceIops = 10) {
					pricePerHour = storageData.iops4PricePerHour;
				}
				
				this.editedItem.pricePerMonthly = Math.ceil(pricePerHour * 24 * 31 * (1 - this.iksGeneral.ibmDcRate/100) * this.iksGeneral.exchangeRate * this.editedItem.number);

			} else if(this.editedItem.classificationType == 'IP_Allocation') {
				this.editedItem.pricePerMonthly = this.iksGeneral.ipAllocation;
				
			} else if(this.editedItem.classificationType == 'Labor_Cost') {
				//nothing
			}

			if(this.editedItem.pricePerMonthly != undefined) {
				this.editedItem.pricePerYearly = this.editedItem.pricePerMonthly * 12;
			}
		},
		clearData() {
			this.clusterItems.length = [];
			this.productItems.length = [];
			this.serviceItems.length = [];
			this.classificationItems.length = [];
			this.addonApplicationItems = [];
			this.mspCostItems.length = [];
			this.showLaborCostInput = false;
			this.showaddonApplication = false;
		},
		changeCluster(selectedItem) {
			this.productItems.length = [];
			this.serviceItems.length = [];
			this.classificationItems.length = [];
			this.addonApplicationItems.length = [];
			this.mspCostItems.length = [];
			
			this.clusterItemIndex = this.clusterItems.indexOf(selectedItem);
			for(var i = 0; i < this.productReferences.length; i++) {
				this.productItems.push(this.productReferences[i].productName);
			}
		},
		changeProduct(selectedItem) {
			this.serviceItems.length = [];
			this.classificationItems.length = [];
			this.addonApplicationItems.length = [];
			this.mspCostItems.length = [];
			
			this.productItemIndex = this.productItems.indexOf(selectedItem);
			this.editedItem.productId = this.productReferences[this.productItemIndex].productId;
			this.editedItem.productName = this.productReferences[this.productItemIndex].productName;
			
			var services;
			if(this.estimateType == 'cloudZService') {
				services = this.productReferences[this.productItemIndex].templates.cloudZService;
			} else if(this.estimateType == 'storageService') {
				services = this.productReferences[this.productItemIndex].templates.storageService;
			}
			
			for(var i = 0; i < services.length; i++) {
				this.serviceItems.push(services[i].serviceName);
			}
		},
		changeService(selectedItem) {
			this.classificationItems.length = [];
			this.addonApplicationItems.length = [];
			this.mspCostItems.length = [];
			
			this.serviceItemIndex = this.serviceItems.indexOf(selectedItem);
			var classifications;
			if(this.estimateType == 'cloudZService') {
				classifications = this.productReferences[this.productItemIndex].templates.cloudZService[this.serviceItemIndex].classifications;
			} else if(this.estimateType == 'storageService') {
				classifications = this.productReferences[this.productItemIndex].templates.storageService[this.serviceItemIndex].classifications;
			}
			
			for(var i = 0; i < classifications.length; i++) {
				this.classificationItems.push(classifications[i].classificationName);
			}
		},
		changeClassification(selectedItem) {
			this.editedItem.addonId = 0;
			this.editedItem.addonApplicationName = '';
			this.editedItem.addonIdTemp = '';
			this.addonApplicationItems.length = [];
			this.showaddonApplication = false;
			this.showLaborCostInput = false;
			
			this.classificationItemIndex = this.classificationItems.indexOf(selectedItem);
			if(this.estimateType == 'cloudZService') {
				this.editedItem.classificationType = this.productReferences[this.productItemIndex].templates.cloudZService[this.serviceItemIndex].classifications[this.classificationItemIndex].classificationType;
			} else if(this.estimateType == 'storageService') {
				this.editedItem.classificationType = this.productReferences[this.productItemIndex].templates.storageService[this.serviceItemIndex].classifications[this.classificationItemIndex].classificationType;
			}
			
			if(this.editedItem.classificationType == 'File_Storage') {
				for(var i = 0; i < this.productReferences[this.productItemIndex].services.length; i++) {
					for(var index = 0; index < this.productReferences[this.productItemIndex].services[i].applications.length; index++) {
						var app = this.productReferences[this.productItemIndex].services[i].applications[index];
						if(app.storageType == 'File' || app.storageType == 'Object') {
							this.addonApplicationItems.push(app);
						} 
					}
				}
				this.showaddonApplication = true;
				
			} else if(this.editedItem.classificationType == 'Labor_Cost') {
				var product = this.findProductFromMspCost();
				for(var i = 0; i < product.mspCosts.length; i++) {
					this.mspCostItems.push(product.mspCosts[i].cost + "원 (" + product.mspCosts[i].alias + " - " + product.mspCosts[i].memory + " 초과)"); 
				}
				this.showLaborCostInput = true;
			}
		},
		findProductFromMspCost() {
			for(var i = 0; i < this.productMspCostVersion.products.length; i++) {
				if(this.editedItem.productId == this.productMspCostVersion.products[i].id) {
					return this.productMspCostVersion.products[i];
				}
			}
		},
		changeApplication(selectedItem) {
			this.editedItem.addonId = selectedItem.id;
			this.editedItem.addonApplicationName = selectedItem.applicationName;
		},
		changeMachineType(selectedItem) {
			this.editedItem.iksVmId = selectedItem.id;
			this.editedItem.iksVmName = selectedItem.name;
		},
		changeHardwareType(selectedItem) {
		},
		changeStorageSize(selectedItem) {
			this.editedItem.storageSize = selectedItem;
		},
		changeMspCost(selectedItem) {
			var selectedIndex = this.mspCostItems.indexOf(selectedItem);
			this.editedItem.pricePerMonthly = this.findProductFromMspCost().mspCosts[selectedIndex].cost;
		}
	}
}

</script>