<template>
	<div v-if="editable">
        <b-card>
	        <msp-cost-detail-form v-bind:productMspCostVersion="productMspCostVersion" v-bind:editable="true" />
        </b-card>
        <div class="text-center mb-4">
            <b-button variant="primary" v-on:click="save"><i class="icon-check"></i> 저장</b-button>
        </div>
	</div>
	<div v-else>
		<msp-cost-detail-form v-bind:productMspCostVersion="productMspCostVersion" v-bind:editable="false" />
	</div>
</template>

<script>
import MspCostDetailForm from './MspCostDetailForm'

export default {
    data()  {
        return {
        }
    },
    components: {
        MspCostDetailForm
    },
	props: [
		'versionId',
		'editable'
	],
    computed: {
		productMspCostVersion: function() {
			if(this.versionId) {
				return this.$store.state.estimate.productMspCostHistoryDetail;
			} else {
				return this.$store.state.estimate.productMspCost;
			}
		}
    },
	created () {
		this.initialize();
    },
    methods: {
		initialize () {
			if(this.versionId) {
				this.$store.dispatch('estimate/getProductMspCostHistoryDetail', {versionId: this.versionId})
			} else {
				this.$store.dispatch('estimate/getProductMspCost')
			}
		},
		save() {
			this.$zadmin.confirm('변경된 내용을 저장하시겠습니까?', (result) => {
				if(result) {
					this.$store.dispatch('estimate/saveProductMspCost', {productMspCostInfo: this.productMspCostVersion})
					this.selected = [];
				}
			})
		}
    }
}
</script>