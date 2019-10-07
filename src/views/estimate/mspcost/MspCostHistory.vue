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
        
        <!-- modal : MSP 비용 -->
        <b-modal id="msp-modal" scrollable title="MSP 비용" size="lg" centered v-model="detailDialog">
            <msp-cost-detail v-bind:versionId="versionId"
            				 v-bind:editable="false"
            />
            <template v-slot:modal-footer="{ ok }">
                <b-button variant="secondary" @click="detailDialog = false"><i class="icon-close"></i> 닫기</b-button>
            </template>
        </b-modal>
        <!-- // modal : MSP 비용 -->
    </b-card>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import MspCostDetail from './MspCostDetail'

export default {
    data()  {
        return {
        	versionId: 0,
        	detailDialog: false,
            fields: [
                { key: 'version', label: '버전', tdClass: 'text-center' },
                { key: 'description', label: '설명' },
                { key: 'date', label: '생성일시', tdClass: 'text-center' },
                { key: 'creator', label: '생성자', tdClass: 'text-center' },
                { key: 'view', label: '상세보기', tdClass: 'text-center' }
            ]
        }
    },
    components: {
        VuePerfectScrollbar, MspCostDetail
    },
    computed: {
		historyList: function() {
			return this.$store.state.estimate.productMspCostHistory;
		},
        psSettings: () => {
            return {
                maxScrollbarLength: 200,
                minScrollbarLength: 40,
                suppressScrollY: true,
                wheelPropagation: true,
                useBothWheelAxes: true
            }
        }
    },
	created () {
		this.$store.dispatch('estimate/getProductMspCostHistory')
    },
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        },
		clickHistoryDetail (item) {
			this.versionId = item.id;
			this.detailDialog = true
		}
    }
}
</script>