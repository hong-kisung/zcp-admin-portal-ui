<template>
    <b-card>
        <h5 class="mb-2">History</h5>
        <VuePerfectScrollbar class="scroll-area" :settings="psSettings" @ps-scroll-x="scrollHandle">
            <b-table striped hover small bordered :fields="fields" :items="historyList">
                <template v-slot:table-colgroup="scope">
                    <col v-for="field in scope.fields" :key="field.key" :style="{ width: field.key === 'description' ? '50%' : '' }">
                </template>
                <template slot="view" slot-scope="data">
                    <b-button variant="outline-warning" size="sm" @click="clickHistoryDetail(data.item)"><i class="icon-info"></i> 상세보기</b-button>
                </template>
            </b-table>
        </VuePerfectScrollbar>
        
        <!-- modal : IKS VM -->
        <b-modal id="iks-vm-modal" scrollable title="IKS VM" size="xl" centered v-model="detailDialog">
            <vm-cost-detail v-bind:versionId="versionId"
            				v-bind:editable="false"
            />
            <template v-slot:modal-footer="{ ok }">
                <b-button variant="secondary" @click="detailDialog = false"><i class="icon-close"></i> 닫기</b-button>
            </template>
        </b-modal>
        <!-- // modal : IKS VM -->
    </b-card>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import perfectScrollbar from '@/mixins/perfect-scrollbar'
import VmCostDetail from './VmCostDetail'

export default {
	mixins: [perfectScrollbar],
    components: {
    	VuePerfectScrollbar, VmCostDetail
    },
    data()  {
        return {
        	versionId: 0,
        	detailDialog: false,
            fields: [
                { key: 'version', label: '버전', tdClass: 'text-center' },
                { key: 'description', label: '설명' },
                { key: 'createdDt', label: '생성일시', tdClass: 'text-center' },
                { key: 'created', label: '생성자', tdClass: 'text-center' },
                { key: 'view', label: '상세보기', tdClass: 'text-center' }
            ]
        }
    },
    computed: {
		historyList: function() {
			return this.$store.state.estimate.vmHistory;
        }
    },
	created () {
		this.$store.dispatch('estimate/getVmHistory')
    },
    methods: {
		clickHistoryDetail (item) {
			this.versionId = item.id;
			this.detailDialog = true
		}
    }
}
</script>