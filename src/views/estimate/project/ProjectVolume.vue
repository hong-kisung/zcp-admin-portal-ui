<template>
    <b-tab v-bind="{ active: isActive }">
        <template slot="title">
            <i class="icon-info mr-1"></i> Sizing
        </template>
            <b-form-group>
                <b-button variant="success" size="sm" class="mr-2" @click="openClusterDialog"><i class="icon-plus"></i> Environment 추가</b-button>
                <b-button variant="secondary" size="sm" class="mr-2" @click="editCluster" v-bind:disabled="selected.length != 1"><i class="icon-reload"></i> Environment 수정</b-button>
                <b-button variant="danger" size="sm" class="mr-2" @click="deleteCluster" v-bind:disabled="selected.length == 0"><i class="icon-close"></i> Environment 삭제</b-button>
                <b-button variant="success" size="sm" @click="openAppsDialog" v-bind:disabled="selected.length != 1"><i class="icon-plus"></i> Application 추가</b-button>
            </b-form-group>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <table class="table table-sm table-bordered">
                    <thead>
                        <tr>
                            <th rowspan="3">Environment</th>
	          				<th rowspan="3">Product</th>
                            <th colspan="6">Application</th>
                            <th colspan="4">Container</th>
                            <th colspan="2">Total Size</th>
                            <th rowspan="3">Actions</th>
                        </tr>
                        <tr>
                            <th rowspan="2">Kind</th>
                            <th rowspan="2">Instance<br>Number</th>
                            <th colspan="2">CPU (Millicore)</th>
                            <th colspan="2">Memory (MB)</th>
                            <th colspan="2">CPU (Millicore)</th>
                            <th colspan="2">Memory (MB)</th>
                            <th rowspan="2">CPU (Millicore)</th>
                            <th rowspan="2">Memory (MB)</th>
                        </tr>
                        <tr>
                            <th>Min</th>
                            <th>Max</th>
                            <th>Min</th>
                            <th>Max</th>
                            <th>Request</th>
                            <th>Limit</th>
                            <th>Request</th>
                            <th>Limit</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr class="bg-gray-500">
                            <th colspan="12" class="text-right font-weight-bold">합계</th>
                            <td class="text-right font-weight-bold">{{volumes.sumCpu | formatNumber}} Core</td>
                            <td class="text-right font-weight-bold">{{volumes.sumMemory | formatNumber}} GB</td>
                            <td></td>
                        </tr>
                    </tfoot>
                    <tbody>
                    	<template v-for="(item, environmentIndex) in volumes.environments">
                    		<template v-if="item.products.length == 0">
		                        <tr>
		                            <td>
		                                <div class="custom-control custom-checkbox custom-control-inline">
		                                    <input type="checkbox" class="custom-control-input" :id="item.name" :value="item" v-model="selected">
		                                    <label class="custom-control-label" :for="item.name">{{ item.name }}</label>
		                                </div>
		                            </td>
		                            <td></td>
		                            <td class="text-center"></td>
		                            <td class="text-right"></td>
		                            <td class="text-right"></td>
		                            <td class="text-right"></td>
		                            <td class="text-right"></td>
		                            <td class="text-right"></td>
		                            <td class="text-right"></td>
		                            <td class="text-right"></td>
		                            <td class="text-right"></td>
		                            <td class="text-right"></td>
		                            <td class="text-right"></td>
		                            <td class="text-right"></td>
		                            <td class="text-center"></td>
		                        </tr>
                    		</template>
                    		<template v-else>
                    			<template v-for="(product, productIndex) in item.products">
                    				<template v-for="(application, index) in product.applications">
				                        <tr>
				                            <td v-if="productIndex == 0 && index == 0" v-bind:rowspan="getEnvironmentRowSpan(item)">
				                                <div class="custom-control custom-checkbox custom-control-inline">
				                                    <input type="checkbox" class="custom-control-input" :id="item.name" :value="item" v-model="selected">
				                                    <label class="custom-control-label" :for="item.name">{{ item.name }}</label>
				                                </div>
				                            </td>
				                            <td v-if="index == 0" v-bind:rowspan="product.applications.length + 2">{{ application.productName }}</td>
				                            <td class="text-center">{{ application.appName }}</td>
				                            <td class="text-right">{{ application.instanceNumber | formatNumber }}</td>
				                            <td class="text-right">{{ application.appCpuMin | formatNumber }}</td>
				                            <td class="text-right">{{ application.appCpuMax | formatNumber }}</td>
				                            <td class="text-right">{{ application.appMemoryMin | formatNumber }}</td>
				                            <td class="text-right">{{ application.appMemoryMax | formatNumber }}</td>
				                            <td class="text-right">{{ application.podCpuRequest | formatNumber }}</td>
				                            <td class="text-right">{{ application.podCpuLimit | formatNumber }}</td>
				                            <td class="text-right">{{ application.podMemoryRequest | formatNumber }}</td>
				                            <td class="text-right">{{ application.podMemoryLimit | formatNumber }}</td>
				                            <td class="text-right">{{ application.totalCpu | formatNumber }}</td>
				                            <td class="text-right">{{ application.totalMemory | formatNumber }}</td>
				                            <td class="text-center">
				                                <b-button variant="secondary" size="sm" class="mr-1" v-on:click="editAppsItem(item, application, index, environmentIndex, productIndex)"><i class="fa fa-pencil"></i></b-button>
				                                <b-button variant="danger" size="sm"><i class="fa fa-close" v-on:click="deleteAppsItem(item, application, index, environmentIndex, productIndex)"></i></b-button>
				                            </td>
				                        </tr>
                        			</template>
                        			
			                        <tr>
			                            <td colspan="10" rowspan="2" class="text-right font-weight-bold bg-dark">Summary</td>
			                            <td class="text-right font-weight-bold bg-success">{{product.sumTotalCpu | formatNumber}} Millicore</td>
			                            <td class="text-right font-weight-bold bg-info">{{product.sumTotalMemory | formatNumber}} MB</td>
			                            <td></td>
			                        </tr>
			                        <tr>
			                            <td class="text-right font-weight-bold bg-success">{{product.sumCpu | formatNumber}} Core</td>
			                            <td class="text-right font-weight-bold bg-info">{{product.sumMemory | formatNumber}} GB</td>
			                            <td></td>
			                        </tr>
                        		</template>
                        		
		                        <tr>
		                            <td colspan="11" rowspan="2" class="text-right font-weight-bold bg-dark">{{item.name}} Summary</td>
		                            <td class="text-right font-weight-bold bg-secondary">{{item.sumTotalCpu | formatNumber}} Millicore</td>
		                            <td class="text-right font-weight-bold bg-secondary">{{item.sumTotalMemory | formatNumber}} MB</td>
		                            <td></td>
		                        </tr>
		                        <tr>
		                            <td class="text-right font-weight-bold bg-secondary">{{item.sumCpu | formatNumber}} Core</td>
		                            <td class="text-right font-weight-bold bg-secondary">{{item.sumMemory | formatNumber}} GB</td>
		                            <td></td>
		                        </tr>
                        	</template>
                        </template>
                    </tbody>
                </table>
            </VuePerfectScrollbar>
            
            <!-- modal : Environment -->
            <b-modal id="environment-modal" title="Environment" centered no-close-on-backdrop v-model="clusterDialog" @close="closeClusterDialog">
                <b-form>
                    <b-form-group label="Environment" label-for="environment" :label-cols="4" label-class="required">
				        <b-form-select id="environment"
				          :plain="true"
				          v-model="editedItem.name">
					        <option v-for="(item, index) in environmentTypes" :value="item">{{ item }}</option>
				        </b-form-select>
                        <b-form-invalid-feedback id="environment">
                            Environment를 선택해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                </b-form>
                <template v-slot:modal-footer="{ ok, cancel }">
                    <b-button variant="secondary" @click="closeClusterDialog">취소</b-button>
                    <b-button variant="primary" @click="saveClusterDialog"><i class="icon-check"></i> 저장</b-button>
                </template>
            </b-modal>
            <!-- // modal : Environment -->
            
            <!-- modal : Application -->
            <b-modal id="application-modal" scrollable title="Application" centered no-close-on-backdrop v-model="appsDialog" @close="closeAppsDialog">
                <b-form>
                    <b-form-group label="Product" label-for="productId" :label-cols="7" label-class="required">
				        <b-form-select id="productId"
				          :plain="true"
				          v-model="editedAppsItem.productId"
				          @change="changeProduct">
					        <option v-for="(item, index) in products" :value="item.id">{{ item.name }}</option>
				        </b-form-select>
                        <b-form-invalid-feedback id="productId">
                            Product을 선택해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Application Kind" label-for="appName" :label-cols="7" label-class="required">
                        <b-form-input type="text" id="appName" v-model="editedAppsItem.appName" required></b-form-input>
                        <b-form-invalid-feedback id="appName">
                            Application Kind를 입력해주세요.
                        </b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label="Application Instance Number" label-for="instanceNumber" :label-cols="7">
                        <b-form-input type="number" id="instanceNumber" v-model="editedAppsItem.instanceNumber"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Application CPU(Millicore) Min" label-for="appCpuMin" :label-cols="7">
                        <b-form-input type="number" id="appCpuMin" v-model="editedAppsItem.appCpuMin"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Application CPU(Millicore) Max" label-for="appCpuMax" :label-cols="7">
                        <b-form-input type="number" id="appCpuMax" v-model="editedAppsItem.appCpuMax"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Application Memory(MB) Min" label-for="appMemoryMin" :label-cols="7">
                        <b-form-input type="number" id="appMemoryMin" v-model="editedAppsItem.appMemoryMin"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Application Memory(MB) Max" label-for="appMemoryMax" :label-cols="7">
                        <b-form-input type="number" id="appMemoryMax" v-model="editedAppsItem.appMemoryMax"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Container CPU(Millicore) Request" label-for="podCpuRequest" :label-cols="7">
                        <b-form-input type="number" id="podCpuRequest" v-model="editedAppsItem.podCpuRequest"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Container CPU(Millicore) Limit" label-for="podCpuLimit" :label-cols="7">
                        <b-form-input type="number" id="podCpuLimit" v-model="editedAppsItem.podCpuLimit"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Container Memory(Millicore) Request" label-for="podMemoryRequest" :label-cols="7">
                        <b-form-input type="number" id="podCpuRequest" v-model="editedAppsItem.podMemoryRequest"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Container Memory(Millicore) Limit" label-for="podMemoryLimit" :label-cols="7">
                        <b-form-input type="number" id="podCpuLimit" v-model="editedAppsItem.podMemoryLimit"></b-form-input>
                    </b-form-group>
                </b-form>
                <template v-slot:modal-footer="{ ok, cancel }">
                    <b-button variant="secondary" @click="closeAppsDialog">취소</b-button>
                    <b-button variant="primary" @click="saveAppsDialog"><i class="icon-check"></i> 저장</b-button>
                </template>
            </b-modal>
            <!-- // modal : Application -->
        <div class="tab-bottom-btn">
            <b-button variant="warning" class="left" @click="goList"><i class="icon-list"></i> 목록</b-button>
            <b-button variant="primary" class="right" @click="save"><i class="icon-check"></i> 저장</b-button>
        </div>
    </b-tab>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import perfectScrollbar from '@/mixins/perfect-scrollbar'

export default {
	mixins: [perfectScrollbar],
    components: {
        VuePerfectScrollbar
    },
 	data: () => ({
		projectId: 0,
	  	selected: [],
  		clusterDialog: false,
  		appsDialog: false,
  		
	  	editedIndex: -1,
	  	editedItem: {products: []},
	  	defaultItem: {products: []},
	  	
	  	editedProductIndex: -1,
      	editedAppsIndex: -1,
      	defaultAppsItem: {},
      	editedAppsItem: {},
      	
      	isActive: false
	}),
    computed: {
        volumes: function() {
			return this.$store.state.estimate.projectVolume
		},
		environmentTypes : function() {
			return this.$store.state.estimate.environmentTypes
		},
		products: function() {
			return this.$store.state.estimate.products
		},
		userId : function() {
			return this.$store.getters.getUserId
		}
    },
	created () {
		this.initialize()
	},
    methods: {
    	goList() {
    		this.$router.go(-1)
    	},
        initialize() {
			if(this.$route.params.id) {
				this.projectId = this.$route.params.id;
			}
			
            if (this.$route.params.active) {
                this.isActive = this.$route.params.active === 'Sizing' ? true : false
            }

			this.$store.dispatch('estimate/getProjectVolume', {projectId: this.projectId})
			this.$store.dispatch('estimate/getEnvironmentTypes')
			this.$store.dispatch('estimate/getProducts')
		},
		getEnvironmentRowSpan(env) {
			let rowCount = 0
			for(let product of env.products) {
				rowCount += product.applications.length + 2
			}
			rowCount += 2
			return rowCount
		},
		save() {
			this.$zadmin.confirm('변경된 내용을 저장하시겠습니까?', (result) => {
				if(result) {
					this.$store.dispatch('estimate/saveProjectVolume', {projectId: this.projectId, volumes: this.volumes})
					this.selected = [];
				}
			})
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
		saveClusterDialog(e) {
			if(!this.editedItem.name) {
				this.$zadmin.alert('Environment를 선택하세요.')
				e.preventDefault()
				return
			}
			
			for(let i = 0; i < this.volumes.environments.length; i++) {
				if(i != this.editedIndex && this.volumes.environments[i].name == this.editedItem.name) {
					this.$zadmin.alert('존재하는 Environment입니다. 다시 입력하세요.');
					e.preventDefault()
					return;
				}
			}
			
			if (this.editedIndex > -1) {
				this.$set(this.volumes.environments, this.editedIndex, this.editedItem);
			} else {
				this.editedItem.created = this.userId
				this.volumes.environments.push(this.editedItem);
				this.volumes.environments[this.volumes.environments.length -1].products = new Array();
			}
			this.closeClusterDialog();
		},
		deleteCluster() {
			this.$zadmin.confirm('Environment를 삭제하면 원가견적서를 다시 작성해야 합니다. \n삭제하시겠습니까?', (result) => {
				if(result) {
					for(let i = 0; i < this.selected.length; i++) {
						const index = this.volumes.environments.indexOf(this.selected[i]);
						this.volumes.environments.splice(index, 1);
					}
					
					this.selected = [];
					this.summary();
				}
			})
		},
		
		openAppsDialog() {
			if(this.selected.length == 1) {
				this.editedIndex = this.volumes.environments.indexOf(this.selected[0])
				this.editedProductIndex = -1
				this.editedAppsIndex = -1
				this.editedAppsItem = Object.assign({}, this.defaultAppsItem)
				this.appsDialog = true
			}
		},
		editAppsItem(item, appItem, appIndex, environmentIndex, productIndex) {
			this.editedIndex = environmentIndex
			this.editedProductIndex = productIndex
			this.editedAppsIndex = appIndex
			this.editedAppsItem = Object.assign({}, appItem)
			this.appsDialog = true
		},
		deleteAppsItem(item, appItem, appIndex, environmentIndex, productIndex) {
			this.$zadmin.confirm('삭제하시겠습니까?', (result) => {
				if(result) {
					this.volumes.environments[environmentIndex].products[productIndex].applications.splice(appIndex, 1)
					this.summary()
				}
			})
		},
		closeAppsDialog () {
			this.appsDialog = false
			setTimeout(() => {
				this.editedIndex = -1
				this.editedProductIndex = -1
				this.editedAppsItem = Object.assign({}, this.defaultAppsItem)
				this.editedAppsIndex = -1
			}, 300);
		},
		saveAppsDialog (e) {
			if(!this.editedAppsItem.productId) {
				this.$zadmin.alert('Product을 선택하세요.')
				e.preventDefault()
				return
			}
			if(!this.editedAppsItem.appName) {
				this.$zadmin.alert('Application Kind를 입력하세요.')
				e.preventDefault()
				return
			}
			
			let pIndex = this.editedProductIndex
			this.editedProductIndex = this.volumes.environments[this.editedIndex].products.findIndex(product => product.productId === this.editedAppsItem.productId)
			if(this.editedProductIndex === -1) {
				let product = {}
				product.productId = this.editedAppsItem.productId
				product.productName = this.editedAppsItem.productName
				product.applications = new Array()
				this.editedProductIndex = this.volumes.environments[this.editedIndex].products.length
				this.volumes.environments[this.editedIndex].products.push(product)
			}
			
			if (this.editedAppsIndex > -1) {
				if(this.volumes.environments[this.editedIndex].products[pIndex].applications[this.editedAppsIndex].productId != this.editedAppsItem.productId) {
					this.volumes.environments[this.editedIndex].products[pIndex].applications.splice(this.editedAppsIndex, 1)
					this.volumes.environments[this.editedIndex].products[this.editedProductIndex].applications.push(this.editedAppsItem)
				} else {
					this.$set(this.volumes.environments[this.editedIndex].products[this.editedProductIndex].applications, this.editedAppsIndex, this.editedAppsItem)
				}
				
			} else {
				this.editedAppsItem.created = this.userId
				this.volumes.environments[this.editedIndex].products[this.editedProductIndex].applications.push(this.editedAppsItem)
			}
			
			this.calcAppSum(this.editedAppsItem)
			this.summary()
			this.closeAppsDialog()
		},
		changeProduct() {
			this.editedAppsItem.productName = this.products.find(product => product.id === this.editedAppsItem.productId).name
		},
		
		summary() {
			this.volumes.sumMemory = 0
			this.volumes.sumCpu = 0
			
			for(let environment of this.volumes.environments) {
				environment.sumTotalCpu = 0
				environment.sumTotalMemory = 0
				environment.sumCpu = 0
				environment.sumMemory = 0
			
				for(let product of environment.products) {
					product.sumTotalCpu = 0
					product.sumTotalMemory = 0
					product.sumCpu = 0
					product.sumMemory = 0
					
					let sumMemory = 0;
					let sumCpu = 0;
					for(let application of product.applications) {
						if(application.totalMemory) sumMemory += application.totalMemory
						if(application.totalCpu) sumCpu += application.totalCpu
					}
					
					product.sumTotalCpu = sumCpu
					product.sumTotalMemory = sumMemory
					product.sumCpu = sumCpu/1000
					product.sumMemory = Math.ceil(sumMemory/1024)
					
					environment.sumTotalCpu += product.sumTotalCpu
					environment.sumTotalMemory += product.sumTotalMemory
					environment.sumCpu += product.sumCpu
					environment.sumMemory += product.sumMemory
					
				}
				this.volumes.sumMemory += environment.sumMemory
				this.volumes.sumCpu += environment.sumCpu
			}
		},
		calcAppSum(application) {
			if(!application.instanceNumber)  {
				return;
			}
			
			if(application.podCpuLimit) application.totalCpu = application.instanceNumber * application.podCpuLimit;
			if(application.podMemoryLimit) application.totalMemory = application.instanceNumber * application.podMemoryLimit;
		}
    }
}
</script>