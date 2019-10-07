<template>
    <div class="animated fadeIn">
        <h1 class="display-tit">MSP Cost</h1>
        <h2 class="display-sub mb-3">MSP 비용의 최신 버전을 조회 및 수정합니다.</h2>
        
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