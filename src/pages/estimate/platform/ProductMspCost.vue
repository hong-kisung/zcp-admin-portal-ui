<template>
<div class="animated fadeIn">
    <b-row>
      <b-col>
		<product-msp-cost-detail
			v-bind:editable="true"
		/>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <history-list 
        	v-bind:historyList="historyList" 
        	v-on:fire-detail-clicked="showHistoryDetail"
        />
      </b-col>
    </b-row>
    
    <b-modal size="lg" ok-only ok-title="Close" ok-variant="danger" title="MSP 비용" v-model="detailDialog" scrollable>
		<product-msp-cost-detail
			v-bind:editable="false"
		   	v-bind:versionId="versionId"
		/>
	</b-modal>
</div>
</template>

<script>
import productMspCostDetail from './MspCostDetail'
import historyList from './../iks_cost/HistoryList'

export default {
  	components: {
    	productMspCostDetail, 
    	historyList
  	},
	data: () => ({
		detailDialog: false,
		versionId: 0
	}),
    computed: {
		historyList: function() {
			return this.$store.state.estimate.productMspCostHistory;
		}
    },
    created () {
		this.initialize();
    },
	methods: {
		initialize() {
			this.$store.dispatch('estimate/getProductMspCostHistory')
		},
		showHistoryDetail(item) {
			this.versionId = item.id;
			this.detailDialog = true;
		}
	}
}
</script>

<style>
</style>