<template>
	<div>
        <v-card>
          <v-card-text>
            
		   <v-data-table
		    class="elevation-1"
		    v-model="selected"
		    :headers="headers"
		    :items="services"
		    item-key="serviceName"
		    select-all
		    hide-actions>
		    
			<template v-slot:headers="props">
			  <tr>
			    <th :class="headerClass"></th>
				<th :class="headerClass">Service</th>
				<th :class="headerClass">Classification</th>
				<th :class="headerClass">Type</th>
				<th :class="headerClass">Actions</th>
			  </tr>
			</template>
			
		    <template v-slot:items="props">
		      <template v-if="props.item.classifications.length == 0">
		        <tr>
		          <td>
		            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
		          </td>
		          <td class="text-xs-left">{{ props.item.serviceName }}</td>
			      <td class="text-xs-left"></td>
			      <td class="text-xs-center"></td>
			      <td class="justify-center layout px-0"></td>
		        </tr>
		      </template>
		      <template v-else>
		        <template v-for="(classification, index) in props.item.classifications">
		        <tr>
		          <td v-if="index == 0" v-bind:rowspan="props.item.classifications.length">
		            <v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
		          </td>
		          <td class="text-xs-left" v-if="index == 0" v-bind:rowspan="props.item.classifications.length">{{ props.item.serviceName }}</td>
			      <td class="text-xs-left">{{ classification.classificationName }}</td>
			      <td class="text-xs-center">{{ classification.classificationType }}</td>
				  <td class="justify-center layout px-0">
					<v-icon small class="mr-2" @click="editAppsItem(props.item, classification, index)" >edit</v-icon>
					<v-icon small @click="deleteAppItem(props.item, classification, index)">delete</v-icon>
				  </td>
		        </tr>
		        </template>
		      </template>
		    </template>
			<template v-slot:no-data>
  			  <td class="text-xs-center" colspan="5">
    			No data available
  			  </td>
			</template>
		  </v-data-table>
 
          </v-card-text>
		  <v-card-actions>
		    <v-btn small left color="primary" @click="openServiceDialog">Service 추가</v-btn>
		    <v-btn small left color="primary" @click="deleteService" v-bind:disabled="selected.length == 0">Service 삭제</v-btn>
		    <v-btn small left color="primary" @click="openAppsDialog" v-bind:disabled="selected.length != 1">Classification 추가</v-btn>
		  </v-card-actions>
        </v-card>
		  
	 	<v-dialog v-model="serviceDialog" max-width="500px">
	 	    <ValidationObserver ref="obs2">
		      <v-card slot-scope="{ invalid, validated }">
		        <v-card-title>Service 추가</v-card-title>
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
				    <VTextFieldWithValidation rules="required|max:50" data-vv-name="classificationName" v-model="editedAppsItem.classificationName" label="Classification"/>
			      </v-flex>
			      <v-flex xs12>
		            <VSelectWithValidation
		              rules="required"
		              data-vv-name="classificationType"
		              v-model="editedAppsItem.classificationType"
		              :items="classificationTypeItems"
		              label="Classification Type"
		            />
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
		'services',
		'classificationTypeItems',
		'title'
	],
	computed: {
		formTitle () {
			return this.editedAppsIndex === -1 ? 'Classification 추가' : 'Classification 수정';
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
		},
		
		openServiceDialog() {
			this.selected = [];
			this.editedServIndex = -1;
			this.editedServItem = Object.assign({}, this.defaultServItem);
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
					for(var i = 0; i < this.services.length; i++) {
						if(this.services[i].serviceName == this.editedServItem.serviceName) {
							alert('존재하는 Service입니다. 다시 입력하세요.');
							return;
						}
					}
					
					this.services.push(this.editedServItem);
					this.services[this.services.length -1].classifications = new Array();
					this.closeServiceDialog();
				}
			});
		},
		deleteService() {
			if(confirm('삭제하시겠습니까?')) {
				for(var i = 0; i < this.selected.length; i++) {
					const index = this.services.indexOf(this.selected[i]);
					this.services.splice(index, 1);
				}
				
				this.selected = [];
			}
		},
		
		openAppsDialog() {
			if(this.selected.length == 1) {
				this.editedServIndex = this.services.indexOf(this.selected[0]);
				this.editedAppsIndex = -1;
				this.editedAppsItem = Object.assign({}, this.defaultAppsItem);
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
		editAppsItem (servItem, appItem, appIndex) {
			this.editedServIndex = this.services.indexOf(servItem);
			this.editedAppsIndex = appIndex;
			this.editedAppsItem = Object.assign({}, appItem);
			this.applicationDialog = true;
		},
		saveAppsDialog () {
			this.$refs.obs.validate().then(valid => {
				if(valid) {
					if (this.editedAppsIndex > -1) {
						this.$set(this.services[this.editedServIndex].classifications, this.editedAppsIndex, this.editedAppsItem);
					} else {
						this.services[this.editedServIndex].classifications.push(this.editedAppsItem);
					}
					this.closeAppsDialog();
				}
			});
		},
		deleteAppItem(servItem, appItem, appIndex) {
			const servIndex = this.services.indexOf(servItem);
			confirm('삭제하시겠습니까?') && this.services[servIndex].classifications.splice(appIndex, 1);
		}
	}
}
</script>

<style>
</style>
