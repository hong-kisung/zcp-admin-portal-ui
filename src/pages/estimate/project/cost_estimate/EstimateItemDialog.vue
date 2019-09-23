<template>
<b-modal size="lg" centered no-close-on-backdrop title="Classification" v-model="showDialog" @hidden="closeAppsDialog" @ok="saveAppsDialog">
  <b-form>
      <div class="form-group row mt-3">
        <label for="productName" class="col-md-4 col-form-label astertisk">Product</label>
        <div class="col-md-8">
	      <select class="custom-select custom-select-md" id="productName" v-model="editedItem.productId" :disabled="disabledEnv" @change="changeProduct">
	        <option v-for="(item, index) in productReferences" :value="item.productId">{{ item.productName }}</option>
	      </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="serviceName" class="col-md-4 col-form-label astertisk">Service</label>
        <div class="col-md-8">
	      <select class="custom-select custom-select-md" id="serviceName" v-model="editedItem.serviceName" :disabled="disabledEnv" @change="changeService">
	        <option v-for="(item, index) in targetServices" :value="item.serviceName">{{ item.serviceName }}</option>
	      </select>
	    </div>
      </div>
      <div class="form-group row">
        <label for="classificationName" class="col-md-4 col-form-label astertisk">Classification</label>
        <div class="col-md-8">
	      <select class="custom-select custom-select-md" id="classificationName" v-model="editedItem.classificationTemp" :disabled="disabledEnv" @change="changeClassification">
	        <option v-for="(item, index) in selectedService.classifications" :value="item.classificationName + '|' + item.classificationType">{{ item.classificationName + ' (' + item.classificationType + ')' }}</option>
	      </select>
        </div>
      </div>
      <div class="form-group row" v-show="showAddonApplication">
        <label for="addonId" class="col-md-4 col-form-label">Addon Application</label>
        <div class="col-md-8">
	      <select class="custom-select custom-select-md" id="addonId" v-model="editedItem.addonId" @change="changeApplication">
	        <option value=""></option>
	        <option v-for="(item, index) in addonApplicationItems" :value="item.id">{{ item.applicationName }}</option>
	      </select>
	    </div>
      </div>
      <div class="form-group row" v-show="editedItem.classificationType == 'VM'">
        <label for="iksVmId" class="col-md-4 col-form-label">Machine Type</label>
        <div class="col-md-8">
	      <select class="custom-select custom-select-md" id="iksVmId" v-model="editedItem.iksVmId" @change="changeMachineType">
	        <option value=""></option>
	        <option v-for="(item, index) in vmVersion.vms" :value="item.id">{{ item.name }}</option>
	      </select>
	    </div>
      </div>
      <div class="form-group row" v-show="editedItem.classificationType == 'VM'">
        <label for="hardwareType" class="col-md-4 col-form-label">Hardware Type</label>
        <div class="col-md-8">
	      <select class="custom-select custom-select-md" id="hardwareType" v-model="editedItem.hardwareType" @change="changeHardwareType">
	        <option value=""></option>
	        <option v-for="(item, index) in hardwareTypeItems" :value="item">{{ item }}</option>
	      </select>
	    </div>
      </div>
      <div class="form-group row" v-show="showAddonApplication && editedItem.classificationType != 'Object_Storage'">
        <label for="storageType" class="col-md-4 col-form-label">Storage Type</label>
        <div class="col-md-8">
	      <select class="custom-select custom-select-md" id="storageType" v-model="editedItem.storageType">
	        <option value=""></option>
	        <option v-for="(item, index) in fileStorageTypeItems" :value="item">{{ item }}</option>
	      </select>
	    </div>
      </div>
      <div class="form-group row" v-show="showAddonApplication && editedItem.classificationType != 'Object_Storage'">
        <label for="enduranceIops" class="col-md-4 col-form-label">Storage Performance</label>
        <div class="col-md-8">
	      <select class="custom-select custom-select-md" id="enduranceIops" v-model="editedItem.enduranceIops">
	        <option value=""></option>
	        <option v-for="(item, index) in enduranceIopsItems" :value="item">{{ item }}</option>
	      </select>
	    </div>
      </div>
      <div class="form-group row" v-show="showAddonApplication && editedItem.classificationType != 'Object_Storage'">
        <label for="iksFileStorageId" class="col-md-4 col-form-label">Storage Size(GB)</label>
        <div class="col-md-8">
	      <select class="custom-select custom-select-md" id="iksFileStorageId" v-model.number="editedItem.iksFileStorageId" @change="changeStorageSize">
	        <option value=""></option>
	        <option v-for="(item, index) in storageVersion.fileStorages" :value="item.id">{{ item.disk }}</option>
	      </select>
	    </div>
      </div>
      <div class="form-group row" v-show="!showLaborCostInput && editedItem.classificationType != 'Object_Storage'">
        <label for="number" class="col-md-4 col-form-label">Number</label>
        <div class="col-md-8">
	      <input type="number" class="form-control form-control-md" id="number" v-model.number="editedItem.number">
	    </div>
      </div>
      <div class="form-group row" v-show="showLaborCostInput">
        <label for="mspCost" class="col-md-4 col-form-label">{{ editedItem.classificationName + ' 선택' }} </label>
        <div class="col-md-8">
	      <select class="custom-select custom-select-md" id="mspCost" v-model="editedItem.mspCost" @change="changeMspCost">
	        <option value=""></option>
	        <option v-for="(item, index) in targetMspCosts" :value="item.cost">{{ item.cost + " 원 (" + item.alias + " - " + item.memory + " 초과)" }}</option>
	      </select>
	    </div>
      </div>
      <div class="form-group row" v-show="showLaborCostInput">
        <label for="pricePerMonthly" class="col-md-4 col-form-label">{{ this.editedItem.classificationName + ' 직접 입력' }}(₩)</label>
        <div class="col-md-8">
	      <input type="number" class="form-control form-control-md" id="pricePerMonthly" v-model.number="editedItem.pricePerMonthly">
	    </div>
      </div>

  </b-form>
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
				alert('Product를 선택하세요.')
				e.preventDefault()
				return
			}
			if(!this.editedItem.serviceName) {
				alert('Service를 선택하세요.')
				e.preventDefault()
				return
			}
			if(!this.editedItem.classificationName || !this.editedItem.classificationType) {
				alert('Classification을 선택하세요.')
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