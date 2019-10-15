<template>
	<div v-if="editable">
        <b-card>
	        <storage-cost-detail-form v-bind:storageData="storageData" v-bind:editable="true" />
        </b-card>
        <div class="text-center mb-4">
            <b-button variant="primary" v-on:click="save"><i class="icon-check"></i> 저장</b-button>
        </div>
	</div>
	<div v-else>
		<storage-cost-detail-form v-bind:storageData="storageData" v-bind:editable="false" />
	</div>
</template>

<script>
import StorageCostDetailForm from './StorageCostDetailForm'

export default {
    data()  {
        return {
        }
    },
    components: {
        StorageCostDetailForm
    },
	props: [
		'versionId',
		'editable'
	],
    computed: {
		iksGeneral: function() {
			return this.$store.state.estimate.general;
		},
 		storageData: function() {
			if(this.versionId) {
				return this.$store.state.estimate.storageHistoryDetail;
			} else {
				return this.$store.state.estimate.storage;
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
				this.$store.dispatch('estimate/getStorageHistoryDetail', {versionId: this.versionId})
			} else {
				this.$store.dispatch('estimate/getStorage')
			}
		},
		save () {
			if(!this.storageData.objectStoragePricePerMonth) {
				this.$zadmin.alert('Object Storage Price(₩)/Monthly 값을 입력하세요');
				return;
			}
			this.$zadmin.confirm('변경된 내용을 저장하시겠습니까?', (result) => {
				result && this.$store.dispatch('estimate/saveStorage', {storageInfo: this.storageData})
			})
		}
    }
}
</script>