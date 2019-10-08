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
        
        <!-- modal : Product 기본정보 
        <b-modal id="product-info-modal" title="Product 기본정보" centered>
            <b-form>
                <b-form-group label="Product명" label-for="name" :label-cols="3">
                    <b-form-input type="text" id="name" placeholder="Product명을 입력해주세요." value="Cloud Z CP" readonly></b-form-input>
                </b-form-group>
                <b-form-group label="설명" label-for="description" :label-cols="3">
                    <b-form-input type="text" id="description" placeholder="설명을 입력해주세요."></b-form-input>
                </b-form-group>
            </b-form>
            <template v-slot:modal-footer="{ ok, cancel }">
                <b-button variant="secondary" @click="cancel()">취소</b-button>
                <b-button variant="primary" @click="ok()"><i class="icon-check"></i> 저장</b-button>
            </template>
        </b-modal>
        // modal : Product 기본정보 -->
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