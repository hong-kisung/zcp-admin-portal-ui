<template>
    <div class="animated fadeIn">
        <h1 class="display-tit">VM Cost</h1>
        <h2 class="display-sub mb-3">IKS VM 비용의 최신 버전을 조회 및 수정합니다.</h2>
        
        <vm-cost-detail v-bind:editable="true" />
        <vm-cost-history />
    </div>
</template>

<script>
import VmCostDetail from './vmcost/VmCostDetail'
import VmCostHistory from './vmcost/VmCostHistory'

export default {
    components: {
        VmCostDetail, VmCostHistory
    }
}
</script>