<template>
<div class="animated fadeIn">
    <b-card>
		<b-tabs>
		  <b-tab title="Cloud Z Service" active>
			<estimateTypeTemplateTab 
				v-bind:services="estimateTemplate.cloudZService"
			/>
		  </b-tab>
		  <b-tab title="Application Storage Service">
			<estimateTypeTemplateTab 
				v-bind:services="estimateTemplate.storageService"
			/>
		  </b-tab>
		</b-tabs>
        <b-row class="mt-2">
          <b-col class="text-right">
            <b-button size="md" variant="outline-primary" class="m-1" @click="cancel">목록</b-button>
	        <b-button size="md" variant="primary" class="m-1" @click="saveService">저장</b-button>
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
		active: null
	}),
	props: [
	],
    watch: {
    },
	computed: {
		estimateTemplate: function() {
			return this.$store.state.estimate.costEstimateTemplate
		}
    },
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			if(this.$route.params.productId) {
				this.productId = this.$route.params.productId
			}
			if(this.productId < 1) {
				return
			}
			
			this.$store.dispatch('estimate/getCostEstimateTemplate', {productId: this.productId})
			this.$store.dispatch('estimate/getVm')
			this.$store.dispatch('estimate/getStorage')
			this.$store.dispatch('estimate/getHardwareTypes')
			this.$store.dispatch('estimate/getFileStorageTypes')
			this.$store.dispatch('estimate/getEnduranceIops')
			this.$store.dispatch('estimate/getClassificationTypes')
		},
		saveService() {
			this.$bvModal.msgBoxConfirm('저장하시겠습니까?').then(value => {
				if(value) {
					this.$store.dispatch('estimate/saveCostEstimateTemplate', {productId: this.productId, costEstimateTemplate: this.estimateTemplate})
				}
			})
		},
		cancel() {
			history.go(-1)
		}
	}
}
</script>
