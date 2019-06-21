<template>
<div>
  <mdb-modal size="xl" :show="dialogVisible" @close="cancel" scrollable>
    <mdb-modal-body class="cost-estimate-modal-body">
        <h4 class="mt-1 mb-2 text-center"><strong>원가 견적서 템플릿</strong></h4>
	    <mdb-tabs
	      :active="0"
	      default
	      :links="[
	        { text: 'Cloud Z Service' },
	        { text: 'Application Storage Service' }
	      ]"
	      :transition-duration="0.5"
	      transition-style="linear">
	      <template :slot="'Cloud Z Service'">
			<estimateTypeTemplateTab 
				v-bind:services="estimateTemplate.cloudZService"
	 			v-bind:classificationTypeItems="classificationTypeItems"
	 			v-bind:title="cloudZServiceTitle"
			/>
	      </template>
	      <template :slot="'Application Storage Service'">
			<estimateTypeTemplateTab 
				v-bind:services="estimateTemplate.storageService"
	 			v-bind:classificationTypeItems="classificationTypeItems"
	 			v-bind:title="storageServiceTitle"
			/>
	      </template>
        </mdb-tabs>
        <div class="mt-3 text-right">
	        <mdb-btn size="md" outline="primary" @click="cancel">닫기</mdb-btn>
	        <mdb-btn size="md" color="primary" @click="saveService">저장</mdb-btn>                   
        </div>
    </mdb-modal-body>
  </mdb-modal>
	
</div> 
</template>

<script>
import { mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter, mdbIcon, mdbBtn } from 'mdbvue'
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter } from 'mdbvue' 
import { mdbTabs } from 'mdbvue'
import estimateTypeTemplateTab from './EstimateTypeTemplate'

export default {
  	components: {
    	mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter,
    	mdbIcon, mdbBtn,
    	mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter,
    	mdbTabs,
    	estimateTypeTemplateTab
  	},
	data: () => ({
		active: null,
		cloudZServiceTitle: 'Cloud Z Service',
		storageServiceTitle: 'Application Storage Service',
		classificationTypeItems: [],
      	estimateTemplate: {}
	}),
	props: [
		'productId',
		'dialogVisible'
	],
    watch: {
		productId: function() {
			if(this.productId <= 0) {
				this.product = {};
				return;
			}
			
			this.getCostEstimate();
		},
    },
	computed: {
    },
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			this.$http.get('/api/estimate/code/classification_type').then(response => {
				this.classificationTypeItems = response.data;
			})
			if(this.productId > 0) {
				this.getCostEstimate();
			}
		},
		getCostEstimate() {
			this.$http.get('/api/estimate/platform/product/'+ this.productId + '/template').then(response => {
				this.estimateTemplate = response.data;
			})
		},
		saveService() {
			if(confirm('변경된 내용을 저장하시겠습니까?')) {
				this.$http.put('/api/estimate/platform/product/'+ this.productId +'/template', this.estimateTemplate).then(response => {
					alert("저장되었습니다.");
					this.$emit('fire-dialog-saved');
				})
			}
		},
		cancel() {
			this.$emit('fire-dialog-closed');
		}
	}
}
</script>

<style scoped>
.cost-estimate-modal-body {
  min-height: 500px;
}
</style>
