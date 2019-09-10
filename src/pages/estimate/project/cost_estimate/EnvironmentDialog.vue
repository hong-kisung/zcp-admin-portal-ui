<template>
<b-modal centered no-close-on-backdrop title="Product 추가" v-model="dialog" @hidden="closeEnvironmentDialog" @ok="saveEnvironmentDialog">
    <b-form>
      <div class="custom-control custom-checkbox custom-control-inline" v-for="product in productReferences">
        <input type="checkbox" class="custom-control-input" :id="product.productId" :value="product" v-model="editedItem.products" :disabled="estimate.products.find(p => p.productId === product.productId) ? true:false">
        <label class="custom-control-label" :for="product.productId">{{ product.productName }}</label>
      </div>
    </b-form>
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
	created () {
	},
	methods: {
		closeEnvironmentDialog() {
			this.$emit('fire-dialog-closed');
			this.dialog = false;
		},
		saveEnvironmentDialog(e) {
			if(this.editedItem.products.length == 0) {
				alert('Product를 선택하세요.');
				e.preventDefault()
				return;
			}
			
			this.$emit('fire-dialog-saved');
			this.dialog = false;
		}
	}
}

</script>