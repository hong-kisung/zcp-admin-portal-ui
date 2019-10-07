<template>
    <b-tab active>
        <template slot="title">
            <i class="icons cui-justify-left mr-1"></i> 요약
        </template>
    	<cost-estimate-info />
        <hr>
        <cost-estimate-summary />
    </b-tab>
</template>

<script>
import CostEstimateInfo from './CostEstimateInfo'
import CostEstimateSummary from './CostEstimateSummary'

export default {
    components: {
        CostEstimateInfo, CostEstimateSummary
    }
}
</script>