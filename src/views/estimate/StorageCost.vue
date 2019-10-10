<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3"">Storage Cost</h1>
        
        <storage-cost-detail v-bind:editable="true" />
        <storage-cost-history />
    </div>
</template>

<script>
import StorageCostDetail from './storagecost/StorageCostDetail'
import StorageCostHistory from './storagecost/StorageCostHistory'

export default {
    components: {
        StorageCostDetail, StorageCostHistory
    }
}
</script>