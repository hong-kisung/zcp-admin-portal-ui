<template>
    <b-tab active>
        <template slot="title">
            <i class="icons cui-justify-left mr-1"></i> 요약
        </template>
    	<basic-info />
        <hr>
        <estimate-summary />
    </b-tab>
</template>

<script>
import BasicInfo from './BasicInfo'
import EstimateSummary from './Summary'

export default {
    components: {
        BasicInfo, EstimateSummary
    }
}
</script>