<template>
	<div v-if="editable">
        <b-card>
	        <standard-info-detail-form v-bind:generalInfo="generalInfo" v-bind:editable="editable" />
        </b-card>
        <div class="text-center mb-4">
            <b-button variant="primary" v-on:click="save"><i class="icon-check"></i> 저장</b-button>
        </div>
	</div>
	<div v-else>
		<standard-info-detail-form v-bind:generalInfo="generalInfo" v-bind:editable="editable" />
	</div>
</template>

<script>
import StandardInfoDetailForm from './StandardInfoDetailForm'

export default {
    components: {
        StandardInfoDetailForm
    },
	props: [
		'versionId',
		'editable'
	],
	computed: {
		generalInfo: function() {
			if(this.versionId) {
				return this.$store.state.estimate.generalHistoryDetail
			} else {
				return this.$store.state.estimate.general
			}
		}
	},
	created () {
		this.initialize()
	},
	methods: {
		initialize() {
			if(this.versionId) {
				this.$store.dispatch('estimate/getGeneralHistoryDetail', {versionId: this.versionId})
			} else {
				this.$store.dispatch('estimate/getGeneral')
			}
		},
		save () {
			if(!this.generalInfo.platformCpuPerWorker) {
				this.$zadmin.alert('Platform Reserved CPU를 입력하세요');
				return;
			}
			if(!this.generalInfo.platformMemoryPerWorker) {
				this.$zadmin.alert('Platform Reserved Memory를 입력하세요');
				return;
			} 
			if(!this.generalInfo.ibmDcRate) {
				this.$zadmin.alert('IBM 할인율을 입력하세요');
				return;
			}
			if(!this.generalInfo.exchangeRate) {
				this.$zadmin.alert('매매기준환율을 입력하세요');
				return;
			}
			if(!this.generalInfo.ipAllocation) {
				this.$zadmin.alert('IP Allocation Cost를 입력하세요');
				return;
			}
			
			this.$zadmin.confirm('변경된 내용을 저장하시겠습니까?', (result) => {
				result && this.$store.dispatch('estimate/saveGeneral', {generalInfo: this.generalInfo});
			})
		}
	}
}
</script>