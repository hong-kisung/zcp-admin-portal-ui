<template>
  <b-modal centered no-close-on-backdrop title="Classification" v-model="showDialog" @hidden="closeAppsDialog" @ok="saveAppsDialog">
    <b-form>
      <b-form-group label="Classification" label-for="classificationName" label-class="astertisk" :label-cols="4" >
        <b-form-input id="classificationName" type="text" v-model="editedAppsItem.classificationName"></b-form-input>
      </b-form-group>
      <b-form-group label="Classification Type" label-for="classificationType" label-class="astertisk" :label-cols="4">
        <b-form-select id="classificationType"
          :plain="true"
          v-model="editedAppsItem.classificationType"
          v-on:change="changeClassificationType">
	        <option v-for="(item, index) in classificationTypes" :value="item">{{ item }}</option>
        </b-form-select>
      </b-form-group>
      <b-form-group label="Machine Type" label-for="iksVmName" :label-cols="4">
        <b-form-select id="iksVmName"
          :plain="true"
          :disabled="this.editedAppsItem.classificationType != 'VM'"
          v-model="editedAppsItem.iksVmName">
	        <option value=""></option>
	        <option v-for="(item, index) in vmVersion.vms" :value="item.name">{{ item.name }}</option>
        </b-form-select>
      </b-form-group>
      <b-form-group label="Hardware Type" label-for="hardwareType" :label-cols="4">
        <b-form-select id="hardwareType"
          :plain="true"
          :disabled="this.editedAppsItem.classificationType != 'VM'"
          v-model="editedAppsItem.hardwareType">
	        <option value=""></option>
	        <option v-for="(item, index) in hardwareTypeItems" :value="item">{{ item }}</option>
        </b-form-select>
      </b-form-group>
      <b-form-group label="Number" label-for="number" :label-cols="4" >
        <b-form-input id="number" type="number" v-model.number="editedAppsItem.number"></b-form-input>
      </b-form-group>
      <b-form-group label="Storage Type" label-for="storageType" :label-cols="4">
        <b-form-select id="storageType"
          :plain="true"
          :disabled="this.editedAppsItem.classificationType != 'File_Storage' && this.editedAppsItem.classificationType != 'Block_Storage'"
          v-model="editedAppsItem.storageType">
	        <option value=""></option>
	        <option v-for="(item, index) in fileStorageTypeItems" :value="item">{{ item }}</option>
        </b-form-select>
      </b-form-group>
      <b-form-group label="Storage IOPS" label-for="enduranceIops" :label-cols="4">
        <b-form-select id="enduranceIops"
          :plain="true"
          :disabled="this.editedAppsItem.classificationType != 'File_Storage' && this.editedAppsItem.classificationType != 'Block_Storage'"
          v-model="editedAppsItem.enduranceIops">
	        <option value=""></option>
	        <option v-for="(item, index) in enduranceIopsItems" :value="item">{{ item }}</option>
        </b-form-select>
      </b-form-group>
      <b-form-group label="Storage Size(GB)" label-for="iksFileStorageDisk" :label-cols="4">
        <b-form-select id="iksFileStorageDisk"
          :plain="true"
          :disabled="this.editedAppsItem.classificationType != 'File_Storage' && this.editedAppsItem.classificationType != 'Block_Storage'"
          v-model="editedAppsItem.iksFileStorageDisk">
	        <option value=""></option>
	        <option v-for="(item, index) in storageVersion.fileStorages" :value="item.disk">{{ item.disk }}</option>
        </b-form-select>
      </b-form-group>
    </b-form>
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
			this.$emit('fire-dialog-closed');
		},
		saveAppsDialog (e) {
			if(!this.editedAppsItem.classificationName) {
				alert('Classification을 입력하세요');
				e.preventDefault()
				return;
			}
			if(!this.editedAppsItem.classificationType) {
				alert('Classification Type을 선택하세요');
				e.preventDefault()
				return;
			}

			this.$emit('fire-dialog-saved');
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
