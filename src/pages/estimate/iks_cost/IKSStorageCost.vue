<template>
<div class="animated fadeIn">
    <b-row>
      <b-col>
		<iks-storage-detail 
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
    
    <b-modal size="xl-custom" ok-only ok-title="Close" ok-variant="danger" title="IKS Storage" v-model="detailDialog" scrollable>
		<iks-storage-detail 
			v-bind:editable="false"
			v-bind:versionId="versionId"
		/>
	</b-modal>
</div>
</template>

<script>
import iksStorageDetail from './IKSStorageDetail'
import historyList from './HistoryList'

export default {
  	components: {
    	iksStorageDetail,
    	historyList
  	},
    data: () => ({
		detailDialog: false,
		versionId: 0
    }),
    computed: {
		historyList: function() {
			return this.$store.state.estimate.storageHistory;
		}
    },
    created () {
		this.initialize();
    },
    methods: {
		initialize () {
			this.$store.dispatch('estimate/getStorageHistory')
		},
		showHistoryDetail(item) {
			this.versionId = item.id;
			this.detailDialog = true;
		}
    }
}
  
</script>
