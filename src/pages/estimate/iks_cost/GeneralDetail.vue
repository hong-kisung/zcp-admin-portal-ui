<template>
  <mdb-card>
    <mdb-card-body>
      <mdb-card-text>{{ formTitle }}</mdb-card-text>
      <mdb-row>
        <mdb-col sm="6">
	  	  <mdb-input size="sm" label="버전" v-model="generalInfo.version" disabled/>
        </mdb-col>
        <mdb-col sm="6">
	   	  <mdb-input size="sm" label="생성일시" v-model="generalInfo.createdDt" disabled/>
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col sm="6">
	  	  <mdb-input size="sm" type="number" label="Platform Resolved CPU" v-model="generalInfo.platformCpuPerWorker"/>
        </mdb-col>
        <mdb-col sm="6">
	   	  <mdb-input size="sm" type="number" label="Platform Resolved Memory" v-model="generalInfo.platformMemoryPerWorker"/>
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col sm="4">
	   	  <mdb-input size="sm" type="number" label="IBM 할인율" v-model="generalInfo.ibmDcRate">
	        <span class="input-group-text md-addon" slot="append">%</span>
	  	  </mdb-input>
        </mdb-col>
        <mdb-col sm="4">
	   	  <mdb-input size="sm" type="number" label="매매기준환율" v-model="generalInfo.exchangeRate">
	   	    <span class="input-group-text md-addon" slot="append">원</span>
	   	  </mdb-input>
        </mdb-col>
        <mdb-col sm="4">
	   	  <mdb-input size="sm" type="number" label="IP Allocation Cost" v-model="generalInfo.ipAllocation">
	   	    <span class="input-group-text md-addon" slot="append">원</span>
	   	  </mdb-input>
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col sm="12">
	   	  <mdb-input size="sm" label="설명" v-model="generalInfo.description"/>
        </mdb-col>
      </mdb-row>
      <mdb-row>
	    <mdb-col class="text-right">
	      <mdb-btn size="md" outline="primary" v-if="!editable" flat @click="closeDetailDialog">닫기</mdb-btn>
	      <mdb-btn size="md" color="primary" v-if="editable" v-on:click="save">저장</mdb-btn>                   
	    </mdb-col>
      </mdb-row>
    </mdb-card-body>
  </mdb-card>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter, mdbIcon, mdbBtn } from 'mdbvue'
import { mdbTbl, mdbTblHead, mdbTblBody } from 'mdbvue' 
import { mdbInput } from 'mdbvue'

export default {
  	components: {
    	mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter,
    	mdbIcon, mdbBtn,
    	mdbTbl, mdbTblHead, mdbTblBody,
    	mdbInput
  	},
	data: () => ({
	}),
	props: [
		'versionId',
		'editable'
	],
	computed: {
		generalInfo: function() {
			return this.$store.state.estimate.general;
		},
		formTitle: function() {
			return this.editable ? '기준정보의 최신 버전을 조회 및 수정합니다.' : '기준정보';
		}
	},
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			if(this.versionId) {
				this.$store.dispatch('estimate/getGeneralHistoryDetail', {versionId: this.versionId})
			} else {
				this.$store.dispatch('estimate/getGeneral')
			}
		},
		getGeneralInfo(url) {
			this.$http.get(url).then(response => {
				if(response && response.data && response.data.id > 0) {
					this.generalInfo = response.data;
				} else {
					this.generalInto = {};
					alert('조회된 정보가 없습니다.');
				}
			}).catch(error => {
				this.generalInto = {};
				alert(error.response.data.message);
			})
		},
		save () {
			if(!this.generalInfo.platformCpuPerWorker) {
				alert('Platform Resolved CPU 값을 입력하세요');
				return;
			}
			if(!this.generalInfo.platformMemoryPerWorker) {
				alert('Platform Resolved Memory 값을 입력하세요');
				return;
			} 
			if(!this.generalInfo.ibmDcRate) {
				alert('IBM 할인율  값을 입력하세요');
				return;
			}
			if(!this.generalInfo.exchangeRate) {
				alert('매매기준환율  값을 입력하세요');
				return;
			}
			if(!this.generalInfo.ipAllocation) {
				alert('IP Allocation Cost 값을 입력하세요');
				return;
			}
			
			if(confirm('변경된 내용을 저장하시겠습니까?')) {
				this.$store.dispatch('estimate/saveGeneral', {generalInfo: this.generalInfo});
			}
		},
		closeDetailDialog() {
			this.$emit('fire-dialog-closed');
		}
	}
}
</script>
