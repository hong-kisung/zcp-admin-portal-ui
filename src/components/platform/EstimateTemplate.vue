<template>
	<div>
    <v-layout row wrap>
      <v-flex lg12>
		<product-estimate-type-template 
			v-bind:services="estimateTemplate.cloudZService"
 			v-bind:classificationTypeItems="classificationTypeItems"
 			v-bind:title="cloudZServiceTitle"
		/>
      </v-flex>
      <v-flex lg12>
		<product-estimate-type-template 
			v-bind:services="estimateTemplate.storageService"
 			v-bind:classificationTypeItems="classificationTypeItems"
 			v-bind:title="storageServiceTitle"
		/>
      </v-flex>
      <v-flex lg12>
        <v-card>
 	      <v-card-actions>
		    <v-spacer></v-spacer>
		    <v-btn right color="primary" @click="saveService">저장</v-btn>
	      </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
	</div>
</template>

<script>
export default {
	data: () => ({
		cloudZServiceTitle: 'Cloud Z Service',
		storageServiceTitle: 'Application Storage Service',
		classificationTypeItems: [],
      	estimateTemplate: {}
	}),
	props: [
		'productId'
	],
	computed: {
    },
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			this.$http.get('/api/platform/product/'+ this.productId + '/template').then(response => {
				this.estimateTemplate = response.data;
			})
			this.$http.get('/api/code/classification_type').then(response => {
				this.classificationTypeItems = response.data;
			})
		},
		saveService() {
			if(confirm('변경된 내용을 저장하시겠습니까?')) {
				this.$http.put('/api/platform/product/'+ this.productId +'/template', this.estimateTemplate).then(response => {
					alert("저장되었습니다.");
					this.initialize();
				})
			}
		}
	}
}
</script>

<style>
</style>
