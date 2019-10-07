<template>
	<div v-if="editable">
        <b-card>
	        <vm-cost-detail-form v-bind:vmData="vmData" v-bind:editable="true" />
        </b-card>
        <div class="text-center mb-4">
            <b-button variant="primary" v-on:click="save"><i class="icon-check"></i> 저장</b-button>
        </div>
	</div>
	<div v-else>
		<vm-cost-detail-form v-bind:vmData="vmData" v-bind:editable="false" />
	</div>
</template>

<script>
import VmCostDetailForm from './VmCostDetailForm'

export default {
    data()  {
        return {
        }
    },
    components: {
        VmCostDetailForm
    },
	props: [
		'versionId',
		'editable'
	],
    computed: {
		iksGeneral: function() {
			return this.$store.state.estimate.general;
		},
		vmData: function() {
			if(this.versionId) {
				return this.$store.state.estimate.vmHistoryDetail;
			} else {
				return this.$store.state.estimate.vm;
			}
        }
    },
	created () {
		this.initialize();
    },
    methods: {
 		initialize () {
			this.$store.dispatch('estimate/getGeneral')
			
			if(this.versionId) {
				this.$store.dispatch('estimate/getVmHistoryDetail', {versionId: this.versionId})
			} else {
				this.$store.dispatch('estimate/getVm')
			}
		},
		save () {
			this.$zadmin.confirm('변경된 내용을 저장하시겠습니까?', (result) => {
				result && this.$store.dispatch('estimate/saveVm', {vmInfo: this.vmData})
			})
		}
    }
}
</script>