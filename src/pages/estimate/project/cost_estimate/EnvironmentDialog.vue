<template>
<mdb-modal centered :show="dialog" @close="closeEnvironmentDialog">
  <mdb-modal-body class="mx-3 grey-text">
      <h5 class="mt-1 mb-2 text-center">Product 추가</h5>
      <div class="custom-control custom-checkbox custom-control-inline mt-3" v-for="product in products">
        <input type="checkbox" class="custom-control-input" :id="product.id" :value="product" v-model="editedItem.products" unchecked>
        <label class="custom-control-label" :for="product.id">{{ product.name }}</label>
      </div>
      <div class="mt-5 text-center">
        <mdb-btn outline="primary" size="md" @click="closeEnvironmentDialog">취소</mdb-btn>
        <mdb-btn color="primary" size="md" @click="saveEnvironmentDialog">저장</mdb-btn>                   
      </div>
  </mdb-modal-body>
</mdb-modal>
</template>

<script>
import { mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter } from 'mdbvue' 
import { mdbBtn, mdbInput } from 'mdbvue'

export default {
  	components: {
    	mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter,
    	mdbBtn, mdbInput
  	},
	data: () => ({
		environmentItems: [],
		products: [],
		dialog: false
	}),
	props: [
		'editedItem',
		'estimate',
		'projectVolumes',
		'environmentDialog'
	],
	computed: {
		formDialogTitle () {
			return '';
		}
	},
	watch: {
		environmentDialog: function (){
			this.dialog = this.environmentDialog;
		},
		projectVolumes: function() {
			if(this.projectVolumes && this.projectVolumes.environments) {
				this.environmentItems = [];
				for(let i = 0; i < this.projectVolumes.environments.length; i++) {
					this.environmentItems[i] = this.projectVolumes.environments[i].name;
				}
			}
		}
	},
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			this.$http.get('/api/estimate/platform/product').then(response => {
				this.products = response.data
			})
		},
		closeEnvironmentDialog() {
			this.$emit('fire-dialog-closed');
			this.dialog = false;
		},
		saveEnvironmentDialog() {
			if(this.editedItem.products.length == 0) {
				alert('Product를 선택하세요.');
				return;
			}
			
			this.$emit('fire-dialog-saved');
			this.dialog = false;
		}
	}
}

</script>