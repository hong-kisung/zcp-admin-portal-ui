<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3"">VM Cost</h1>
        
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