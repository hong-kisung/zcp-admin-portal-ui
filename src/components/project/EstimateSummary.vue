<template>
<div>
        <v-card>
          <v-card-title class="font-weight-bold">요약</v-card-title>
		  <v-card-text>
			  <v-data-table
				:headers="headers"
				:items="estimate.environments"
				class="elevation-1"
				select-all
				hide-actions
			  >
				<template v-slot:headers="props">
				  <tr>
					<th :class="headerClass">Environment</th>
					<th :class="headerClass">Product</th>
					<th :class="headerClass">Cloud 사용료 (원)</th>
					<th :class="headerClass">인건비 (원)</th>
					<th :class="headerClass">월 비용 합계 (원)</th>
					<th :class="headerClass">GB당 원가 (원)</th>
				  </tr>
				</template>
				<template v-slot:items="props">
				  <template v-for="(product, productIndex) in props.item.products">
					  <tr>
					    <td class="font-weight-bold text-xs-center" v-if="productIndex == 0" :rowspan="props.item.products.length">{{ props.item.environmentName }}</td>
					    <td class="font-weight-bold text-xs-left">{{ product.estimateType == 'CloudZService' ? product.productName : product.productName + ' Storage' }}</td>
					    <td class="text-xs-right">{{ product.cloudCost | formatNumber }}</td>
					    <td class="text-xs-right">{{ product.laborCost | formatNumber }}</td>
					    <td class="text-xs-right">{{ product.totalCost | formatNumber }}</td>
					    <td class="text-xs-right">{{ product.pricePerGb | formatNumber }}</td>
					  </tr>
				  </template>
				</template>
				
				<template v-slot:footer>
				  	<tr>
					  <td class="yellow lighten-5 font-weight-bold text-xs-right" colspan="2">계</td>
					  <td class="yellow lighten-5 font-weight-bold text-xs-right">{{ estimate.sumCloudCost | formatNumber }}</td>
					  <td class="yellow lighten-5 font-weight-bold text-xs-right">{{ estimate.sumLaborCost | formatNumber }}</td>
					  <td class="yellow lighten-5 font-weight-bold text-xs-right">{{ estimate.sumTotalCost | formatNumber }}</td>
					  <td class="yellow lighten-5 font-weight-bold text-xs-right"></td>
					  </td>
				    </tr>
				</template>
				<template v-slot:no-data>
	  			  <td class="text-xs-center" colspan="6">
	    			{{ no_data_text }}
	  			  </td>
				</template>
			  </v-data-table>
	      </v-card-text>
        </v-card>
        
</div>
</template>

<script>
export default {
	data: () => ({
	  	headers: [],
		headerClass: "grey lighten-1 body-2 text-weight-bold",
		no_data_text: 'No data available',
	}),
	props: [
		'estimate'
	],
	computed: {
	},
	created () {
		this.initialize();
	},
	methods: {
		initialize() {
		}
	}
}
</script>

<style>
</style>
