<template>
    <div class="animated fadeIn">
        <h1 class="display-tit mb-3">{{ estimateTemplate.name }}</h1>
        <b-tabs class="mb-4">
            <b-tab active>
                <template slot="title">
                    <i class="icons cui-justify-left mr-1"></i> Cloud Z Service
                </template>
                
                <cost-estimate-type v-bind:services="estimateTemplate.cloudZService" />
            </b-tab>
            <b-tab>
                <template slot="title">
                    <i class="icons cui-justify-left mr-1"></i> Application Storage Service
                </template>
                
                <cost-estimate-type v-bind:services="estimateTemplate.storageService" />
            </b-tab>
        </b-tabs>
        <div class="mb-4">
            <router-link :to="{ path: '/product/' }">
                <b-button variant="warning"><i class="icon-list"></i> 목록</b-button>
            </router-link>
            <b-button variant="primary" class="float-right" @click="saveService"><i class="icon-check"></i> 저장</b-button>
        </div>
    </div>
</template>

<script>
import CostEstimateType from './costestimate/CostEstimateType'

export default {
    components: {
        CostEstimateType
    },
	data: () => ({
		productId: 0,
	}),
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
			this.$zadmin.confirm('저장하시겠습니까?', (value) => {
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