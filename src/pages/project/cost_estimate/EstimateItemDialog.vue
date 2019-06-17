<template>
<mdb-modal centered :show="appsDialog" @close="closeAppsDialog">
  <mdb-modal-body class="mx-3 grey-text">
      <h5 class="mt-1 mb-2 text-center">{{ formDialogTitle }}</h5>

      <div class="form-group row mt-3">
        <label for="productName" class="col-sm-5 col-form-label">Product</label>
        <div class="col-sm-7">
	      <select class="custom-select custom-select-sm" id="productName" v-model="editedItem.productId" :disabled="disabledEnv" @change="changeProduct">
	        <option v-for="(item, index) in productReferences" :value="item.productId">{{ item.productName }}</option>
	      </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="serviceName" class="col-sm-5 col-form-label">Service</label>
        <div class="col-sm-7">
	      <select class="custom-select custom-select-sm" id="serviceName" v-model="editedItem.serviceName" :disabled="disabledEnv" @change="changeService">
	        <option v-for="(item, index) in targetServices" :value="item.serviceName">{{ item.serviceName }}</option>
	      </select>
	    </div>
      </div>
      <div class="form-group row">
        <label for="classificationName" class="col-sm-5 col-form-label">Classification</label>
        <div class="col-sm-7">
	      <select class="custom-select custom-select-sm" id="classificationName" v-model="editedItem.classificationName" :disabled="disabledEnv" @change="changeClassification">
	        <option v-for="(item, index) in selectedService.classifications" :value="item.classificationName">{{ item.classificationName }}</option>
	      </select>
        </div>
      </div>
      <div class="form-group row" v-show="showAddonApplication">
        <label for="addonId" class="col-sm-5 col-form-label">Addon Application</label>
        <div class="col-sm-7">
	      <select class="custom-select custom-select-sm" id="addonId" v-model="editedItem.addonId" @change="changeApplication">
	        <option value=""></option>
	        <option v-for="(item, index) in addonApplicationItems" :value="item.id">{{ item.applicationName }}</option>
	      </select>
	    </div>
      </div>
      <div class="form-group row" v-show="editedItem.classificationType == 'VM'">
        <label for="iksVmId" class="col-sm-5 col-form-label">Machine Type</label>
        <div class="col-sm-7">
	      <select class="custom-select custom-select-sm" id="iksVmId" v-model="editedItem.iksVmId" @change="changeMachineType">
	        <option value=""></option>
	        <option v-for="(item, index) in vmVersion.vms" :value="item.id">{{ item.name }}</option>
	      </select>
	    </div>
      </div>
      <div class="form-group row" v-show="editedItem.classificationType == 'VM'">
        <label for="hardwareType" class="col-sm-5 col-form-label">Hardware Type</label>
        <div class="col-sm-7">
	      <select class="custom-select custom-select-sm" id="hardwareType" v-model="editedItem.hardwareType" @change="changeHardwareType">
	        <option value=""></option>
	        <option v-for="(item, index) in hardwareTypeItems" :value="item">{{ item }}</option>
	      </select>
	    </div>
      </div>
      <div class="form-group row" v-show="showAddonApplication">
        <label for="storageType" class="col-sm-5 col-form-label">Storage Type</label>
        <div class="col-sm-7">
	      <select class="custom-select custom-select-sm" id="storageType" v-model="editedItem.storageType">
	        <option value=""></option>
	        <option v-for="(item, index) in fileStorageTypeItems" :value="item">{{ item }}</option>
	      </select>
	    </div>
      </div>
      <div class="form-group row" v-show="showAddonApplication">
        <label for="enduranceIops" class="col-sm-5 col-form-label">Storage Performance</label>
        <div class="col-sm-7">
	      <select class="custom-select custom-select-sm" id="enduranceIops" v-model="editedItem.enduranceIops">
	        <option value=""></option>
	        <option v-for="(item, index) in enduranceIopsItems" :value="item">{{ item }}</option>
	      </select>
	    </div>
      </div>
      <div class="form-group row" v-show="showAddonApplication">
        <label for="iksFileStorageId" class="col-sm-5 col-form-label">Storage Size</label>
        <div class="col-sm-7">
	      <select class="custom-select custom-select-sm" id="iksFileStorageId" v-model.number="editedItem.iksFileStorageId" @change="changeStorageSize">
	        <option value=""></option>
	        <option v-for="(item, index) in storageVersion.fileStorages" :value="item.id">{{ item.disk }}</option>
	      </select>
	    </div>
      </div>
      <div class="form-group row" v-show="!showLaborCostInput">
        <label for="number" class="col-sm-5 col-form-label">Number</label>
        <div class="col-sm-7">
	      <input type="number" class="form-control form-control-sm" id="number" v-model.number="editedItem.number">
	    </div>
      </div>
      <div class="form-group row" v-show="showLaborCostInput">
        <label for="mspCost" class="col-sm-5 col-form-label">{{ editedItem.classificationName + ' 선택' }} </label>
        <div class="col-sm-7">
	      <select class="custom-select custom-select-sm" id="mspCost" v-model="editedItem.mspCost" @change="changeMspCost">
	        <option value=""></option>
	        <option v-for="(item, index) in targetMspCosts" :value="item.cost">{{ item.cost + "원 (" + item.alias + " - " + item.memory + " 초과)" }}</option>
	      </select>
	    </div>
      </div>
      <div class="form-group row" v-show="showLaborCostInput">
        <label for="pricePerMonthly" class="col-sm-5 col-form-label">{{ this.editedItem.classificationName + ' 직접 입력' }}</label>
        <div class="col-sm-7">
	      <input type="number" class="form-control form-control-sm" id="pricePerMonthly" v-model.number="editedItem.pricePerMonthly">
	    </div>
      </div>

      <div class="mt-5 text-center">
        <mdb-btn outline="primary" size="md" @click="closeAppsDialog">취소</mdb-btn>
        <mdb-btn color="primary" size="md" @click="saveAppsDialog">저장</mdb-btn>                   
      </div>
  </mdb-modal-body>
</mdb-modal>
</template>

<script>
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter } from 'mdbvue' 
import { mdbBtn, mdbInput } from 'mdbvue'

export default {
  	components: {
    	mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter,
    	mdbBtn, mdbInput
  	},
	data: () => ({
		hardwareTypeItems: [],
		fileStorageTypeItems: [],
		enduranceIopsItems: [],
		classificationTypes: [],
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
			if(this.appsDialog) {
				this.clearData();

				if(!this.isNewAppsItem) {
					this.changeProduct();
					this.changeService();
					this.changeClassification();
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
			this.clearData();
			this.$emit('fire-dialog-closed');
		},
		saveAppsDialog() {
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
			
			if(this.estimateType == 'cloudZService') {
				this.targetServices = this.selectedProduct.templates.cloudZService;
			} else if(this.estimateType == 'storageService') {
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
			this.addonApplicationItems = [];
			this.showAddonApplication = false;
			this.showLaborCostInput = false;
			
			this.selectedClassification = this.selectedService.classifications.find(classification => classification.classificationName === this.editedItem.classificationName);
			this.editedItem.classificationType = this.selectedClassification.classificationType;
			
			if(this.editedItem.classificationType == 'File_Storage') {
				for(let service of this.selectedProduct.services) {
					for(let application of service.applications) {
						if(application.storageType == 'File' || application.storageType == 'Object') {
							this.addonApplicationItems.push(application);
						} 
					}
				}
				this.showAddonApplication = true;
				
			} else if(this.editedItem.classificationType == 'Block_Storage') {
				for(let service of this.selectedProduct.services) {
					for(let application of service.applications) {
						if(application.storageType == 'Block') {
							this.addonApplicationItems.push(application);
						} 
					}
				}
				this.showAddonApplication = true;
				
			} else if(this.editedItem.classificationType == 'Labor_Cost') {
				this.showLaborCostInput = true;
			}
		},
		changeApplication() {
			console.log(this.editedItem.addonId);
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