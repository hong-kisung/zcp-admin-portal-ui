<template>
  <b-modal centered no-close-on-backdrop title="Product 기본정보" v-model="show" @close="cancel" @cancel="cancel" @ok="saveProduct">
    <b-form>
      <b-form-group label="Project명" label-for="name" :label-cols="3" >
        <b-form-input id="name" type="text" v-model="product.name" readonly></b-form-input>
      </b-form-group>
      <b-form-group label="설명" label-for="description" :label-cols="3" >
        <b-form-input id="description" type="text" v-model="product.description"></b-form-input>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
	data: () => ({
      	show: false,
      	product: {}
	}),
  	props: [
		'productId',
		'dialogVisible'
	],
    watch: {
		productId: function() {
			if(this.productId <= 0) {
				this.product = {};
				return;
			}
			
			this.getProduct();
		},
		dialogVisible: function() {
			this.show = this.dialogVisible
		}
    },
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
		},
		saveProduct() {
			if(confirm("변경된 내용을 저장하시겠습니까?")) {
				this.$http.put('/api/estimate/platform/product/'+this.product.id, this.product).then(response => {
					alert("저장되었습니다.");
					this.$emit('fire-dialog-saved');
				})
			} else {
				this.cancel()
			}
		},
		cancel() {
			this.$emit('fire-dialog-closed');
		},
		getProduct() {
			this.$http.get('/api/estimate/platform/product/'+this.productId).then(response => {
				this.product = response.data;
			})
		}
	}
}
</script>
