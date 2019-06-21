<template>
  <mdb-modal centered :show="dialogVisible" @close="cancel">
    <mdb-modal-body>
      <mdb-card-title class="text-center">{{ product.name }}</mdb-card-title>
      <form class="grey-text">
        <mdb-input type="text" label="설명" v-model="product.description"/>
      </form>
      <div class="mt-5 text-center">
        <mdb-btn size="md" outline="primary" @click="cancel">닫기</mdb-btn>
        <mdb-btn size="md" color="primary" @click="saveProduct">저장</mdb-btn>                   
      </div>
    </mdb-modal-body>
  </mdb-modal>
</template>

<script>
import { mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter, mdbIcon, mdbBtn } from 'mdbvue'
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter } from 'mdbvue' 
import { mdbInput } from 'mdbvue'

export default {
  	components: {
    	mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter,
    	mdbIcon, mdbBtn,
    	mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter,
    	mdbInput
  	},
	data: () => ({
      	product: {}
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
			
			this.getProduct();
		},
    },
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
		},
		saveProduct() {
			if(confirm("변경된 내용을 저장하시겠습니까?")) {
				this.$http.put('/api/estimate/platform/product/'+this.product.id, this.product).then(response => {
					alert("저장되었습니다.");
					this.$emit('fire-dialog-saved');
				})
			}
		},
		cancel() {
			this.$emit('fire-dialog-closed');
		},
		getProduct() {
			this.$http.get('/api/estimate/platform/product/'+this.productId).then(response => {
				this.product = response.data;
			})
		}
	}
}
</script>

<style>
</style>
