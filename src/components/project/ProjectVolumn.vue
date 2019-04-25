<template>
	<div>
        <v-card>
		  <v-card-text>
			  <v-data-table
				:headers="headers"
				:items="volumns.clusters"
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
						<v-icon small class="mr-2" @click="editAppsItem(props.item, application)">edit</v-icon>
						<v-icon small @click="deleteAppsItem(props.item, application)">delete</v-icon>
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
				  <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-right">{{volumns.sumMemory | formatNumber}}</td>
				  <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-center">CPU (Core)</td>
				  <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-right">{{volumns.sumCpu | formatNumber}}</td>
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
		    <v-btn small left color="primary" @click="deleteCluster" v-bind:disabled="selected.length == 0">Environment 삭제</v-btn>
		    <v-btn small left color="primary" @click="openAppsDialog" v-bind:disabled="selected.length != 1">Application 추가</v-btn>
		    <v-spacer></v-spacer>
		    <v-btn right color="primary" @click="save">저장</v-btn>
	      </v-card-actions>
        </v-card>
        
	 	<v-dialog v-model="clusterDialog" max-width="500px">
	 	  <ValidationObserver ref="obs2">
		    <v-card slot-scope="{ invalid, validated }">
		      <v-card-title>Environment 추가</v-card-title>
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
  		volumns: {},
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
		formDialogTitle () {
			return this.editedIndex === -1 ? 'Application 추가' : 'Application 수정';
		}
	},
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			this.$http.get('/api/project/' + this.projectId + '/volumn').then(response => {
				this.volumns = response.data;
			})
		},
		save() {
			if(confirm('변경된 내용을 저장하시겠습니까?')) {
				this.$http.put('/api/project/' + this.projectId + '/volumn', this.volumns).then(response => {
					alert("저장되었습니다.");
					this.initialize();
					this.selected = [];
				})
			}
		},
		openClusterDialog() {
			this.selected = [];
			this.clusterDialog = true;
		},
		closeClusterDialog() {
			this.clusterDialog = false;
			this.$refs.obs2.reset();
			setTimeout(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
			}, 300);
		},
		saveClusterDialog() {
			this.$refs.obs2.validate().then(valid => {
				if(valid) {
					for(var i = 0; i < this.volumns.clusters.length; i++) {
						if(this.volumns.clusters[i].name == this.editedItem.name) {
							alert('존재하는 Environment입니다. 다시 입력하세요.');
							return;
						}
					}
					this.volumns.clusters.push(this.editedItem);
					this.closeClusterDialog();
				}
			});
		},
		deleteCluster() {
			if(confirm('삭제하시겠습니까?')) {
				for(var i = 0; i < this.selected.length; i++) {
					const index = this.volumns.clusters.indexOf(this.selected[i]);
					this.volumns.clusters.splice(index, 1);
				}
				
				this.selected = [];
				this.calcTotalSum();
			}
		},
		
		openAppsDialog() {
			this.editedIndex = this.volumns.clusters.indexOf(this.selected[0]);
			//this.editedIndex = -1;
			//this.editedItem = Object.assign({}, this.defaultItem);
			this.appsDialog = true;
		},
		editAppsItem(item, appItem) {
			this.editedIndex = this.volumns.clusters.indexOf(item);
			this.editedAppsIndex = this.volumns.clusters[this.editedIndex].applications.indexOf(appItem);
			this.editedAppsItem = Object.assign({}, appItem);
			this.appsDialog = true;
		},
		deleteAppsItem(item, appItem) {
			const index = this.volumns.clusters.indexOf(item);
			const appIndex = this.volumns.clusters[index].applications.indexOf(appItem);
			if(confirm('삭제하시겠습니까?')) {
				this.volumns.clusters[index].applications.splice(appIndex, 1);
				this.calcTotalSum();
			}
		},
		closeAppsDialog () {
			this.appsDialog = false;
			this.$refs.obs.reset();
			setTimeout(() => {
				this.editedAppsItem = Object.assign({}, this.defaultAppsItem);
				this.editedServIndex = -1;
				this.editedAppsIndex = -1;
			}, 300);
		},
		saveAppsDialog () {
			this.$refs.obs.validate().then(valid => {
				if(valid) {
					if (this.editedAppsIndex > -1) {
						this.$set(this.volumns.clusters[this.editedIndex].applications, this.editedAppsIndex, this.editedAppsItem);
					} else {
						this.volumns.clusters[this.editedIndex].applications.push(this.editedAppsItem);
					}
					this.calcAppSum(this.editedAppsItem);
					this.calcTotalSum();
					this.closeAppsDialog();
				}
			});
		},
		
		calcTotalSum() {
			var sumMemory = 0;
			var sumCpu = 0;
			this.volumns.clusters.forEach(function(cluster, index) {
				cluster.applications.forEach(function(app, index) {
					if(app.podMemoryLimitSum != undefined) sumMemory += app.podMemoryLimitSum;
					if(app.podMemoryLimitSum != undefined) sumCpu += app.podCpuLimitSum;
				});
			});

			this.volumns.sumMemory = Math.ceil(sumMemory/1024);
			this.volumns.sumCpu = sumCpu/1000;
		},
		calcAppSum(application) {
			if(application.replicaCount == undefined)  {
				return;
			}
			
			if(application.podMemoryRequest != undefined) application.podMemoryRequestSum = application.replicaCount * application.podMemoryRequest;
			if(application.podMemoryLimit != undefined) application.podMemoryLimitSum = application.replicaCount * application.podMemoryLimit;
			if(application.podCpuRequest != undefined) application.podCpuRequestSum = application.replicaCount * application.podCpuRequest;
			if(application.podCpuLimit != undefined) application.podCpuLimitSum = application.replicaCount * application.podCpuLimit;
		}
	}
}
</script>

<style>
</style>
