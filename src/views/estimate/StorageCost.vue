<template>
    <div class="animated fadeIn">
        <h1 class="display-tit">Storage Cost</h1>
        <h2 class="display-sub mb-3">IKS Storage 비용의 최신 버전을 조회 및 수정합니다.</h2>
        
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