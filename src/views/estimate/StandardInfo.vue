<template>
    <div class="animated fadeIn">
        <h1 class="display-tit">Standard Infomation</h1>
        <h2 class="display-sub mb-3">기준정보의 최신 버전을 조회 및 수정합니다.</h2>
        
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