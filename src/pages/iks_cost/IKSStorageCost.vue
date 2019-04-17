<template>
  <v-container fluid grid-list-xl>
    <h2> IKS Storage 비용</h2>
    <v-layout row wrap>
      <v-flex lg12>
			<iks-storage-detail v-bind:editable="true"
							    v-on:fire-saved="initialize"
							    />

      </v-flex>
      <v-flex lg12>
            <history-list v-bind:historyList="historyList" v-on:fire-detail-clicked="showHistoryDetail"/>
     </v-flex>
    </v-layout>

 	<v-dialog v-model="detailDialog" max-width="1400px">
		  <iks-storage-detail v-bind:editable="false"
						      v-bind:versionId="versionId"
						      v-on:fire-dialog-closed="closeDetailDialog"
						      />
	</v-dialog>
  </v-container>
</template>

<script>
export default {
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
		initialize () {
			this.$http.get('/api/iks_costs/storage/history').then(response => {
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
