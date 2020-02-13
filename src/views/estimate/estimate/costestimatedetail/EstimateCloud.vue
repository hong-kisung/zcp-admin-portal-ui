<template>
    <div>
        <b-card>
            <h5 class="mb-3"><i class="icon-calculator mr-1"></i> Cloud별 원가견적</h5>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <b-table striped hover small bordered :fields="cloud_est_fields" :items="estimateCloudList">
                    <template v-slot:table-colgroup="scope">
                        <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'est_number' ? '4%' : '' }">
                    </template>
                    <template slot="no" slot-scope="data">
                        {{ data.index + 1 }}
                    </template>
                    <template slot="cspCode" slot-scope="data">
                        <router-link :to="{ name: 'CostEstimateCloudDetail', params: {estimateId:costEstimateDetail.estimateId, cspCode: data.item.cspCode}}">
                        	<img :src="cloudImageUrl(data.item.cspCode)" width="22" height="22" class="mx-1">
                        </router-link>
                    </template>
                     <template slot="cloudCost" slot-scope="data">
                        {{ data.item.cloudCost | formatNumber | toKRW }}
                    </template>
                     <template slot="laborCost" slot-scope="data">
                        {{ data.item.laborCost | formatNumber | toKRW }}
                    </template>
                     <template slot="pricePerMonthly" slot-scope="data">
                        {{ data.item.pricePerMonthly | formatNumber | toKRW }}
                    </template>
                    <template slot="est_download" slot-scope="data">
                        <b-button variant="success" size="sm" v-if="data.item.version" @click="downloadExcel(data.item.estimateId, costEstimateDetail.estimateName, data.item.cspCode, data.item.id, data.item.version)"><i class="fa fa-file-excel-o"></i></b-button>
                    </template>
                </b-table>
            </VuePerfectScrollbar>
        </b-card>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import perfectScrollbar from '@/mixins/perfect-scrollbar'
import variant from '@/mixins/variant'

export default {
	mixins: [perfectScrollbar, variant],
    components: {
        VuePerfectScrollbar
    },
    data()  {
        return {
            cloud_est_fields: [
                { key: 'no', label: 'No', tdClass: 'text-center' },
                { key: 'cspCode', label: 'Cloud', tdClass: 'text-center' },
                { key: 'version', label: '버전', tdClass: 'text-center' },
                { key: 'cloudCost', label: 'Cloud 사용료(₩)', tdClass: 'text-right' },
                { key: 'laborCost', label: '인건비(₩)', tdClass: 'text-right' },
                { key: 'pricePerMonthly', label: '월 비용 합계(₩)', tdClass: 'text-right' },
                { key: 'estimateCreatedDt', label: 'Estimate Sheet Created Date', tdClass: 'text-center' },
                { key: 'estimateLastUpdatedDt', label: 'Estimate Sheet Last Update', tdClass: 'text-center' },
                { key: 'est_download', label: 'Download', tdClass: 'text-center' }
            ],
            estimateCloudList: []
        }
    },
    computed: {
    	costEstimateDetail: function() {
    		return this.$store.state.estimate.costEstimateDetail
    	},
    },
    created() {
    	if(this.costEstimateDetail.estimateId > 0) {
    		this.getEstimateCloudList()
    	} else {
    		this.getCspTypeList()
    	}
    },
    methods: {
    	getEstimateCloudList() {
			this.$http.get('/api/estimate/cost-estimates/' + this.costEstimateDetail.estimateId + '/clouds').then(response => {
				this.estimateCloudList = response.data
				this.getCspTypeList()
			}).catch(error => {
			})
    	},
    	getCspTypeList() {
			this.$http.get('/api/estimate/code/csp_type').then(response => {
				const list = response.data
				for(let code of list) {
					const index = this.estimateCloudList.findIndex(data => data.cspCode === code)
					if(index == -1) {
						this.estimateCloudList.push({cspCode: code})
					}
				}
			})
    	},
    	downloadExcel(estimateId, estimateName, cspCode, estimateCspId, version) {
    		this.$store.dispatch('estimate/downloadExcel', {
    			estimateId: estimateId, 
    			cspCode: cspCode, 
    			estimateCspId: estimateCspId, 
    			version: version, 
    			estimateName: estimateName}
    		)
    	},
    }
}
</script>