<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3"">Standard Infomation</h1>
        
        <standard-info-detail v-bind:editable="true" />
        <standard-info-history />
    </div>
</template>

<script>
import StandardInfoDetail from './standardinfo/StandardInfoDetail'
import StandardInfoHistory from './standardinfo/StandardInfoHistory'

export default {
    components: {
        StandardInfoDetail, StandardInfoHistory
    }
}
</script>