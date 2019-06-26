<template>
<div class="animated fadeIn">
    <b-row>
      <b-col>
		<iks-vm-detail 
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
    
    <b-modal size="xl" ok-only ok-title="Close" ok-variant="danger" title="IKS VM" v-model="detailDialog" scrollable>
		<iks-vm-detail 
			v-bind:editable="false"
		   	v-bind:versionId="versionId"
		/>
	</b-modal>
</div>

</template>

<script>
import iksVmDetail from './IKSVmDetail'
import historyList from './HistoryList'

export default {
  	components: {
    	iksVmDetail,
    	historyList
  	},
	data: () => ({
		detailDialog: false,
		versionId: 0
    }),
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
		}
    }
}
</script>

