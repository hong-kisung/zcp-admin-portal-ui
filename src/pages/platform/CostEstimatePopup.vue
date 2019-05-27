<template>
	<v-dialog v-model="dialogVisibility" persistent width="1500px">
        <v-card min-height="800px">
          <v-card-title class="title">원가 견적서 템플릿</v-card-title>
          <v-card-text>
		    <v-layout row wrap>
		      <v-flex lg12>
				  <v-tabs
				    v-model="active"
				    color="grey darken-1"
				    dark
				    slider-color="yellow"
				  >
				    <v-tab href="#tab-1">Cloud Z Service</v-tab>
				    <v-tab href="#tab-2">Application Storage Service</v-tab>
				
				    <v-tab-item value="tab-1">
						<product-estimate-type-template 
							v-bind:services="estimateTemplate.cloudZService"
				 			v-bind:classificationTypeItems="classificationTypeItems"
				 			v-bind:title="cloudZServiceTitle"
						/>
						    </v-tab-item>
						    <v-tab-item value="tab-2">
						<product-estimate-type-template 
							v-bind:services="estimateTemplate.storageService"
				 			v-bind:classificationTypeItems="classificationTypeItems"
				 			v-bind:title="storageServiceTitle"
						/>
				    </v-tab-item>
				  </v-tabs>
		      </v-flex>
    		</v-layout>
    	  </v-card-text>
 	      <v-card-actions>
		    <v-spacer></v-spacer>
		    <v-btn right color="primary" @click="cancel">취소</v-btn>
		    <v-btn right color="primary" @click="saveService">저장</v-btn>
	      </v-card-actions>
        </v-card>
	</v-dialog>
</template>

<script>
export default {
	data: () => ({
		dialog: false,
		active: null,
		cloudZServiceTitle: 'Cloud Z Service',
		storageServiceTitle: 'Application Storage Service',
		classificationTypeItems: [],
      	estimateTemplate: {}
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
			
			this.getCostEstimate();
		},
		dialogVisibility: function() {
			this.dialog = this.dialogVisibility;
		}
    },
	computed: {
    },
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			this.$http.get('/api/code/classification_type').then(response => {
				this.classificationTypeItems = response.data;
			})
			if(this.productId > 0) {
				this.getCostEstimate();
			}
		},
		getCostEstimate() {
			this.$http.get('/api/platform/product/'+ this.productId + '/template').then(response => {
				this.estimateTemplate = response.data;
			})
		},
		saveService() {
			if(confirm('변경된 내용을 저장하시겠습니까?')) {
				this.$http.put('/api/platform/product/'+ this.productId +'/template', this.estimateTemplate).then(response => {
					alert("저장되었습니다.");
					//this.initialize();
					
					this.dialog = false;
					this.$emit('fire-dialog-saved');
				})
			}
		},
		cancel() {
			this.dialog = false;
			this.$emit('fire-dialog-closed');
		}
	}
}
</script>

<style>
</style>
