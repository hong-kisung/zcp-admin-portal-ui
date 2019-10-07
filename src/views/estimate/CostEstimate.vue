<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">
            Estimates 원가 견적서
            <div class="float-right">
                <b-button variant="secondary" id="historyShowBtn" class="mr-2" @click="showHistory()"><i class="icon-clock"></i> History 조회</b-button>
                <b-button variant="primary" @click="updateEstimate" v-if="editable && showEstimateUpdate"><i class="icon-refresh"></i> 견적서 Update</b-button>
            </div>
        </h1>
        <b-tabs class="mb-4">
            <b-tab active>
                <template slot="title">
                    <i class="icons cui-justify-left mr-1"></i> 요약
                </template>
                <cost-estimate-summary />
            </b-tab>
            <b-tab v-for="(environment, index) in estimate.environments" :key="environment.environmentId" :disabled="environment.environmentDisabled">
                <template slot="title">
                    <i class="icons cui-screen-desktop mr-1"></i> {{ environment.environmentName }}
                </template>
                
                <!-- Cloud Z Service -->
                <cost-estimate-type 
					v-bind:title="'Cloud Z Service'"
					v-bind:estimateEnvironment="environment.environmentName"
					v-bind:estimateType="cloudZServiceEstimateType"
					v-bind:environmentIndex="index"
		 			v-bind:editable="editable"
                />
                <!-- // Cloud Z Service -->
                
                <hr> 
                
                <!-- Application Storage Service -->
                <cost-estimate-type 
					v-bind:title="'Application Storage Service'"
					v-bind:estimateEnvironment="environment.environmentName"
					v-bind:estimateType="storageServiceEstimateType"
					v-bind:environmentIndex="index"
		 			v-bind:editable="editable"
                />
                <!-- //Application Storage Service -->
            </b-tab>
        </b-tabs>
        <div class="mb-4">
            <router-link :to="{ path: '/estimate/' }">
                <b-button variant="warning"><i class="icon-list"></i> 목록</b-button>
            </router-link>
            <b-button variant="primary" class="float-right" v-if="editable" @click="save"><i class="icon-check"></i> 저장</b-button>
            <b-button variant="danger" class="float-right" v-if="!editable" @click="remove"><i class="icon-close"></i> 삭제</b-button>
        </div>
        
        <!-- local-aside : history -->
        <aside class="local-aside-menu">
        	<cost-estimate-history />
        </aside>
        <!-- // local-aside : history -->
    </div>
</template>

<script>
import CostEstimateHistory from './costestimate/CostEstimateHistory'
import CostEstimateSummary from './costestimate/CostEstimateSummary'
import CostEstimateType from './costestimate/CostEstimateType'

export default {
    components: {
        CostEstimateHistory, CostEstimateSummary, CostEstimateType
    },
	data: () => ({
		cloudZServiceEstimateType: 'CloudZService',
		storageServiceEstimateType: 'StorageService',
		
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
	created () {
		this.initialize();
	},
    methods: {
        showHistory () {
            document.body.classList.toggle("local-aside-show")
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
			this.$zadmin.confirm('최신 버전으로 다시 계산하시겠습니까?', (result) => {
				result && this.$store.commit('estimate/updateCostEstimateReference', true)
			})
		},
		cancel() {
			history.go(-1);
		},
		save() {
			if(this.estimate.id > 0) {
				if(!this.iksGeneral.id || this.iksGeneral.id == 0) {
					this.$zadmin.alert('조회된 기준정보가 없습니다. 기준정보 생성 후 저장할 수 없습니다.')
					return
				}
				if(!this.vmVersion.id || this.vmVersion.id == 0) {
					this.$zadmin.alert('조회된 VM 정보가 없습니다.  VM 정보 생성 후 저장할 수 없습니다.')
					return
				}
				if(!this.storageVersion.id || this.storageVersion.id == 0) {
					this.$zadmin.alert('조회된 Storage 정보가 없습니다. Storage 정보 생성 후 저장할 수 없습니다.')
					return
				}
				if(!this.productMspCostVersion.id || this.productMspCostVersion.id == 0) {
					this.$zadmin.alert('조회된 MSP 비용 정보가 없습니다. MSP 비용 정보 생성 후 저장할 수 없습니다.')
					return
				}
				if(this.estimate.generalId != this.iksGeneral.id || this.estimate.iksVmVersionId != this.vmVersion.id
					|| this.estimate.iksStorageVersionId != this.storageVersion.id || this.estimate.mspCostVersionId != this.productMspCostVersion.id) {
					
					this.$zadmin.alert("견적서 Update 수행 후 저장할 수 있습니다.");
					return;
				}
			}
			
			this.$zadmin.confirm('변경된 내용을 저장하시겠습니까?', (result) => {
				if(result) {
					this.estimate.generalId = this.iksGeneral.id
					this.estimate.iksVmVersionId = this.vmVersion.id
					this.estimate.iksStorageVersionId = this.storageVersion.id
					this.estimate.mspCostVersionId = this.productMspCostVersion.id
	
					this.$store.dispatch('estimate/saveProjectCostEstimate', {projectId: this.projectId, estimate: this.estimate})
				}
			})
		},
		remove() {
			this.$zadmin.confirm('삭제하시겠습니까?', (result) => {
				result && this.$store.dispatch('estimate/removeProjectCostEstimateHistoryDetail', {projectId: this.projectId, estimateId: this.estimate.id})
			})
		}
    }
}
</script>