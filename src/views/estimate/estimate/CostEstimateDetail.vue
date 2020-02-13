<template>
    <div class="animated fadeIn">
        <basic-info/>
        <project/>
        <contract-cloud/>
        <estimate-cloud/>

        <div class="text-center mb-4">
        	<b-button variant="warning" class="left" @click="goList"><i class="icon-list"></i> 목록</b-button>
        </div>
    </div>
</template>

<script>
import BasicInfo from './costestimatedetail/BasicInfo'
import Project from './costestimatedetail/Project'
import ContractCloud from './costestimatedetail/ContractCloud'
import EstimateCloud from './costestimatedetail/EstimateCloud'

export default {
    components: {
        BasicInfo, Project, ContractCloud, EstimateCloud
    },
    computed: {
		costEstimateDetail: function() {
			return this.$store.state.estimate.costEstimateDetail
		}
    },
    created() {
    	let estimateId = this.costEstimateDetail.estimateId
    	let editable = this.costEstimateDetail.editable
    	
    	if(this.$route.params.estimateId) {
			estimateId = this.$route.params.estimateId
		}
		if(this.$route.params.editable) {
			editable = this.$route.params.editable
		}
    	
		this.costEstimateDetail.estimateId = estimateId
		this.costEstimateDetail.editable = editable
		this.$store.commit('estimate/setCostEstimateDetail', this.costEstimateDetail)
    	
    },
    methods: {
    	goList() {
    		this.$router.go(-1)
    	}
    }
}
</script>