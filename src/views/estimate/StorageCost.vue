<template>
    <div class="animated fadeIn">
        <h1 class="display-tit">Storage Cost</h1>
        <h2 class="display-sub mb-3">IKS Storage 비용의 최신 버전을 조회 및 수정합니다.</h2>
        
        <b-card>
            <storage-cost-detail v-bind:storageData="storageData"
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
            
            <!-- modal : IKS Storage -->
            <b-modal id="iks-storage-modal" scrollable title="IKS Storage" size="xl" centered v-model="detailDialog">
	            <storage-cost-detail v-bind:storageData="historyDetail"
	            					 v-bind:editable="false"
	            />
                <template v-slot:modal-footer="{ ok }">
                    <b-button variant="secondary" @click="detailDialog = false"><i class="icon-close"></i> 닫기</b-button>
                </template>
            </b-modal>
            <!-- // modal : IKS Storage -->
        </b-card>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import StorageCostDetail from './StorageCostDetail'

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
        VuePerfectScrollbar, StorageCostDetail
    },
    computed: {
		storageData: function() {
			return this.$store.state.estimate.storage;
		},
		historyList: function() {
			return this.$store.state.estimate.storageHistory;
		},
		historyDetail: function() {
			return this.$store.state.estimate.storageHistoryDetail;
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
			this.$store.dispatch('estimate/getStorage')
			this.$store.dispatch('estimate/getStorageHistory')
		},
		save () {
			if(!this.storageData.objectStoragePricePerMonth) {
				this.$zadmin.alert('Object Storage Price(₩)/Monthly 값을 입력하세요');
				return;
			}
			this.$zadmin.confirm('변경된 내용을 저장하시겠습니까?', (result) => {
				result && this.$store.dispatch('estimate/saveStorage', {storageInfo: this.storageData})
			})
		},
		clickHistoryDetail (item) {
			this.$store.dispatch('estimate/getStorageHistoryDetail', {versionId: item.id})
			this.detailDialog = true
		}
    }
}
</script>