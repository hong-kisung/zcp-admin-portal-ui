<template>
<div class="animated fadeIn">
    <b-card>
		<b-tabs>
		  <b-tab title="Cloud Z Service" active>
			<estimateTypeTemplateTab 
				v-bind:services="estimateTemplate.cloudZService"
	 			v-bind:classificationTypeItems="classificationTypeItems"
			/>
		  </b-tab>
		  <b-tab title="Application Storage Service">
			<estimateTypeTemplateTab 
				v-bind:services="estimateTemplate.storageService"
	 			v-bind:classificationTypeItems="classificationTypeItems"
			/>
		  </b-tab>
		</b-tabs>
        <b-row class="mt-2">
          <b-col class="text-right">
            <b-button size="sm" variant="outline-primary" class="m-1" @click="cancel">목록</b-button>
	        <b-button size="sm" variant="primary" class="m-1" @click="saveService">저장</b-button>
          </b-col>
        </b-row>
	</b-card>
</div> 
</template>

<script>
import estimateTypeTemplateTab from './EstimateTypeTemplate'

export default {
  	components: {
    	estimateTypeTemplateTab
  	},
	data: () => ({
		productId: 0,
		active: null,
		classificationTypeItems: [],
      	estimateTemplate: {}
	}),
	props: [
	],
    watch: {
    },
	computed: {
    },
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			if(this.$route.params.productId) {
				this.productId = this.$route.params.productId;
			}
			this.$http.get('/api/estimate/code/classification_type').then(response => {
				this.classificationTypeItems = response.data;
			})
			if(this.productId > 0) {
				this.getCostEstimate();
			}
		},
		getCostEstimate() {
			this.$http.get('/api/estimate/platform/product/'+ this.productId + '/template').then(response => {
				this.estimateTemplate = response.data;
			})
		},
		saveService() {
			if(confirm('변경된 내용을 저장하시겠습니까?')) {
				this.$http.put('/api/estimate/platform/product/'+ this.productId +'/template', this.estimateTemplate).then(response => {
					alert("저장되었습니다.");
				})
			}
		},
		cancel() {
			history.go(-1)
		}
	}
}
</script>
