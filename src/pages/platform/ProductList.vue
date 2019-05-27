<template>
  <v-container fluid grid-list-xl>
    <h2> Platform Product </h2>
    <v-layout row wrap>
      <v-flex lg12>
      <v-card>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex
              v-for="product in products"
              :key="product.id"
              xs3
            >
              <v-card class="mx-auto" max-width="400">
		        <v-card-title primary-title>
		          <div class="headline" v-text="product.name"></div>
		          <v-spacer></v-spacer>
		          <v-icon right @click="viewProduct(product)">create</v-icon>
		        </v-card-title>
		        <v-card-text>
		          <div>
		            <span class="grey--text">생성일시: <span class="grey--text" v-text="product.createdDt"></span></span><br><br>
		            <span class="grey--text" v-text="product.description"></span>
		          </div>
		        </v-card-text>
		        <v-card-actions>
		          <v-spacer></v-spacer>
			      <v-tooltip top>
			        <template v-slot:activator="{ on }">
			          <v-icon class="mr-2" v-on="on" @click="viewAddonService(product)">settings</v-icon>
			        </template>
			        <span>Add-on Service 관리</span>
			      </v-tooltip>
			      <v-tooltip top>
			        <template v-slot:activator="{ on }">
			          <v-icon class="mr-2" v-on="on" @click="viewCostEstimate(product)">settings</v-icon>
			        </template>
			        <span>원가 견적서 템플릿 관리</span>
			      </v-tooltip>
		        </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      </v-flex>
    </v-layout>
    <productDetailPopup
    	v-bind:productId="productId"
    	v-bind:dialogVisibility="productDetailDialog"
    	v-on:fire-dialog-saved="saveProductDetailDialog"
    	v-on:fire-dialog-closed="closeProductDetailDialog"
    />
    <addOnServicesPopup 
    	v-bind:productId="productId"
    	v-bind:dialogVisibility="addonServiceDialog"
    	v-on:fire-dialog-saved="closeAddonServiceDialog"
    	v-on:fire-dialog-closed="closeAddonServiceDialog"
    />
    <costEstimatePopup 
    	v-bind:productId="productId"
    	v-bind:dialogVisibility="costEstimateDialog"
    	v-on:fire-dialog-saved="closeCostEstimateDialog"
    	v-on:fire-dialog-closed="closeCostEstimateDialog"
    />
  </v-container>
</template>

<script>
import productDetailPopup from './ProductDetailPopup';
import addOnServicesPopup from './AddOnServicesPopup';
import costEstimatePopup from './CostEstimatePopup';

export default {
	data: () => ({
      	products: [],
      	productDetailDialog: false,
      	addonServiceDialog: false,
      	costEstimateDialog: false,
      	productId: 0
	}),
	components: { productDetailPopup, addOnServicesPopup, costEstimatePopup },
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			this.$http.get('/api/platform/product').then(response => {
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
			this.productId = product.id;
			this.addonServiceDialog = true;
		},
		closeAddonServiceDialog() {
			this.addonServiceDialog = false;
		},
		viewCostEstimate(product) {
			this.productId = product.id;
			this.costEstimateDialog = true;
		},
		closeCostEstimateDialog() {
			this.costEstimateDialog = false;
		}
	}
}
</script>

<style>
</style>
