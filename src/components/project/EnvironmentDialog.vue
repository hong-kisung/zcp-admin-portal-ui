<template>
       <v-dialog v-model="dialog" persistent max-width="500px">
	 	  <ValidationObserver ref="obs">
		    <v-card slot-scope="{ invalid, validated }">
		      <v-card-title>Environment 추가</v-card-title>
			  <v-card-text>
			    <v-flex xs12>
		          <VSelectWithValidation
		            rules="required"
		            data-vv-name="environmentName"
		            v-model="editedItem.environmentName"
		            :items="environmentItems"
		            label="Environment"
		            chips
		            deletable-chips
		          />
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
			    <v-btn color="blue darken-1" flat @click="closeEnvironmentDialog">취소</v-btn>
			    <v-btn color="blue darken-1" flat @click="saveEnvironmentDialog" v-bind:disabled="invalid">저장</v-btn>
			  </v-card-actions>
		    </v-card>
		  </ValidationObserver>
	 	</v-dialog>
</template>
<script>
export default {
	data: () => ({
		environmentItems: [],
		products: [],
		dialog: false
	}),
	props: [
		'editedItem',
		'estimate',
		'projectVolumes',
		'environmentDialog'
	],
	computed: {
		formDialogTitle () {
			return '';
		}
	},
	watch: {
		environmentDialog: function (){
			this.dialog = this.environmentDialog;
		},
		projectVolumes: function() {
			if(this.projectVolumes && this.projectVolumes.environments) {
				this.environmentItems = [];
				for(var i = 0; i < this.projectVolumes.environments.length; i++) {
					this.environmentItems[i] = this.projectVolumes.environments[i].name;
				}
			}
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
		closeEnvironmentDialog() {
			this.$emit('fire-dialog-closed');
			this.$refs.obs.reset();
			this.dialog = false;
		},
		saveEnvironmentDialog() {
			this.$refs.obs.validate().then(valid => {
				if(valid) {
					var selectedIndex = this.environmentItems.indexOf(this.editedItem.environmentName);
					
					for(var i = 0; i < this.estimate.environments.length; i++) {
						if(this.estimate.environments[i].environmentId == this.projectVolumes.environments[selectedIndex].id) {
							alert('존재하는 Environment입니다. 다시 선택하세요.');
							return;
						}
					}
					
					if(this.editedItem.products.length == 0) {
						alert('Product를 선택하세요.');
						return;
					}
					
					this.editedItem.environmentId = this.projectVolumes.environments[selectedIndex].id;
					
					this.$emit('fire-dialog-saved');
					this.$refs.obs.reset();
					this.dialog = false;
				}
			});
		}
	}
}

</script>