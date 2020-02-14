<template>
    <div>
        <b-card>
            <h5 class="mb-3">
            	<i class="icon-calculator mr-1"></i> 계약된 원가견적
	            <div class="float-right">
	                <b-button variant="secondary" size="sm" class="mr-2" @click="goCloudDetail()" v-if="contractCloud.id > 0"><i class="icon-arrow-left-circle"></i> 상세보기</b-button>
	                <b-button variant="secondary" size="sm" @click="downloadExcel()" v-if="contractCloud.id > 0"><i class="icon-arrow-down-circle"></i> Excel Download</b-button>
	            </div>
            </h5>
            <b-form>
                <b-form-group label="Cloud" label-for="cloud" :label-cols="3">
                    <b-form-input type="text" id="cloud" v-model="contractCloud.cspCode" readonly></b-form-input>
                </b-form-group>
                <b-form-group label="버전" label-for="version" :label-cols="3">
                    <b-form-input type="text" id="version" v-model="contractCloud.version" readonly></b-form-input>
                </b-form-group>
                <b-form-group label="Description" label-for="description" :label-cols="3">
                    <b-form-input type="text" id="description" v-model="contractCloud.description" readonly></b-form-input>
                </b-form-group>
                <b-form-group label="Created Date" label-for="created_dt" :label-cols="3">
                    <b-form-input type="text" id="created_dt" v-model="contractCloud.createdDt" readonly></b-form-input>
                </b-form-group>
            </b-form>
            <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
                <table class="table table-sm table-bordered">
                    <thead>
                        <tr>
                            <th>Environment</th>
                            <th>Product</th>
                            <th>Cloud 사용료(₩)</th>
                            <th>인건비(₩)</th>
                            <th>월 비용 합계(₩)</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr class="bg-secondary">
		                    <th colspan="2" class="text-right">계</th>
		                    <td class="text-right font-weight">{{ contractCloud.sumCloudCost | formatNumber | toKRW }}</td>
		                    <td class="text-right font-weight">{{ contractCloud.sumLaborCost | formatNumber | toKRW }}</td>
		                    <td class="text-right font-weight">{{ contractCloud.sumTotalCost | formatNumber | toKRW }}</td>
                        </tr>
                    </tfoot>
                    <tbody>
            	<template v-for="(item) in contractCloud.environments">
            		<template v-for="(product, productIndex) in item.products">
                <tr>
                    <th class="bg-dark" v-if="productIndex == 0" :rowspan="item.products.length">{{ item.environmentType }}</th>
                    <th>{{ product.estimateType == 'CloudZService' ? product.productName : product.productName + ' Storage' }}</th>
                    <td class="text-right">{{ product.cloudCost | formatNumber | toKRW }}</td>
                    <td class="text-right">{{ product.laborCost | formatNumber | toKRW }}</td>
                    <td class="text-right">{{ product.totalCost | formatNumber | toKRW }}</td>
                </tr>
                	</template>
                </template>
                    </tbody>
                </table>
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
        	contractCloud: {}
        }
    },
    computed: {
    	costEstimateDetail: function() {
    		return this.$store.state.estimate.costEstimateDetail
    	},
    },
    created() {
    	if(this.costEstimateDetail.estimateId > 0) {
    		this.getContractCloud()
    	}
    },
    methods: {
    	getContractCloud() {
			this.$http.get('/api/estimate/cost-estimates/' + this.costEstimateDetail.estimateId + '/contract').then(response => {
				this.contractCloud = response.data
			}).catch(error => {
			})
    	},
    	goCloudDetail() {
    		this.$router.push({name: 'CostEstimateCloudDetail', params: { estimateId:this.contractCloud.estimateId, cspCode: this.contractCloud.cspCode, estimateCspId: this.contractCloud.id }})
    	},
    	downloadExcel() {
    		this.$store.dispatch('estimate/downloadExcel', {
    			estimateId: this.contractCloud.estimateId, 
    			cspCode: this.contractCloud.cspCode, 
    			estimateCspId: this.contractCloud.id, 
    			version: this.contractCloud.version, 
    			estimateName: this.costEstimateDetail.estimateName}
    		)
    	}
    }
}
</script>