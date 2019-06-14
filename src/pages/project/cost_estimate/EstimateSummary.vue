<template>
<mdb-container fluid>
	  <mdb-row>
	    <h6 class="font-weight-bold mt-3">요약</h6>
	  </mdb-row>
	  <mdb-row>
	    <mdb-tbl sm bordered hover responsive>
	      <mdb-tbl-head>
	        <tr class="text-center">
	          <th>Environment</th>
	          <th>Product</th>
	          <th>Cloud 사용료 (원)</th>
	          <th>인건비 (원)</th>
	          <th>월 비용 합계 (원)</th>
	          <th>GB당 원가 (원)</th>
	        </tr>
	      </mdb-tbl-head>
	      <mdb-tbl-body>
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
	      </mdb-tbl-body>
	    </mdb-tbl>
	  </mdb-row>
</mdb-container>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter, mdbIcon, mdbBtn } from 'mdbvue'
import { mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue' 

export default {
  	components: {
    	mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter,
    	mdbIcon, mdbBtn,
    	mdbTbl, mdbTblHead, mdbTblBody
  	},
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
