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
		      <b-form-group label="기준정보 버전" label-for="generalVersion" :label-cols="3" >
		        <b-button size="sm" variant="info" v-if="estimate.generalId > 0" @click="generalDialog=true; generalVersionId=estimate.generalId">현재버전({{ estimate.generalVersion }}) 조회</b-button>
		        <small class="text-danger" v-if="editable && !iksGeneral.id || iksGeneral.id==0">조회된 기준정보가 없습니다.</small>
		        <small class="text-info"   v-if="editable && iksGeneral.id > 0 && estimate.generalId==iksGeneral.id">최신 버전입니다.</small>
		        <b-button size="sm" 	   v-if="editable && iksGeneral.id > 0 && estimate.generalId!=iksGeneral.id" variant="danger" @click="generalDialog=true; generalVersionId=iksGeneral.id">최신버전({{ iksGeneral.version }}) 조회</b-button>
		      </b-form-group>
		      <b-form-group label="VM 버전" label-for="iksVmVersionVersion" :label-cols="3" >
		        <b-button size="sm" variant="info" v-if="estimate.iksVmVersionId > 0" @click="iksVmDialog=true; iksVmVersionId=estimate.iksVmVersionId">현재버전({{ estimate.iksVmVersionVersion }}) 조회</b-button>
		        <small class="text-danger" v-if="!vmVersion.id || vmVersion.id==0">조회된 VM이 없습니다.</small>
		        <small class="text-info"   v-if="editable && vmVersion.id > 0 && estimate.iksVmVersionId==vmVersion.id">최신 버전입니다.</small>
		        <b-button size="sm" 	   v-if="editable && vmVersion.id > 0 && estimate.iksVmVersionId!=vmVersion.id" :variant="estimate.iksVmVersionId==vmVersion.id ? 'info' : 'danger'" @click="iksVmDialog=true; iksVmVersionId=vmVersion.id">최신버전({{ vmVersion.version }}) 조회</b-button>
		      </b-form-group>
		      <b-form-group label="Storage 버전" label-for="iksStorageVersionVersion" :label-cols="3" >
		        <b-button size="sm" variant="info" v-if="estimate.iksStorageVersionId > 0" @click="iksStorageDialog=true; iksStorageVersionId=estimate.iksStorageVersionId">현재버전({{ estimate.iksStorageVersionVersion }}) 조회</b-button>
		        <small class="text-danger" v-if="!storageVersion.id || storageVersion.id==0">조회된 Storage가 없습니다.</small>
		        <small class="text-info"   v-if="editable && storageVersion.id > 0 && estimate.iksStorageVersionId==storageVersion.id">최신 버전입니다.</small>
		        <b-button size="sm" 	   v-if="editable && storageVersion.id > 0 && estimate.iksStorageVersionId!=storageVersion.id" :variant="estimate.iksStorageVersionId==storageVersion.id ? 'info' : 'danger'" @click="iksStorageDialog=true; iksStorageVersionId=storageVersion.id">최신버전({{ storageVersion.version }}) 조회</b-button>
		      </b-form-group>
		      <b-form-group label="MSP 비용 버전" label-for="mspCostVersionVersion" :label-cols="3" >
		        <b-button size="sm" variant="info" v-if="estimate.mspCostVersionId > 0" @click="mspCostDialog=true; mspCostVersionId=estimate.mspCostVersionId">현재버전({{ estimate.mspCostVersionVersion }}) 조회</b-button>
		        <small class="text-danger" v-if="!productMspCostVersion.id || productMspCostVersion.id==0">조회된 MSP 비용이 없습니다.</small>
		        <small class="text-info"   v-if="editable && productMspCostVersion.id > 0 && estimate.mspCostVersionId==productMspCostVersion.id">최신 버전입니다.</small>
		        <b-button size="sm" 	   v-if="editable && productMspCostVersion.id > 0 && estimate.mspCostVersionId!=productMspCostVersion.id" :variant="estimate.mspCostVersionId==productMspCostVersion.id ? 'info' : 'danger'" @click="mspCostDialog=true; mspCostVersionId=productMspCostVersion.id">최신버전({{ productMspCostVersion.version }}) 조회</b-button>
		      </b-form-group>
		    </b-form>
	        <b-row>
	          <b-col>
		        <estimate-summary/>
	          </b-col>
	        </b-row>
		  </b-tab>
		  <b-tab v-for="(environment, index) in estimate.environments" :key="environment.environmentId" :title="environment.environmentName" :disabled="environment.environmentDisabled">
		    <b-row>
		      <b-col>
				<estimate-service 
					v-bind:title="'Cloud Z Service'"
					v-bind:estimateEnvironment="environment.environmentName"
					v-bind:estimateType="cloudZServiceEstimateType"
					v-bind:estimate="environment.cloudZService"
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
	        <b-button size="sm" variant="info" class="m-1" @click="showHistory">History 조회</b-button>
	        <b-button size="sm" variant="danger" class="m-1" @click="updateEstimate" v-if="editable && showEstimateUpdate">견적서 Update</b-button>
          </b-col>
          <b-col cols="3" class="text-right">
            <b-button size="sm" variant="outline-primary" class="m-1" @click="cancel">취소</b-button>
	        <b-button size="sm" variant="primary" class="m-1" v-if="editable" @click="save">저장</b-button>
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
import estimateSummary from './cost_estimate/EstimateSummary'
import estimateService from './cost_estimate/EstimateService'
import costEstimateHistory from './cost_estimate/CostEstimateHistory'
import generalDetail from './../iks_cost/GeneralDetail'
import iksVmDetail from './../iks_cost/IKSVmDetail'
import iksStorageDetail from './../iks_cost/IKSStorageDetail'
import productMspCostDetail from './../platform/MspCostDetail'

export default {
  	components: {
  		estimateSummary, estimateService, costEstimateHistory, generalDetail, iksVmDetail, iksStorageDetail, productMspCostDetail
  	},
	data: () => ({
		cloudZServiceEstimateType: 'cloudZService',
		storageServiceEstimateType: 'storageService',
		
      	historyDialog: false,
      	generalDialog: false,
      	iksVmDialog: false,
      	iksStorageDialog: false,
      	mspCostDialog: false,
      	
      	generalVersionId: 0,
      	iksVmVersionId: 0,
      	iksStorageVersionId: 0,
      	mspCostVersionId: 0,
      	
      	referenceUpdateStatus: false,
      	
      	projectId: 0
	}),
	props: [
	],
	computed: {
		editable: function() {
			if(this.$store.state.estimate.projectCostEstimateHistoryDetailStatus) {
				return false
			}
			return true
		},
		estimate: function() {
			return this.$store.state.estimate.projectCostEstimate
		},
		productReferences: function() {
			return this.$store.state.estimate.productReferences
		},
		projectVolumes: function() {
			return this.$store.state.estimate.projectVolume
		},
		iksGeneral: function() {
			return this.$store.state.estimate.general
		},
		vmVersion: function() {
			return this.$store.state.estimate.vm
		},
		storageVersion: function() {
			return this.$store.state.estimate.storage
		},
		productMspCostVersion: function() {
			return this.$store.state.estimate.productMspCost
		},
		showEstimateUpdate: function() {
			if(!this.estimate.id || this.estimate.id == 0) return false
			if(!this.iksGeneral.id || this.iksGeneral.id == 0) return false
			if(!this.vmVersion.id || this.vmVersion.id == 0) return false
			if(!this.storageVersion.id || this.storageVersion.id == 0) return false
			if(!this.productMspCostVersion.id || this.productMspCostVersion.id == 0) return false
			
			if(this.estimate.generalId != this.iksGeneral.id || this.estimate.iksVmVersionId != this.vmVersion.id
				 || this.estimate.iksStorageVersionId != this.storageVersion.id || this.estimate.mspCostVersionId != this.productMspCostVersion.id) {
				return true
			} 
		},
		projectCostEstimateHistoryDetail: function() {
			return this.$store.state.estimate.projectCostEstimateHistoryDetail
		}
	},
	watch: {
	},
	created () {
		this.initialize();
	},
	beforeDestroy() {
		this.$store.commit('estimate/setProjectCostEstimateHistoryDetailStatus', false)
		if(this.historyDialog) {
			this.showHistory();
		}
	},
	methods: {
		showHistory() {
			this.historyDialog = !this.historyDialog;
			this.$store.commit('setAsideToggleStatus', {status: this.historyDialog});
		},
		initialize() {
			if(this.$route.params.projectId) {
				this.projectId = this.$route.params.projectId;
			}
			
			if(!this.editable) {
				return;
			}
			
			this.$store.dispatch('estimate/getProjectCostEstimate', {projectId: this.projectId})
			this.$store.dispatch('estimate/getProjectCostEstimateHistory', {projectId: this.projectId})
			this.$store.dispatch('estimate/getProjectVolume', {projectId: this.projectId})
			this.$store.dispatch('estimate/getProductReferences')
			
			this.$store.dispatch('estimate/getHardwareTypes')
			this.$store.dispatch('estimate/getFileStorageTypes')
			this.$store.dispatch('estimate/getEnduranceIops')
			this.$store.dispatch('estimate/getClassificationTypes')
		},
		showReferenceMessage(mtitle, message) {
			this.$bvToast.toast(message, {
				title: mtitle,
				variant: 'danger',
				autoHideDelay: 5000,
				appendToast: true
			})
		},
		clickGeneralDialog(versionId) {
			this.generalDialog = true
			this.generalVersionId = versionId 
		},
		updateEstimate() {
			if(confirm('최신 버전으로 다시 계산하시겠습니까?')) {
				this.referenceUpdateStatus = true;
			}
		},
		finishReferenceUpdate() {
			this.referenceUpdateStatus = false
			this.changeEstimate()
			//this.showEstimateUpdate = false
			this.estimate.generalId = this.iksGeneral.id
			this.estimate.generalVersion = this.iksGeneral.version
			this.estimate.iksVmVersionId = this.vmVersion.id
			this.estimate.iksVmVersionVersion = this.vmVersion.version
			this.estimate.iksStorageVersionId = this.storageVersion.id
			this.estimate.iksStorageVersionVersion = this.storageVersion.version
			this.estimate.mspCostVersionId = this.productMspCostVersion.id
			this.estimate.mspCostVersionVersion = this.productMspCostVersion.version

			alert("견적서 Update가 완료되었습니다.");
		},
		cancel() {
			history.go(-1);
		},
		save() {
			if(this.estimate.id > 0) {
				if(!this.iksGeneral.id || this.iksGeneral.id == 0) {
					alert('조회된 기준정보가 없습니다. 기준정보 생성 후 저장할 수 없습니다.')
					return
				}
				if(!this.vmVersion.id || this.vmVersion.id == 0) {
					alert('조회된 VM 정보가 없습니다.  VM 정보 생성 후 저장할 수 없습니다.')
					return
				}
				if(!this.storageVersion.id || this.storageVersion.id == 0) {
					alert('조회된 Storage 정보가 없습니다. Storage 정보 생성 후 저장할 수 없습니다.')
					return
				}
				if(!this.productMspCostVersion.id || this.productMspCostVersion.id == 0) {
					alert('조회된 MSP 비용 정보가 없습니다. MSP 비용 정보 생성 후 저장할 수 없습니다.')
					return
				}
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

				this.$store.dispatch('estimate/saveProjectCostEstimate', {projectId: this.projectId, estimate: this.estimate})
			}
		},
		remove() {
			if(confirm('삭제하시겠습니까?')) {
				this.$store.dispatch('estimate/removeProjectCostEstimateHistoryDetail', {projectId: this.projectId, estimateId: this.estimate.id})
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

