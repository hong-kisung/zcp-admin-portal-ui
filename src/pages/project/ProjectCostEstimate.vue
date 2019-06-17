<template>
  <div>
    <mdb-row>
      <mdb-col>
	    <mdb-tabs
	      :active="0"
	      card
	      default
	      :links="tabLinks"
	      :transition-duration="0.5"
	      @activeTab="getActiveTabIndex"
	      transition-style="linear">
	      <template :slot="'요약'">
	        <mdb-container fluid>
		      <div class="form-group row mt-3">
		        <label for="version" class="col-sm-2 col-form-label">버전</label>
		        <div class="col-sm-2">
			      <input type="text" class="form-control form-control-sm" id="version" v-model.number="estimate.version" readonly>
			    </div>
		      </div>
		      <div class="form-group row">
		        <label for="createdDt" class="col-sm-2 col-form-label">생성일시</label>
		        <div class="col-sm-4">
			      <input type="text" class="form-control form-control-sm" id="createdDt" v-model.number="estimate.createdDt" readonly>
			    </div>
		      </div>
		      <div class="form-group row">
		        <label for="label" class="col-sm-2 col-form-label">라벨</label>
		        <div class="col-sm-4">
			      <input type="text" class="form-control form-control-sm" id="label" v-model.number="estimate.label">
			    </div>
		      </div>
		      <div class="form-group row">
		        <label for="description" class="col-sm-2 col-form-label">설명</label>
		        <div class="col-sm-10">
			      <input type="text" class="form-control form-control-sm" id="description" v-model.number="estimate.description">
			    </div>
		      </div>
		      <mdb-row>
		        <mdb-col>
				  <estimate-summary 
				  	v-bind:estimate="estimate.summary"
				  />
		        </mdb-col>
		      </mdb-row>
		    </mdb-container>
	      </template>
	      <template v-for="(environment, index) in estimate.environments">
		      <template :slot="environment.environmentName">
		        <mdb-container fluid>
			      <mdb-row>
			        <mdb-col>
						<estimate-service 
							v-bind:title="'Cloud Z Service'"
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
			        </mdb-col>
			      </mdb-row>
			      <mdb-row class="mt-3">
			        <mdb-col>
						<estimate-service 
							v-bind:title="'Application Storage Service'"
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
			        </mdb-col>
			      </mdb-row>
			    </mdb-container>
		      </template>
	      </template>
        </mdb-tabs>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mt-3">
        <mdb-col sm="9" class="text-left">
          <mdb-btn size="sm" outline="info" @click="historyDialog = true">History 조회</mdb-btn>
          <mdb-btn size="sm" color="info" @click="generalDialog = true">기준정보 조회</mdb-btn>
          <mdb-btn size="sm" color="info" @click="iksVmDialog = true">VM 비용 조회</mdb-btn>
          <mdb-btn size="sm" color="info" @click="iksStorageDialog = true">Storage 비용 조회</mdb-btn>
          <mdb-btn size="sm" color="info" @click="mspCostDialog = true">MSP 비용 조회</mdb-btn>
          <mdb-btn size="sm" color="danger" @click="updateEstimate" v-if="editable && showEstimateUpdate" :disabled="!savable">견적서 Update</mdb-btn>
        </mdb-col>
        <mdb-col sm="3" class="text-right">
	      <mdb-btn size="md" outline="primary" @click="cancel">취소</mdb-btn>
	      <mdb-btn size="md" color="primary" v-if="editable" @click="save" :disabled="!savable">저장</mdb-btn>
	      <mdb-btn size="md" color="primary" v-if="!editable" @click="remove">삭제</mdb-btn>
        </mdb-col>
    </mdb-row>
    <cost-estimate-history
    	v-bind:projectId="projectId"
    	v-bind:estimateDetail="estimateDetail"
    	v-bind:historyDialog="historyDialog"
    	v-bind:refreshStatus="historyUpdateStatus"
    	v-on:fire-refresh-finished="historyUpdateStatus = false"
    	v-on:fire-history-closed="historyDialog = false"
    	v-on:fire-detail-clicked="viewHistoryDetail"
    />
	<mdb-modal size="lg" centered :show="generalDialog" @close="generalDialog = false" scrollable>
	  <mdb-modal-body>
	    <general-detail
	    	v-bind:editable="false"
	    	v-bind:versionId="generalVersionId" 
	    	v-on:fire-dialog-closed="generalDialog = false"
	    />
	  </mdb-modal-body>
	</mdb-modal>
	<mdb-modal size="xl" centered :show="iksVmDialog" @close="iksVmDialog = false" scrollable>
	  <mdb-modal-body>
	    <iks-vm-detail
	    	v-bind:editable="false"
	    	v-bind:versionId="iksVmVersionId" 
	    	v-on:fire-dialog-closed="iksVmDialog = false"
	    />
	  </mdb-modal-body>
	</mdb-modal>
	<mdb-modal size="xl" centered :show="iksStorageDialog" @close="iksStorageDialog = false" scrollable>
	  <mdb-modal-body>
	    <iks-storage-detail
	    	v-bind:editable="false"
	    	v-bind:versionId="iksStorageVersionId" 
	    	v-on:fire-dialog-closed="iksStorageDialog = false"
	    />
	  </mdb-modal-body>
	</mdb-modal>
	<mdb-modal size="lg" centered :show="mspCostDialog" @close="mspCostDialog = false" scrollable>
	  <mdb-modal-body>
	    <product-msp-cost-detail
	    	v-bind:editable="false"
	    	v-bind:versionId="mspCostVersionId" 
	    	v-on:fire-dialog-closed="mspCostDialog = false"
	    />
	  </mdb-modal-body>
	</mdb-modal>
    <mdb-modal side position="bottom-right" info removeBackdrop :show="showReferencewarning" @close="showReferencewarning = false">
      <mdb-modal-header>
        <p class="heading">참조 정보 버전 오류</p>
      </mdb-modal-header>
      <mdb-modal-body>
        <mdb-row class="mt-1 mb-2">
          <mdb-col>
            <p v-for="(reference) in referenceMessage" class="text-sm-left"><strong>[{{ reference.title }}]</strong> {{ reference.message }}</p>
          </mdb-col>
        </mdb-row>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn outline="primary" size="md" @click="showReferencewarning = false">확인</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter, mdbIcon, mdbBtn } from 'mdbvue'
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter } from 'mdbvue' 
import { mdbInput } from 'mdbvue'
import { mdbTabs } from 'mdbvue'
import estimateService from './cost_estimate/EstimateService'
import estimateSummary from './cost_estimate/EstimateSummary'
import costEstimateHistory from './cost_estimate/CostEstimateHistory'
import generalDetail from '@/pages/iks_cost/GeneralDetail'
import iksVmDetail from '@/pages/iks_cost/IKSVmDetail'
import iksStorageDetail from '@/pages/iks_cost/IKSStorageDetail'
import productMspCostDetail from '@/pages/platform/MspCostDetail'

export default {
  	components: {
    	mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter,
    	mdbIcon, mdbBtn,
    	mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter,
    	mdbInput,
    	mdbTabs,
    	estimateService, estimateSummary, costEstimateHistory, generalDetail, iksVmDetail, iksStorageDetail, productMspCostDetail
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
      	showReferencewarning: false,
      	referenceMessage: [],
      	
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
			
			if(!this.editable) {
				return;
			}
			
			this.$http.get('/api/project/' + this.projectId + '/estimate').then(response => {
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
			
			this.$http.get('/api/project/' + this.projectId + '/estimate/history/' + this.estimateDetail.estimateId).then(response => {
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
			this.$http.get('/api/project/' + this.projectId + '/environment').then(response => {
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
			this.$http.get('/api/project/' + this.projectId + '/volume').then(response => {
				this.projectVolumes = response.data;
			})
		},
		showReferenceMessage(title, message) {
			let reference = {};
			reference.title = title;
			reference.message = message;
			this.referenceMessage.push(reference);
			this.showReferencewarning = true;
		},
		getGeneralInfo() {
			this.$http.get('/api/general').then(response => {
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
			this.$http.get('/api/iks_costs/vm').then(response => {
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
			this.$http.get('/api/iks_costs/storage').then(response => {
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
			this.$http.get('/api/platform/msp').then(response => {
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
			this.$http.get('/api/platform/product').then(response => {
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
			this.$http.get('/api/platform/product/' + product.productId + '/template').then(response => {
				product.templates = response.data;
			});
			this.$http.get('/api/platform/product/' + product.productId + '/service').then(response => {
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

				this.$http.put('/api/project/' + this.projectId + '/estimate', this.estimate).then(response => {
					alert("저장되었습니다.");
					this.initialize();
					this.historyUpdateStatus = true;
				})
			}
		},
		remove() {
			if(confirm('삭제하시겠습니까?')) {
				this.$http.delete('/api/project/' + this.projectId + '/estimate/history/' + this.estimateDetail.estimateId).then(response => {
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

