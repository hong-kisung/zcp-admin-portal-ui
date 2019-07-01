<template>
<div>
  <b-row>
    <b-col class="text-right">
      <b-button size="sm" variant="secondary" class="m-1" @click="openServiceDialog">Service 추가</b-button>
      <b-button size="sm" variant="secondary" class="m-1" @click="deleteService" v-bind:disabled="selected.length == 0">Service 삭제</b-button>
      <b-button size="sm" variant="secondary" class="m-1" @click="openAppsDialog" v-bind:disabled="selected.length != 1">Classification 추가</b-button>
    </b-col>
  </b-row>
  <div class="table-responsive-sm">
    <table class="table b-table table-bordered table-sm">
      <thead>
        <tr>
          <th class="text-center">Service</th>
          <th class="text-center">Classification</th>
          <th class="text-center">Type</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
	    <template v-for="(item, serviceIndex) in services">
	      <template v-if="item.classifications.length == 0">
	        <tr>
	          <th class="text-left" scope="row">
	            <div class="custom-control custom-checkbox custom-control-inline">
	              <input type="checkbox" class="custom-control-input" :id="item.serviceName" :value="item" v-model="selected" unchecked>
	              <label class="custom-control-label" :for="item.serviceName">{{ item.serviceName }}</label>
	            </div>
	          </th>
		      <td class="text-left"></td>
		      <td class="text-center"></td>
		      <td class="text-left"></td>
	        </tr>
	      </template>
	      <template v-else>
	        <template v-for="(classification, index) in item.classifications">
	        <tr>
	          <th class="text-left" scope="row" v-if="index == 0" :rowspan="item.classifications.length">
	            <div class="custom-control custom-checkbox custom-control-inline">
	              <input type="checkbox" class="custom-control-input" :id="item.serviceName" :value="item" v-model="selected" unchecked>
	              <label class="custom-control-label" :for="item.serviceName">{{ item.serviceName }}</label>
	            </div>
	          </th>
		      <td class="text-left">{{ classification.classificationName }}</td>
		      <td class="text-center">{{ classification.classificationType }}</td>
			  <td class="text-center">
			    <b-link href="#" class="card-header-action" v-on:click="editAppsItem(serviceIndex, classification, index)">
			      <i class="fa fa-pencil fa-sm"></i>
                </b-link>
                <b-link href="#" class="card-header-action" v-on:click="deleteAppItem(serviceIndex, classification, index)">
			      <i class="fa fa-times fa-sm"></i>
                </b-link>
                <b-link href="#" class="card-header-action" v-on:click="moveUpAppsItem(serviceIndex, classification, index)">
			      <i class="fa fa-arrow-up fa-sm"></i>
                </b-link>
                <b-link href="#" class="card-header-action" v-on:click="moveDownAppsItem(serviceIndex, classification, index)">
			      <i class="fa fa-arrow-down fa-sm"></i>
                </b-link>
			  </td>
	        </tr>
	        </template>
	      </template>
	    </template>
      </tbody>
    </table>
  </div>

  <b-modal centered no-close-on-backdrop title="Service" v-model="serviceDialog" @close="closeServiceDialog" @cancel="closeServiceDialog" @ok="saveServiceDialog">
    <b-form>
      <b-form-group label="서비스명" label-for="serviceName" :label-cols="4" >
        <b-form-input id="serviceName" type="text" v-model="editedServItem.serviceName"></b-form-input>
      </b-form-group>
    </b-form>
  </b-modal>

  <b-modal centered no-close-on-backdrop title="Application" v-model="applicationDialog" @close="closeAppsDialog" @cancel="closeAppsDialog" @ok="saveAppsDialog">
    <b-form>
      <b-form-group label="Classification" label-for="classificationName" :label-cols="4" >
        <b-form-input id="classificationName" type="text" v-model="editedAppsItem.classificationName"></b-form-input>
      </b-form-group>
      <b-form-group label="Classification Type" label-for="classificationType" :label-cols="4">
        <b-form-select id="classificationType"
          :plain="true"
          v-model="editedAppsItem.classificationType">
	        <option value=""></option>
	        <option v-for="(item, index) in classificationTypeItems" :value="item">{{ item }}</option>
        </b-form-select>
      </b-form-group>
    </b-form>
  </b-modal>
</div>
</template>

<script>
export default {
	data: () => ({
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
		'classificationTypeItems'
	],
	computed: {
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
			setTimeout(() => {
				this.editedServItem = Object.assign({}, this.defaultServItem);
			}, 300);
		},
		saveServiceDialog(e) {
			if(!this.editedServItem.serviceName) {
				alert('서비스명 값을 입력하세요');
				e.preventDefault()
				return;
			}
			
			for(let service of this.services) {
				if(service.serviceName == this.editedServItem.serviceName) {
					alert('존재하는 Service입니다. 다시 입력하세요.');
					e.preventDefault()
					return;
				}
			}
			
			this.services.push(this.editedServItem);
			this.services[this.services.length -1].classifications = new Array();
			this.closeServiceDialog();
		},
		deleteService() {
			if(confirm('삭제하시겠습니까?')) {
				for(let item of this.selected) {
					const index = this.services.indexOf(item);
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
			setTimeout(() => {
				this.editedAppsItem = Object.assign({}, this.defaultAppsItem);
				this.editedServIndex = -1;
				this.editedAppsIndex = -1;
			}, 300);
		},
		editAppsItem (serviceIndex, appItem, appIndex) {
			this.editedServIndex = serviceIndex;
			this.editedAppsIndex = appIndex;
			this.editedAppsItem = Object.assign({}, appItem);
			this.applicationDialog = true;
		},
		saveAppsDialog (e) {
			if(!this.editedAppsItem.classificationName) {
				alert('Classification 값을 입력하세요');
				e.preventDefault()
				return;
			}
			if(!this.editedAppsItem.classificationType) {
				alert('Classification Type 값을 선택하세요');
				e.preventDefault()
				return;
			}
			
			if (this.editedAppsIndex > -1) {
				this.$set(this.services[this.editedServIndex].classifications, this.editedAppsIndex, this.editedAppsItem);
			} else {
				this.services[this.editedServIndex].classifications.push(this.editedAppsItem);
			}
			this.closeAppsDialog();
		},
		deleteAppItem(serviceIndex, appItem, appIndex) {
			confirm('삭제하시겠습니까?') && this.services[serviceIndex].classifications.splice(appIndex, 1);
		},
		moveUpAppsItem(serviceIndex, appItem, appIndex) {
			if(appIndex == 0) return
			
			const removed = this.services[serviceIndex].classifications.splice(appIndex, 1)
			this.services[serviceIndex].classifications.splice(appIndex -1 , 0, removed[0])
		},
		moveDownAppsItem(serviceIndex, appItem, appIndex) {
			if(appIndex == this.services[serviceIndex].classifications.length -1) return
			
			const removed = this.services[serviceIndex].classifications.splice(appIndex, 1)
			this.services[serviceIndex].classifications.splice(appIndex +1, 0, removed[0])
		}
	}
}
</script>

<style>
</style>
