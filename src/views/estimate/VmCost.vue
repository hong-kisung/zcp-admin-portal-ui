<template>
    <div class="animated fadeIn">
        <h1 class="display-tit">VM Cost</h1>
        <h2 class="display-sub mb-3">IKS VM 비용의 최신 버전을 조회 및 수정합니다.</h2>
        
        <b-card>
            <vm-cost-detail v-bind:vmData="vmData"
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
            
            <!-- modal : IKS VM -->
            <b-modal id="iks-vm-modal" scrollable title="IKS VM" size="xl" centered v-model="detailDialog">
	            <vm-cost-detail v-bind:vmData="historyDetail"
	            				v-bind:editable="false"
	            />
                <template v-slot:modal-footer="{ ok }">
                    <b-button variant="secondary" @click="detailDialog = false"><i class="icon-close"></i> 닫기</b-button>
                </template>
            </b-modal>
            <!-- // modal : IKS VM -->
        </b-card>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import VmCostDetail from './VmCostDetail'

export default {
    data()  {
        return {
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
    components: {
        VuePerfectScrollbar, VmCostDetail
    },
    computed: {
		vmData: function() {
			return this.$store.state.estimate.vm;
		},
		historyList: function() {
			return this.$store.state.estimate.vmHistory;
		},
		historyDetail: function() {
			return this.$store.state.estimate.vmHistoryDetail;
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
			this.$store.dispatch('estimate/getVm')
			this.$store.dispatch('estimate/getVmHistory')
		},
		save () {
			this.$zadmin.confirm('변경된 내용을 저장하시겠습니까?', (result) => {
				result && this.$store.dispatch('estimate/saveVm', {vmInfo: this.vmData})
			})
		},
		clickHistoryDetail (item) {
			this.$store.dispatch('estimate/getVmHistoryDetail', {versionId: item.id})
			this.detailDialog = true
		}
    }
}
</script>