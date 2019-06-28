<template>
      <div class="table-responsive-sm">
        <table class="table b-table table-bordered table-sm">
          <thead>
	        <tr>
	          <th class="text-center">Environment</th>
	          <th class="text-center">Product</th>
	          <th class="text-center">Cloud 사용료 (원)</th>
	          <th class="text-center">인건비 (원)</th>
	          <th class="text-center">월 비용 합계 (원)</th>
	          <th class="text-center">GB당 원가 (원)</th>
	        </tr>
          </thead>
          <tbody>
	        <template v-for="(item) in estimate.environments">
			  <template v-for="(product, productIndex) in item.products">
				  <tr>
				    <td class="font-weight-bold text-center" v-if="productIndex == 0" :rowspan="item.products.length">{{ item.environmentName }}</td>
				    <td class="font-weight-bold text-left">{{ product.estimateType == 'CloudZService' ? product.productName : product.productName + ' Storage' }}</td>
				    <td class="text-right">{{ product.cloudCost | formatNumber }}</td>
				    <td class="text-right">{{ product.laborCost | formatNumber }}</td>
				    <td class="text-right">{{ product.totalCost | formatNumber }}</td>
				    <td class="text-right">{{ product.pricePerGb | formatNumber }}</td>
				  </tr>
			  </template>
	        </template>
		  	<tr class="table-warning">
			  <td class="font-weight-bold text-right" colspan="2">계</td>
			  <td class="font-weight-bold text-right">{{ estimate.sumCloudCost | formatNumber }}</td>
			  <td class="font-weight-bold text-right">{{ estimate.sumLaborCost | formatNumber }}</td>
			  <td class="font-weight-bold text-right">{{ estimate.sumTotalCost | formatNumber }}</td>
			  <td class="font-weight-bold text-right"></td>
			  </td>
		    </tr>
          </tbody>
        </table>
      </div>
</template>

<script>
export default {
	data: () => ({
	}),
	computed: {
		estimate: function() {
			return this.$store.state.estimate.projectCostEstimate.summary
		}
	}
}
</script>
