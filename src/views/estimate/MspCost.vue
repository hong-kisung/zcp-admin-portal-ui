<template>
    <div class="animated fadeIn">
        <h1 class="display-tit">MSP Cost</h1>
        <h2 class="display-sub mb-3">MSP 비용의 최신 버전을 조회 및 수정합니다.</h2>
        
        <b-card>
            <msp-cost-detail v-bind:productMspCostVersion="productMspCostVersion"
            				 v-bind:editable="true"
            />
        </b-card>
        <div class="text-center mb-4">
            <b-button variant="primary" @click="save"><i class="icon-check"></i> 저장</b-button>
        </div>
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
	            <msp-cost-detail v-bind:productMspCostVersion="historyDetail"
	            				 v-bind:editable="false"
	            />
                <template v-slot:modal-footer="{ ok }">
                    <b-button variant="secondary" @click="detailDialog = false"><i class="icon-close"></i> 닫기</b-button>
                </template>
            </b-modal>
            <!-- // modal : MSP 비용 -->
        </b-card>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import MspCostDetail from './MspCostDetail'

export default {
    data()  {
        return {
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
		productMspCostVersion: function() {
			return this.$store.state.estimate.productMspCost;
		},
		historyList: function() {
			return this.$store.state.estimate.productMspCostHistory;
		},
		historyDetail: function() {
			return this.$store.state.estimate.productMspCostHistoryDetail;
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
		this.initialize();
    },
    methods: {
        scrollHandle (evt) {
            // console.log(evt)
        },
		initialize () {
			this.$store.dispatch('estimate/getProductMspCost')
			this.$store.dispatch('estimate/getProductMspCostHistory')
		},
		save() {
			this.$zadmin.confirm('변경된 내용을 저장하시겠습니까?', (result) => {
				if(result) {
					this.$store.dispatch('estimate/saveProductMspCost', {productMspCostInfo: this.productMspCostVersion})
					this.selected = [];
				}
			})
		},
		clickHistoryDetail (item) {
			this.$store.dispatch('estimate/getProductMspCostHistoryDetail', {versionId: item.id})
			this.detailDialog = true
		}
    }
}
</script>