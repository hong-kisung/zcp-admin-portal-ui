<template>
  <div class="animated fadeIn">
    <b-card>
		<b-tabs>
		  <b-tab title="요약" active>
		    <b-form>
		      <b-form-group label="버전" label-for="version" :label-cols="3" >
		        <b-form-input id="version" type="text" v-model="estimate.version" readonly></b-form-input>
		      </b-form-group>
		      <b-form-group label="생성일시" label-for="createdDt" :label-cols="3" >
		        <b-form-input id="createdDt" type="text" v-model="estimate.createdDt" readonly></b-form-input>
		      </b-form-group>
		      <b-form-group label="라벨" label-for="label" :label-cols="3" >
		        <b-form-input id="label" type="text" v-model="estimate.label"></b-form-input>
		      </b-form-group>
		      <b-form-group label="설명" label-for="description" :label-cols="3" >
		        <b-form-input id="description" type="text" v-model="estimate.description"></b-form-input>
		      </b-form-group>
		    </b-form>
	        <b-row>
	          <b-col>
		        <estimate-summary 
				  	v-bind:estimate="estimate.summary"
				  />
	          </b-col>
	        </b-row>
		  </b-tab>
		  <b-tab v-for="(environment, index) in estimate.environments" :key="environment.environmentId" :title="environment.environmentName">
		    <b-row>
		      <b-col>
				<estimate-service 
					v-bind:title="'Cloud Z Service'"
					v-bind:estimateEnvironment="environment.environmentName"
					v-bind:estimateType="cloudZServiceEstimateType"
					v-bind:estimate="environment.cloudZService"
		 			v-bind:iksGeneral="iksGeneral"
		 			v-bind:vmVersion="vmVersion"
		 			v-bind:storageVersion="storageVersion"
		 			v-bind:productMspCostVersion="productMspCostVersion"
		 			v-bind:productReferences="productReferences"
		 			v-bind:projectVolumes="projectVolumes"
		 			v-bind:editable="editable"
		 			v-bind:referenceUpdateStatus="referenceUpdateStatus"
		 			v-on:fire-estimate-changed="changeEstimate"
		 			v-on:fire-update-reference-finished='finishReferenceUpdate'
				/>
		      </b-col>
		    </b-row>
		    <b-row clas="mt-3">
		      <b-col>
				<estimate-service 
					v-bind:title="'Application Storage Service'"
					v-bind:estimateEnvironment="environment.environmentName"
					v-bind:estimateType="storageServiceEstimateType"
					v-bind:estimate="environment.storageService"
		 			v-bind:iksGeneral="iksGeneral"
		 			v-bind:vmVersion="vmVersion"
		 			v-bind:storageVersion="storageVersion"
		 			v-bind:productMspCostVersion="productMspCostVersion"
		 			v-bind:productReferences="productReferences"
		 			v-bind:projectVolumes="projectVolumes"
		 			v-bind:editable="editable"
		 			v-bind:referenceUpdateStatus="referenceUpdateStatus"
		 			v-on:fire-estimate-changed="changeEstimate"
		 			v-on:fire-update-reference-finished='finishReferenceUpdate'
				/>
		      </b-col>
		    </b-row>
		  </b-tab>
		</b-tabs>
        <b-row class="mt-2">
          <b-col cols="9">
	        <b-button size="sm" variant="info" class="m-1" @click="historyDialog = true">History 조회</b-button>
	        <b-button size="sm" variant="info" class="m-1" @click="generalDialog = true">기준정보 조회</b-button>
	        <b-button size="sm" variant="info" class="m-1" @click="iksVmDialog = true">VM 비용 조회</b-button>
	        <b-button size="sm" variant="info" class="m-1" @click="iksStorageDialog = true">Storage 비용 조회</b-button>
	        <b-button size="sm" variant="info" class="m-1" @click="mspCostDialog = true">MSP 비용 조회</b-button>
	        <b-button size="sm" variant="danger" class="m-1" @click="updateEstimate" v-if="editable && showEstimateUpdate" :disabled="!savable">견적서 Update</b-button>
          </b-col>
          <b-col cols="3" class="text-right">
            <b-button size="sm" variant="outline-primary" class="m-1" @click="cancel">취소</b-button>
	        <b-button size="sm" variant="primary" class="m-1" v-if="editable" @click="save" :disabled="!savable">저장</b-button>
	        <b-button size="sm" variant="primary" class="m-1" v-if="!editable" @click="remove">삭제</b-button>
          </b-col>
        </b-row>
    </b-card>
    
    <b-modal size="lg" ok-only ok-title="Close" ok-variant="danger" title="기준정보" v-model="generalDialog" scrollable>
	    <general-detail
	    	v-bind:editable="false"
	    	v-bind:versionId="generalVersionId" 
	    />
	</b-modal>
    <b-modal size="xl" ok-only ok-title="Close" ok-variant="danger" title="IKS VM" v-model="iksVmDialog" scrollable>
	    <iks-vm-detail
	    	v-bind:editable="false"
	    	v-bind:versionId="iksVmVersionId" 
	    />
	</b-modal>
    <b-modal size="xl" ok-only ok-title="Close" ok-variant="danger" title="IKS Storage" v-model="iksStorageDialog" scrollable>
	    <iks-storage-detail
	    	v-bind:editable="false"
	    	v-bind:versionId="iksStorageVersionId" 
	    />
	</b-modal>
    <b-modal size="lg" ok-only ok-title="Close" ok-variant="danger" title="MSP 비용" v-model="mspCostDialog" scrollable>
	    <product-msp-cost-detail
	    	v-bind:editable="false"
	    	v-bind:versionId="mspCostVersionId" 
	    />
	</b-modal>
  </div>
</template>

<script>
import { Aside as AppAside, AsideToggler } from '@coreui/vue'
import estimateSummary from './cost_estimate/EstimateSummary'
import estimateService from './cost_estimate/EstimateService'
import costEstimateHistory from './cost_estimate/CostEstimateHistory'
import generalDetail from './../iks_cost/GeneralDetail'
import iksVmDetail from './../iks_cost/IKSVmDetail'
import iksStorageDetail from './../iks_cost/IKSStorageDetail'
import productMspCostDetail from './../platform/MspCostDetail'

export default {
  	components: {
  		AppAside, AsideToggler,
  		estimateSummary, estimateService, costEstimateHistory, generalDetail, iksVmDetail, iksStorageDetail, productMspCostDetail
  	},
	data: () => ({
		cloudZServiceEstimateType: 'cloudZService',
		storageServiceEstimateType: 'storageService',
		
 		iksGeneral: {},
		vmVersion: {},
		storageVersion: {},
		productMspCostVersion: {},
		
		environments: [],
		tabLinks: [
	      	{ text: '요약' }
	    ],
      	estimate: {
      		environments: [],
      		summary: {environments: []}
      	},
      	historyDialog: false,
      	
      	generalDialog: false,
      	generalVersionId: 0,
      	iksVmDialog: false,
      	iksVmVersionId: 0,
      	iksStorageDialog: false,
      	iksStorageVersionId: 0,
      	mspCostDialog: false,
      	mspCostVersionId: 0,
      	
      	productReferences : [],
      	projectVolumes: {},
      	showEstimateUpdate: false,
      	referenceUpdateStatus: false,
      	
      	projectId: 0,
      	editable: false,
      	savable: true,
      	historyUpdateStatus: false,
      	estimateDetail: {estimateId: 0}
	}),
	props: [
	],
	computed: {
	},
	watch: {
	},
	created () {
		this.initialize();
	},
	methods: {
		initialize() {
			if(this.$route.params.projectId) {
				this.projectId = this.$route.params.projectId;
			}
			if(this.$route.params.editable) {
				this.editable = this.$route.params.editable;
			}
			
			//if(!this.editable) {
			//	return;
			//}
			
			this.$http.get('/api/estimate/project/' + this.projectId + '/estimate').then(response => {
				if(response && response.data) {
					this.estimate = response.data;
				}
				
				this.createTabLinks();
				this.getEnvironmentInfo();

				this.getGeneralInfo();
				this.getVmInfo();
				this.getStorageInfo();
				this.getMspInfo();
				this.getProductInfo();
				this.getVolumeInfo();
				
			}).catch(error => {
				alert(error.response.data.message);
			})
		},
		viewHistoryDetail() {
			this.editable = false;
			
			this.$http.get('/api/estimate/project/' + this.projectId + '/estimate/history/' + this.estimateDetail.estimateId).then(response => {
				if(response && response.data) {
					this.estimate = response.data;
					this.generalVersionId = this.estimate.generalId;
					this.iksVmVersionId = this.estimate.iksVmVersionId;
					this.iksStorageVersionId = this.estimate.iksStorageVersionId;
					this.mspCostVersionId = this.estimate.mspCostVersionId;
				}
				
				this.createTabLinks();
				
			}).catch(error => {
				alert(error.response.data.message);
			})
		},
		createTabLinks() {
			this.tabLinks = this.tabLinks.slice(0,1);	
			for(let env of this.estimate.environments) {
				let tabItem = {};
				tabItem.text = env.environmentName;
				tabItem.environmentId = env.environmentId;
				tabItem.environmentName = env.environmentName;
				this.tabLinks.push(tabItem);
			}
		},
		getEnvironmentInfo() {
			this.$http.get('/api/estimate/project/' + this.projectId + '/environment').then(response => {
				if(response && response.data) {
					this.environments = response.data;
					
					for(let tabItem of this.tabLinks.slice(1)) {
						let envData = response.data.find(environment => environment.id === tabItem.environmentId);
						if(!envData) {
							
							tabItem.text += " (Removed)";
							tabItem.environmentDisabled = true;
							
							//delete estimate items
							let target = this.estimate.environments.find(environment => environment.environmentId === tabItem.environmentId);
							target.environmentName += " (Removed)";
							target.cloudZService.disabled = true;
							target.cloudZService.products.length = 0;
							target.storageService.disabled = true;
							target.storageService.products.length = 0;
						}
					}
					
					for(let item of response.data) {
						let envData = this.estimate.environments.find(env => env.environmentId === item.id);
						if(!envData) {
				 			envData = {};
				 			envData.environmentId = item.id;
				 			envData.environmentName = item.name;
				 			envData.cloudZService = {};
				 			envData.cloudZService.products = new Array();
				 			envData.storageService = {};
				 			envData.storageService.products = new Array();
				 			this.estimate.environments.push(envData);

							let tabItem = {};
							tabItem.text = item.name;
							tabItem.environmentId = item.id;
							tabItem.environmentName = item.name;
							this.tabLinks.push(tabItem);
						}	 		
					}
				}
			}).catch(error => {
				
			})
		},
		getActiveTabIndex(index) {
			if(this.editable && this.tabLinks[index].environmentDisabled) {
				alert('삭제된 Environment입니다.');
				this.active = 0;
			}
		},
		getVolumeInfo() {
			this.$http.get('/api/estimate/project/' + this.projectId + '/volume').then(response => {
				this.projectVolumes = response.data;
			})
		},
		showReferenceMessage(mtitle, message) {
			this.$bvToast.toast(message, {
				title: mtitle,
				variant: 'danger',
				autoHideDelay: 5000,
				appendToast: true
			})
		},
		getGeneralInfo() {
			this.$http.get('/api/estimate/general').then(response => {
				if(response && response.data && response.data.id > 0) {
					this.iksGeneral = response.data;
					this.generalVersionId = this.iksGeneral.id;
					
					if(this.estimate.id > 0 && this.estimate.generalId != this.iksGeneral.id) {
						this.showReferenceMessage('기준정보', '최신 버전이 아닙니다. ');
						this.showEstimateUpdate = true;
					}
				} else {
					this.savable = false;
					this.showReferenceMessage('기준정보', '조회된 데이터가 없습니다.');
				}
			}).catch(error => {
				this.savable = false;
				this.showReferenceMessage('기준정보', error.response.data.message);
			})
		},
		getVmInfo() {
			this.$http.get('/api/estimate/iks_costs/vm').then(response => {
				if(response && response.data && response.data.id > 0) {
					this.vmVersion = response.data;
					this.iksVmVersionId = this.vmVersion.id;
					
					if(this.estimate.id > 0 && this.estimate.iksVmVersionId != this.vmVersion.id) {
						this.showReferenceMessage('VM 비용', '최신 버전이 아닙니다');
						this.showEstimateUpdate = true;
					}
				} else {
					this.savable = false;
					this.showReferenceMessage('VM 비용', '조회된 데이터가 없습니다.');
				}
			}).catch(error => {
				this.savable = false;
				this.showReferenceMessage('VM 비용', error.response.data.message);
			})
		},
		getStorageInfo() {
			this.$http.get('/api/estimate/iks_costs/storage').then(response => {
				if(response && response.data && response.data.id > 0) {
					this.storageVersion = response.data;
					this.iksStorageVersionId = this.storageVersion.id;
					
					if(this.estimate.id > 0 && this.estimate.iksStorageVersionId != this.storageVersion.id) {
						this.showReferenceMessage('Storage 비용', '최신 버전이 아닙니다');
						this.showEstimateUpdate = true;
					}
				} else {
					this.savable = false;
					this.showReferenceMessage('Storage 비용', '조회된 데이터가 없습니다.');
				}
			}).catch(error => {
				this.savable = false;
				this.showReferenceMessage('Storage 비용', error.response.data.message);
			})
		},
		getMspInfo() {
			this.$http.get('/api/estimate/platform/msp').then(response => {
				if(response && response.data && response.data.id > 0) {
					this.productMspCostVersion = response.data;
					this.mspCostVersionId = this.productMspCostVersion.id;
					
					if(this.estimate.id > 0 && this.estimate.mspCostVersionId != this.productMspCostVersion.id) {
						this.showReferenceMessage('MSP 비용', '최신 버전이 아닙니다');
						this.showEstimateUpdate = true;
					}
				} else {
					this.savable = false;
					this.showReferenceMessage('MSP 비용', '조회된 데이터가 없습니다.');
				}
			}).catch(error => {
				this.savable = false;
				this.showReferenceMessage('MSP 비용', error.response.data.message);
			})
		},
		getProductInfo() {
			this.$http.get('/api/estimate/platform/product').then(response => {
				let products = response.data;
				for(let productInfo of products) {
					let product = {};
					product.productId = productInfo.id;
					product.productName = productInfo.name;
					this.productReferences.push(product);
					this.getTemplate(product);
				}
			})
		},
		getTemplate(product) {
			this.$http.get('/api/estimate/platform/product/' + product.productId + '/template').then(response => {
				product.templates = response.data;
			});
			this.$http.get('/api/estimate/platform/product/' + product.productId + '/service').then(response => {
				product.services = response.data;
			});
		},
		updateEstimate() {
			if(confirm('최신 버전으로 다시 계산하시겠습니까?')) {
				this.referenceUpdateStatus = true;
			}
		},
		finishReferenceUpdate() {
			this.referenceUpdateStatus = false;
			this.changeEstimate();
			this.showEstimateUpdate = false;
			this.estimate.generalId = this.iksGeneral.id;
			this.estimate.iksVmVersionId = this.vmVersion.id;
			this.estimate.iksStorageVersionId = this.storageVersion.id;
			this.estimate.mspCostVersionId = this.productMspCostVersion.id;

			alert("견적서 Update가 완료되었습니다.");
		},
		cancel() {
			history.go(-1);
		},
		save() {
			if(this.estimate.id > 0) {
				if(this.estimate.generalId != this.iksGeneral.id || this.estimate.iksVmVersionId != this.vmVersion.id
					|| this.estimate.iksStorageVersionId != this.storageVersion.id || this.estimate.mspCostVersionId != this.productMspCostVersion.id) {
					
					alert("견적서 Update 수행 후 저장할 수 있습니다.");
					return;
				}
			}
			
			if(confirm('변경된 내용을 저장하시겠습니까?')) {
				this.estimate.generalId = this.iksGeneral.id;
				this.estimate.iksVmVersionId = this.vmVersion.id;
				this.estimate.iksStorageVersionId = this.storageVersion.id;
				this.estimate.mspCostVersionId = this.productMspCostVersion.id;

				this.$http.put('/api/estimate/project/' + this.projectId + '/estimate', this.estimate).then(response => {
					alert("저장되었습니다.");
					this.initialize();
					this.historyUpdateStatus = true;
				})
			}
		},
		remove() {
			if(confirm('삭제하시겠습니까?')) {
				this.$http.delete('/api/estimate/project/' + this.projectId + '/estimate/history/' + this.estimateDetail.estimateId).then(response => {
					alert("삭제되었습니다.");
					history.go(-1);
				})
			}
		},
		changeEstimate() {
			let sumMonthly = 0;
			let sumYearly = 0;
			
			for(let environment of this.estimate.environments) {
				this.summaryEnvironments(environment);
				
				sumMonthly += environment.sumMonthly;
				sumYearly += environment.sumYearly;
			}
			this.estimate.sumMonthly = sumMonthly;
			this.estimate.sumYearly = sumYearly;
		},
		summaryEnvironments(environment) {
			this.summaryEstimateType(environment.cloudZService);
			this.summaryEstimateType(environment.storageService);
			
			environment.sumMonthly = environment.cloudZService.sumMonthly + environment.storageService.sumMonthly;
			environment.sumYearly = environment.cloudZService.sumYearly + environment.storageService.sumYearly;
		},
		summaryEstimateType(estimateType) {
			let sumMonthly = 0;
			let sumYearly = 0;
			
			for(let product of estimateType.products) {
				for(let service of product.services) {
					this.summaryService(service);
				}
				
				this.summaryProduct(product);
				
				sumMonthly += product.sumMonthly;
				sumYearly += product.sumYearly;
			}
			
			estimateType.sumMonthly = sumMonthly;
			estimateType.sumYearly = sumYearly;
		},
		summaryProduct(product) {
			let sumMonthly = 0;
			let sumYearly = 0;
			
			for(let service of product.services) {
				sumMonthly += service.sumMonthly;
				sumYearly += service.sumYearly;
			}
			
			product.sumMonthly = sumMonthly;
			product.sumYearly = sumYearly;
		},
		summaryService(service) {
			let sumMonthly = 0;
			let sumYearly = 0;
			
			for(let classification of service.classifications) {
				sumMonthly += (classification.pricePerMonthly == undefined ? 0 : classification.pricePerMonthly);
				sumYearly += (classification.pricePerYearly == undefined ? 0 : classification.pricePerYearly);
			}
			
			service.sumMonthly = sumMonthly;
			service.sumYearly = sumYearly;
		}
	}
}
</script>

