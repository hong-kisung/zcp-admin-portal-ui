<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">Products</h1>
        <b-row>
            <b-col sm="6" lg="3" v-for="product in products" :key="product.id">
                <b-card>
                    <h2 class="card-tit">
                        {{ product.name }}
                        <!--b-button variant="secondary" size="sm" class="float-right" @click="viewProduct(product)"><i class="fa fa-cogs"></i></b-button-->
                    </h2>
                    <small class="text-muted"><i class="icon-calendar"></i> {{ product.createdDt }}</small>
                    <div class="mt-2">
                        <b-button variant="outline-success" block size="sm" :to="{ name: 'ProductAddOnService', params: { productId: product.id, productName: product.name } }"><i class="icon-book-open mr-1"></i> Add-on Service 관리</b-button>
                        <b-button variant="outline-warning" block size="sm" :to="{ name: 'ProductCostEstimateTemplate', params: { productId: product.id, productName: product.name } }"><i class="icon-book-open mr-1"></i> 원가견적서 템플릿 관리</b-button>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
	data: () => ({
      	products: [],
	}),
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			this.$http.get('/api/estimate/platform/product').then(response => {
				this.products = response.data
			})
		}
	}
}
</script>