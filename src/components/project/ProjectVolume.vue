<template>
	<div>
        <v-card>
		  <v-card-text>
			  <v-data-table
				:headers="headers"
				:items="volumes.environments"
				item-key="name"
				class="elevation-1"
				v-model="selected"
				select-all
				hide-actions
			  >
				<template v-slot:headers="props">
				  <tr>
				  	<th :class="headerClass" rowspan="3"></th>
					<th :class="headerClass" rowspan="3">Environment</th>
					<th :class="headerClass" rowspan="3">Application</th>
					<th :class="headerClass" colspan="2">Application</th>
					<th :class="headerClass" rowspan="3">Replication<br>Count</th>
					<th :class="headerClass" colspan="4">POD별 설정</th>
					<th :class="headerClass" colspan="4">POD별 총량</th>
					<th :class="headerClass" rowspan="3">Actions</th>
				  </tr>
				  <tr>
					<th :class="headerClass" colspan="2">Memory</th>
					<th :class="headerClass" colspan="2">Memory</th>
					<th :class="headerClass" colspan="2">CPU</th>
					<th :class="headerClass" colspan="2">Memory</th>
					<th :class="headerClass" colspan="2">CPU</th>
				  </tr>
				  <tr>
					<th :class="headerClass">Min</th>
					<th :class="headerClass">Max</th>
					<th :class="headerClass">Requests</th>
					<th :class="headerClass">Limits</th>
					<th :class="headerClass">Requests</th>
					<th :class="headerClass">Limits</th>
					<th :class="headerClass">Requests</th>
					<th :class="headerClass">Limits</th>
					<th :class="headerClass">Requests</th>
					<th :class="headerClass">Limits</th>
				  </tr>
				</template>
				<template v-slot:items="props">
				  <template v-if="props.item.applications.length == 0">
				  	<tr>
		          	  <td>
		            	<v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
		          	  </td>
				      <td class="text-xs-left">{{ props.item.name }}</td>
					  <td class="text-xs-left"></td>
					  <td class="text-xs-left"></td>
					  <td class="text-xs-left"></td>
					  <td class="text-xs-center"></td>
					  <td class="text-xs-center"></td>
					  <td class="text-xs-center"></td>
					  <td class="text-xs-center"></td>
					  <td class="text-xs-center"></td>
					  <td class="text-xs-center"></td>
					  <td class="text-xs-center"></td>
					  <td class="text-xs-center"></td>
					  <td class="text-xs-right"></td>
					  <td class="justify-center layout px-0"></td>
				    </tr>
				  </template>
				  <template v-else>
				  <template v-for="(application, index) in props.item.applications">
				  	<tr>
		          	  <td v-if="index == 0" v-bind:rowspan="props.item.applications.length + 1">
		            	<v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
		          	  </td>
				      <td class="text-xs-left" v-if="index == 0" v-bind:rowspan="props.item.applications.length + 1">{{ props.item.name }}</td>
					  <td class="text-xs-left">{{ application.appName }}</td>
					  <td class="text-xs-right">{{ application.appMemoryMin | formatNumber }}</td>
					  <td class="text-xs-right">{{ application.appMemoryMax | formatNumber }}</td>
					  <td class="text-xs-right">{{ application.replicaCount | formatNumber }}</td>
					  <td class="text-xs-right">{{ application.podMemoryRequest | formatNumber }}</td>
					  <td class="text-xs-right">{{ application.podMemoryLimit | formatNumber }}</td>
					  <td class="text-xs-right">{{ application.podCpuRequest | formatNumber }}</td>
					  <td class="text-xs-right">{{ application.podCpuLimit | formatNumber }}</td>
					  <td class="text-xs-right">{{ application.podMemoryRequestSum | formatNumber }}</td>
					  <td class="text-xs-right">{{ application.podMemoryLimitSum | formatNumber }}</td>
					  <td class="text-xs-right">{{ application.podCpuRequestSum | formatNumber }}</td>
					  <td class="text-xs-right">{{ application.podCpuLimitSum | formatNumber }}</td>
					  <td class="justify-center layout px-0">
						<v-icon small class="mr-2" @click="editAppsItem(props.item, application, index)">edit</v-icon>
						<v-icon small @click="deleteAppsItem(props.item, application, index)">delete</v-icon>
					  </td>
				    </tr>
				  </template>
				  
				  <tr>
				      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-right" colspan="8">소계</td>
					  <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-center">Memory (GB)</td>
					  <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-right">{{props.item.sumMemory | formatNumber}}</td>
					  <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-center">CPU (Core)</td>
					  <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-right">{{props.item.sumCpu | formatNumber}}</td>
					  <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-right">
					  </td>
			      </tr>
				  </template>
				</template>
				
			    <template v-slot:footer>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-right" colspan="10">합계</td>
				  <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-center">Memory (GB)</td>
				  <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-right">{{volumes.sumMemory | formatNumber}}</td>
				  <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-center">CPU (Core)</td>
				  <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-right">{{volumes.sumCpu | formatNumber}}</td>
				  <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-right">
				  </td>
			    </template>
				<template v-slot:no-data>
      			  <td class="text-xs-center" colspan="15">
        			{{ no_data_text }}
      			  </td>
    			</template>
			  </v-data-table>
	      </v-card-text>
 	      <v-card-actions>
		    <v-btn small left color="primary" @click="openClusterDialog">Environment 추가</v-btn>
		    <v-btn small left color="primary" @click="editCluster" v-bind:disabled="selected.length != 1">Environment 수정</v-btn>
		    <v-btn small left color="primary" @click="deleteCluster" v-bind:disabled="selected.length == 0">Environment 삭제</v-btn>
		    <v-btn small left color="primary" @click="openAppsDialog" v-bind:disabled="selected.length != 1">Application 추가</v-btn>
		    <v-spacer></v-spacer>
		    <v-btn right color="primary" @click="save">저장</v-btn>
	      </v-card-actions>
        </v-card>
        
	 	<v-dialog v-model="clusterDialog" max-width="500px">
	 	  <ValidationObserver ref="obs2">
		    <v-card slot-scope="{ invalid, validated }">
		      <v-card-title>{{ formClusterDialogTitle }}</v-card-title>
			  <v-card-text>
			    <v-flex xs12>
				  <VTextFieldWithValidation rules="required|max:10" data-vv-name="name" v-model="editedItem.name" label="Environment"/>
			    </v-flex>
			  </v-card-text>
			  <v-card-actions>
			    <v-spacer></v-spacer>
			    <v-btn color="blue darken-1" flat @click="closeClusterDialog">취소</v-btn>
			    <v-btn color="blue darken-1" flat @click="saveClusterDialog" v-bind:disabled="invalid">저장</v-btn>
			  </v-card-actions>
		    </v-card>
		  </ValidationObserver>
		</v-dialog>

		<v-dialog v-model="appsDialog" max-width="400px">
		  <ValidationObserver ref="obs">
		    <v-card slot-scope="{ invalid, validated }">
			  <v-card-title>{{ formDialogTitle }}</v-card-title>
			  <v-card-text>
			    <v-container grid-list-md>
				  <v-layout wrap>
				    <v-flex xs12>
					  <VTextFieldWithValidation rules="required|max:50" data-vv-name="appName" v-model="editedAppsItem.appName" label="Application"/>
				    </v-flex>
				    <v-flex xs12>
				  	  <VTextFieldWithValidation rules="numeric" data-vv-name="appMemoryMin" v-model.number="editedAppsItem.appMemoryMin" label="Application Memory Min"/>
				    </v-flex>
				    <v-flex xs12>
					  <VTextFieldWithValidation rules="numeric" data-vv-name="appMemoryMax" v-model.number="editedAppsItem.appMemoryMax" label="Application Memory Max"/>
				    </v-flex>
				    <v-flex xs12>
					  <VTextFieldWithValidation rules="numeric" data-vv-name="replicaCount" v-model.number="editedAppsItem.replicaCount" label="Replication Count"/>
				    </v-flex>
				    <v-flex xs12>
					  <VTextFieldWithValidation rules="numeric" data-vv-name="podMemoryRequest" v-model.number="editedAppsItem.podMemoryRequest" label="POD Memory Requests"/>
				    </v-flex>
				    <v-flex xs12>
					  <VTextFieldWithValidation rules="numeric" data-vv-name="podMemoryLimit" v-model.number="editedAppsItem.podMemoryLimit" label="POD Memory Limits"/>
				    </v-flex>
				    <v-flex xs12>
					  <VTextFieldWithValidation rules="numeric" data-vv-name="podCpuRequest" v-model.number="editedAppsItem.podCpuRequest" label="POD CPU Requests"/>
				    </v-flex>
				    <v-flex xs12>
					  <VTextFieldWithValidation rules="numeric" data-vv-name="podCpuLimit" v-model.number="editedAppsItem.podCpuLimit" label="POD CPU Limits"/>
				    </v-flex>
				  </v-layout>
			    </v-container>
			  </v-card-text>
			  <v-card-actions>
			    <v-spacer></v-spacer>
			    <v-btn color="blue darken-1" flat @click="closeAppsDialog">취소</v-btn>
			    <v-btn color="blue darken-1" flat @click="saveAppsDialog" v-bind:disabled="invalid">저장</v-btn>
			  </v-card-actions>
		    </v-card>
		  </ValidationObserver>
		</v-dialog>
		
	</div>
</template>

<script>
export default {
	data: () => ({
	  	headers: [],
		headerClass: "grey lighten-1 body-2 text-weight-bold",
	  	no_data_text: 'No data available',
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
		'projectId'
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
					this.$emit('fire-saved');
				})
			}
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
			this.$refs.obs2.reset();
			setTimeout(() => {
				this.selected = [];
				this.editedIndex = -1;
				this.editedItem = Object.assign({}, this.defaultItem);
			}, 300);
		},
		saveClusterDialog() {
			this.$refs.obs2.validate().then(valid => {
				if(valid) {
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
				}
			});
		},
		deleteCluster() {
			if(confirm('삭제하시겠습니까?')) {
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
			this.$refs.obs.reset();
			setTimeout(() => {
				this.editedIndex = -1;
				this.editedAppsItem = Object.assign({}, this.defaultAppsItem);
				this.editedAppsIndex = -1;
			}, 300);
		},
		saveAppsDialog () {
			this.$refs.obs.validate().then(valid => {
				if(valid) {
					if (this.editedAppsIndex > -1) {
						this.$set(this.volumes.environments[this.editedIndex].applications, this.editedAppsIndex, this.editedAppsItem);
					} else {
						this.volumes.environments[this.editedIndex].applications.push(this.editedAppsItem);
					}
					this.calcAppSum(this.editedAppsItem);
					this.summary();
					this.closeAppsDialog();
				}
			});
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
