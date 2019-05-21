<template>
       <v-dialog v-model="dialog" persistent max-width="700px">
		  <ValidationObserver ref="obs">
		    <v-card slot-scope="{ invalid, validated }">
			  <v-card-title>{{ formDialogTitle }}</v-card-title>
			  <v-card-text>
			    <v-layout wrap>
				<v-flex xs6>
		          <VSelectWithValidation
		            rules="required"
		            data-vv-name="environmentName"
		            v-model="editedItem.environmentName"
		            :items="environmentItems"
		            :disabled="disabledEnv"
		            label="Environment"
		            v-on:change="changeEnvironment"
		            chips
		          />
				</v-flex>
				<v-flex xs6>
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
				<v-flex xs6>
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
				<v-flex xs12 v-show="showAddonApplication">
		          <VSelectWithValidation
		            rules=""
		            data-vv-name="addonIdTemp"
		            v-model="editedItem.addonIdTemp"
		            :items="addonApplicationItems"
		            item-text="applicationName"
		            item-value="id"
		            label="Addon Application"
		            return-object
		            v-on:change="changeApplication"
		            chips
		            deletable-chips
		          />
				</v-flex>

				<v-flex xs12 sm6 md6 v-show="editedItem.classificationType == 'VM'">
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
		            deletable-chips
		          />
				</v-flex>
				<v-flex xs12 sm6 md6 v-show="editedItem.classificationType == 'VM'">
		          <VSelectWithValidation
		            rules=""
		            data-vv-name="hardwareType"
		            v-model="editedItem.hardwareType"
		            :items="hardwareTypeItems"
		            label="Hardware Type"
		            v-on:change="changeHardwareType"
		            chips
		            deletable-chips
		          />
				</v-flex>
				<v-flex xs4 v-show="showAddonApplication">
		          <VSelectWithValidation
		            rules=""
		            data-vv-name="storageType"
		            v-model="editedItem.storageType"
		            :items="fileStorageTypeItems"
		            label="Storage Type"
		            chips
		            deletable-chips
		          />
				</v-flex>
				<v-flex xs4 v-show="showAddonApplication">
		          <VSelectWithValidation
		            rules=""
		            data-vv-name="enduranceIops"
		            v-model="editedItem.enduranceIops"
		            :items="enduranceIopsItems"
		            label="Storage Performance"
		            chips
		            deletable-chips
		          />
				</v-flex>
				<v-flex xs4 v-show="showAddonApplication">
		          <VSelectWithValidation
		            rules=""
		            data-vv-name="iksFileStorageId"
		            v-model.number="editedItem.iksFileStorageIdTemp"
		            :items="storageVersion.fileStorages"
		            item-text="disk"
		            item-value="id"
		            label="Storage Size"
		            return-object
		            v-on:change="changeStorageSize"
		            chips
		            deletable-chips
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
		            deletable-chips
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
		environmentItems: [],
		productItems: [],
		serviceItems: [],
		classificationItems: [],
		environmentItemIndex: -1,
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
		showAddonApplication: false
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
			return !this.editedItem.id ? 'Classification 추가' : 'Classification 수정';
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

				var environments = this.estimate.environments;
				for(var i = 0; i < environments.length; i++) {
					this.environmentItems.push(environments[i].environmentName);
				}

				if(!this.isNewAppsItem) {
					this.changeEnvironment(this.editedItem.environmentName);
					this.changeProduct(this.editedItem.productName);
					this.changeService(this.editedItem.serviceName);
					this.changeClassification(this.editedItem.classificationName);
					
					this.editedItem.addonIdTemp = this.editedItem.addonId;
					this.editedItem.iksVmIdTemp = this.editedItem.iksVmId;
					this.editedItem.iksFileStorageIdTemp = this.editedItem.iksFileStorageId;
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
					this.dialog = false;
					this.clearData();
					this.$refs.obs.reset();
					this.$emit('fire-dialog-saved');
				}
			});
		},
		clearData() {
			this.environmentItems = [];
			this.productItems = [];
			this.serviceItems = [];
			this.classificationItems = [];
			this.addonApplicationItems = [];
			this.mspCostItems = [];
			this.showLaborCostInput = false;
			this.showAddonApplication = false;
		},
		changeEnvironment(selectedItem) {
			this.productItems = [];
			this.serviceItems = [];
			this.classificationItems = [];
			this.addonApplicationItems = [];
			this.mspCostItems = [];
			
			this.environmentItemIndex = this.environmentItems.indexOf(selectedItem);
			this.editedItem.environmentId = this.estimate.environments[this.environmentItemIndex].environmentId;
			for(var i = 0; i < this.productReferences.length; i++) {
				this.productItems.push(this.productReferences[i].productName);
			}
		},
		changeProduct(selectedItem) {
			this.serviceItems = [];
			this.classificationItems = [];
			this.addonApplicationItems = [];
			this.mspCostItems = [];
			
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
			this.classificationItems = [];
			this.addonApplicationItems = [];
			this.mspCostItems = [];
			
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
			//this.editedItem.addonId = 0;
			//this.editedItem.addonApplicationName = '';
			//this.editedItem.addonIdTemp = '';
			this.addonApplicationItems = [];
			this.showAddonApplication = false;
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
				this.showAddonApplication = true;
				
			} else if(this.editedItem.classificationType == 'Block_Storage') {
				for(var i = 0; i < this.productReferences[this.productItemIndex].services.length; i++) {
					for(var index = 0; index < this.productReferences[this.productItemIndex].services[i].applications.length; index++) {
						var app = this.productReferences[this.productItemIndex].services[i].applications[index];
						if(app.storageType == 'Block') {
							this.addonApplicationItems.push(app);
						} 
					}
				}
				this.showAddonApplication = true;
				
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
			if(selectedItem) {
				this.editedItem.addonId = selectedItem.id;
				this.editedItem.addonApplicationName = selectedItem.applicationName;
			} else {
				this.editedItem.addonId = 0;
				this.editedItem.addonApplicationName = '';
			}
		},
		changeMachineType(selectedItem) {
			if(selectedItem) {
				this.editedItem.iksVmId = selectedItem.id;
				this.editedItem.iksVmName = selectedItem.name;
			} else {
				this.editedItem.iksVmId = 0;
				this.editedItem.iksVmName = '';
			}
		},
		changeHardwareType(selectedItem) {
		},
		changeStorageSize(selectedItem) {
			if(selectedItem) {
				this.editedItem.iksFileStorageId = selectedItem.id;
				this.editedItem.iksFileStorageDisk = selectedItem.disk
			} else {
				this.editedItem.iksFileStorageId = 0;
				this.editedItem.iksFileStorageDisk = 0;
			}
			
		},
		changeMspCost(selectedItem) {
			if(selectedItem) {
				var selectedIndex = this.mspCostItems.indexOf(selectedItem);
				this.editedItem.pricePerMonthly = this.findProductFromMspCost().mspCosts[selectedIndex].cost;
			} else {
				this.editedItem.pricePerMonthly = 0;
			}
		}
	}
}

</script>