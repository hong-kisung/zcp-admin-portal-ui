<template>
<b-modal centered no-close-on-backdrop title="Product 추가" v-model="dialog" @close="closeEnvironmentDialog" @cancel="closeEnvironmentDialog" @ok="saveEnvironmentDialog">
    <b-form>
      <div class="custom-control custom-checkbox custom-control-inline mt-3" v-for="product in products">
        <input type="checkbox" class="custom-control-input" :id="product.id" :value="product" v-model="editedItem.products" unchecked>
        <label class="custom-control-label" :for="product.id">{{ product.name }}</label>
      </div>
    </b-form>
</b-modal>
</template>

<script>
export default {
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