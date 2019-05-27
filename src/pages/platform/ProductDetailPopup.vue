<template>
      <v-dialog v-model="dialogVisibility" persistent width="500px">
        <ValidationObserver ref="obs">
          <v-card slot-scope="{ invalid, validated }">
		    <v-card-text>
				<v-layout wrap>
				  <v-flex xs12 sm12 sm12>
					<VTextFieldWithValidation rules="required|max:50" data-vv-name="name" v-model="product.name" label="Product명" readonly />
				  </v-flex>
				  <v-flex xs12 sm12 md12>
					<VTextFieldWithValidation rules="max:100" data-vv-name="description" v-model="product.description" label="설명" />
				  </v-flex>
				</v-layout>
		    </v-card-text>
		    <v-card-actions>
		      <v-spacer></v-spacer>
		      <v-btn right color="primary" @click="cancel">취소</v-btn>
		      <v-btn right color="primary" @click="saveProduct" v-bind:disabled="invalid">저장</v-btn>
		    </v-card-actions>
		  </v-card>
		</ValidationObserver>
      </v-dialog>
</template>

<script>
export default {
	data: () => ({
		dialog: false,
      	product: {}
	}),
  	props: [
		'productId',
		'dialogVisibility'
	],
    watch: {
		productId: function() {
			if(this.productId <= 0) {
				this.product = {};
				return;
			}
			
			this.getProduct();
		},
		dialogVisibility: function() {
			this.dialog = this.dialogVisibility;
		}
    },
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			if(this.productId <= 0) {
				return;
			}

			this.getProduct();
		},
		saveProduct() {
			this.$refs.obs.validate().then(valid => {
				if(valid) {
					if(confirm("변경된 내용을 저장하시겠습니까?")) {
						this.$http.put('/api/platform/product/'+this.product.id, this.product).then(response => {
							alert("저장되었습니다.");
							this.$refs.obs.reset();
							
							this.dialog = false;
							this.$emit('fire-dialog-saved');
						})
					}
				}
			});
		},
		cancel() {
			this.dialog = false;
			this.$emit('fire-dialog-closed');
		},
		getProduct() {
			this.$http.get('/api/platform/product/'+this.productId).then(response => {
				this.product = response.data;
			})
		}
	}
}
</script>

<style>
</style>
