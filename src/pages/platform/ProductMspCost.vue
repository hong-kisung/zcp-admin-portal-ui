<template>
  <section>
    <mdb-row>
      <mdb-col>
		<product-msp-cost-detail
			v-bind:editable="true"
			v-on:fire-saved="initialize"
		/>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mt-3">
      <mdb-col>
        <history-list 
        	v-bind:historyList="historyList" 
        	v-on:fire-detail-clicked="showHistoryDetail"
        />
      </mdb-col>
    </mdb-row>
    <mdb-modal size="lg" :show="detailDialog" scrollable>
      <mdb-modal-body>
		<product-msp-cost-detail
			v-bind:editable="false"
		   	v-bind:versionId="versionId"
		   	v-on:fire-dialog-closed="closeDetailDialog"
		/>
	  </mdb-modal-body>
	</mdb-modal>
  </section>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter, mdbIcon, mdbBtn } from 'mdbvue'
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter } from 'mdbvue' 
import productMspCostDetail from './MspCostDetail'
import historyList from '@/pages/iks_cost/HistoryList'

export default {
  	components: {
    	mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter,
    	mdbIcon, mdbBtn,
    	mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter,
    	productMspCostDetail, 
    	historyList
  	},
	data: () => ({
		historyList: [],
		detailDialog: false,
		versionId: 0
	}),
    watch: {
		detailDialog (val) {
			val || this.closeDetailDialog();
		}
    },
    created () {
		this.initialize();
    },
	methods: {
		initialize() {
			this.$http.get('/api/platform/msp/history').then(response => {
				this.historyList = response.data;
			})
		},
		showHistoryDetail(item) {
			this.versionId = item.id;
			this.detailDialog = true;
		},
		closeDetailDialog() {
			this.detailDialog = false;
		}
	}
}
</script>

<style>
</style>