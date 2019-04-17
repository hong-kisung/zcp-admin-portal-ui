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
              <v-card hover @click="viewProduct(product)">
		        <v-card-title primary-title>
		          <div>
		            <div class="headline" v-text="product.name"></div>
		            <span class="grey--text" v-text="product.description"></span><br><br>
		            <span class="grey--text">add-on services: <span class="grey--text" v-text="product.serviceCount"></span></span><br>
		            <span class="grey--text">생성일시: <span class="grey--text" v-text="product.createdDt"></span></span>
		          </div>
		        </v-card-title>
              </v-card>
              </router-link>
            </v-flex>
            
            <v-flex xs3>
              <v-card hover @click="addProduct">
		        <v-card-title primary-title>
		          <div>
		            <div class="headline">Product 추가</div>
		          </div>
			      <v-btn icon>
			        <v-icon>add</v-icon>
			      </v-btn>
		        </v-card-title>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
	data: () => ({
      products: [
      ]
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
			this.$router.push({ name: 'product_detail', params: { productId: product.id }});
		}
	}
}
</script>

<style>
</style>
