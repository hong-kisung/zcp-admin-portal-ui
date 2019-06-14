<template>
  <div>
    <mdb-modal size="lg" side fullHeight position="right" direction="right" info removeBackdrop :show="historyDialog" @close="close">
      <mdb-modal-header center :close="false">
        <p class="heading lead">원가견적 History</p>
      </mdb-modal-header>
      <mdb-modal-body>
	    <mdb-tbl sm bordered hover responsive>
	      <mdb-tbl-head>
	        <tr>
	          <th class="text-center" rowspan="2">버전</th>
	          <th class="text-center" rowspan="2">라벨</th>
	          <th class="text-center" colspan="2">Cloud Z Service 비용</th>
	          <th class="text-center" colspan="2">Application Storage Service 비용</th>
	          <th class="text-center" rowspan="2">생성일시</th>
	        </tr>
	        <tr>
	          <th class="text-center">Monthly</th>
	          <th class="text-center">Yearly</th>
	          <th class="text-center">Monthly</th>
	          <th class="text-center">Yearly</th>
	        </tr>
	      </mdb-tbl-head>
	      <mdb-tbl-body>
	        <template v-for="(item, index) in history">
	          <tr @click="viewEstimate(item)">
	            <td class="text-center">{{ item.version }}</td>
	            <td class="text-center">{{ item.label }}</td>
	            <td class="text-right">{{ item.cloudZServiceMonthlyPrice | formatNumber }}</td>
	            <td class="text-right">{{ item.cloudZServiceYearlyPrice | formatNumber }}</td>
	            <td class="text-right">{{ item.storageServiceMonthlyPrice | formatNumber }}</td>
	            <td class="text-right">{{ item.storageServiceYearlyPrice | formatNumber }}</td>
	            <td class="text-center">{{ item.createdDt }}</td>
	          </tr>
	        </template>
	      </mdb-tbl-body>
	    </mdb-tbl>
      </mdb-modal-body>
      <mdb-modal-footer center>
        <mdb-btn size="md" outline="primary" @click="close">닫기</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>

<script>
import { mdbIcon, mdbBtn } from 'mdbvue'
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter } from 'mdbvue' 
import { mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue' 

export default {
  	components: {
    	mdbIcon, mdbBtn,
    	mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter,
    	mdbTbl, mdbTblHead, mdbTblBody
  	},
	data: () => ({
      	history: []
	}),
	props: [
		'projectId',
		'estimateDetail',
		'historyDialog',
		'refreshStatus'
	],
	watch: {
		refreshStatus: function() {
			if(this.refreshStatus) {
				this.initialize();
				this.$emit('fire-refresh-finished');
			}
		}
	},
	created () {
		this.initialize();
	},
	methods: {
		initialize() {
			this.$http.get('/api/project/' + this.projectId + '/estimate/history').then(response => {
				this.history = response.data
			})
		},
		viewEstimate(item) {
			if(confirm('원가견적 화면에서 선택한 버전이 다시 조회됩니다. \n저장하지 않은 내용이 있을 경우 취소 버튼을 클릭하세요.')) {
				this.estimateDetail.estimateId = item.id;
				this.$emit('fire-detail-clicked');
				this.close();
			}
		},
		close() {
			this.$emit('fire-history-closed');
		}
	}
}
</script>

<style>
</style>
