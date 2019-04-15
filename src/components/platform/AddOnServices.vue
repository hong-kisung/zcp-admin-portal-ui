<template>
	<div>
        <v-card>
          <v-card-text>
            
		   <v-data-table
		    class="elevation-1"
		    v-model="selected"
		    :headers="headers"
		    :items="addonService.services"
		    item-key="serviceName"
		    select-all
		    hide-actions>
		    
			<template v-slot:headers="props">
			  <tr>
			    <th :class="headerClass"></th>
				<th :class="headerClass">Service</th>
				<th :class="headerClass">Application</th>
				<th :class="headerClass">CPU(Millicore)</th>
				<th :class="headerClass">Memory(MB)</th>
				<th :class="headerClass">Disk(GB)</th>
				<th :class="headerClass">Storage Type</th>
				<th :class="headerClass">Backup(Y/N)</th>
				<th :class="headerClass">Etc</th>
				<th :class="headerClass">Actions</th>
			  </tr>
			</template>
		    <template v-slot:items="props">
		    
		      <template v-if="props.item.applications.length == 0">
		        <tr>
		          <td>
		            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
		          </td>
		          <td class="font-weight-bold text-xs-center">{{ props.item.serviceName }}</td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-left">소계</td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-right">{{ props.item.cpu | formatNumber }}</td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-right">{{ props.item.memory | formatNumber }}</td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-right">{{ props.item.disk | formatNumber }}</td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-center">{{ props.item.storageType }}</td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-center">{{ props.item.backupYn }}</td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-left">{{ props.item.description }}</td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-left"></td>
		        </tr>
		      </template>
		      <template v-else>
		        <template v-for="(application, applicationIndex) in props.item.applications">
		        <tr>
		          <td v-if="applicationIndex == 0" :rowspan="props.item.applications.length + 1">
		            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
		          </td>
		          <td class="font-weight-bold text-xs-center" v-if="applicationIndex == 0" :rowspan="props.item.applications.length + 1">{{ props.item.serviceName }}</td>
			      <td class="text-xs-left">{{ application.applicationName }}</td>
			      <td class="text-xs-right">{{ application.cpu | formatNumber }}</td>
			      <td class="text-xs-right">{{ application.memory | formatNumber }}</td>
			      <td class="text-xs-right">{{ application.disk | formatNumber }}</td>
			      <td class="text-xs-center">{{ application.storageType }}</td>
			      <td class="text-xs-center">{{ application.backupYn }}</td>
			      <td class="text-xs-left">{{ application.description }}</td>
				  <td class="justify-center layout px-0">
					<v-icon small class="mr-2" @click="editAppsItem(props.item, application)" >edit</v-icon>
					<v-icon small @click="deleteApplication(props.item, application)">delete</v-icon>
				  </td>
		        </tr>
		        </template>
		
			    <tr>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-left">소계</td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-right">{{ props.item.sumCpu | formatNumber }}</td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-right">{{ props.item.sumMemory | formatNumber }}</td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-right">{{ props.item.sumDisk | formatNumber }}</td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-center"></td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-center"></td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-left"></td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-left"></td>
		        </tr>
		      </template>
		      
		    </template>
			<template v-slot:footer>
			    <tr>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-right" colspan="3">합계</td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-right">{{ addonService.totalCpu | formatNumber }}</td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-right">{{ addonService.totalMemory | formatNumber }}</td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-right">{{ addonService.totalDisk | formatNumber }}</td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-center"></td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-center"></td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-left"></td>
			      <td class="grey lighten-2 blue--text text--darken-4 font-weight-bold text-xs-left"></td>
		        </tr>
			</template>
			<template v-slot:no-data>
  			  <td class="text-xs-center" colspan="10">
    			{{ no_data_text }}
  			  </td>
			</template>
		  </v-data-table>
 
          </v-card-text>
		  <v-card-actions>
		    <v-btn small left color="primary" @click="openServiceDialog">Add-on Service 추가</v-btn>
		    <v-btn small left color="primary" @click="deleteService" v-bind:disabled="selected.length == 0">Add-on Service 삭제</v-btn>
		    <v-btn small left color="primary" @click="openAppsDialog" v-bind:disabled="selected.length != 1">Application 추가</v-btn>
		    <v-spacer></v-spacer>
		    <v-btn right color="primary" @click="saveService">저장</v-btn>
		  </v-card-actions>
        </v-card>
		  
	 	<v-dialog v-model="serviceDialog" max-width="500px">
	 	    <ValidationObserver ref="obs2">
		      <v-card slot-scope="{ invalid, validated }">
		        <v-card-title>Add-on Service 추가</v-card-title>
			    <v-card-text>
			      <v-flex xs12>
				    <VTextFieldWithValidation rules="required|max:50" data-vv-name="serviceName" v-model="editedServItem.serviceName" label="서비스명"/>
			      </v-flex>
			    </v-card-text>
			    <v-card-actions>
			      <v-spacer></v-spacer>
			      <v-btn color="blue darken-1" flat @click="closeServiceDialog">취소</v-btn>
			      <v-btn color="blue darken-1" flat @click="saveServiceDialog" v-bind:disabled="invalid">저장</v-btn>
			    </v-card-actions>
		      </v-card>
		    </ValidationObserver>
		</v-dialog>
		
	 	<v-dialog v-model="applicationDialog" max-width="400px">
	 	    <ValidationObserver ref="obs">
		      <v-card slot-scope="{ invalid, validated }">
		        <v-card-title>{{ formTitle }}</v-card-title>
			    <v-card-text>
			      <v-flex xs12>
				    <VTextFieldWithValidation rules="required|max:50" data-vv-name="applicationName" v-model="editedAppsItem.applicationName" label="Application 명"/>
			      </v-flex>
			      <v-flex xs12>
				    <VTextFieldWithValidation rules="numeric" data-vv-name="cpu" v-model.number="editedAppsItem.cpu" label="CPU (Millicore)"/>
			      </v-flex>
			      <v-flex xs12>
				    <VTextFieldWithValidation rules="numeric" data-vv-name="memory" v-model.number="editedAppsItem.memory" label="Memory (MB)"/>
			      </v-flex>
			      <v-flex xs12>
				    <VTextFieldWithValidation rules="numeric" data-vv-name="disk" v-model.number="editedAppsItem.disk" label="Disk (GB)"/>
			      </v-flex>
			      <v-flex xs12>
		            <VSelectWithValidation
		              rules=""
		              data-vv-name="storageType"
		              v-model="editedAppsItem.storageType"
		              :items="storageTypeItems"
		              label="Storage Type"
		            />
			      </v-flex>
			      <v-flex xs12>
		            <VSelectWithValidation
		              rules=""
		              data-vv-name="backupYn"
		              v-model="editedAppsItem.backupYn"
		              :items="backupYnItems"
		              label="Backup(Y/N)"
		            />
			      </v-flex>
			      <v-flex xs12>
				    <VTextFieldWithValidation rules="max:100" data-vv-name="description" v-model="editedAppsItem.description" label="Etc"/>
			      </v-flex>
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
		
		storageTypeItems: [],
		backupYnItems: [],
      	addonService: {services: [], totalCpu: 0, totalMemory: 0, totalDisk: 0},
		selected: [],

		serviceDialog: false,
      	applicationDialog: false,

      	editedServIndex: -1,
		defaultServItem: { applications: []},
		editedServItem: { applications: []},

      	editedAppsIndex: -1,
      	defaultAppsItem: {},
      	editedAppsItem: {}
	}),
	props: [
		'productId'
	],
	computed: {
		formTitle () {
			return this.editedAppsIndex === -1 ? 'Application 추가' : 'Application 수정';
		}
    },
	created () {
		this.initialize()
	},
    watch: {
		serviceDialog (val) {
			val || this.closeServiceDialog();
		},
		applicationDialog (val) {
			val || this.closeAppsDialog();
		}
    },
	methods: {
		initialize() {
			this.$http.get('/platform/product/'+ this.productId + '/service').then(response => {
				this.addonService.services = response.data;
				this.summary();
			})
			this.$http.get('/code/storage_type').then(response => {
				this.storageTypeItems = response.data;
			})
			this.$http.get('/code/backup_yn').then(response => {
				this.backupYnItems = response.data;
			})
		},
		saveService() {
			if(confirm('변경된 내용을 저장하시겠습니까?')) {
				this.$http.put('/platform/product/'+ this.productId +'/service', this.addonService.services).then(response => {
					alert("저장되었습니다.");
					this.initialize();
					this.selected = [];
				})
			}
		},
		
		openServiceDialog() {
			this.selected = [];
			this.serviceDialog = true;
		},
		closeServiceDialog() {
			this.serviceDialog = false;
			this.$refs.obs2.reset();
			setTimeout(() => {
				this.editedServItem = Object.assign({}, this.defaultServItem);
			}, 300);
		},
		saveServiceDialog() {
			this.$refs.obs2.validate().then(valid => {
				if(valid) {
					for(var i = 0; i < this.addonService.services.length; i++) {
						if(this.addonService.services[i].serviceName == this.editedServItem.serviceName) {
							alert('존재하는 Add-on Service입니다. 다시 입력하세요.');
							return;
						}
					}
					this.addonService.services.push(this.editedServItem);
					this.closeServiceDialog();
				}
			});
		},
		deleteService() {
			if(confirm('삭제하시겠습니까?')) {
				for(var i = 0; i < this.selected.length; i++) {
					const index = this.addonService.services.indexOf(this.selected[i]);
					this.addonService.services.splice(index, 1);
				}
				
				this.selected = [];
				this.summary();
			}
		},
		
		openAppsDialog() {
			if(this.selected.length == 1) {
				this.editedServIndex = this.addonService.services.indexOf(this.selected[0]);
				//this.editedAppsIndex = -1;
				//this.editedAppsItem = Object.assign({}, this.defaultAppsItem);
				this.applicationDialog = true;
			}
		},
		closeAppsDialog() {
			this.applicationDialog = false;
			this.$refs.obs.reset();
			setTimeout(() => {
				this.editedAppsItem = Object.assign({}, this.defaultAppsItem);
				this.editedServIndex = -1;
				this.editedAppsIndex = -1;
			}, 300);
		},
		editAppsItem (servItem, appItem) {
			this.editedServIndex = this.addonService.services.indexOf(servItem);
			this.editedAppsIndex = this.addonService.services[this.editedServIndex].applications.indexOf(appItem);
			this.editedAppsItem = Object.assign({}, appItem);
			this.applicationDialog = true;
		},
		saveAppsDialog () {
			this.$refs.obs.validate().then(valid => {
				if(valid) {
					if (this.editedAppsIndex > -1) {
						this.$set(this.addonService.services[this.editedServIndex].applications, this.editedAppsIndex, this.editedAppsItem);
					} else {
						this.addonService.services[this.editedServIndex].applications.push(this.editedAppsItem);
					}
					this.closeAppsDialog();
					this.summary();
				}
			});
		},
		deleteApplication(servItem, appItem) {
			const servIndex = this.addonService.services.indexOf(servItem);
			const appIndex = this.addonService.services[servIndex].applications.indexOf(appItem);
			if(confirm('삭제하시겠습니까?')) {
				this.addonService.services[servIndex].applications.splice(appIndex, 1);
				this.summary();
			}
		},
		summary() {
			this.addonService.totalCpu = 0;
			this.addonService.totalMemory = 0;
			this.addonService.totalDisk = 0;
			
			for(var i = 0; i < this.addonService.services.length; i++) {
				this.addonService.services[i].sumCpu = 0;
				this.addonService.services[i].sumMemory = 0;
				this.addonService.services[i].sumDisk = 0;
				
				for(var j = 0; j < this.addonService.services[i].applications.length; j++) {
					if(this.addonService.services[i].applications[j].cpu != undefined) this.addonService.services[i].sumCpu += this.addonService.services[i].applications[j].cpu;
					if(this.addonService.services[i].applications[j].memory != undefined) this.addonService.services[i].sumMemory += this.addonService.services[i].applications[j].memory;
					if(this.addonService.services[i].applications[j].disk != undefined) this.addonService.services[i].sumDisk += this.addonService.services[i].applications[j].disk;
				}
				
				this.addonService.totalCpu += this.addonService.services[i].sumCpu;
				this.addonService.totalMemory += this.addonService.services[i].sumMemory;
				this.addonService.totalDisk += this.addonService.services[i].sumDisk;
			}
		}
	}
}
</script>

<style>
</style>
