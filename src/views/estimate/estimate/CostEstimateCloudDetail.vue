<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">
            {{ estimate.estimateName }} 
            <b-badge variant="success" v-if="estimate.contractVersionYn == 'Y'">계약된 버전입니다</b-badge>
            <div class="float-right">
                <b-button variant="secondary" class="mr-2" @click="downloadExcel()"><i class="icon-arrow-down-circle"></i> Excel Download</b-button>
                <b-button variant="secondary" class="mr-2" @click="showHistory()"><i class="icon-clock"></i> History 조회</b-button>
                <b-button variant="primary" class="mr-2" @click="tagContractVersion()" v-if="estimate.contractVersionYn == 'N'"><i class="icon-check"></i> 계약 태깅</b-button>
                <b-button variant="primary" @click="updateEstimate" v-if="editable && showEstimateUpdate"><i class="icon-refresh"></i> 견적서 Update</b-button>
            </div>
        </h1>
        <b-tabs class="mb-4">
            <summary-tab />
            <environment-tab />
        </b-tabs>
        <div class="mb-4">
            <b-button variant="warning" @click="goList"><i class="icon-list"></i> 목록</b-button>
            <b-button variant="primary" class="float-right" v-if="editable" @click="save"><i class="icon-check"></i> 저장</b-button>
            <b-button variant="danger" class="float-right" v-if="!editable" @click="remove"><i class="icon-close"></i> 삭제</b-button>
        </div>
        
        <!-- local-aside : history -->
        <aside class="local-aside-menu">
        	<history />
        </aside>
        <!-- // local-aside : history -->
    </div>
</template>

<script>
import History from './costestimateclouddetail/History'
import SummaryTab from './costestimateclouddetail/SummaryTab'
import EnvironmentTab from './costestimateclouddetail/EnvironmentTab'
import variant from '@/mixins/variant'

export default {
	mixins: [variant],
    components: {
        History, SummaryTab, EnvironmentTab
    },
	data: () => ({
      	estimateId: 0,
      	cspCode: null,
      	estimateCspId: 0
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
//		projectVolumes: function() {
//			return this.$store.state.estimate.projectVolume
//		},
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
	beforeDestroy() {
		this.$store.commit('estimate/setProjectCostEstimateHistoryDetailStatus', false)
		
		if(document.body.classList.contains('local-aside-show')) {
			document.body.classList.remove('local-aside-show')
		}
	},
	created () {
		this.initialize();
	},
    methods: {
    	downloadExcel() {
    		this.$store.dispatch('estimate/downloadExcel', {
    			estimateId: this.estimate.estimateId, 
    			cspCode: this.estimate.cspCode, 
    			estimateCspId: this.estimate.id, 
    			version: this.estimate.version, 
    			estimateName: this.estimate.estimateName}
    		)
    	},
        showHistory () {
            document.body.classList.toggle("local-aside-show")
        },
		initialize() {
			if(this.$route.params.estimateId) {
				this.estimateId = this.$route.params.estimateId;
			}
			if(this.$route.params.cspCode) {
				this.cspCode = this.$route.params.cspCode;
			}
			
			if(this.$route.params.estimateCspId) {
				this.estimateCspId = this.$route.params.estimateCspId;
			}

			if(!this.editable) {
				return;
			}
			
			if(this.estimateCspId > 0) {
				this.$store.dispatch('estimate/getProjectCostEstimateHistoryDetail', {estimateId: this.estimateId, cspCode: this.cspCode, estimateCspId: this.estimateCspId})
			
			} else {
				this.$store.dispatch('estimate/getProjectCostEstimate', {estimateId: this.estimateId, cspCode: this.cspCode})
			}

			this.$store.dispatch('estimate/getProjectCostEstimateHistory', {estimateId: this.estimateId, cspCode: this.cspCode})
			//this.$store.dispatch('estimate/getProjectVolume', {projectId: this.projectId})
			this.$store.dispatch('estimate/getProductReferences')
			
			this.$store.dispatch('estimate/getHardwareTypes')
			this.$store.dispatch('estimate/getFileStorageTypes')
			this.$store.dispatch('estimate/getEnduranceIops')
			this.$store.dispatch('estimate/getClassificationTypes')
		},
		updateEstimate() {
			this.$zadmin.confirm('최신 버전으로 다시 계산하시겠습니까?', (result) => {
				result && this.$store.commit('estimate/updateCostEstimateReference', true)
			})
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
	
					this.$store.dispatch('estimate/saveProjectCostEstimate', {estimateId: this.estimateId, cspCode: this.cspCode, estimate: this.estimate})
				}
			})
		},
		remove() {
			this.$zadmin.confirm('삭제하시겠습니까?', (result) => {
				result && this.$store.dispatch('estimate/removeProjectCostEstimateHistoryDetail', {estimateId: this.estimate.estimateId, cspCode: this.estimate.cspCode, estimateCspId: this.estimate.id})
			})
		},
		tagContractVersion() {
			this.$zadmin.confirm('계약된 버전으로 변경하시겠습니까?', (result) => {
				result && this.$http.put('/api/estimate/cost-estimates/' + this.estimate.estimateId + '/estimateCspId', {id: this.estimate.estimateId, estimateCspId: this.estimate.id}).then(response => {
					this.$zadmin.alert('저장되었습니다.')
					this.$store.dispatch('estimate/getProjectCostEstimate', {estimateId: this.estimate.estimateId, cspCode: this.estimate.cspCode})
					this.$store.dispatch('estimate/getProjectCostEstimateHistory', {estimateId: this.estimate.estimateId, cspCode: this.estimate.cspCode})
				}).catch(error => {
	                this.$zadmin.alert(error.data.message)
	            })
			})
		},
		goList() {
			this.$router.go(-1)
		}
    }
}
</script>