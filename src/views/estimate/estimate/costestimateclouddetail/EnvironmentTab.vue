<template>
	<div>
	    <b-tab v-for="(environment, index) in estimate.environments" :key="environment.environmentType" :disabled="environment.environmentDisabled">
	        <template slot="title">
	            <i class="icons cui-screen-desktop mr-1"></i> {{ environment.environmentTypeLabel || environment.environmentType }}
	        </template>
	        
	        <!-- Cloud Z Service -->
	        <estimate-type 
				v-bind:title="'Cloud Z Service'"
				v-bind:estimateEnvironment="environment.environmentType"
				v-bind:estimateType="cloudZServiceEstimateType"
				v-bind:environmentIndex="index"
	 			v-bind:editable="editable"
	        />
	        <!-- // Cloud Z Service -->
	        
	        <hr> 
	        
	        <!-- Application Storage Service -->
	        <estimate-type 
				v-bind:title="'Application Storage Service'"
				v-bind:estimateEnvironment="environment.environmentType"
				v-bind:estimateType="storageServiceEstimateType"
				v-bind:environmentIndex="index"
	 			v-bind:editable="editable"
	        />
	        <!-- //Application Storage Service -->
	    </b-tab>
    </div>
</template>

<script>
import EstimateType from './EstimateType'

export default {
    components: {
        EstimateType
    },
	data: () => ({
		cloudZServiceEstimateType: 'CloudZService',
		storageServiceEstimateType: 'StorageService',
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
		}
    },
    methods: {
    }
}
</script>