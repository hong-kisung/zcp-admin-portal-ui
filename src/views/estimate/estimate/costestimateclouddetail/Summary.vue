<template>
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
                    <td class="text-right font-weight">{{ estimate.summary.sumCloudCost | formatNumber | toKRW }}</td>
                    <td class="text-right font-weight">{{ estimate.summary.sumLaborCost | formatNumber | toKRW }}</td>
                    <td class="text-right font-weight">{{ estimate.summary.sumTotalCost | formatNumber | toKRW }}</td>
                </tr>
            </tfoot>
            <tbody>
            	<template v-for="(item) in estimate.summary.environments">
            		<template v-for="(product, productIndex) in item.products">
                <tr>
                    <th class="bg-dark" v-if="productIndex == 0" :rowspan="item.products.length">{{ item.environmentTypeLabel || item.environmentType }}</th>
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
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import perfectScrollbar from '@/mixins/perfect-scrollbar'

export default {
	mixins: [perfectScrollbar],
    components: {
        VuePerfectScrollbar
    },
    computed: {
        estimate: function() {
			return this.$store.state.estimate.projectCostEstimate
		},
    }
}
</script>