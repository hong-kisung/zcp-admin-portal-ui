<template>
  <section>
    <mdb-row>
      <mdb-col md="3" v-for="product in products" :key="product.id">
        <mdb-card>
          <mdb-card-body>
            <a class="rotate-btn float-right" @click="viewProduct(product)">
              <mdb-icon icon="cog" class="fa-lg"></mdb-icon>
            </a>
            <h4>{{ product.name }}</h4>
            <mdb-card-text>
              <p>{{ product.description}}</p>
              <p class="text-muted">{{ product.createdDt }}</p>
            </mdb-card-text>
            <mdb-btn size="sm" color="success" @click="viewAddonService(product)">Add-on Service 관리</mdb-btn>
            <mdb-btn size="sm" color="primary" @click="viewCostEstimate(product)">원가 견적서 템플릿 관리</mdb-btn>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>

    <productDetailPopup
    	v-bind:productId="productId"
    	v-bind:dialogVisible="productDetailDialog"
    	v-on:fire-dialog-saved="saveProductDetailDialog"
    	v-on:fire-dialog-closed="closeProductDetailDialog"
    />
    <addOnServicesPopup 
    	v-bind:productId="productId"
    	v-bind:dialogVisible="addonServiceDialog"
    	v-on:fire-dialog-closed="closeAddonServiceDialog"
    />
    <costEstimatePopup 
    	v-bind:productId="productId"
    	v-bind:dialogVisible="costEstimateDialog"
    	v-on:fire-dialog-closed="closeCostEstimateDialog"
    />
  </section>
</template>

<script>
import { mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter, mdbIcon, mdbBtn } from 'mdbvue'
import { mdbModal } from 'mdbvue' 
import productDetailPopup from './ProductDetailPopup'
import addOnServicesPopup from './AddOnServicesPopup'
import costEstimatePopup from './CostEstimatePopup'

export default {
  	components: {
    	mdbContainer, mdbRow, mdbCol, mdbCard, mdbCardTitle, mdbCardBody, mdbCardText, mdbCardFooter,
    	mdbIcon, mdbBtn,
    	mdbModal,
    	productDetailPopup, addOnServicesPopup, costEstimatePopup
  	},
	data: () => ({
      	products: [],
      	productDetailDialog: false,
      	addonServiceDialog: false,
      	costEstimateDialog: false,
      	productId: 0
	}),
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
