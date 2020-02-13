<template>
	<b-modal id="product-add-modal" title="Product 추가" centered no-close-on-backdrop v-model="dialog" @hidden="closeEnvironmentDialog" @ok="saveEnvironmentDialog">
	    <b-form>
	        <div class="custom-control custom-checkbox custom-control-inline" v-for="product in productReferences">
	            <input type="checkbox" class="custom-control-input" :id="product.productId" :value="product" v-model="editedItem.products" :disabled="estimate.products.find(p => p.productId === product.productId) ? true:false">
	            <label class="custom-control-label" :for="product.productId">{{ product.productName }}</label>
	        </div>
	    </b-form>
	    <template v-slot:modal-footer="{ ok, cancel }">
	        <b-button variant="secondary" @click="cancel()">취소</b-button>
	        <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
	    </template>
	</b-modal>
</template>

<script>
export default {
	data: () => ({
		dialog: false
	}),
	props: [
		'editedItem',
		'estimate',
		'environmentDialog'
	],
	computed: {
		productReferences: function() {
			return this.$store.state.estimate.productReferences
		}
	},
	watch: {
		environmentDialog: function (){
			this.dialog = this.environmentDialog;
		}
	},
	methods: {
		closeEnvironmentDialog() {
			this.$emit('fire-dialog-closed');
			this.dialog = false;
		},
		saveEnvironmentDialog(e) {
			if(this.editedItem.products.length == 0) {
				this.$zadmin.alert('Product를 선택하세요.');
				e.preventDefault()
				return;
			}
			
			this.$emit('fire-dialog-saved');
			this.dialog = false;
		}
	}
}
</script>