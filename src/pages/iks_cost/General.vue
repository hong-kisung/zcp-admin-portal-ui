<template>
  <section>
    <mdb-row>
      <mdb-col>
		<general-detail v-bind:editable="true" 
						v-on:fire-saved="initialize"
		/>
      </mdb-col>
    </mdb-row>
    <mdb-row class="mt-3">
      <mdb-col>
        <mdb-card>
          <mdb-card-body>
            <mdb-card-title>History</mdb-card-title>
		    <mdb-tbl sm bordered hover responsive>
			    <colgroup>
			      <col width="80">
			      <col width="100">
			      <col width="180">
			      <col width="200">
			      <col width="120">
			      <col width="150">
			      <col>
			      <col width="180">
			    </colgroup>
		      <mdb-tbl-head>
		        <tr>
		          <th class="text-center">버전</th>
		          <th class="text-center">IBM 할인율</th>
		          <th class="text-center">Platform Resolved CPU</th>
		          <th class="text-center">Platform Resolved Memory</th>
		          <th class="text-center">매매기준환율</th>
		          <th class="text-center">IP Allocation Cost</th>
		          <th class="text-center">설명</th>
		          <th class="text-center">생성일시</th>
		        </tr>
		      </mdb-tbl-head>
		      <mdb-tbl-body>
				<tr v-for="(item) in history">
				  <td class="text-center">{{ item.version }}</td>
				  <td class="text-center">{{ item.ibmDcRate }}%</td>
				  <td class="text-center">{{ item.platformCpuPerWorker }}</td>
				  <td class="text-center">{{ item.platformMemoryPerWorker }}</td>
				  <td class="text-right">{{ item.exchangeRate }} 원</td>
				  <td class="text-right">{{ item.ipAllocation }} 원</td>
				  <td class="text-left">{{ item.description }}</td>
				  <td class="text-center">{{ item.createdDt }}</td>
				</tr>
		      </mdb-tbl-body>
		    </mdb-tbl>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </section>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter, mdbIcon, mdbBtn } from 'mdbvue'
import { mdbModal } from 'mdbvue' 
import { mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue' 
import generalDetail from './GeneralDetail'

export default {
  	components: {
    	mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter,
    	mdbIcon, mdbBtn,
    	mdbTbl, mdbTblHead, mdbTblBody,
    	generalDetail
  	},
	data: () => ({
		history: [],
	}),
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			this.$http.get('/api/general/history').then(response => {
				this.history = response.data;
			})
		}
	}
}
</script>

<style scoped>
</style>
