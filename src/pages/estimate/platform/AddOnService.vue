<template>
<div class="animated fadeIn">
  <b-card>
    <b-row>
      <b-col>
        <div class="table-responsive-sm">
          <table class="table b-table table-bordered table-sm">
          <thead>
	        <tr>
	          <th class="text-center">Service</th>
	          <th class="text-center">Application</th>
	          <th class="text-center">CPU(Millicore)</th>
	          <th class="text-center">Memory(MB)</th>
	          <th class="text-center">Disk(GB)</th>
	          <th class="text-center">Storage Type</th>
	          <th class="text-center">Backup(Y/N)</th>
	          <th class="text-center">Etc</th>
	          <th class="text-center">Actions</th>
	        </tr>
          </thead>
          <tbody>
	        <template v-for="(item, index) in addonService.services">
	          <template v-if="item.applications.length == 0">
		        <tr>
		          <th class="text-left" scope="row">
		            <div class="custom-control custom-checkbox custom-control-inline">
		              <input type="checkbox" class="custom-control-input" :id="item.serviceName" :value="item" v-model="selected" unchecked>
		              <label class="custom-control-label" :for="item.serviceName">{{ item.serviceName }}</label>
		            </div>
		          </th>
			      <td class="text-left">소계</td>
			      <td class="text-right">{{ item.cpu | formatNumber }}</td>
			      <td class="text-right">{{ item.memory | formatNumber }}</td>
			      <td class="text-right">{{ item.disk | formatNumber }}</td>
			      <td class="text-center">{{ item.storageType }}</td>
			      <td class="text-center">{{ item.backupYn }}</td>
			      <td class="text-left">{{ item.description }}</td>
			      <td class="text-left"></td>
		        </tr>
	          </template>
	          <template v-else>
		        <tr v-for="(application, applicationIndex) in item.applications">
		          <th class="text-left" scope="row" v-if="applicationIndex == 0" :rowspan="item.applications.length + 1">
		            <div class="custom-control custom-checkbox custom-control-inline">
		              <input type="checkbox" class="custom-control-input" :id="item.serviceName" :value="item" v-model="selected" unchecked>
		              <label class="custom-control-label" :for="item.serviceName">{{ item.serviceName }}</label>
		            </div>
		          </th>
			      <td class="text-left">{{ application.applicationName }}</td>
			      <td class="text-right">{{ application.cpu | formatNumber }}</td>
			      <td class="text-right">{{ application.memory | formatNumber }}</td>
			      <td class="text-right">{{ application.disk | formatNumber }}</td>
			      <td class="text-center">{{ application.storageType }}</td>
			      <td class="text-center">{{ application.backupYn }}</td>
			      <td class="text-left">{{ application.description }}</td>
				  <td class="text-center">
				    <b-link href="#" class="card-header-action" v-on:click="editAppsItem(item, application, applicationIndex)">
				      <i class="fa fa-pencil fa-sm"></i>
	                </b-link>
	                <b-link href="#" class="card-header-action" v-on:click="deleteAppItem(item, application, applicationIndex)">
				      <i class="fa fa-times fa-sm"></i>
	                </b-link>
				  </td>
		        </tr>
			    <tr>
			      <td class="font-weight-bold text-left">소계</td>
			      <td class="font-weight-bold text-right">{{ item.sumCpu | formatNumber }}</td>
			      <td class="font-weight-bold text-right">{{ item.sumMemory | formatNumber }}</td>
			      <td class="font-weight-bold text-right">{{ item.sumDisk | formatNumber }}</td>
			      <td class="font-weight-bold text-center"></td>
			      <td class="font-weight-bold text-center"></td>
			      <td class="font-weight-bold text-left"></td>
			      <td class="font-weight-bold text-left"></td>
		        </tr>
	          </template>
	        </template>
		    <tr class="blue-grey">
		      <td class="font-weight-bold text-left" colspan="2">합계</td>
		      <td class="font-weight-bold text-right">{{ addonService.totalCpu | formatNumber }}</td>
		      <td class="font-weight-bold text-right">{{ addonService.totalMemory | formatNumber }}</td>
		      <td class="font-weight-bold text-right">{{ addonService.totalDisk | formatNumber }}</td>
		      <td class="font-weight-bold text-center"></td>
		      <td class="font-weight-bold text-center"></td>
		      <td class="font-weight-bold text-left"></td>
		      <td class="font-weight-bold text-left"></td>
	        </tr>
          </tbody>
          </table>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="9">
	    <b-button size="md" variant="secondary" class="m-1" @click="openServiceDialog">Add-on Service 추가</b-button>
	    <b-button size="md" variant="secondary" class="m-1" @click="deleteService" v-bind:disabled="selected.length == 0">Add-on Service 삭제</b-button>
	    <b-button size="md" variant="secondary" class="m-1" @click="openAppsDialog" v-bind:disabled="selected.length != 1">Application 추가</b-button>
      </b-col>
      <b-col cols="3" class="text-right">
        <b-button size="md" variant="outline-primary" class="m-1" @click="cancel">목록</b-button>
	    <b-button size="md" variant="primary" class="m-1" @click="saveService">저장</b-button>
      </b-col>
    </b-row>
  </b-card>

  <b-modal centered no-close-on-backdrop title="Service" v-model="serviceDialog" @close="closeServiceDialog" @cancel="closeServiceDialog" @ok="saveServiceDialog">
    <b-form>
      <b-form-group label="Service" label-for="serviceName" label-class="astertisk" :label-cols="4" >
        <b-form-input id="serviceName" type="text" v-model="editedServItem.serviceName"></b-form-input>
      </b-form-group>
    </b-form>
  </b-modal>
		  
  <b-modal centered no-close-on-backdrop title="Application" v-model="applicationDialog" @close="closeAppsDialog" @cancel="closeAppsDialog" @ok="saveAppsDialog">
    <b-form>
      <b-form-group label="Application" label-for="applicationName" label-class="astertisk" :label-cols="4" >
        <b-form-input id="applicationName" type="text" v-model="editedAppsItem.applicationName"></b-form-input>
      </b-form-group>
      <b-form-group label="CPU (Millicore)" label-for="cpu" :label-cols="4" >
        <b-form-input id="cpu" type="number" v-model.number="editedAppsItem.cpu"></b-form-input>
      </b-form-group>
      <b-form-group label="Memory (MB)" label-for="memory" :label-cols="4" >
        <b-form-input id="memory" type="number" v-model.number="editedAppsItem.memory"></b-form-input>
      </b-form-group>
      <b-form-group label="Disk (GB)" label-for="disk" :label-cols="4" >
        <b-form-input id="disk" type="number" v-model.number="editedAppsItem.disk"></b-form-input>
      </b-form-group>
      <b-form-group label="Storage Type" label-for="storageType" :label-cols="4">
        <b-form-select id="basicSelect"
          :plain="true"
          v-model="editedAppsItem.storageType">
	        <option value=""></option>
	        <option v-for="(item, index) in storageTypeItems" :value="item">{{ item }}</option>
        </b-form-select>
      </b-form-group>
      <b-form-group label="Backup(Y/N)" label-for="backupYn" :label-cols="4">
        <b-form-select id="backupYn"
          :plain="true"
          v-model="editedAppsItem.backupYn">
	        <option value=""></option>
	        <option v-for="(item, index) in backupYnItems" :value="item">{{ item }}</option>
        </b-form-select>
      </b-form-group>
      <b-form-group label="Etc" label-for="description" :label-cols="4" >
        <b-form-input id="description" type="text" v-model="editedAppsItem.description"></b-form-input>
      </b-form-group>
    </b-form>
  </b-modal>
</div> 
</template>

<script>
export default {
  	components: {
  	},
	data: () => ({
		productId: 0,
		storageTypeItems: [],
		backupYnItems: [],
      	addonService: {services: [], totalCpu: 0, totalMemory: 0, totalDisk: 0},
		selected: [],

		serviceDialog: false,
      	applicationDialog: false,

      	editedServIndex: -1,
		defaultServItem: { },
		editedServItem: { },

      	editedAppsIndex: -1,
      	defaultAppsItem: {},
      	editedAppsItem: {}
	}),
	props: [
	],
    watch: {
		serviceDialog (val) {
			val || this.closeServiceDialog();
		},
		applicationDialog (val) {
			val || this.closeAppsDialog();
		}
    },
	computed: {
		userId : function() {
			return this.$store.getters.getUserId
		}
    },
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			if(this.$route.params.productId) {
				this.productId = this.$route.params.productId;
			}

			this.$http.get('/api/estimate/code/storage_type').then(response => {
				this.storageTypeItems = response.data;
			})
			this.$http.get('/api/estimate/code/backup_yn').then(response => {
				this.backupYnItems = response.data;
			})
			if(this.productId > 0) {
				this.getAddonService();
			}
		},
		getAddonService() {
			this.$http.get('/api/estimate/platform/product/'+ this.productId + '/service').then(response => {
				this.addonService.services = response.data;
				this.summary();
			})
		},
		saveService() {
			if(confirm('변경된 내용을 저장하시겠습니까?')) {
				this.$http.put('/api/estimate/platform/product/'+ this.productId +'/service', this.addonService.services).then(response => {
					alert("저장되었습니다.");
					this.selected = [];
				})
			}
		},
		cancel() {
			history.go(-1);
		},
		
		openServiceDialog() {
			this.selected = [];
			this.editedServIndex = -1;
			this.editedServItem = Object.assign({}, this.defaultServItem);
			this.serviceDialog = true;
		},
		closeServiceDialog() {
			this.serviceDialog = false;
			setTimeout(() => {
				this.editedServItem = Object.assign({}, this.defaultServItem);
			}, 300);
		},
		saveServiceDialog(e) {
			if(!this.editedServItem.serviceName) {
				alert('Service를 입력하세요');
				e.preventDefault()
				return;
			}
			
			for(let service of this.addonService.services) {
				if(service.serviceName == this.editedServItem.serviceName) {
					alert('존재하는Service입니다. 다시 입력하세요.');
					e.preventDefault()
					return;
				}
			}
			this.addonService.services.push(this.editedServItem);
			this.addonService.services[this.addonService.services.length -1].applications = new Array();
			this.closeServiceDialog();
		},
		deleteService() {
			if(confirm('삭제하시겠습니까?')) {
				for(let item of this.selected) {
					const index = this.addonService.services.indexOf(item);
					this.addonService.services.splice(index, 1);
				}
				
				this.selected = [];
				this.summary();
			}
		},
		
		openAppsDialog() {
			if(this.selected.length == 1) {
				this.editedServIndex = this.addonService.services.indexOf(this.selected[0]);
				this.editedAppsIndex = -1;
				this.editedAppsItem = Object.assign({}, this.defaultAppsItem);
				this.applicationDialog = true;
			}
		},
		closeAppsDialog() {
			this.applicationDialog = false;
			setTimeout(() => {
				this.editedAppsItem = Object.assign({}, this.defaultAppsItem);
				this.editedServIndex = -1;
				this.editedAppsIndex = -1;
			}, 300);
		},
		editAppsItem (servItem, appItem, appIndex) {
			this.editedServIndex = this.addonService.services.indexOf(servItem);
			this.editedAppsIndex = appIndex;
			this.editedAppsItem = Object.assign({}, appItem);
			this.applicationDialog = true;
		},
		saveAppsDialog (e) {
			if (!this.editedAppsItem.applicationName) {
				alert('Application을 입력하세요');
				e.preventDefault()
				return;
			}
			
			if (this.editedAppsIndex > -1) {
				this.$set(this.addonService.services[this.editedServIndex].applications, this.editedAppsIndex, this.editedAppsItem);
			} else {
				this.editedAppsItem.created = this.userId
				this.addonService.services[this.editedServIndex].applications.push(this.editedAppsItem);
			}
			this.closeAppsDialog();
			this.summary();
		},
		deleteAppItem(servItem, appItem, appIndex) {
			const servIndex = this.addonService.services.indexOf(servItem);
			if(confirm('삭제하시겠습니까?')) {
				this.addonService.services[servIndex].applications.splice(appIndex, 1);
				this.summary();
			}
		},
		summary() {
			this.addonService.totalCpu = 0;
			this.addonService.totalMemory = 0;
			this.addonService.totalDisk = 0;
			
			for(let service of this.addonService.services) {
				service.sumCpu = 0;
				service.sumMemory = 0;
				service.sumDisk = 0;
				
				for(let application of service.applications) {
					if(application.cpu != undefined) service.sumCpu += application.cpu;
					if(application.memory != undefined) service.sumMemory += application.memory;
					if(application.disk != undefined) service.sumDisk += application.disk;
				}
				
				this.addonService.totalCpu += service.sumCpu;
				this.addonService.totalMemory += service.sumMemory;
				this.addonService.totalDisk += service.sumDisk;
			}
		}
	}
}
</script>

<style>
</style>
