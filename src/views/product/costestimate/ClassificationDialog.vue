<template>
    <b-modal id="classification-add-modal" scrollable title="Classification" centered no-close-on-backdrop v-model="showDialog" @hidden="closeAppsDialog" @cancel="closeAppsDialog">
        <b-form>
            <b-form-group label="Classification" label-for="classificationName" :label-cols="4" label-class="required">
                <b-form-input type="text" id="classificationName" v-model="editedAppsItem.classificationName" placeholder="Classification을 입력해주세요." required></b-form-input>
                <b-form-invalid-feedback id="classificationName">
                    Classification을 입력해주세요.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Classification Type" label-for="classificationType" :label-cols="4" label-class="required">
                <b-form-select id="classificationType" :plain="true" required v-model="editedAppsItem.classificationType" v-on:change="changeClassificationType">
                	<option v-for="(item, index) in classificationTypes" :value="item">{{ item }}</option>
                </b-form-select>
                <b-form-invalid-feedback id="classificationType">
                    Classification Type을 선택해주세요.
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Machine Type" label-for="machineType" :label-cols="4">
                <b-form-select id="machineType" :plain="true" v-model="editedAppsItem.iksVmName" :disabled="this.editedAppsItem.classificationType != 'VM'">
                	<option value=""></option>
	        		<option v-for="(item, index) in vmVersion.vms" :value="item.name">{{ item.name }}</option>
                </b-form-select>
            </b-form-group>
            <b-form-group label="Hardware Type" label-for="hardwareType" :label-cols="4">
                <b-form-select id="hardwareType" :plain="true" v-model="editedAppsItem.hardwareType" :disabled="this.editedAppsItem.classificationType != 'VM'">
                	<option value=""></option>
	        		<option v-for="(item, index) in hardwareTypeItems" :value="item">{{ item }}</option>
                </b-form-select>
            </b-form-group>
            <b-form-group label="Number" label-for="number" :label-cols="4">
                <b-form-input type="number" id="number" v-model.number="editedAppsItem.number"></b-form-input>
            </b-form-group>
            <b-form-group label="Storage Type" label-for="storageType" :label-cols="4">
                <b-form-select id="storageType" :plain="true" v-model="editedAppsItem.storageType" :disabled="this.editedAppsItem.classificationType != 'File_Storage' && this.editedAppsItem.classificationType != 'Block_Storage'">
            		<option value=""></option>
	        		<option v-for="(item, index) in fileStorageTypeItems" :value="item">{{ item }}</option>
            	</b-form-select>
            </b-form-group>
            <b-form-group label="Storage IOPS" label-for="enduranceIops" :label-cols="4">
                <b-form-select id="enduranceIops" :plain="true" v-model="editedAppsItem.enduranceIops" :disabled="this.editedAppsItem.classificationType != 'File_Storage' && this.editedAppsItem.classificationType != 'Block_Storage'">
            		<option value=""></option>
	        		<option v-for="(item, index) in enduranceIopsItems" :value="item">{{ item }}</option>
            	</b-form-select>
            </b-form-group>
            <b-form-group label="Storage Size(GB)" label-for="iksFileStorageId" :label-cols="4">
                <b-form-select id="iksFileStorageId" :plain="true" v-model="editedAppsItem.iksFileStorageDisk" :disabled="this.editedAppsItem.classificationType != 'File_Storage' && this.editedAppsItem.classificationType != 'Block_Storage'">
                	<option value=""></option>
	        		<option v-for="(item, index) in storageVersion.fileStorages" :value="item.disk">{{ item.disk }}</option>
                </b-form-select>
            </b-form-group>
        </b-form>
        <template v-slot:modal-footer="{ ok, cancel }">
            <b-button variant="secondary" @click="closeAppsDialog">취소</b-button>
            <b-button variant="primary" @click="saveAppsDialog"><i class="icon-check"></i> 저장</b-button>
        </template>
    </b-modal>
</template>

<script>
export default {
	data: () => ({
		showDialog: false
	}),
	props: [
		'editedAppsItem',
		'appsDialog'
	],
	computed: {
		classificationTypes: function() {
			return this.$store.state.estimate.classificationTypes
		},
		vmVersion: function() {
			return this.$store.state.estimate.vm
		},
		storageVersion: function() {
			return this.$store.state.estimate.storage
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
		userId : function() {
			return this.$store.getters.getUserId
		}
    },
	created () {
		this.initialize()
	},
    watch: {
		appsDialog: function (){
			if(this.appsDialog) {
				this.showDialog = true
			}
		}
    },
	methods: {
		initialize() {
		},
		closeAppsDialog() {
			this.showDialog = false
			this.$emit('fire-dialog-closed')
		},
		saveAppsDialog (e) {
			if(!this.editedAppsItem.classificationName) {
				this.$zadmin.alert('Classification을 입력하세요')
				e.preventDefault()
				return
			}
			if(!this.editedAppsItem.classificationType) {
				this.$zadmin.alert('Classification Type을 선택하세요')
				e.preventDefault()
				return
			}

			this.showDialog = false
			this.$emit('fire-dialog-saved')
		},
		changeClassificationType() {
			if(this.editedAppsItem.classificationType == 'VM') {
				this.editedAppsItem.storageType = ''
				this.editedAppsItem.enduranceIops = 0
				this.editedAppsItem.iksFileStorageDisk = 0
				
			} else if(this.editedAppsItem.classificationType == 'File_Storage' || this.editedAppsItem.classificationType == 'Block_Storage') {
				this.editedAppsItem.iksVmName = ''
				this.editedAppsItem.hardwareType = ''
				
			} else {
				this.editedAppsItem.iksVmName = ''
				this.editedAppsItem.hardwareType = ''

				this.editedAppsItem.storageType = ''
				this.editedAppsItem.enduranceIops = 0
				this.editedAppsItem.iksFileStorageDisk = 0
			}
		}
	}
}
</script>