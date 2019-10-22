<template>
	<div>
        <b-form-group>
            <b-button variant="success" size="sm" class="mr-2" @click="openServiceDialog"><i class="icon-plus"></i> Service 추가</b-button>
            <b-button variant="danger" size="sm" class="mr-2" @click="deleteService" v-bind:disabled="selected.length == 0"><i class="icon-close"></i> Service 삭제</b-button>
            <b-button variant="success" size="sm" @click="openAppsDialog" v-bind:disabled="selected.length != 1"><i class="icon-plus"></i> Classification 추가</b-button>
        </b-form-group>
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
            <table class="table table-sm table-bordered">
                <thead>
                    <tr>
                        <th>Service</th>
                        <th>Classification</th>
                        <th>Type</th>
                        <th>Machine Type</th>
                        <th>Hardware Type</th>
                        <th>Number</th>
                        <th>Storage Type</th>
                        <th>Storage IOPS</th>
                        <th>Storage Size(GB)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                	<template v-for="(item, serviceIndex) in services">
                		<template v-if="item.classifications.length == 0">
		                    <tr>
		                        <th class="bg-dark" v-if="index == 0" :rowspan="item.classifications.length">
		                            <div class="custom-control custom-checkbox custom-control-inline">
		                                <input type="checkbox" class="custom-control-input" :id="item.serviceName" :value="item" v-model="selected" unchecked>
		                                <label class="custom-control-label" :for="item.serviceName">{{ item.serviceName }}</label>
		                            </div>
		                        </th>
		                        <td></td>
		                        <td></td>
		                        <td class="text-center"></td>
		                        <td class="text-center"></td>
		                        <td class="text-center"></td>
		                        <td class="text-center"></td>
		                        <td class="text-center"></td>
		                        <td class="text-center"></td>
		                        <td class="text-center"></td>
		                    </tr>
                		</template>
                		<template v-else>
                			<template v-for="(classification, index) in item.classifications">
			                    <tr>
			                        <th class="bg-dark" v-if="index == 0" :rowspan="item.classifications.length">
			                            <div class="custom-control custom-checkbox custom-control-inline">
			                                <input type="checkbox" class="custom-control-input" :id="item.serviceName" :value="item" v-model="selected" unchecked>
			                                <label class="custom-control-label" :for="item.serviceName">{{ item.serviceName }}</label>
			                            </div>
			                        </th>
			                        <td>{{ classification.classificationName }}</td>
			                        <td>{{ classification.classificationType }}</td>
			                        <td class="text-center">{{ classification.iksVmName }}</td>
			                        <td class="text-center">{{ classification.hardwareType }}</td>
			                        <td class="text-center">{{ classification.classificationType == 'Object_Storage' ? '' : classification.number | formatNumber }}</td>
			                        <td class="text-center">{{ classification.storageType }}</td>
			                        <td class="text-center">{{ !classification.enduranceIops || classification.enduranceIops == 0 ? '' : classification.enduranceIops + ' IOPS' }}</td>
			                        <td class="text-center">{{ classification.iksFileStorageDisk | formatNumber }}</td>
			                        <td class="text-center">
			                            <b-button variant="secondary" size="sm" class="mr-1" v-on:click="editAppsItem(serviceIndex, classification, index)"><i class="fa fa-pencil"></i></b-button>
			                            <b-button variant="danger" size="sm" class="mr-1" v-on:click="deleteAppItem(serviceIndex, classification, index)"><i class="fa fa-close"></i></b-button>
			                            <b-button variant="ghost-warning" size="sm" class="mr-1" v-on:click="moveUp(item.classifications, index)"><i class="fa fa-arrow-up"></i></b-button>
			                            <b-button variant="ghost-warning" size="sm" v-on:click="moveDown(item.classifications, index)"><i class="fa fa-arrow-down"></i></b-button>
			                        </td>
			                    </tr>
                			</template>
                		</template>
                	</template>
                </tbody>
            </table>
        </VuePerfectScrollbar>
    
        <!-- modal : Add-on Service 추가 -->
        <b-modal id="service-add-modal" title="Add-on Service" centered no-close-on-backdrop v-model="serviceDialog" @close="closeServiceDialog">
            <b-form>
                <b-form-group label="Service" label-for="serviceName" :label-cols="4" label-class="required">
                    <b-form-input type="text" id="serviceName" v-model="editedServItem.serviceName" placeholder="Service를 입력하세요." required>
                    </b-form-input>
                    <b-form-invalid-feedback id="serviceName">
                        Service를 입력하세요.
                    </b-form-invalid-feedback>
                </b-form-group>
            </b-form>
            <template v-slot:modal-footer="{ ok, cancel }">
                <b-button variant="secondary" @click="closeServiceDialog">취소</b-button>
                <b-button variant="primary" @click="saveServiceDialog"><i class="icon-check"></i> 저장</b-button>
            </template>
        </b-modal>
        <!-- // modal : Add-on Service 추가 -->
        
  		<classification-dialog 		 
  			v-bind:editedAppsItem="editedAppsItem"
 			v-bind:appsDialog="applicationDialog"
 			v-on:fire-dialog-saved="saveAppsDialog"
 			v-on:fire-dialog-closed="closeAppsDialog"
  		/>
	</div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import ClassificationDialog from './ClassificationDialog'
import perfectScrollbar from '@/mixins/perfect-scrollbar'
import swapArray from '@/mixins/swap-array'

export default {
	mixins: [swapArray, perfectScrollbar],
    components: {
        VuePerfectScrollbar, ClassificationDialog
    },
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
		'services'
	],
    computed: {
		userId : function() {
			return this.$store.getters.getUserId
		}
    },
    watch: {
		serviceDialog (val) {
			val || this.closeServiceDialog();
		},
		applicationDialog (val) {
			val || this.closeAppsDialog();
		}
    },
	created () {
		this.initialize()
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
				this.$zadmin.alert('Service를 입력하세요');
				e.preventDefault()
				return;
			}
			
			for(let service of this.services) {
				if(service.serviceName == this.editedServItem.serviceName) {
					this.$zadmin.alert('존재하는 Service입니다. 다시 입력하세요.');
					e.preventDefault()
					return;
				}
			}
			
			this.services.push(this.editedServItem);
			this.services[this.services.length -1].classifications = new Array();
			this.closeServiceDialog();
		},
		deleteService() {
			this.$zadmin.confirm('삭제하시겠습니까?', (value) => {
				if(value) {
					for(let item of this.selected) {
						const index = this.services.indexOf(item);
						this.services.splice(index, 1);
					}
					
					this.selected = [];
				}
			})
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
			if (this.editedAppsIndex > -1) {
				this.$set(this.services[this.editedServIndex].classifications, this.editedAppsIndex, this.editedAppsItem);
			} else {
				this.editedAppsItem.created = this.userId
				this.services[this.editedServIndex].classifications.push(this.editedAppsItem);
			}
			this.closeAppsDialog();
		},
		deleteAppItem(serviceIndex, appItem, appIndex) {
			this.$zadmin.confirm('삭제하시겠습니까?', (result) => {
				result && this.services[serviceIndex].classifications.splice(appIndex, 1);
			})
		}
    }
}
</script>