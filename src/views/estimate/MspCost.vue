<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3"">MSP Cost</h1>
        
        <msp-cost-detail v-bind:editable="true" />
        <msp-cost-history />
    </div>
</template>

<script>
import MspCostDetail from './mspcost/MspCostDetail'
import MspCostHistory from './mspcost/MspCostHistory'

export default {
    components: {
        MspCostDetail, MspCostHistory
    }
}
</script>