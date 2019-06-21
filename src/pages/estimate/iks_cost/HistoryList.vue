<template>
  <mdb-card>
    <mdb-card-body>
        <mdb-card-title>History</mdb-card-title>
	    <mdb-tbl sm bordered hover responsive>
		  <colgroup>
		    <col width="80">
		    <col>
		    <col width="180">
		    <col width="100">
		    <col width="100">
		  </colgroup>
	      <mdb-tbl-head>
	        <tr>
	          <th class="text-center">버전</th>
	          <th class="text-center">설명</th>
	          <th class="text-center">생성일시</th>
	          <th class="text-center">생성자</th>
	          <th class="text-center">상세보기</th>
	        </tr>
	      </mdb-tbl-head>
	      <mdb-tbl-body>
			<tr v-for="(item) in historyList">
			  <td class="text-center">{{ item.version }}</td>
			  <td class="text-center">{{ item.description }}</td>
			  <td class="text-center">{{ item.createdDt }}</td>
			  <td class="text-center">{{ item.created }}</td>
			  <td class="text-center">
			    <a class="rotate-btn" @click="clickHistoryDetail(item)">
			      <mdb-icon icon="search" class="fa-md grey-text"></mdb-icon>
                </a>
			  </td>
			</tr>
	      </mdb-tbl-body>
	    </mdb-tbl>
    </mdb-card-body>
  </mdb-card>
</template>

<script>
import { mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter, mdbIcon, mdbBtn } from 'mdbvue'
import { mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue' 

export default {
  	components: {
    	mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter,
    	mdbIcon, mdbBtn,
    	mdbTbl, mdbTblHead, mdbTblBody
  	},
	data: () => ({
	}),
	props: [
		'historyList'
	],
	methods: {
		clickHistoryDetail (item) {
			this.$emit('fire-detail-clicked', item);
		}
	}
}
</script>
