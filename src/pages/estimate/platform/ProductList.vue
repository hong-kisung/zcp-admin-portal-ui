<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="3" v-for="product in products" :key="product.id">
        <b-card no-body>
          <b-card-body class="pb-0">
            <b-link class="float-right" @click="viewProduct(product)">
              <i class="icon-settings"></i>
            </b-link>
            <h4 class="mb-0">{{ product.name }}</h4>
            <p>{{ product.description}}</p>
            <p class="text-muted">{{ product.createdDt }}</p>
            <b-button variant="outline-primary" size="sm" class="m-1" @click="viewAddonService(product)">Add-on Service 관리</b-button>
            <b-button variant="outline-primary" size="sm" class="m-1" @click="viewCostEstimate(product)">원가 견적서 템플릿 관리</b-button>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <productDetailPopup
    	v-bind:productId="productId"
    	v-bind:dialogVisible="productDetailDialog"
    	v-on:fire-dialog-saved="saveProductDetailDialog"
    	v-on:fire-dialog-closed="closeProductDetailDialog"
    />
  </div>
</template>

<script>
import productDetailPopup from './ProductDetailPopup'

export default {
  	components: {
    	productDetailPopup
  	},
	data: () => ({
      	products: [],
      	productDetailDialog: false,
      	productId: 0
	}),
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			this.$http.get('/api/estimate/platform/product').then(response => {
				this.products = response.data
			})
		},
		addProduct() {
			this.$router.push({ name: 'product_new'});
		},
		viewProduct(product) {
			this.productId = product.id;
			this.productDetailDialog = true;
		},
		saveProductDetailDialog() {
			this.productDetailDialog = false;
			this.initialize();
		},
		closeProductDetailDialog() {
			this.productDetailDialog = false;
		},
		viewAddonService(product) {
			this.$router.push({ name: 'ProductAddOnService', params: { productId: product.id }});
		},
		viewCostEstimate(product) {
			this.$router.push({ name: 'ProductCostEstimateTemplate', params: { productId: product.id }});
		}
	}
}
</script>
