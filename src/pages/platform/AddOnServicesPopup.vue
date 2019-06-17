<template>
<div>
  <mdb-modal size="xl" :show="dialogVisible" @close="cancel" scrollable>
    <mdb-modal-body>
        <h4 class="mt-1 mb-2 text-center"><strong>Add-on Service</strong></h4>
	    <mdb-tbl sm bordered hover responsive>
	      <mdb-tbl-head>
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
	      </mdb-tbl-head>
	      <mdb-tbl-body>
	        <template v-for="(item, index) in addonService.services">
	          <template v-if="item.applications.length == 0">
		        <tr>
		          <th class="text-left" scope="row">
		            <div class="custom-control custom-checkbox custom-control-inline">
		              <input type="checkbox" class="custom-control-input" :id="item.serviceName" :value="item" v-model="selected" unchecked>
		              <label class="custom-control-label" :for="item.serviceName">{{ item.serviceName }}</label>
		            </div>
		          </th>
			      <td class="grey lighten-2 text-left">소계</td>
			      <td class="grey lighten-2 text-right">{{ item.cpu | formatNumber }}</td>
			      <td class="grey lighten-2 text-right">{{ item.memory | formatNumber }}</td>
			      <td class="grey lighten-2 text-right">{{ item.disk | formatNumber }}</td>
			      <td class="grey lighten-2 text-center">{{ item.storageType }}</td>
			      <td class="grey lighten-2 text-center">{{ item.backupYn }}</td>
			      <td class="grey lighten-2 text-left">{{ item.description }}</td>
			      <td class="grey lighten-2 text-left"></td>
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
				    <a class="rotate-btn" @click="editAppsItem(item, application, applicationIndex)">
				      <mdb-icon icon="pencil-alt" class="fa-md grey-text"></mdb-icon>
	                </a>
	                &nbsp;
				    <a class="rotate-btn" @click="deleteAppItem(item, application, applicationIndex)">
				      <mdb-icon icon="times" class="fa-md grey-text"></mdb-icon>
	                </a>
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
	      </mdb-tbl-body>
	    </mdb-tbl>
        <mdb-row>
          <mdb-col md="6" class="text-left">
	        <mdb-btn size="sm" color="secondary" @click="openServiceDialog">Add-on Service 추가</mdb-btn>
	        <mdb-btn size="sm" color="secondary" @click="deleteService" v-bind:disabled="selected.length == 0">Add-on Service 삭제</mdb-btn>
	        <mdb-btn size="sm" color="default" @click="openAppsDialog" v-bind:disabled="selected.length != 1">Application 추가</mdb-btn>
          </mdb-col>
          <mdb-col md="6" class="text-right">
	        <mdb-btn size="md" outline="primary" @click="cancel">닫기</mdb-btn>
	        <mdb-btn size="md" color="primary" @click="saveService">저장</mdb-btn>                   
          </mdb-col>
        </mdb-row>
    </mdb-modal-body>
  </mdb-modal>
		  
  <mdb-modal :show="serviceDialog" @close="closeServiceDialog">
    <mdb-modal-body class="mx-3 grey-text">
      <h5 class="mt-1 mb-2 text-center">Service 추가</h5>
      <mdb-input label="서비스명" v-model="editedServItem.serviceName"/>
      <div class="mt-5 text-center">
        <mdb-btn outline="primary" size="md" @click="closeServiceDialog">취소</mdb-btn>
        <mdb-btn color="primary" size="md" @click="saveServiceDialog">저장</mdb-btn>                   
      </div>
    </mdb-modal-body>
  </mdb-modal>
		
  <mdb-modal :show="applicationDialog" @close="closeAppsDialog">
    <mdb-modal-body class="mx-3 grey-text">
      <h5 class="mt-1 mb-2 text-center">{{ formTitle }}</h5>
      <mdb-input type="text" label="Application 명" v-model="editedAppsItem.applicationName"/>
      <mdb-input type="number" label="CPU (Millicore)" v-model="editedAppsItem.cpu"/>
      <mdb-input type="number" label="Memory (MB)" v-model="editedAppsItem.memory"/>
      <mdb-input type="number" label="Disk (GB)" v-model="editedAppsItem.disk"/>
      <div class="form-group row">
        <label for="storageType" class="col-sm-5 col-form-label">Storage Type</label>
        <div class="col-sm-7">
	      <select class="custom-select custom-select-sm" id="storageType" v-model="editedAppsItem.storageType">
	        <option value=""></option>
	        <option v-for="(item, index) in storageTypeItems" :value="item">{{ item }}</option>
	      </select>
        </div>
      </div>
      <div class="form-group row">
        <label for="backupYn" class="col-sm-5 col-form-label">Backup(Y/N)</label>
        <div class="col-sm-7">
	      <select class="custom-select custom-select-sm" id="backupYn" v-model="editedAppsItem.backupYn">
	        <option value=""></option>
	        <option v-for="(item, index) in backupYnItems" :value="item">{{ item }}</option>
	      </select>
        </div>
      </div>
      <mdb-input label="Etc" v-model="editedAppsItem.description"/>
      <div class="mt-5 text-center">
        <mdb-btn outline="primary" size="md" @click="closeAppsDialog">취소</mdb-btn>
        <mdb-btn color="primary" size="md" @click="saveAppsDialog">저장</mdb-btn>                   
      </div>
    </mdb-modal-body>
  </mdb-modal>
	
</div> 
</template>

<script>
import { mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter, mdbIcon, mdbBtn } from 'mdbvue'
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter } from 'mdbvue' 
import { mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue' 
import { mdbInput } from 'mdbvue'

export default {
  	components: {
    	mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter,
    	mdbIcon, mdbBtn,
    	mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter,
    	mdbInput,
    	mdbTbl, mdbTblHead, mdbTblBody
  	},
	data: () => ({
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
		'productId',
		'dialogVisible'
	],
    watch: {
		productId: function() {
			if(this.productId <= 0) {
				this.product = {};
				return;
			}
			
			this.getAddonService();
		},
		serviceDialog (val) {
			val || this.closeServiceDialog();
		},
		applicationDialog (val) {
			val || this.closeAppsDialog();
		}
    },
	computed: {
		formTitle () {
			return this.editedAppsIndex === -1 ? 'Application 추가' : 'Application 수정';
		}
    },
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			this.$http.get('/api/code/storage_type').then(response => {
				this.storageTypeItems = response.data;
			})
			this.$http.get('/api/code/backup_yn').then(response => {
				this.backupYnItems = response.data;
			})
			if(this.productId > 0) {
				this.getAddonService();
			}
		},
		getAddonService() {
			this.$http.get('/api/platform/product/'+ this.productId + '/service').then(response => {
				this.addonService.services = response.data;
				this.summary();
			})
		},
		saveService() {
			if(confirm('변경된 내용을 저장하시겠습니까?')) {
				this.$http.put('/api/platform/product/'+ this.productId +'/service', this.addonService.services).then(response => {
					alert("저장되었습니다.");
					this.selected = [];
				})
			}
		},
		cancel() {
			this.$emit('fire-dialog-closed');
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
		saveServiceDialog() {
			if(!this.editedServItem.serviceName) {
				alert('서비스명 값을 입력하세요');
				return;
			}
			
			for(let service of this.addonService.services) {
				if(service.serviceName == this.editedServItem.serviceName) {
					alert('존재하는 Add-on Service입니다. 다시 입력하세요.');
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
		saveAppsDialog () {
			if (!this.editedAppsItem.applicationName) {
				alert('Application명 값을 입력하세요');
				return;
			}
			
			if (this.editedAppsIndex > -1) {
				this.$set(this.addonService.services[this.editedServIndex].applications, this.editedAppsIndex, this.editedAppsItem);
			} else {
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
