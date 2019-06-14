<template>
<div>
  <mdb-card>
    <mdb-card-body>
	    <mdb-tbl sm bordered hover responsive>
	      <mdb-tbl-head>
	        <tr>
	          <th class="text-center" rowspan="3">Environment</th>
	          <th class="text-center" rowspan="3">Application</th>
	          <th class="text-center" colspan="2">Application</th>
	          <th class="text-center" rowspan="3">Replication<br>Count</th>
	          <th class="text-center" colspan="4">POD별 설정</th>
	          <th class="text-center" colspan="4">POD별 총량</th>
	          <th class="text-center" rowspan="3">Actions</th>
	        </tr>
	        <tr>
	          <th class="text-center" colspan="2">Memory</th>
	          <th class="text-center" colspan="2">Memory</th>
	          <th class="text-center" colspan="2">CPU</th>
	          <th class="text-center" colspan="2">Memory</th>
	          <th class="text-center" colspan="2">CPU</th>
	        </tr>
	        <tr>
	          <th class="text-center">Min</th>
	          <th class="text-center">Max</th>
	          <th class="text-center">Requests</th>
	          <th class="text-center">Limits</th>
	          <th class="text-center">Requests</th>
	          <th class="text-center">Limits</th>
	          <th class="text-center">Requests</th>
	          <th class="text-center">Limits</th>
	          <th class="text-center">Requests</th>
	          <th class="text-center">Limits</th>
	        </tr>
	      </mdb-tbl-head>
	      <mdb-tbl-body>
		    <template v-for="(item) in volumes.environments">
			  <template v-if="item.applications.length == 0">
			  	<tr>
	          	  <td class="text-left">
		            <div class="custom-control custom-checkbox custom-control-inline">
		              <input type="checkbox" class="custom-control-input" :id="item.name" :value="item" v-model="selected" unchecked>
		              <label class="custom-control-label" :for="item.name">{{ item.name }}</label>
		            </div>
	          	  </td>
				  <td class="text-left"></td>
				  <td class="text-left"></td>
				  <td class="text-left"></td>
				  <td class="text-center"></td>
				  <td class="text-center"></td>
				  <td class="text-center"></td>
				  <td class="text-center"></td>
				  <td class="text-center"></td>
				  <td class="text-center"></td>
				  <td class="text-center"></td>
				  <td class="text-center"></td>
				  <td class="text-right"></td>
				  <td class="text-center"></td>
			    </tr>
			  </template>
			  <template v-else>
				  <template v-for="(application, index) in item.applications">
				  	<tr>
				      <td class="text-left" v-if="index == 0" v-bind:rowspan="item.applications.length + 1">
			            <div class="custom-control custom-checkbox custom-control-inline">
			              <input type="checkbox" class="custom-control-input" :id="item.name" :value="item" v-model="selected" unchecked>
			              <label class="custom-control-label" :for="item.name">{{ item.name }}</label>
			            </div>
				      </td>
					  <td class="text-left">{{ application.appName }}</td>
					  <td class="text-right">{{ application.appMemoryMin | formatNumber }}</td>
					  <td class="text-right">{{ application.appMemoryMax | formatNumber }}</td>
					  <td class="text-right">{{ application.replicaCount | formatNumber }}</td>
					  <td class="text-right">{{ application.podMemoryRequest | formatNumber }}</td>
					  <td class="text-right">{{ application.podMemoryLimit | formatNumber }}</td>
					  <td class="text-right">{{ application.podCpuRequest | formatNumber }}</td>
					  <td class="text-right">{{ application.podCpuLimit | formatNumber }}</td>
					  <td class="text-right">{{ application.podMemoryRequestSum | formatNumber }}</td>
					  <td class="text-right">{{ application.podMemoryLimitSum | formatNumber }}</td>
					  <td class="text-right">{{ application.podCpuRequestSum | formatNumber }}</td>
					  <td class="text-right">{{ application.podCpuLimitSum | formatNumber }}</td>
					  <td class="text-center">
					    <a class="rotate-btn" @click="editAppsItem(item, application, index)">
					      <mdb-icon icon="pencil-alt" class="fa-md grey-text"></mdb-icon>
		                </a>
		                &nbsp;
					    <a class="rotate-btn" @click="deleteAppsItem(item, application, index)">
					      <mdb-icon icon="times" class="fa-md grey-text"></mdb-icon>
		                </a>
					  </td>
				    </tr>
				  </template>
				  
				  <tr class="grey text-right">
				      <td class="font-weight-bold" colspan="8">소계</td>
					  <td class="font-weight-bold">Memory (GB)</td>
					  <td class="font-weight-bold">{{item.sumMemory | formatNumber}}</td>
					  <td class="font-weight-bold">CPU (Core)</td>
					  <td class="font-weight-bold">{{item.sumCpu | formatNumber}}</td>
					  <td class="font-weight-bold">
					  </td>
			      </tr>
				</template>
		    </template>
  			<tr class="blue-grey text-right">
		      <td class="font-weight-bold" colspan="9">합계</td>
			  <td class="font-weight-bold">Memory (GB)</td>
			  <td class="font-weight-bold">{{volumes.sumMemory | formatNumber}}</td>
			  <td class="font-weight-bold">CPU (Core)</td>
			  <td class="font-weight-bold">{{volumes.sumCpu | formatNumber}}</td>
			  <td class="font-weight-bold">
			  </td>
  			</tr>
	      </mdb-tbl-body>
	    </mdb-tbl>
        <mdb-row>
          <mdb-col md="9" class="text-left">
	        <mdb-btn size="sm" color="secondary" @click="openClusterDialog">Environment 추가</mdb-btn>
	        <mdb-btn size="sm" color="secondary" @click="editCluster" v-bind:disabled="selected.length != 1">Environment 수정</mdb-btn>
	        <mdb-btn size="sm" color="secondary" @click="deleteCluster" v-bind:disabled="selected.length == 0">Environment 삭제</mdb-btn>
	        <mdb-btn size="sm" color="default" @click="openAppsDialog" v-bind:disabled="selected.length != 1">Application 추가</mdb-btn>
          </mdb-col>
          <mdb-col md="3" class="text-right">
            <mdb-btn size="md" outline="primary" @click="cancel">취소</mdb-btn>
	        <mdb-btn size="md" color="primary" @click="save">저장</mdb-btn>
          </mdb-col>
        </mdb-row>
    </mdb-card-body>
  </mdb-card>

  <mdb-modal :show="clusterDialog" @close="closeClusterDialog">
    <mdb-modal-body class="mx-3 grey-text">
      <h5 class="mt-1 mb-2 text-center">{{ formClusterDialogTitle }}</h5>
      <mdb-input label="Environment" v-model="editedItem.name"/>
      <div class="mt-5 text-center">
        <mdb-btn outline="primary" size="md" @click="closeClusterDialog">취소</mdb-btn>
        <mdb-btn color="primary" size="md" @click="saveClusterDialog">저장</mdb-btn>                   
      </div>
    </mdb-modal-body>
  </mdb-modal>
		  
  <mdb-modal :show="appsDialog" @close="closeAppsDialog">
    <mdb-modal-body class="mx-3 grey-text">
      <h5 class="mt-1 mb-2 text-center">{{ formDialogTitle }}</h5>
      <mdb-input type="text" label="Application" v-model="editedAppsItem.appName"/>
      <mdb-input type="number" label="Application Memory Min" v-model="editedAppsItem.appMemoryMin"/>
      <mdb-input type="number" label="Application Memory Max" v-model="editedAppsItem.appMemoryMax"/>
      <mdb-input type="number" label="Replication Count" v-model="editedAppsItem.replicaCount"/>
      <mdb-input type="number" label="POD Memory Requests" v-model="editedAppsItem.podMemoryRequest"/>
      <mdb-input type="number" label="POD Memory Limits" v-model="editedAppsItem.podMemoryLimit"/>
      <mdb-input type="number" label="POD CPU Requests" v-model="editedAppsItem.podCpuRequest"/>
      <mdb-input type="number" label="POD CPU Limits" v-model="editedAppsItem.podCpuLimit"/>
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
		projectId: 0,
  		volumes: {},
	  	selected: [],
  		clusterDialog: false,
  		appsDialog: false,
  		
	  	editedIndex: -1,
	  	editedItem: {applications: []},
	  	defaultItem: {applications: []},
	  	
      	editedAppsIndex: -1,
      	defaultAppsItem: {},
      	editedAppsItem: {}
	}),
	props: [
	],
	computed: {
		formClusterDialogTitle () {
			return this.editedIndex === -1 ? 'Environment 추가' : 'Environment 수정';
		},
		formDialogTitle () {
			return this.editedIndex === -1 ? 'Application 추가' : 'Application 수정';
		}
	},
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			if(this.$route.params.projectId) {
				this.projectId = this.$route.params.projectId;
			}
			
			this.$http.get('/api/project/' + this.projectId + '/volume').then(response => {
				this.volumes = response.data;
			})
		},
		save() {
			if(confirm('변경된 내용을 저장하시겠습니까?')) {
				this.$http.put('/api/project/' + this.projectId + '/volume', this.volumes).then(response => {
					alert("저장되었습니다.");
					this.initialize();
					this.selected = [];
				})
			}
		},
		cancel() {
			history.go(-1);
		},
		openClusterDialog() {
			this.selected = [];
			this.editedIndex = -1;
			this.editedItem = Object.assign({}, this.defaultItem);
			this.clusterDialog = true;
		},
		editCluster() {
			this.editedIndex = this.volumes.environments.indexOf(this.selected[0]);
			this.editedItem = Object.assign({}, this.selected[0]);
			this.clusterDialog = true;
		},
		closeClusterDialog() {
			this.clusterDialog = false;
			setTimeout(() => {
				this.selected = [];
				this.editedIndex = -1;
				this.editedItem = Object.assign({}, this.defaultItem);
			}, 300);
		},
		saveClusterDialog() {
			for(var i = 0; i < this.volumes.environments.length; i++) {
				if(i != this.editedIndex && this.volumes.environments[i].name == this.editedItem.name) {
					alert('존재하는 Environment입니다. 다시 입력하세요.');
					return;
				}
			}
			
			if (this.editedIndex > -1) {
				this.$set(this.volumes.environments, this.editedIndex, this.editedItem);
			} else {
				this.volumes.environments.push(this.editedItem);
				this.volumes.environments[this.volumes.environments.length -1].applications = new Array();
			}
			this.closeClusterDialog();
		},
		deleteCluster() {
			if(confirm('Environment를 삭제하면 원가견적서를 다시 작성해야 합니다. \n삭제하시겠습니까?')) {
				for(var i = 0; i < this.selected.length; i++) {
					const index = this.volumes.environments.indexOf(this.selected[i]);
					this.volumes.environments.splice(index, 1);
				}
				
				this.selected = [];
				this.summary();
			}
		},
		
		openAppsDialog() {
			if(this.selected.length == 1) {
				this.editedIndex = this.volumes.environments.indexOf(this.selected[0]);
				this.editedAppsIndex = -1;
				this.editedAppsItem = Object.assign({}, this.defaultAppsItem);
				this.appsDialog = true;
			}
		},
		editAppsItem(item, appItem, appIndex) {
			this.editedIndex = this.volumes.environments.indexOf(item);
			this.editedAppsIndex = appIndex;
			this.editedAppsItem = Object.assign({}, appItem);
			this.appsDialog = true;
		},
		deleteAppsItem(item, appItem, appIndex) {
			const index = this.volumes.environments.indexOf(item);
			if(confirm('삭제하시겠습니까?')) {
				this.volumes.environments[index].applications.splice(appIndex, 1);
				this.summary();
			}
		},
		closeAppsDialog () {
			this.appsDialog = false;
			setTimeout(() => {
				this.editedIndex = -1;
				this.editedAppsItem = Object.assign({}, this.defaultAppsItem);
				this.editedAppsIndex = -1;
			}, 300);
		},
		saveAppsDialog () {
			if (this.editedAppsIndex > -1) {
				this.$set(this.volumes.environments[this.editedIndex].applications, this.editedAppsIndex, this.editedAppsItem);
			} else {
				this.volumes.environments[this.editedIndex].applications.push(this.editedAppsItem);
			}
			this.calcAppSum(this.editedAppsItem);
			this.summary();
			this.closeAppsDialog();
		},
		
		summary() {
			this.volumes.sumMemory = 0;
			this.volumes.sumCpu = 0;
			for(var i = 0; i < this.volumes.environments.length; i++) {
				this.volumes.environments[i].sumMemory = 0;
				this.volumes.environments[i].sumCpu = 0;
			
				var sumMemory = 0;
				var sumCpu = 0;
				for(var j = 0; j < this.volumes.environments[i].applications.length; j++) {
					if(this.volumes.environments[i].applications[j].podMemoryLimitSum) sumMemory += this.volumes.environments[i].applications[j].podMemoryLimitSum;
					if(this.volumes.environments[i].applications[j].podCpuLimitSum) sumCpu += this.volumes.environments[i].applications[j].podCpuLimitSum;
				}
				
				this.volumes.environments[i].sumMemory = Math.ceil(sumMemory/1024);
				this.volumes.environments[i].sumCpu = sumCpu/1000;
				
				this.volumes.sumMemory += this.volumes.environments[i].sumMemory;
				this.volumes.sumCpu += this.volumes.environments[i].sumCpu;
			}
		},
		calcAppSum(application) {
			if(!application.replicaCount)  {
				return;
			}
			
			if(application.podMemoryRequest) application.podMemoryRequestSum = application.replicaCount * application.podMemoryRequest;
			if(application.podMemoryLimit) application.podMemoryLimitSum = application.replicaCount * application.podMemoryLimit;
			if(application.podCpuRequest) application.podCpuRequestSum = application.replicaCount * application.podCpuRequest;
			if(application.podCpuLimit) application.podCpuLimitSum = application.replicaCount * application.podCpuLimit;
		}
	}
}
</script>

<style>
</style>
