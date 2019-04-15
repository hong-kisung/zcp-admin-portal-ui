<template>
<div>
        <v-card>
          <v-card-title class="font-weight-bold">{{ title }}</v-card-title>
		  <v-card-text>
			  <v-data-table
				:headers="headers"
				:items="estimate.clusters"
				item-key="clusterName"
				class="elevation-1"
				v-model="selected"
				select-all
				hide-actions
			  >
				<template v-slot:headers="props">
				  <tr>
					<th :class="headerClass" rowspan="2" v-if="editable"></th>
					<th :class="headerClass" rowspan="2">Environment</th>
					<th :class="headerClass" rowspan="2">Product</th>
					<th :class="headerClass" rowspan="2" v-show="estimateType == 'cloudZService'">Service</th>
					<th :class="headerClass" rowspan="2">Classification</th>
					<th :class="headerClass" rowspan="2" v-show="estimateType == 'cloudZService'">Machine<br>Type</th>
					<th :class="headerClass" rowspan="2" v-show="estimateType == 'cloudZService'">Hardware<br>Type</th>
					<th :class="headerClass" rowspan="2">Storage<br>Type</th>
					<th :class="headerClass" rowspan="2">Storage<br>Performance</th>
					<th :class="headerClass" rowspan="2">Storage<br>Size</th>
					<th :class="headerClass" rowspan="2">Number</th>
					<th :class="headerClass" rowspan="2" v-show="estimateType == 'cloudZService'">Cores</th>
					<th :class="headerClass" rowspan="2" v-show="estimateType == 'cloudZService'">Memory</th>
					<th :class="headerClass" colspan="2">원가</th>
					<th :class="headerClass" rowspan="2" v-if="editable">Actions</th>
				  </tr>
				  <tr>
					<th :class="headerClass">Monthly (원)</th>
					<th :class="headerClass">Yearly (원)</th>
				  </tr>
				</template>
				<template v-slot:items="props">
				  <template v-if="props.item.products.length == 0">
				  	<tr>
		          	  <td v-if="editable">
		            	<v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
		          	  </td>
				      <td class="font-weight-bold text-xs-left">{{ props.item.clusterName }}</td>
					  <td class="text-xs-left"></td>
					  <td class="text-xs-left"></td>
					  <td class="text-xs-left"></td>
					  <td class="text-xs-left" v-show="estimateType == 'cloudZService'"></td>
					  <td class="text-xs-center"></td>
					  <td class="text-xs-center" v-show="estimateType == 'cloudZService'"></td>
					  <td class="text-xs-center" v-show="estimateType == 'cloudZService'"></td>
					  <td class="text-xs-center"></td>
					  <td class="text-xs-center"></td>
					  <td class="text-xs-center"></td>
					  <td class="text-xs-center"></td>
					  <td class="text-xs-center" v-show="estimateType == 'cloudZService'"></td>
					  <td class="text-xs-right" v-show="estimateType == 'cloudZService'"></td>
					  <td class="text-xs-right"></td>
					  <td class="justify-center layout px-0" v-if="editable"></td>
				    </tr>
				  </template>
				  <template v-else>
				  
				  	<template v-for="(product, productIndex) in props.item.products">
				  		<template v-for="(service, serviceIndex) in product.services">
				  			<template v-for="(classification, index) in service.classifications">
				  	<tr>
		          	  <td v-if="editable && productIndex == 0 && serviceIndex == 0 && index == 0" v-bind:rowspan="getRowspan(0, props.item.products)">
		            	<v-checkbox v-model="props.selected" primary hide-details></v-checkbox>
		          	  </td>
				      <td class="font-weight-bold text-xs-center" v-if="productIndex == 0 && serviceIndex == 0 && index == 0" v-bind:rowspan="getRowspan(0, props.item.products)">{{ props.item.clusterName }}</td>
					  <td class="font-weight-bold text-xs-center" v-if="serviceIndex == 0 && index == 0" v-bind:rowspan="getRowspan(1, product.services)">{{ product.productName }}</td>
					  <td class="font-weight-bold text-xs-center" v-if="index == 0" v-show="estimateType == 'cloudZService'" v-bind:rowspan="service.classifications.length">{{ service.serviceName }}</td>
					  <td class="font-weight-bold text-xs-left">{{ classification.classificationName + (classification.addonApplicationName != '' ? ' - ' + classification.addonApplicationName : '') }}</td>
					  <td class="text-xs-center" v-show="estimateType == 'cloudZService'">{{ classification.iksVmName }}</td>
					  <td class="text-xs-center" v-show="estimateType == 'cloudZService'">{{ classification.hardwareType }}</td>
					  <td class="text-xs-center">{{ classification.storageType }}</td>
					  <td class="text-xs-center">{{ classification.enduranceIops == undefined || classification.enduranceIops == 0 ? '' : classification.enduranceIops + ' IOPS' }}</td>
					  <td class="text-xs-center">{{ classification.storageSize | formatNumber }}</td>
					  <td class="text-xs-center">{{ classification.number | formatNumber }}</td>
					  <td class="text-xs-center" v-show="estimateType == 'cloudZService'">{{ classification.cores | formatNumber }}</td>
					  <td class="text-xs-center" v-show="estimateType == 'cloudZService'">{{ classification.memory | formatNumber }}</td>
					  <td class="text-xs-right">{{ classification.pricePerMonthly | formatNumber }}</td>
					  <td class="text-xs-right">{{ classification.pricePerYearly | formatNumber }}</td>
					  <td class="justify-center layout px-0" v-if="editable">
						<v-icon small class="mr-2" @click="editAppsItem(props.item.clusterName, productIndex, serviceIndex, index, classification)">edit</v-icon>
						<v-icon small @click="deleteAppsItem(props.item.clusterName, productIndex, serviceIndex, index, classification)">delete</v-icon>
					  </td>
				    </tr>
				    		</template>
				    	</template>
				    	
				  	<tr>
					  <td class="red lighten-5 font-weight-bold text-xs-right" v-bind:colspan="estimateType == 'cloudZService' ? 10:5">{{ product.productName }} Summary</td>
					  <td class="red lighten-5 font-weight-bold text-xs-right">{{ product.sumMonthly | formatNumber }}</td>
					  <td class="red lighten-5 font-weight-bold text-xs-right">{{ product.sumYearly | formatNumber }}</td>
					  <td class="red lighten-5 font-weight-bold" v-if="editable">
					  </td>
				    </tr>
				  	</template>
				  	
				  	<tr>
					  <td class="blue lighten-5 font-weight-bold text-xs-right" v-bind:colspan="estimateType == 'cloudZService' ? 11:6">{{ props.item.clusterName }} Summary</td>
					  <td class="blue lighten-5 font-weight-bold text-xs-right">{{ props.item.sumMonthly | formatNumber }}</td>
					  <td class="blue lighten-5 font-weight-bold text-xs-right">{{ props.item.sumYearly | formatNumber }}</td>
					  <td class="blue lighten-5 font-weight-bold" v-if="editable">
					  </td>
				    </tr>
				  </template>

				</template>
				<template v-slot:footer>
				  	<tr>
					  <td class="yellow lighten-5 font-weight-bold text-xs-right" v-bind:colspan="estimateType == 'cloudZService' ?  (editable ? 13:12) : (editable ? 8:7)">Summary</td>
					  <td class="yellow lighten-5 font-weight-bold text-xs-right">{{ estimate.sumMonthly | formatNumber }}</td>
					  <td class="yellow lighten-5 font-weight-bold text-xs-right">{{ estimate.sumYearly | formatNumber }}</td>
					  <td class="yellow lighten-5 font-weight-bold" v-if="editable">
					  </td>
				    </tr>
				</template>
				<template v-slot:no-data>
      			  <td class="text-xs-center" colspan="13">
        			{{ no_data_text }}
      			  </td>
    			</template>
			  </v-data-table>
	      </v-card-text>
 	      <v-card-actions>
		    <v-btn small left color="primary" v-if="editable" @click="openClusterDialog">Environment 추가</v-btn>
		    <v-btn small left color="primary" v-if="editable" @click="deleteCluster" v-bind:disabled="selected.length == 0">Environment 삭제</v-btn>
		    <v-btn small left color="primary" v-if="editable" @click="openAppsDialog">Classification 추가</v-btn>
	      </v-card-actions>
        </v-card>
        
	 	<estimate-environment-dialog v-bind:editedItem="editedItem"
	 								 v-bind:estimate="estimate"
	 								 v-bind:clusterDialog="clusterDialog"
	 								 v-on:fire-dialog-saved="saveClusterDialog"
	 								 v-on:fire-dialog-closed="closeClusterDialog"
	 	/>
		
	 	<estimate-item-dialog 		 v-bind:editedItem="editedAppsItem"
	 								 v-bind:estimate="estimate"
	 								 v-bind:iksGeneral="iksGeneral"
	 								 v-bind:vmVersion="vmVersion"
	 								 v-bind:storageVersion="storageVersion"
	 								 v-bind:productMspCostVersion="productMspCostVersion"
	 								 v-bind:productReferences="productReferences"
	 								 v-bind:appsDialog="appsDialog"
	 								 v-bind:isNewAppsItem="isNewAppsItem"
	 								 v-bind:estimateType="estimateType"
	 								 v-on:fire-dialog-saved="saveAppsDialog"
	 								 v-on:fire-dialog-closed="closeAppsDialog"
	 	/>
</div>
</template>

<script>
export default {
	data: () => ({
	  	headers: [],
		headerClass: "grey lighten-1 body-2 text-weight-bold",
	  	no_data_text: 'No data available',
	  	selected: [],
  		clusterDialog: false,
  		appsDialog: false,
  		isNewAppsItem: false,

	  	editedIndex: -1,
	  	editedItem: {products: []},
	  	defaultItem: {products: []},

      	defaultAppsItem: {},
      	editedAppsItem: {},
      	
      	editedApps: {
      		clusterIndex: -1,
      		productIndex: -1,
      		serviceIndex: -1,
      		index: -1
      	},
      	defaultApps: {
      		clusterIndex: -1,
      		productIndex: -1,
      		serviceIndex: -1,
      		index: -1
      	}
	}),
	props: [
		'title',
		'estimateType',
		'estimate',
		'iksGeneral',
		'vmVersion',
		'storageVersion',
		'productMspCostVersion',
		'productReferences',
		'editable'
	],
	computed: {
	},
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
		},
		
		getRowspan(colIndex, items, item) {
			var rowCount = 0;
			if(colIndex == 0) {
				var products = items;
				for(var i = 0; i < products.length; i++) {
					for(var j = 0; j < products[i].services.length; j++) {
						rowCount += products[i].services[j].classifications.length;
					}
				}
				rowCount += products.length + 1;
			} else if(colIndex == 1) {
				var services = items;
				for(var j = 0; j < services.length; j++) {
					rowCount += services[j].classifications.length;
				}
				rowCount += 1;
			}
			return rowCount;
		},

		deleteCluster() {
			if(confirm('삭제하시겠습니까?')) {
				for(var i = 0; i < this.selected.length; i++) {
					const index = this.estimate.clusters.indexOf(this.selected[i]);
					this.estimate.clusters.splice(index, 1);
				}
				
				this.selected = [];
				this.$emit('fire-estimate-changed');
			}
		},
		openClusterDialog() {
			this.selected = [];
			this.clusterDialog = true;
		},
		closeClusterDialog() {
			this.clusterDialog = false;
			setTimeout(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
			}, 300);
		},
		saveClusterDialog() {
			var cluster = {};
			cluster.clusterName = this.editedItem.clusterName;
			cluster.products = new Array();
			for(var i = 0; i < this.editedItem.products.length; i++) {
				var product = {};
				product.productId = this.editedItem.products[i].id;
				product.productName = this.editedItem.products[i].name;
				product.services = new Array();
				cluster.products.push(product);
				
				this.createFromProductTemplate(cluster, i, product);
			}
			this.estimate.clusters.push(cluster);
			this.closeClusterDialog();
		},
		createFromProductTemplate(cluster, productIndex, product) {
			var productTemplate;
			for(var i = 0; i < this.productReferences.length; i++) {
				if(product.productId == this.productReferences[i].productId) {
					productTemplate = this.productReferences[i];
					break;
				}
			}
			
			if(productTemplate == undefined) {
				console.log('product template not found');
			} else {
				this.createProduct(productTemplate, cluster, productIndex, product);
				this.$emit('fire-estimate-changed');
			}
		},
		createProduct(productTemplate, cluster, productIndex, product) {
			var templates;
			if(this.estimateType == 'cloudZService') {
				templates = productTemplate.templates.cloudZService;
			} else if(this.estimateType == 'storageService') {
				templates = productTemplate.templates.storageService;
			}
			
			var cluster;
			for(var i = 0; i < this.estimate.clusters.length; i++) {
				if(this.estimate.clusters[i].clusterName == cluster.clusterName) {
					cluster = this.estimate.clusters[i];
					break;
				}
			}

			for(var i = 0; i < templates.length; i++) {
				var service = {};
				service.serviceName = templates[i].serviceName;
				service.classifications = new Array();
				service.classifications = this.createClassification(cluster, product, service.serviceName, templates[i].classifications);
				cluster.products[productIndex].services.push(service);
			}
		},
		createClassification(cluster, product, serviceName, classifications) {
			var estimateItems = new Array();
			for(var i = 0; i < classifications.length; i++) {
				var estimateItem = {};
				estimateItem.clusterName = cluster.clusterName;
				estimateItem.productId = product.productId;
				estimateItem.productName = product.productName;
				estimateItem.serviceName = serviceName;
				estimateItem.classificationName = classifications[i].classificationName;
				estimateItem.classificationType = classifications[i].classificationType;
				estimateItem.addonApplicationName = "";
				
				if(estimateItem.classificationType == 'IP_Allocation') {
					estimateItem.pricePerMonthly = this.iksGeneral.ipAllocation;
					estimateItem.pricePerYearly = estimateItem.pricePerMonthly * 12;
				}
				estimateItems.push(estimateItem);
			}
			return estimateItems;
		},
		
		openAppsDialog() {
			if(this.editedApps.index == -1) {
				if(this.estimate.clusters.length == 0) {
					alert("Classification을 추가할 Environment가 없습니다. Envorinment를 추가하세요");
					return;
				}
			}
			this.editedApps = Object.assign({}, this.defaultApps);
			this.editedAppsItem = Object.assign({}, this.defaultAppsItem);
			this.appsDialog = true;
			this.isNewAppsItem = true;
		},
		editAppsItem(clusterName, productIndex, serviceIndex, appIndex, appItem) {
			this.editedApps.clusterIndex = this.findClusterIndex(clusterName);
			this.editedApps.productIndex = productIndex;
			this.editedApps.serviceIndex = serviceIndex;
			this.editedApps.index = appIndex;
			
			this.editedAppsItem = Object.assign({}, appItem);
			this.appsDialog = true;
			this.isNewAppsItem = false;
		},
		deleteAppsItem(clusterName, productIndex, serviceIndex, appIndex, appItem) {
			const clusterIndex = this.findClusterIndex(clusterName);
			
			if(confirm('삭제하시겠습니까?')) {
				this.estimate.clusters[clusterIndex].products[productIndex].services[serviceIndex].classifications.splice(appIndex, 1);
				
				if(this.estimate.clusters[clusterIndex].products[productIndex].services[serviceIndex].classifications.length == 0) {
					this.estimate.clusters[clusterIndex].products[productIndex].services.splice(serviceIndex, 1);
				}
				
				if(this.estimate.clusters[clusterIndex].products[productIndex].services.length == 0) {
					this.estimate.clusters[clusterIndex].products.splice(productIndex, 1);
				}
				
				if(this.estimate.clusters[clusterIndex].products.length == 0) {
					this.estimate.clusters.splice(clusterIndex, 1);
				}
				
				this.$emit('fire-estimate-changed');
			}
		},
		closeAppsDialog () {
			this.appsDialog = false;
			this.isNewAppsItem = false;
			setTimeout(() => {
				this.editedApps = Object.assign({}, this.defaultApps);
				this.editedAppsItem = Object.assign({}, this.defaultAppsItem);
			}, 300);
		},
		saveAppsDialog () {
			if (this.editedApps.index > -1) {
				// edit
				this.$set(this.estimate.clusters[this.editedApps.clusterIndex].products[this.editedApps.productIndex].services[this.editedApps.serviceIndex].classifications, this.editedApps.index, this.editedAppsItem);
			
			} else {
				// new
				var clusterIndex = this.findClusterIndex(this.editedAppsItem.clusterName);
				
				var productIndex = this.findProductIndex(this.estimate.clusters[clusterIndex].products, this.editedAppsItem.productName);
				if(productIndex == -1) {
					var product = {};
					product.productId = this.editedAppsItem.productId;
					product.productName = this.editedAppsItem.productName;
					product.services = new Array();
					this.estimate.clusters[clusterIndex].products.push(product);
					productIndex = this.estimate.clusters[clusterIndex].products.length -1;
				}
				
				var serviceIndex = this.findServiceIndex(this.estimate.clusters[clusterIndex].products[productIndex].services, this.editedAppsItem.serviceName);
				if(serviceIndex == -1) {
					var service = {};
					service.serviceName = this.editedAppsItem.serviceName;
					service.classifications = new Array();
					this.estimate.clusters[clusterIndex].products[productIndex].services.push(service);
					serviceIndex = this.estimate.clusters[clusterIndex].products[productIndex].services.length -1;
				}
				
				this.estimate.clusters[clusterIndex].products[productIndex].services[serviceIndex].classifications.push(this.editedAppsItem);
			}
			
			this.closeAppsDialog();
			this.$emit('fire-estimate-changed');
		},
		findClusterIndex(clusterName) {
			var clusters = this.estimate.clusters;
			for(var i = 0; i < clusters.length; i++) {
				if(clusters[i].clusterName == clusterName) {
					return i;
				}
			}
			return -1;
		},
		findProductIndex(products, productName) {
			for(var i = 0; i < products.length; i++) {
				if(products[i].productName == productName) {
					return i;
				}
			}
			return -1;
		},
		findServiceIndex(services, serviceName) {
			for(var i = 0; i < services.length; i++) {
				if(services[i].serviceName == serviceName) {
					return i;
				}
			}
			return -1;
		}
	}
}
</script>

<style>
</style>
