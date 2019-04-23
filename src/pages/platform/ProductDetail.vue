<template>
  <v-container fluid grid-list-xl>
    <h2> Platform Product</h2>
    <v-layout row wrap>
      <v-flex lg12>
        <ValidationObserver ref="obs">
          <v-card slot-scope="{ invalid, validated }">
		    <v-card-text>
				<v-layout wrap>
				  <v-flex xs12 sm12 sm12>
					<VTextFieldWithValidation rules="required|max:50" data-vv-name="name" v-model="product.name" label="Product명" :readonly="!newPage" />
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
      </v-flex>
      <v-flex lg12>
		  <v-tabs
		    v-model="active"
		    color="grey darken-1"
		    dark
		    slider-color="yellow"
		    v-if="!newPage"
		  >
		    <v-tab href="#tab-1">Add-on Services</v-tab>
		    <v-tab href="#tab-2">견적서 템플릿</v-tab>
		
		    <v-tab-item value="tab-1">
		    	<add-on-services v-bind:productId="productId" />
		    </v-tab-item>
		    <v-tab-item value="tab-2">
		    	<product-template v-bind:productId="productId" />
		    </v-tab-item>
		  </v-tabs>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {
	data: () => ({
		productId: 0,
      	product: {},
      	newPage: true,
		active: null
	}),
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			if(this.$route.name != 'product_new') {
				this.newPage = false;
				this.productId = this.$route.params.productId;
				this.getProduct(this.productId);
			}
		},
		saveProduct() {
			this.$refs.obs.validate().then(valid => {
				if(valid) {
					if(confirm("변경된 내용을 저장하시겠습니까?")) {
						if(this.newPage) {
							this.$http.post('/api/platform/product', this.product).then(response => {
								alert("저장되었습니다.");
								this.product = response.data;
								this.productId = this.product.id;
								this.newPage = false;
							})
						} else {
							this.$http.put('/api/platform/product/'+this.product.id, this.product).then(response => {
								alert("저장되었습니다.");
								this.getProduct(this.product.id);
							})
						}
						
						this.$refs.obs.reset();
					}
				}
			});
		},
		cancel() {
			history.go(-1);
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
