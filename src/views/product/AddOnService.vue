<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">{{ addonService.name }} </h1>
        <b-card>
            <b-form-group>
                <b-button variant="success" size="sm" class="mr-2" @click="openServiceDialog"><i class="icon-plus"></i> Add-on Service 추가</b-button>
                <b-button variant="danger" size="sm" class="mr-2" @click="deleteService" v-bind:disabled="selected.length == 0"><i class="icon-close"></i> Add-on Service 삭제</b-button>
                <b-button variant="success" size="sm" @click="openAppsDialog" v-bind:disabled="selected.length != 1"><i class="icon-plus"></i> Application 추가</b-button>
            </b-form-group>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <table class="table table-sm table-bordered">
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Application</th>
                            <th>CPU(Millicore)</th>
                            <th>Memory(MB)</th>
                            <th>Disk(GB)</th>
                            <th>Storage Type</th>
                            <th>Backup(Y/N)</th>
                            <th>Etc</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr class="bg-secondary">
                            <th colspan="2" class="text-right font-weight-bold">합계</th>
                            <td class="text-right font-weight-bold">{{ addonService.totalCpu | formatNumber }}</td>
                            <td class="text-right font-weight-bold">{{ addonService.totalMemory | formatNumber }}</td>
                            <td class="text-right font-weight-bold">{{ addonService.totalDisk | formatNumber }}</td>
                            <td class="text-center font-weight-bold"></td>
                            <td class="text-center font-weight-bold"></td>
                            <td class="font-weight-bold"></td>
                            <td></td>
                        </tr>
                    </tfoot>
                    <tbody>
                    	<template v-for="(item, index) in addonService.services">
                    		<template v-if="item.applications.length == 0">
		                        <tr>
		                            <td>
		                                <div class="custom-control custom-checkbox custom-control-inline">
		                                    <input type="checkbox" class="custom-control-input" :id="item.serviceName" :value="item" v-model="selected" unchecked>
		                                    <label class="custom-control-label" :for="item.serviceName">{{ item.serviceName }}</label>
		                                </div>
		                            </td>
		                            <td class="text-right font-weight-bold bg-info">Summary</td>
		                            <td class="text-right font-weight-bold bg-info"></td>
		                            <td class="text-right font-weight-bold bg-info"></td>
		                            <td class="text-right font-weight-bold bg-info"></td>
		                            <td class="text-center bg-info"></td>
		                            <td class="text-center bg-info"></td>
		                            <td class="bg-info"></td>
		                            <td class="text-center bg-info"></td>
		                        </tr>
                    		</template>
                    		<template v-else>
		                        <tr v-for="(application, applicationIndex) in item.applications">
		                            <td v-if="applicationIndex == 0" :rowspan="item.applications.length + 1">
		                                <div class="custom-control custom-checkbox custom-control-inline">
		                                    <input type="checkbox" class="custom-control-input" :id="item.serviceName" :value="item" v-model="selected" unchecked>
		                                    <label class="custom-control-label" :for="item.serviceName">{{ item.serviceName }}</label>
		                                </div>
		                            </td>
		                            <td>{{ application.applicationName }}</td>
		                            <td class="text-right">{{ application.cpu | formatNumber }}</td>
		                            <td class="text-right">{{ application.memory | formatNumber }}</td>
		                            <td class="text-right">{{ application.disk | formatNumber }}</td>
		                            <td class="text-center">{{ application.storageType }}</td>
		                            <td class="text-center">{{ application.backupYn }}</td>
		                            <td>{{ application.description }}</td>
		                            <td class="text-center">
		                                <b-button variant="secondary" size="sm" class="mr-1" v-on:click="editAppsItem(item, application, applicationIndex)"><i class="fa fa-pencil"></i></b-button>
		                                <b-button variant="danger" size="sm" v-on:click="deleteAppItem(item, application, applicationIndex)"><i class="fa fa-close"></i></b-button>
		                            </td>
		                        </tr>
		                        <tr class="bg-info">
		                            <td class="text-right font-weight-bold">Summary</td>
		                            <td class="text-right font-weight-bold">{{ item.sumCpu | formatNumber }}</td>
		                            <td class="text-right font-weight-bold">{{ item.sumMemory | formatNumber }}</td>
		                            <td class="text-right font-weight-bold">{{ item.sumDisk | formatNumber }}</td>
		                            <td class="text-center font-weight-bold"></td>
		                            <td class="text-center font-weight-bold"></td>
		                            <td class="font-weight-bold"></td>
		                            <td class="text-center font-weight-bold"></td>
		                        </tr>
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
            
            <!-- modal : Application -->
            <b-modal id="application-modal" scrollable title="Application" centered no-close-on-backdrop v-model="applicationDialog" @close="closeAppsDialog">
                <b-form>
                    <b-form-group label="Application" label-for="applicationName" :label-cols="4" label-class="required">
                        <b-form-input type="text" id="applicationName" v-model="editedAppsItem.applicationName" required></b-form-input>
                        <b-form-invalid-feedback id="applicationName">
                            Application을 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="CPU(Millicore)" label-for="appCpu" :label-cols="4">
                        <b-form-input type="number" id="appCpu" v-model.number="editedAppsItem.cpu"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Memory(MB)" label-for="appMemory" :label-cols="4">
                        <b-form-input type="number" id="appMemory" v-model.number="editedAppsItem.memory"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Disk(GB)" label-for="appDisk" :label-cols="4">
                        <b-form-input type="number" id="appDisk" v-model.number="editedAppsItem.disk"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Storage Type" label-for="storageType" :label-cols="4">
                        <b-form-select id="storageType" :plain="true" v-model="editedAppsItem.storageType">
                        	<option value=""></option>
	        				<option v-for="(item, index) in storageTypeItems" :value="item">{{ item }}</option>
                        </b-form-select>
                    </b-form-group>
                    <b-form-group label="Backup(Y/N)e" label-for="backupYn" :label-cols="4">
                        <b-form-select id="backupYn" :plain="true" v-model="editedAppsItem.backupYn">
                        	<option value=""></option>
	        				<option v-for="(item, index) in backupYnItems" :value="item">{{ item }}</option>
                        </b-form-select>
                    </b-form-group>
                    <b-form-group label="설명" label-for="description" :label-cols="4">
                        <b-form-input type="text" id="description" v-model="editedAppsItem.description" placeholder="설명을 입력해주세요."></b-form-input>
                    </b-form-group>
                </b-form>
                <template v-slot:modal-footer="{ ok, cancel }">
                    <b-button variant="secondary" @click="closeAppsDialog">취소</b-button>
                    <b-button variant="primary" @click="saveAppsDialog"><i class="icon-check"></i> 저장</b-button>
                </template>
            </b-modal>
            <!-- // modal : Application -->
        </b-card>
        <div class="mb-4">
            <router-link :to="{ path: '/product/' }">
                <b-button variant="warning"><i class="icon-list"></i> 목록</b-button>
            </router-link>
            <b-button variant="primary" class="float-right" @click="saveService"><i class="icon-check"></i> 저장</b-button>
        </div>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
    components: {
        VuePerfectScrollbar
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
    computed: {
        psSettings: () => {
            return {
                maxScrollbarLength: 200,
                minScrollbarLength: 40,
                suppressScrollY: true,
                wheelPropagation: true,
                useBothWheelAxes: true
            }
        },
		userId : function() {
			return this.$store.getters.getUserId
		}
    },
    watch: {
		serviceDialog (val) {
			val || this.closeServiceDialog()
		},
		applicationDialog (val) {
			val || this.closeAppsDialog()
		}
    },
	created () {
		this.initialize()
	},
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        },
		initialize() {
			if(this.$route.params.productId) {
				this.productId = this.$route.params.productId
			}

			this.$http.get('/api/estimate/code/storage_type').then(response => {
				this.storageTypeItems = response.data
			})
			this.$http.get('/api/estimate/code/backup_yn').then(response => {
				this.backupYnItems = response.data
			})
			if(this.productId > 0) {
				this.getAddonService()
			}
		},
		getAddonService() {
			this.$http.get('/api/estimate/platform/product/'+ this.productId + '/service').then(response => {
				this.addonService = response.data
				this.summary()
			})
		},
		saveService() {
			this.$zadmin.confirm('저장하시겠습니까?', (result) => {
				if(result) {
					this.$http.put('/api/estimate/platform/product/'+ this.productId +'/service', this.addonService).then(response => {
						this.$zadmin.alert("저장되었습니다.")
						this.selected = []
						
						this.getAddonService()
					})
				}
			})
		},
		cancel() {
			history.go(-1);
		},
		
		openServiceDialog() {
			this.selected = []
			this.editedServIndex = -1
			this.editedServItem = Object.assign({}, this.defaultServItem)
			this.serviceDialog = true
		},
		closeServiceDialog() {
			this.serviceDialog = false
			setTimeout(() => {
				this.editedServItem = Object.assign({}, this.defaultServItem)
			}, 300)
		},
		saveServiceDialog(e) {
			if(!this.editedServItem.serviceName) {
				this.$zadmin.alert('Service를 입력하세요')
				e.preventDefault()
				return
			}
			
			for(let service of this.addonService.services) {
				if(service.serviceName == this.editedServItem.serviceName) {
					this.$zadmin.alert('존재하는Service입니다. 다시 입력하세요.')
					e.preventDefault()
					return
				}
			}
			this.addonService.services.push(this.editedServItem)
			this.addonService.services[this.addonService.services.length -1].applications = new Array()
			this.closeServiceDialog()
		},
		deleteService() {
			this.$zadmin.confirm('삭제하시겠습니까?', (result) => {
				if(result) {
					for(let item of this.selected) {
						const index = this.addonService.services.indexOf(item)
						this.addonService.services.splice(index, 1)
					}
					
					this.selected = []
					this.summary()
				}
			})
		},
		
		openAppsDialog() {
			if(this.selected.length == 1) {
				this.editedServIndex = this.addonService.services.indexOf(this.selected[0])
				this.editedAppsIndex = -1
				this.editedAppsItem = Object.assign({}, this.defaultAppsItem)
				this.applicationDialog = true
			}
		},
		closeAppsDialog() {
			this.applicationDialog = false
			setTimeout(() => {
				this.editedAppsItem = Object.assign({}, this.defaultAppsItem)
				this.editedServIndex = -1
				this.editedAppsIndex = -1
			}, 300)
		},
		editAppsItem (servItem, appItem, appIndex) {
			this.editedServIndex = this.addonService.services.indexOf(servItem)
			this.editedAppsIndex = appIndex
			this.editedAppsItem = Object.assign({}, appItem)
			this.applicationDialog = true
		},
		saveAppsDialog (e) {
			if (!this.editedAppsItem.applicationName) {
				this.$zadmin.alert('Application을 입력하세요')
				e.preventDefault()
				return
			}
			
			if (this.editedAppsIndex > -1) {
				this.$set(this.addonService.services[this.editedServIndex].applications, this.editedAppsIndex, this.editedAppsItem)
			} else {
				this.editedAppsItem.created = this.userId
				this.addonService.services[this.editedServIndex].applications.push(this.editedAppsItem)
			}
			this.closeAppsDialog()
			this.summary()
		},
		deleteAppItem(servItem, appItem, appIndex) {
			const servIndex = this.addonService.services.indexOf(servItem)
			this.$zadmin.confirm('삭제하시겠습니까?', (result) => {
				if(result) {
					this.addonService.services[servIndex].applications.splice(appIndex, 1)
					this.summary()
				}
			})
		},
		summary() {
			this.addonService.totalCpu = 0
			this.addonService.totalMemory = 0
			this.addonService.totalDisk = 0
			
			for(let service of this.addonService.services) {
				service.sumCpu = 0
				service.sumMemory = 0
				service.sumDisk = 0
				
				for(let application of service.applications) {
					if(application.cpu != undefined) service.sumCpu += application.cpu
					if(application.memory != undefined) service.sumMemory += application.memory
					if(application.disk != undefined) service.sumDisk += application.disk
				}
				
				this.addonService.totalCpu += service.sumCpu
				this.addonService.totalMemory += service.sumMemory
				this.addonService.totalDisk += service.sumDisk
			}
		}
    }
}
</script>