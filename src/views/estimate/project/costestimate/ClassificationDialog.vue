<template>
	<b-modal id="classification-add-modal" scrollable title="Classification" size="lg" centered no-close-on-backdrop v-model="showDialog" @hidden="closeAppsDialog" @ok="saveAppsDialog">
	    <b-form>
	        <b-form-group label="Product" label-for="productName" :label-cols="4" label-class="required">
	            <b-form-select id="productName" :plain="true" required v-model="editedItem.productId" :disabled="disabledEnv" @change="changeProduct">
	            	<option v-for="(item, index) in productReferences" :value="item.productId">{{ item.productName }}</option>
	            </b-form-select>
	            <b-form-invalid-feedback id="productName">
	                Product를 선택해주세요.
	            </b-form-invalid-feedback>
	        </b-form-group>
	        <b-form-group label="Service" label-for="serviceName" :label-cols="4" label-class="required">
	            <b-form-select id="serviceName" :plain="true" required v-model="editedItem.serviceName" :disabled="disabledEnv" @change="changeService">
	            	<option v-for="(item, index) in targetServices" :value="item.serviceName">{{ item.serviceName }}</option>
	            </b-form-select>
	            <b-form-invalid-feedback id="serviceName">
	                Service를 선택해주세요.
	            </b-form-invalid-feedback>
	        </b-form-group>
	        <b-form-group label="Classification" label-for="classificationName" :label-cols="4" label-class="required">
	            <b-form-select id="classificationName" :plain="true" required v-model="editedItem.classificationTemp" :disabled="disabledEnv" @change="changeClassification">
	            	<option v-for="(item, index) in selectedService.classifications" :value="item.classificationName + '|' + item.classificationType">{{ item.classificationName + ' (' + item.classificationType + ')' }}</option>
	            </b-form-select>
	            <b-form-invalid-feedback id="classificationName">
	                Classification을 선택해주세요.
	            </b-form-invalid-feedback>
	        </b-form-group>
	        <b-form-group label="Addon Application" label-for="addonId" :label-cols="4" v-show="showAddonApplication">
	            <b-form-select id="addonId" :plain="true" v-model="editedItem.addonId" @change="changeApplication">
	            	<option value=""></option>
		        	<option v-for="(item, index) in addonApplicationItems" :value="item.id">{{ item.applicationName }}</option>
	            </b-form-select>
	        </b-form-group>
	        <b-form-group label="Machine Type" label-for="iksVmId" :label-cols="4" v-show="editedItem.classificationType == 'VM'">
	            <b-form-select id="iksVmId" :plain="true" v-model="editedItem.iksVmId" @change="changeMachineType">
	            	<option value=""></option>
		        	<option v-for="(item, index) in vmVersion.vms" :value="item.id">{{ item.name }}</option>
	            </b-form-select>
	        </b-form-group>
	        <b-form-group label="Hardware Type" label-for="hardwareType" :label-cols="4" v-show="editedItem.classificationType == 'VM'">
	            <b-form-select id="hardwareType" :plain="true" v-model="editedItem.hardwareType" @change="changeHardwareType">
	            	<option value=""></option>
		        	<option v-for="(item, index) in hardwareTypeItems" :value="item">{{ item }}</option>
	            </b-form-select>
	        </b-form-group>
	
	        <b-form-group label="Storage Type" label-for="storageType" :label-cols="4" v-show="showAddonApplication && editedItem.classificationType != 'Object_Storage'">
	            <b-form-select id="storageType" :plain="true" v-model="editedItem.storageType">
	            	<option value=""></option>
		        	<option v-for="(item, index) in fileStorageTypeItems" :value="item">{{ item }}</option>
	            </b-form-select>
	        </b-form-group>
	        <b-form-group label="Storage Performance" label-for="enduranceIops" :label-cols="4" v-show="showAddonApplication && editedItem.classificationType != 'Object_Storage'">
	            <b-form-select id="enduranceIops" :plain="true" v-model="editedItem.enduranceIops">
	            	<option value=""></option>
		        	<option v-for="(item, index) in enduranceIopsItems" :value="item">{{ item }}</option>
	            </b-form-select>
	        </b-form-group>
	        <b-form-group label="Storage Size(GB)" label-for="iksFileStorageId" :label-cols="4" v-show="showAddonApplication && editedItem.classificationType != 'Object_Storage'">
	            <b-form-select id="iksFileStorageId" :plain="true" v-model.number="editedItem.iksFileStorageId" @change="changeStorageSize">
	            	<option value=""></option>
		        	<option v-for="(item, index) in storageVersion.fileStorages" :value="item.id">{{ item.disk }}</option>
	            </b-form-select>
	        </b-form-group>
	        <b-form-group label="Number" label-for="number" :label-cols="4" v-show="!showLaborCostInput && editedItem.classificationType != 'Object_Storage'">
	            <b-form-input type="number" id="number" v-model.number="editedItem.number"></b-form-input>
	        </b-form-group>
	        <b-form-group :label="editedItem.classificationName + ' 선택'" label-for="mspCost" :label-cols="4" v-show="showLaborCostInput">
	            <b-form-select id="mspCost" :plain="true" v-model="editedItem.mspCost" @change="changeMspCost">
	            	<option value=""></option>
		        	<option v-for="(item, index) in targetMspCosts" :value="item.cost">{{ item.cost + " 원 (" + item.alias + " - " + item.memory + " 초과)" }}</option>
	            </b-form-select>
	        </b-form-group>
	        <b-form-group :label="this.editedItem.classificationName + ' 직접 입력(₩)'" label-for="pricePerMonthly" :label-cols="4" v-show="showLaborCostInput">
	            <b-form-input type="number" id="pricePerMonthly" v-model.number="editedItem.pricePerMonthly"></b-form-input>
	        </b-form-group>
	    </b-form>
	    <template v-slot:modal-footer="{ ok, cancel }">
	        <b-button variant="secondary" @click="cancel()">취소</b-button>
	        <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
	    </template>
	</b-modal>
</template>

<script>
export default {
	data: () => ({
		showDialog: false,
		addonApplicationItems: [],
		
		selectedProduct: {},
		targetServices: [],
		selectedService: {},
		selectedClassification: {},
		targetMspCosts: [],
		
		showLaborCostInput: false,
		showAddonApplication: false
	}),
	props: [
		'editedItem',
		'estimate',
		'appsDialog',
		'isNewAppsItem',
		'estimateType'
	],
	computed: {
		productReferences: function() {
			return this.$store.state.estimate.productReferences
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
		hardwareTypeItems: function() {
			return this.$store.state.estimate.hardwareTypes
		},
		fileStorageTypeItems: function() {
			return this.$store.state.estimate.fileStorageTypes
		},
		enduranceIopsItems: function() {
			return this.$store.state.estimate.enduranceIops
		},
		classificationTypes: function() {
			return this.$store.state.estimate.classificationTypes
		},
		disabledEnv () {
			return this.isNewAppsItem ? false : true;
		}
	},
	watch: {
		appsDialog: function (){
			if(this.appsDialog) {
				this.showDialog = true
				this.clearData()

				if(!this.isNewAppsItem) {
					this.editedItem.classificationTemp = this.editedItem.classificationName + '|' + this.editedItem.classificationType
					this.changeProduct()
					this.changeService()
					this.changeClassification()
				}
			}
		}
	},
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
		},
		closeAppsDialog() {
			this.clearData();
			this.$emit('fire-dialog-closed');
		},
		saveAppsDialog(e) {
			if(!this.editedItem.productId || !this.editedItem.productName) {
				this.$zadmin.alert('Product를 선택하세요.')
				e.preventDefault()
				return
			}
			if(!this.editedItem.serviceName) {
				this.$zadmin.alert('Service를 선택하세요.')
				e.preventDefault()
				return
			}
			if(!this.editedItem.classificationName || !this.editedItem.classificationType) {
				this.$zadmin.alert('Classification을 선택하세요.')
				e.preventDefault()
				return
			}
			
			this.changeApplication()
			
			this.clearData();
			this.$emit('fire-dialog-saved');
		},
		clearData() {
			this.addonApplicationItems = [];
			this.targetMspCosts = [];
			this.showLaborCostInput = false;
			this.showAddonApplication = false;
		},
		changeProduct() {
			this.addonApplicationItems = [];
			this.targetMspCosts = [];
			
			this.selectedProduct = this.productReferences.find(product => product.productId === this.editedItem.productId);
			this.editedItem.productName = this.selectedProduct.productName;
			
			if(this.estimateType == 'CloudZService') {
				this.targetServices = this.selectedProduct.templates.cloudZService;
			} else if(this.estimateType == 'StorageService') {
				this.targetServices = this.selectedProduct.templates.storageService;
			}
			
			let productMspCost = this.productMspCostVersion.products.find(product => product.id === this.editedItem.productId);
			this.targetMspCosts = productMspCost.mspCosts;
		},
		changeService() {
			this.addonApplicationItems = [];
			
			this.selectedService = this.targetServices.find(service => service.serviceName === this.editedItem.serviceName);
		},
		changeClassification() {
			this.addonApplicationItems = []
			this.showAddonApplication = false
			this.showLaborCostInput = false
			
			if(!this.editedItem.classificationTemp) return
			
			//classification select box의 value = name|type
			let selected = this.editedItem.classificationTemp.split('|')
			this.editedItem.classificationName = selected[0]
			this.editedItem.classificationType = selected[1]
			
			if(this.editedItem.classificationType == 'File_Storage') {
				for(let service of this.selectedProduct.services) {
					for(let application of service.applications) {
						if(application.storageType == 'File') {
							this.addonApplicationItems.push(application)
						} 
					}
				}
				this.showAddonApplication = true
				
			} else if(this.editedItem.classificationType == 'Block_Storage') {
				for(let service of this.selectedProduct.services) {
					for(let application of service.applications) {
						if(application.storageType == 'Block') {
							this.addonApplicationItems.push(application)
						} 
					}
				}
				this.showAddonApplication = true
				
			} else if(this.editedItem.classificationType == 'Object_Storage') {
				for(let service of this.selectedProduct.services) {
					for(let application of service.applications) {
						if(application.storageType == 'Object') {
							this.addonApplicationItems.push(application)
						} 
					}
				}
				this.showAddonApplication = true
				
			} else if(this.editedItem.classificationType == 'Labor_Cost') {
				this.showLaborCostInput = true
			}
		},
		changeApplication() {
			if(this.editedItem.addonId) {
				this.editedItem.addonApplicationName = this.addonApplicationItems.find(app => app.id === this.editedItem.addonId).applicationName;
			} else {
				this.editedItem.addonId = 0;
				this.editedItem.addonApplicationName = '';
			}
		},
		changeMachineType() {
			if(this.editedItem.iksVmId) {
				this.editedItem.iksVmName = this.vmVersion.vms.find(vm => vm.id === this.editedItem.iksVmId).name;
			} else {
				this.editedItem.iksVmId = 0;
				this.editedItem.iksVmName = '';
			}
		},
		changeHardwareType() {
		},
		changeStorageSize() {
			if(this.editedItem.iksFileStorageId) {
				this.editedItem.iksFileStorageDisk = this.storageVersion.fileStorages.find(item => item.id === this.editedItem.iksFileStorageId).disk;
			} else {
				this.editedItem.iksFileStorageId = 0;
				this.editedItem.iksFileStorageDisk = 0;
			}
			
		},
		changeMspCost() {
			if(this.editedItem.mspCost) {
				this.editedItem.pricePerMonthly = this.editedItem.mspCost;
			} else {
				this.editedItem.pricePerMonthly = 0;
			}
		}
	}
}
</script>