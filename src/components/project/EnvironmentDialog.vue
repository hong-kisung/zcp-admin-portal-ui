<template>
       <v-dialog v-model="dialog" persistent max-width="500px">
	 	  <ValidationObserver ref="obs">
		    <v-card slot-scope="{ invalid, validated }">
		      <v-card-title>Environment 추가</v-card-title>
			  <v-card-text>
			    <v-flex xs12>
				  <VTextFieldWithValidation rules="required|max:10" data-vv-name="clusterName" v-model="editedItem.clusterName" label="Environment"/>
			    </v-flex>
			    <v-flex xs12>
			      <div class="subheading font-weight-light">Product 선택</div>
		          <v-checkbox
		            v-model="editedItem.products"
		            v-for="product in products"
		            :key="product.id"
		            :label="product.name"
		            :value="product"
		            >
		          </v-checkbox>
			    </v-flex xs12>
			  </v-card-text>
			  <v-card-actions>
			    <v-spacer></v-spacer>
			    <v-btn color="blue darken-1" flat @click="closeClusterDialog">취소</v-btn>
			    <v-btn color="blue darken-1" flat @click="saveClusterDialog" v-bind:disabled="invalid">저장</v-btn>
			  </v-card-actions>
		    </v-card>
		  </ValidationObserver>
	 	</v-dialog>
</template>
<script>
export default {
	data: () => ({
		products: [],
		dialog: false
	}),
	props: [
		'editedItem',
		'estimate',
		'clusterDialog'
	],
	computed: {
		formDialogTitle () {
			return '';
		}
	},
	watch: {
		clusterDialog: function (){
			this.dialog = this.clusterDialog;
		}
	},
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			this.$http.get('/api/platform/product').then(response => {
				this.products = response.data
			})
		},
		closeClusterDialog() {
			this.$emit('fire-dialog-closed');
			this.$refs.obs.reset();
			this.dialog = false;
		},
		saveClusterDialog() {
			this.$refs.obs.validate().then(valid => {
				if(valid) {
					for(var i = 0; i < this.estimate.clusters.length; i++) {
						if(this.estimate.clusters[i].clusterName == this.editedItem.clusterName) {
							alert('존재하는 Environment입니다. 다시 입력하세요.');
							return;
						}
					}
					
					if(this.editedItem.products.length == 0) {
						alert('Product를 선택하세요.');
						return;
					}
					
					this.$emit('fire-dialog-saved');
					this.$refs.obs.reset();
					this.dialog = false;
				}
			});
		}
	}
}

</script>