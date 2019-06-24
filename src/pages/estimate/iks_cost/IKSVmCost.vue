<template>
  <section>
    <mdb-row>
      <mdb-col>
		<iks-vm-detail 
			v-bind:editable="true"
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
    <mdb-modal size="xl" :show="detailDialog" scrollable>
      <mdb-modal-body>
		<iks-vm-detail 
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
import iksVmDetail from './IKSVmDetail'
import historyList from './HistoryList'

export default {
  	components: {
    	mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter,
    	mdbIcon, mdbBtn,
    	mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter,
    	iksVmDetail,
    	historyList
  	},
	data: () => ({
		detailDialog: false,
		versionId: 0
    }),
	watch: {
		detailDialog (val) {
			val || this.closeDetailDialog();
		}
    },
    computed: {
		historyList: function() {
			return this.$store.state.estimate.vmHistory;
		}
    },
	created () {
		this.initialize();
    },
	methods: {
		initialize () {
			this.$store.dispatch('estimate/getVmHistory')
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

