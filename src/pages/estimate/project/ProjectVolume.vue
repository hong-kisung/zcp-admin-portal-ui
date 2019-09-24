<template>
<div class="animated fadeIn">
  <b-card>
    <b-row>
      <b-col>
        <div class="table-responsive-sm">
          <table class="table b-table table-bordered table-sm">
          <thead>
	        <tr>
	          <th class="text-center" rowspan="3">Environment</th>
	          <th class="text-center" rowspan="3">Product</th>
	          <th class="text-center" colspan="6">Application</th>
	          <th class="text-center" colspan="4">Container</th>
	          <th class="text-center" colspan="2">Total Size</th>
	          <th class="text-center" rowspan="3">Actions</th>
	        </tr>
	        <tr>
	          <th class="text-center" rowspan="2">Kind</th>
	          <th class="text-center" rowspan="2">Instance<br>Number</th>
	          <th class="text-center" colspan="2">CPU (Millicore)</th>
	          <th class="text-center" colspan="2">Memory (MB)</th>
	          <th class="text-center" colspan="2">CPU (Millicore)</th>
	          <th class="text-center" colspan="2">Memory (MB)</th>
	          <th class="text-center" rowspan="2">CPU<br>(Millicore)</th>
	          <th class="text-center" rowspan="2">Memory<br>(MB)</th>
	        </tr>
	        <tr>
	          <th class="text-center">Min</th>
	          <th class="text-center">Max</th>
	          <th class="text-center">Min</th>
	          <th class="text-center">Max</th>
	          <th class="text-center">Request</th>
	          <th class="text-center">Limit</th>
	          <th class="text-center">Request</th>
	          <th class="text-center">Limit</th>
	        </tr>
          </thead>
          <tbody>
		    <template v-for="(item, environmentIndex) in volumes.environments">
			  <template v-if="item.products.length == 0">
			  	<tr>
	          	  <td class="text-left font-weight-bold">
		            <div class="custom-control custom-checkbox custom-control-inline">
		              <input type="checkbox" class="custom-control-input" :id="item.name" :value="item" v-model="selected" unchecked>
		              <label class="custom-control-label" :for="item.name">{{ item.name }}</label>
		            </div>
	          	  </td>
				  <td class="text-left"></td>
				  <td class="text-left"></td>
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
				  <td class="text-center"></td>
			    </tr>
			  </template>
			  <template v-else>
			    <template v-for="(product, productIndex) in item.products">
				  <template v-for="(application, index) in product.applications">
				  	<tr>
				      <td class="text-left font-weight-bold" v-if="productIndex == 0 && index == 0" v-bind:rowspan="getEnvironmentRowSpan(item)">
			            <div class="custom-control custom-checkbox custom-control-inline">
			              <input type="checkbox" class="custom-control-input" :id="item.name" :value="item" v-model="selected" unchecked>
			              <label class="custom-control-label" :for="item.name">{{ item.name }}</label>
			            </div>
				      </td>
				  	  <td class="text-left font-weight-bold" v-if="index == 0" v-bind:rowspan="product.applications.length + 2">{{ application.productName }}</td>
					  <td class="text-left">{{ application.appName }}</td>
					  <td class="text-center">{{ application.instanceNumber | formatNumber }}</td>
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
					    <b-link href="#" class="card-header-action" v-on:click="editAppsItem(item, application, index, environmentIndex, productIndex)">
					      <i class="fa fa-pencil fa-sm"></i>
		                </b-link>
		                <b-link href="#" class="card-header-action" v-on:click="deleteAppsItem(item, application, index, environmentIndex, productIndex)">
					      <i class="fa fa-times fa-sm"></i>
		                </b-link>
					  </td>
				    </tr>
				  </template>
				  
				  <tr class="text-right">
				      <td class="font-weight-bold" colspan="10" rowspan="2">Summary</td>
					  <td class="font-weight-bold">{{product.sumTotalCpu | formatNumber}} Millicore</td>
					  <td class="font-weight-bold">{{product.sumTotalMemory | formatNumber}} MB</td>
					  <td class="font-weight-bold">
					  </td>
			      </tr>
				  <tr class="text-right">
					  <td class="font-weight-bold">{{product.sumCpu | formatNumber}} Core</td>
					  <td class="font-weight-bold">{{product.sumMemory | formatNumber}} GB</td>
					  <td class="font-weight-bold">
					  </td>
			      </tr>
				</template>
				
				  <tr class="text-right">
				      <td class="font-weight-bold" colspan="11" rowspan="2">{{item.name}} Summary</td>
					  <td class="font-weight-bold">{{item.sumTotalCpu | formatNumber}} Millicore</td>
					  <td class="font-weight-bold">{{item.sumTotalMemory | formatNumber}} MB</td>
					  <td class="font-weight-bold">
					  </td>
			      </tr>
				  <tr class="text-right">
					  <td class="font-weight-bold">{{item.sumCpu | formatNumber}} Core</td>
					  <td class="font-weight-bold">{{item.sumMemory | formatNumber}} GB</td>
					  <td class="font-weight-bold">
					  </td>
			      </tr>
			  </template>
		    </template>
  			<tr class="text-right">
		      <td class="font-weight-bold" colspan="12">합계</td>
			  <td class="font-weight-bold">{{volumes.sumCpu | formatNumber}} Core</td>
			  <td class="font-weight-bold">{{volumes.sumMemory | formatNumber}} GB</td>
			  <td class="font-weight-bold">
			  </td>
  			</tr>
          </tbody>
          </table>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="9">
	    <b-button size="md" variant="secondary" class="m-1" @click="openClusterDialog">Environment 추가</b-button>
	    <b-button size="md" variant="secondary" class="m-1" @click="editCluster" v-bind:disabled="selected.length != 1">Environment 수정</b-button>
	    <b-button size="md" variant="secondary" class="m-1" @click="deleteCluster" v-bind:disabled="selected.length == 0">Environment 삭제</b-button>
	    <b-button size="md" variant="secondary" class="m-1" @click="openAppsDialog" v-bind:disabled="selected.length != 1">Application 추가</b-button>
      </b-col>
      <b-col cols="3" class="text-right">
        <b-button size="md" variant="outline-primary" class="m-1" @click="cancel">목록</b-button>
	    <b-button size="md" variant="primary" class="m-1" @click="save">저장</b-button>
      </b-col>
    </b-row>
  </b-card>
  
  <b-modal centered no-close-on-backdrop title="Environment" v-model="clusterDialog" @close="closeClusterDialog" @cancel="closeClusterDialog" @ok="saveClusterDialog">
    <b-form>
      <b-form-group label="Environment" label-for="environment" label-class="astertisk" :label-cols="4">
        <b-form-select id="environment"
          :plain="true"
          v-model="editedItem.name">
	        <option v-for="(item, index) in environmentTypes" :value="item">{{ item }}</option>
        </b-form-select>
      </b-form-group>
    </b-form>
  </b-modal>
		  
  <b-modal centered no-close-on-backdrop title="Application" v-model="appsDialog" @close="closeAppsDialog" @cancel="closeAppsDialog" @ok="saveAppsDialog">
    <b-form>
      <b-form-group label="Product" label-for="productId" label-class="astertisk" :label-cols="7">
        <b-form-select id="productId"
          :plain="true"
          v-model="editedAppsItem.productId"
          @change="changeProduct">
	        <option v-for="(item, index) in products" :value="item.id">{{ item.name }}</option>
        </b-form-select>
      </b-form-group>
      <b-form-group label="Application Kind" label-for="appName" label-class="astertisk" :label-cols="7" >
        <b-form-input id="appName" type="text" v-model="editedAppsItem.appName"></b-form-input>
      </b-form-group>
      <b-form-group label="Application Instance Number" label-for="instanceNumber" :label-cols="7" >
        <b-form-input id="instanceNumber" type="number" v-model="editedAppsItem.instanceNumber"></b-form-input>
      </b-form-group>
      <b-form-group label="Application CPU(Millicore) Min" label-for="appCpuMin" :label-cols="7" >
        <b-form-input id="appCpuMin" type="number" v-model="editedAppsItem.appCpuMin"></b-form-input>
      </b-form-group>
      <b-form-group label="Application CPU(Millicore) Max" label-for="appCpuMax" :label-cols="7" >
        <b-form-input id="appCpuMax" type="number" v-model="editedAppsItem.appCpuMax"></b-form-input>
      </b-form-group>
      <b-form-group label="Application Memory(MB) Min" label-for="appMemoryMin" :label-cols="7" >
        <b-form-input id="appMemoryMin" type="number" v-model="editedAppsItem.appMemoryMin"></b-form-input>
      </b-form-group>
      <b-form-group label="Application Memory(MB) Max" label-for="appMemoryMax" :label-cols="7" >
        <b-form-input id="appMemoryMax" type="number" v-model="editedAppsItem.appMemoryMax"></b-form-input>
      </b-form-group>
      <b-form-group label="Container CPU(Millicore) Request" label-for="podCpuRequest" :label-cols="7" >
        <b-form-input id="podCpuRequest" type="number" v-model="editedAppsItem.podCpuRequest"></b-form-input>
      </b-form-group>
      <b-form-group label="Container CPU(Millicore) Limit" label-for="podCpuLimit" :label-cols="7" >
        <b-form-input id="podCpuLimit" type="number" v-model="editedAppsItem.podCpuLimit"></b-form-input>
      </b-form-group>
      <b-form-group label="Container Memory(MB) Request" label-for="podMemoryRequest" :label-cols="7" >
        <b-form-input id="podMemoryRequest" type="number" v-model="editedAppsItem.podMemoryRequest"></b-form-input>
      </b-form-group>
      <b-form-group label="Container Memory(MB) Limit" label-for="podMemoryLimit" :label-cols="7" >
        <b-form-input id="podMemoryLimit" type="number" v-model="editedAppsItem.podMemoryLimit"></b-form-input>
      </b-form-group>
    </b-form>
  </b-modal>

</div>
</template>

<script>
export default {
  	components: {
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
      	editedAppsItem: {}
	}),
	props: [
	],
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
		initialize() {
			if(this.$route.params.projectId) {
				this.projectId = this.$route.params.projectId;
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
			if(confirm('변경된 내용을 저장하시겠습니까?')) {
				this.$store.dispatch('estimate/saveProjectVolume', {projectId: this.projectId, volumes: this.volumes})
				this.selected = [];
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
		saveClusterDialog(e) {
			if(!this.editedItem.name) {
				alert('Environment를 선택하세요.')
				e.preventDefault()
				return
			}
			
			for(let i = 0; i < this.volumes.environments.length; i++) {
				if(i != this.editedIndex && this.volumes.environments[i].name == this.editedItem.name) {
					alert('존재하는 Environment입니다. 다시 입력하세요.');
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
			if(confirm('Environment를 삭제하면 원가견적서를 다시 작성해야 합니다. \n삭제하시겠습니까?')) {
				for(let i = 0; i < this.selected.length; i++) {
					const index = this.volumes.environments.indexOf(this.selected[i]);
					this.volumes.environments.splice(index, 1);
				}
				
				this.selected = [];
				this.summary();
			}
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
			if(confirm('삭제하시겠습니까?')) {
				this.volumes.environments[environmentIndex].products[productIndex].applications.splice(appIndex, 1)
				this.summary()
			}
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
				alert('Product을 선택하세요.')
				e.preventDefault()
				return
			}
			if(!this.editedAppsItem.appName) {
				alert('Application Kind를 입력하세요.')
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
